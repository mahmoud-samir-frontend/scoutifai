import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

const aliases: [string,string][] = [
  ['players','sports-player'],['teams','sports-team'],['team-roster','sports-player-team'],
  ['training-sessions','training-session'],['attendance','training-attendance'],['tasks','training-task'],
  ['matches','sports-match'],['match-statistics','match-player-statistic'],['measurements','player-measurement'],
  ['sport-tests','sport-test-definition'],['evaluations','player-evaluation'],['player-profile','sports-player'],
  ['wellness','player-wellness'],['injuries','player-injury'],['rehabilitation-plans','rehabilitation-plan'],
  ['rehabilitation-sessions','rehabilitation-session'],['videos','sports-video'],['video-timeline','video-timeline-tag'],
  ['notifications','sports-notification']
];

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
  { path: 'pages/evaluation-criteria', loadComponent: () => import('./features/entities/pages/evaluation-criteria/evaluation-criteria.component').then(m => m.EvaluationCriteriaComponent), canActivate: [authGuard] },
  { path: 'pages/match-player-statistic', loadComponent: () => import('./features/entities/pages/match-player-statistic/match-player-statistic.component').then(m => m.MatchPlayerStatisticComponent), canActivate: [authGuard] },
  { path: 'pages/parent-player-relation', loadComponent: () => import('./features/entities/pages/parent-player-relation/parent-player-relation.component').then(m => m.ParentPlayerRelationComponent), canActivate: [authGuard] },
  { path: 'pages/player-evaluation', loadComponent: () => import('./features/entities/pages/player-evaluation/player-evaluation.component').then(m => m.PlayerEvaluationComponent), canActivate: [authGuard] },
  { path: 'pages/player-evaluation-item', loadComponent: () => import('./features/entities/pages/player-evaluation-item/player-evaluation-item.component').then(m => m.PlayerEvaluationItemComponent), canActivate: [authGuard] },
  { path: 'pages/player-injury', loadComponent: () => import('./features/entities/pages/player-injury/player-injury.component').then(m => m.PlayerInjuryComponent), canActivate: [authGuard] },
  { path: 'pages/player-measurement', loadComponent: () => import('./features/entities/pages/player-measurement/player-measurement.component').then(m => m.PlayerMeasurementComponent), canActivate: [authGuard] },
  { path: 'pages/player-task', loadComponent: () => import('./features/entities/pages/player-task/player-task.component').then(m => m.PlayerTaskComponent), canActivate: [authGuard] },
  { path: 'pages/player-test-result', loadComponent: () => import('./features/entities/pages/player-test-result/player-test-result.component').then(m => m.PlayerTestResultComponent), canActivate: [authGuard] },
  { path: 'pages/player-video-link', pathMatch: 'full', redirectTo: 'pages/sports-video' },
  { path: 'pages/player-wellness', loadComponent: () => import('./features/entities/pages/player-wellness/player-wellness.component').then(m => m.PlayerWellnessComponent), canActivate: [authGuard] },
  { path: 'pages/rehabilitation-plan', loadComponent: () => import('./features/entities/pages/rehabilitation-plan/rehabilitation-plan.component').then(m => m.RehabilitationPlanComponent), canActivate: [authGuard] },
  { path: 'pages/rehabilitation-session', loadComponent: () => import('./features/entities/pages/rehabilitation-session/rehabilitation-session.component').then(m => m.RehabilitationSessionComponent), canActivate: [authGuard] },
  { path: 'pages/sport', loadComponent: () => import('./features/entities/pages/sport/sport.component').then(m => m.SportComponent), canActivate: [authGuard] },
  { path: 'pages/sport-position', loadComponent: () => import('./features/entities/pages/sport-position/sport-position.component').then(m => m.SportPositionComponent), canActivate: [authGuard] },
  { path: 'pages/sport-test-definition', loadComponent: () => import('./features/entities/pages/sport-test-definition/sport-test-definition.component').then(m => m.SportTestDefinitionComponent), canActivate: [authGuard] },
  { path: 'pages/sports-club', loadComponent: () => import('./features/entities/pages/sports-club/sports-club.component').then(m => m.SportsClubComponent), canActivate: [authGuard] },
  { path: 'pages/sports-coach', loadComponent: () => import('./features/entities/pages/sports-coach/sports-coach.component').then(m => m.SportsCoachComponent), canActivate: [authGuard] },
  { path: 'pages/sports-match', loadComponent: () => import('./features/entities/pages/sports-match/sports-match.component').then(m => m.SportsMatchComponent), canActivate: [authGuard] },
  { path: 'pages/sports-notification', loadComponent: () => import('./features/entities/pages/sports-notification/sports-notification.component').then(m => m.SportsNotificationComponent), canActivate: [authGuard] },
  { path: 'pages/sports-organization', loadComponent: () => import('./features/entities/pages/sports-organization/sports-organization.component').then(m => m.SportsOrganizationComponent), canActivate: [authGuard] },
  { path: 'pages/sports-player', loadComponent: () => import('./features/entities/pages/sports-player/sports-player.component').then(m => m.SportsPlayerComponent), canActivate: [authGuard] },
  { path: 'pages/sports-player-team', loadComponent: () => import('./features/entities/pages/sports-player-team/sports-player-team.component').then(m => m.SportsPlayerTeamComponent), canActivate: [authGuard] },
  { path: 'pages/sports-staff', loadComponent: () => import('./features/entities/pages/sports-staff/sports-staff.component').then(m => m.SportsStaffComponent), canActivate: [authGuard] },
  { path: 'pages/sports-team', loadComponent: () => import('./features/entities/pages/sports-team/sports-team.component').then(m => m.SportsTeamComponent), canActivate: [authGuard] },
  { path: 'pages/sports-user-profile', loadComponent: () => import('./features/entities/pages/sports-user-profile/sports-user-profile.component').then(m => m.SportsUserProfileComponent), canActivate: [authGuard] },
  { path: 'pages/sports-video', loadComponent: () => import('./features/entities/pages/sports-video/sports-video.component').then(m => m.SportsVideoComponent), canActivate: [authGuard] },
  { path: 'pages/training-attendance', loadComponent: () => import('./features/entities/pages/training-attendance/training-attendance.component').then(m => m.TrainingAttendanceComponent), canActivate: [authGuard] },
  { path: 'pages/training-session', loadComponent: () => import('./features/entities/pages/training-session/training-session.component').then(m => m.TrainingSessionComponent), canActivate: [authGuard] },
  { path: 'pages/training-task', loadComponent: () => import('./features/entities/pages/training-task/training-task.component').then(m => m.TrainingTaskComponent), canActivate: [authGuard] },
  { path: 'pages/user', loadComponent: () => import('./features/entities/pages/user/user.component').then(m => m.UserComponent), canActivate: [authGuard] },
  { path: 'roles', loadComponent: () => import('./features/roles/roles.component').then(m => m.RolesComponent), canActivate: [authGuard] },
  { path: 'pages/video-clip', loadComponent: () => import('./features/entities/pages/video-clip/video-clip.component').then(m => m.VideoClipComponent), canActivate: [authGuard] },
  { path: 'pages/video-comment', loadComponent: () => import('./features/entities/pages/video-comment/video-comment.component').then(m => m.VideoCommentComponent), canActivate: [authGuard] },
  { path: 'pages/video-timeline-tag', loadComponent: () => import('./features/entities/pages/video-timeline-tag/video-timeline-tag.component').then(m => m.VideoTimelineTagComponent), canActivate: [authGuard] },
  ...aliases.map(([path,page]) => ({path,pathMatch:'full' as const,redirectTo:`pages/${page}`})),
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' }
];
