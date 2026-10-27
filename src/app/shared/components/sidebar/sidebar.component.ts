import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import { AppIconComponent } from '../app-icon/app-icon.component';
import { AuthService, UserRole } from '../../../services/auth.service';
import { ENTITY_METADATA } from '../../../models/generated/entity-metadata';
import { DocumentedEntityName } from '../../../models/generated/entities';
import { PermissionService } from '../../../services/permission.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    BrandLogoComponent,
    AppIconComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() collapsedChange = new EventEmitter<boolean>();
  collapsed = localStorage.getItem('sidebar_collapsed') === 'true';
  readonly entityMenu;
  private nav?: HTMLElement;
  private routeSubscription?: Subscription;
  private revealTimer?: ReturnType<typeof setTimeout>;
  private readonly persistScroll = () => {
    if (this.nav) sessionStorage.setItem('sports_sidebar_scroll', String(this.nav.scrollTop));
  };
  get canManageRoles() {
    return ['SuperAdmin', 'OrganizationAdmin', 'ClubAdmin'].includes(
      this.auth.currentUser.role
    );
  }
  constructor(
    public auth: AuthService,
    private permission: PermissionService,
    private host: ElementRef<HTMLElement>,
    private router: Router
  ) {
    // This map controls navigation visibility only. Every existing page and
    // route remains in the application so it can be restored at any time.
    const roleMenu: Partial<Record<UserRole, DocumentedEntityName[]>> = {
      TeamManager: ['SportsTeam','SportsPlayer','SportsPlayerTeam','TrainingSession','TrainingAttendance','PlayerTask','SportsMatch','MatchPlayerStatistic','SportsNotification'],
      Coach: ['SportsPlayer','SportsTeam','TrainingSession','TrainingAttendance','PlayerTask','PlayerEvaluation','SportsMatch','MatchPlayerStatistic','PlayerInjury','SportsVideo','SportsNotification'],
      FitnessCoach: ['SportsPlayer','TrainingSession','PlayerMeasurement','SportTestDefinition','PlayerTestResult','PlayerWellness','SportsNotification'],
      Doctor: ['SportsPlayer','PlayerWellness','PlayerMeasurement','PlayerInjury','RehabilitationPlan','RehabilitationSession','SportsNotification'],
      Physiotherapist: ['SportsPlayer','PlayerWellness','PlayerInjury','RehabilitationPlan','RehabilitationSession','SportsNotification'],
      Player: ['TrainingSession','TrainingAttendance','PlayerTask','SportsMatch','MatchPlayerStatistic','PlayerEvaluation','PlayerWellness','PlayerInjury','RehabilitationPlan','SportsVideo','SportsNotification'],
      Parent: ['SportsPlayer','TrainingAttendance','PlayerEvaluation','PlayerInjury','SportsVideo','SportsNotification'],
      Scout: ['SportsPlayer','PlayerEvaluation','PlayerEvaluationItem','SportsVideo'],
      DataAnalyst: ['SportsPlayer','SportsTeam','TrainingAttendance','MatchPlayerStatistic','PlayerMeasurement','PlayerTestResult','PlayerEvaluation','PlayerWellness','PlayerInjury','SportsNotification'],
    };
    const visibleEntities = roleMenu[this.auth.currentUser.role];
    const menuOrder = [
      'SportsPlayer',
      'SportsTeam',
      'SportsPlayerTeam',
      'TrainingSession',
      'TrainingAttendance',
      'TrainingTask',
      'PlayerTask',
      'SportsMatch',
      'MatchPlayerStatistic',
      'PlayerMeasurement',
      'SportTestDefinition',
      'PlayerTestResult',
      'PlayerEvaluation',
      'PlayerEvaluationItem',
      'PlayerWellness',
      'PlayerInjury',
      'RehabilitationPlan',
      'RehabilitationSession',
      'SportsVideo',
      'PlayerVideoLink',
      'SportsNotification',
      'SportsCoach',
      'SportsStaff',
      'SportsClub',
      'SportsOrganization',
      'Sport',
      'SportPosition',
      'ParentPlayerRelation',
      'SportsUserProfile',
      'User',
    ];
    this.entityMenu = ENTITY_METADATA.filter(
      (entity) =>
        ![
          'PlayerVideoLink',
          'VideoClip',
          'VideoComment',
          'VideoTimelineTag',
        ].includes(entity.name) &&
        (!visibleEntities || visibleEntities.includes(entity.name as DocumentedEntityName)) &&
        this.permission.canView(entity.name as DocumentedEntityName)
    )
      .sort((a, b) => {
        const left = menuOrder.indexOf(a.name),
          right = menuOrder.indexOf(b.name);
        return (left < 0 ? 999 : left) - (right < 0 ? 999 : right);
      })
      .map((entity) => ({
        label: entity.name === 'SportsVideo' ? 'Media' : entity.label,
        path: `/pages/${this.pageSlug(entity.name)}`,
        icon: this.entityIcon(entity.name),
      }));
  }
  private pageSlug(name: string) {
    return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
  private entityIcon(name: string) {
    if (name.includes('Evaluation')) return 'chart';
    if (name.includes('Task')) return 'tasks';
    if (name.includes('Wellness')) return 'heart';
    if (name.includes('Measurement') || name.includes('Test'))
      return 'activity';
    if (name.includes('Player')) return 'users';
    if (name.includes('Team')) return 'team';
    if (name.includes('Video')) return 'video';
    if (name.includes('Injury') || name.includes('Rehabilitation'))
      return 'medical';
    if (name.includes('Match')) return 'trophy';
    if (name.includes('Training')) return 'calendar';
    if (name.includes('Notification')) return 'bell';
    return 'grid';
  }
  ngOnInit() {
    this.collapsedChange.emit(this.collapsed);
  }
  ngAfterViewInit() {
    this.nav = this.host.nativeElement.querySelector('nav') || undefined;
    if (!this.nav) return;
    this.nav.scrollTop = Number(sessionStorage.getItem('sports_sidebar_scroll') || 0);
    this.nav.addEventListener('scroll', this.persistScroll, { passive: true });
    this.scheduleActiveLinkReveal('auto');
    this.routeSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.scheduleActiveLinkReveal('smooth'));
  }
  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
    if (this.revealTimer) clearTimeout(this.revealTimer);
    this.nav?.removeEventListener('scroll', this.persistScroll);
  }
  toggle() {
    this.collapsed = !this.collapsed;
    localStorage.setItem('sidebar_collapsed', String(this.collapsed));
    this.collapsedChange.emit(this.collapsed);
    this.scheduleActiveLinkReveal('smooth');
  }
  private scheduleActiveLinkReveal(behavior: ScrollBehavior) {
    if (this.revealTimer) clearTimeout(this.revealTimer);
    this.revealTimer = setTimeout(() => this.revealActiveLink(behavior));
  }
  private revealActiveLink(behavior: ScrollBehavior) {
    const nav = this.nav;
    const activeLink = nav?.querySelector<HTMLElement>('a.active');
    if (!nav || !activeLink) return;
    const visibleTop = nav.scrollTop + 8;
    const visibleBottom = nav.scrollTop + nav.clientHeight - 8;
    const linkTop = activeLink.offsetTop;
    const linkBottom = linkTop + activeLink.offsetHeight;
    if (linkTop >= visibleTop && linkBottom <= visibleBottom) return;
    nav.scrollTo({
      top: Math.max(0, linkTop - (nav.clientHeight - activeLink.offsetHeight) / 2),
      behavior,
    });
  }
}
