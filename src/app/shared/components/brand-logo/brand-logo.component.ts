import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-brand-logo', standalone: true,
  template: `<div class="brand" [class.light]="light"><svg viewBox="0 0 128 128" aria-label="SCOUTIFAI logo"><defs><linearGradient id="brandGradient" x1="12" y1="8" x2="116" y2="120"><stop stop-color="#14b8a6"/><stop offset=".52" stop-color="#087443"/><stop offset="1" stop-color="#064e3b"/></linearGradient></defs><rect x="6" y="6" width="116" height="116" rx="34" fill="url(#brandGradient)"/><path d="M28 76c17-4 23-21 34-39 6-10 15-16 31-18-8 10-10 20-8 29 3 12 10 23 20 32-15-3-27-10-35-21-10 13-23 22-42 26z" fill="#fff"/><circle cx="77" cy="35" r="8" fill="#fbbf24"/></svg><strong>SCOUTIFAI</strong></div>`,
  styles: [`.brand{display:flex;align-items:center;gap:11px;color:#0b2d24}.brand.light{color:#fff}.brand svg{width:47px;height:47px;filter:drop-shadow(0 5px 8px #032d2128)}.brand strong{font-size:24px;line-height:1;display:block;letter-spacing:-.3px}`]
})
export class BrandLogoComponent { @Input() light = false; }
