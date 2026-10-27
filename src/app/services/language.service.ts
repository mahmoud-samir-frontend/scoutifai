import { Injectable, NgZone, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type AppLanguage = 'en' | 'ar';

const LANGUAGE_STORAGE_KEY = 'sports_language';

function storedLanguage(): AppLanguage {
  const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return value === 'ar' || value === 'en' ? value : 'en';
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<AppLanguage>(storedLanguage());
  private readonly originals = new WeakMap<Node, string>();
  private readonly attributes = new WeakMap<Element, Map<string, string>>();
  private dictionary: Record<string, string> = {};
  private translationScheduled = false;
  private started = false;
  private loadSequence = 0;

  constructor(private zone: NgZone, private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    // Always normalize the saved preference so every page reload starts from
    // the same valid value.
    localStorage.setItem(LANGUAGE_STORAGE_KEY, this.language());
    this.applyDirection();
    this.load(this.language());
  }

  toggle(): void {
    const next: AppLanguage = this.language() === 'en' ? 'ar' : 'en';
    this.setLanguage(next);
  }

  setLanguage(language: AppLanguage): void {
    if (language === this.language()) return;

    // While Arabic is active, the DOM contains generated Arabic strings. Put
    // the saved English originals back before changing the active dictionary;
    // otherwise the observer can mistake Arabic text for the new original.
    if (this.language() === 'ar' && language === 'en') {
      this.restoreOriginalText(document.body);
    }

    // Save first so a navigation or reload immediately after clicking cannot
    // lose the newly selected language.
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    this.language.set(language);
    this.applyDirection();
    this.load(language);
  }

  t(key: string): string {
    const translated = this.translateService.instant(key);
    return translated === key ? (this.dictionary[key] || key) : translated;
  }

  /** Use an inline Arabic translation when supplied, otherwise use the shared dictionary. */
  text(en: string, ar?: string): string {
    return this.language() === 'ar' && ar ? ar : this.t(en);
  }

  private load(language: AppLanguage): void {
    const sequence = ++this.loadSequence;
    this.translateService.use(language).subscribe(translations => {
      // Ignore an older HTTP response if the user toggled languages quickly.
      if (sequence !== this.loadSequence || language !== this.language()) return;
      this.dictionary = translations as Record<string, string>;
      if (!this.started) {
        this.started = true;
        this.zone.runOutsideAngular(() => setTimeout(() => this.start()));
      } else {
        this.translateRoot(document.body);
      }
    });
  }

  private applyDirection(): void {
    document.documentElement.lang = this.language();
    document.documentElement.dir = this.language() === 'ar' ? 'rtl' : 'ltr';
  }

  private start(): void {
    this.translateRoot(document.body);
    new MutationObserver(() => this.scheduleTranslation()).observe(document.body, { subtree: true, childList: true, characterData: true });
  }

  private scheduleTranslation(): void {
    if (this.translationScheduled) return;
    this.translationScheduled = true;
    requestAnimationFrame(() => { this.translationScheduled = false; this.translateRoot(document.body); });
  }

  private translateRoot(root: Element): void {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) this.translateNode(node);
    if (root.firstChild?.nodeType === Node.TEXT_NODE) this.translateNode(root.firstChild);
    for (const element of [root, ...Array.from(root.querySelectorAll('*'))]) {
      for (const attribute of ['placeholder', 'title', 'aria-label']) {
        const current = element.getAttribute(attribute);
        if (!current) continue;
        let map = this.attributes.get(element);
        if (!map) { map = new Map(); this.attributes.set(element, map); }
        const old = map.get(attribute);
        if (!old || current !== this.translateValue(old)) map.set(attribute, current);
        const original = map.get(attribute)!;
        const value = this.language() === 'ar' ? this.translateValue(original) : original;
        if (current !== value) element.setAttribute(attribute, value);
      }
    }
  }

  private restoreOriginalText(root: Element): void {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const original = this.originals.get(node);
      if (original !== undefined && node.nodeValue !== original) {
        node.nodeValue = original;
      }
    }

    for (const element of [root, ...Array.from(root.querySelectorAll('*'))]) {
      const savedAttributes = this.attributes.get(element);
      if (!savedAttributes) continue;
      for (const [attribute, original] of savedAttributes) {
        if (element.getAttribute(attribute) !== original) {
          element.setAttribute(attribute, original);
        }
      }
    }
  }

  private translateNode(node: Node): void {
    if (!node.nodeValue?.trim() || ['SCRIPT', 'STYLE'].includes(node.parentElement?.tagName || '')) return;
    const old = this.originals.get(node);
    if (!old || node.nodeValue !== this.translateValue(old)) this.originals.set(node, node.nodeValue);
    const original = this.originals.get(node)!;
    const value = this.language() === 'ar' ? this.translateValue(original) : original;
    if (node.nodeValue !== value) node.nodeValue = value;
  }

  private translateValue(value: string): string {
    const trimmed = value.trim();
    if (this.dictionary[trimmed] !== undefined) {
      const start = value.slice(0, value.indexOf(trimmed));
      const end = value.slice(value.indexOf(trimmed) + trimmed.length);
      return `${start}${this.dictionary[trimmed]}${end}`;
    }

    let result = value;
    for (const key of Object.keys(this.dictionary).sort((a, b) => b.length - a.length)) {
      if (key.length < 2) continue;
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const startsWithWord = /^[A-Za-z0-9]/.test(key);
      const endsWithWord = /[A-Za-z0-9]$/.test(key);
      const pattern = `${startsWithWord ? '(?<![A-Za-z0-9])' : ''}${escapedKey}${endsWithWord ? '(?![A-Za-z0-9])' : ''}`;
      result = result.replace(new RegExp(pattern, 'g'), this.dictionary[key]);
    }
    return result;
  }
}
