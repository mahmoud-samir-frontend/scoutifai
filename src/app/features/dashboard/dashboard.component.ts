import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { AppIconComponent } from '../../shared/components/app-icon/app-icon.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { AuthService, UserRole } from '../../services/auth.service';
import { DataModeService } from '../../services/data-mode.service';
import { LanguageService } from '../../services/language.service';
import { LocalEntityStoreService } from '../../services/local-entity-store.service';

type StatusTone = 'positive' | 'warning' | 'danger' | 'info' | 'neutral';

interface DashboardKpi {
  label: string;
  value: string;
  detail: string;
  trend: string;
  tone: StatusTone;
  icon: string;
  route: string;
}

interface DashboardItem {
  title: string;
  detail: string;
  meta: string;
  tone: StatusTone;
  icon: string;
  route: string;
}

interface DashboardRow {
  initials: string;
  name: string;
  subtitle: string;
  values: Array<{ text: string; tone?: StatusTone }>;
  route: string;
}

interface DashboardQuickAction {
  label: string;
  detail: string;
  route: string;
  icon: string;
}

interface DashboardFeatureCard {
  label: string;
  description: string;
  value: string;
  meta: string;
  route: string;
  icon: string;
  tone: StatusTone;
}

interface DashboardFreshness {
  updated: string;
  confidence: number;
  detail: string;
  tone: StatusTone;
}

type DashboardPeriod = '7D' | '30D' | '90D';
type DashboardChartFormat = 'number' | 'percent' | 'score';

interface DashboardChartMetric {
  id: string;
  label: string;
  title: string;
  baseValue: number;
  format: DashboardChartFormat;
  periodScale?: boolean;
}

interface DashboardTrendView {
  title: string;
  value: string;
  change: string;
  points: string;
  endX: number;
  endY: number;
  axisLabels: string[];
}

interface DashboardOperationalSlice {
  label: string;
  value: number;
  color: string;
}

interface DashboardOperationalBar {
  label: string;
  value: number;
  display: string;
}

interface DashboardOperationalStatus {
  label: string;
  value: number;
  detail: string;
  tone: StatusTone;
}

interface DashboardOperationsCharts {
  title: string;
  scope: string;
  distribution: { title: string; total: string; totalLabel: string; slices: DashboardOperationalSlice[] };
  breakdown: { title: string; bars: DashboardOperationalBar[] };
  status: { title: string; items: DashboardOperationalStatus[] };
}

interface DashboardActivityBar {
  label: string;
  value: number;
  display: string;
}

interface DashboardConfig {
  title: string;
  eyebrow: string;
  description: string;
  contextLabel: string;
  contextValue: string;
  kpis: DashboardKpi[];
  trendTitle: string;
  trendValue: string;
  trendChange: string;
  trendPoints: string;
  attentionTitle: string;
  attention: DashboardItem[];
  scheduleTitle: string;
  schedule: DashboardItem[];
  tableTitle: string;
  tableDescription: string;
  columns: string[];
  rows: DashboardRow[];
  quickAction: { label: string; route: string; icon: string };
  insight: string;
}

const playerRows: DashboardRow[] = [
  { initials: 'OH', name: 'Omar Hassan', subtitle: 'Forward · #9', values: [{ text: '88%', tone: 'positive' }, { text: '94%', tone: 'positive' }, { text: 'Available', tone: 'positive' }], route: '/pages/sports-player' },
  { initials: 'AK', name: 'Ali Khaled', subtitle: 'Midfielder · #8', values: [{ text: '64%', tone: 'warning' }, { text: '89%', tone: 'positive' }, { text: 'Modified', tone: 'warning' }], route: '/pages/sports-player' },
  { initials: 'YM', name: 'Youssef Mostafa', subtitle: 'Defender · #4', values: [{ text: '42%', tone: 'danger' }, { text: '76%', tone: 'warning' }, { text: 'Review', tone: 'danger' }], route: '/pages/sports-player' },
  { initials: 'MA', name: 'Mahmoud Adel', subtitle: 'Goalkeeper · #1', values: [{ text: '—', tone: 'neutral' }, { text: '97%', tone: 'positive' }, { text: 'Available', tone: 'positive' }], route: '/pages/sports-player' },
  { initials: 'KN', name: 'Karim Nabil', subtitle: 'Winger · #11', values: [{ text: '79%', tone: 'positive' }, { text: '92%', tone: 'positive' }, { text: 'Available', tone: 'positive' }], route: '/pages/sports-player' },
  { initials: 'MF', name: 'Mazen Fathy', subtitle: 'Midfielder · #6', values: [{ text: '71%', tone: 'warning' }, { text: '86%', tone: 'positive' }, { text: 'Modified', tone: 'warning' }], route: '/pages/sports-player' },
];

const coachDashboard: DashboardConfig = {
  title: 'Coach Dashboard', eyebrow: 'TEAM COMMAND CENTER',
  description: 'Your team is performing well. Three players need attention before today’s session.',
  contextLabel: 'Active team', contextValue: 'Future Stars U21',
  kpis: [
    { label: 'Team readiness', value: '82%', detail: '18 ready · 3 monitor', trend: '+4% this week', tone: 'positive', icon: 'activity', route: '/pages/player-wellness' },
    { label: 'Availability', value: '18/22', detail: '3 modified · 1 injured', trend: '2 returning soon', tone: 'warning', icon: 'medical', route: '/pages/player-injury' },
    { label: 'Attendance', value: '91%', detail: 'Current month', trend: '+2% vs last month', tone: 'positive', icon: 'check', route: '/pages/training-attendance' },
    { label: 'Open alerts', value: '3', detail: '1 high priority', trend: 'Review before 17:00', tone: 'danger', icon: 'bell', route: '/pages/sports-notification' },
  ],
  trendTitle: 'Team readiness trend', trendValue: '82%', trendChange: '+7 points over 30 days',
  trendPoints: '8,132 54,118 100,126 146,92 192,101 238,72 284,80 330,48 376,61 422,35 468,43 514,24',
  attentionTitle: 'Needs attention',
  attention: [
    { title: 'Youssef Mostafa', detail: 'High pain score after training', meta: 'High · 18 min ago', tone: 'danger', icon: 'medical', route: '/pages/player-wellness' },
    { title: 'Ali Khaled', detail: 'Readiness dropped to 64%', meta: 'Monitor · 1 hr ago', tone: 'warning', icon: 'activity', route: '/pages/player-wellness' },
    { title: '3 missing check-ins', detail: 'Daily wellness not submitted', meta: 'Due before training', tone: 'neutral', icon: 'tasks', route: '/pages/player-wellness' },
    { title: 'Mazen Fathy', detail: 'Training load is above target', meta: 'Monitor · Today', tone: 'warning', icon: 'activity', route: '/pages/player-measurement' },
    { title: 'Match squad decision', detail: 'Two positions still need confirmation', meta: 'Due by 19:00', tone: 'info', icon: 'trophy', route: '/pages/sports-match' },
  ],
  scheduleTitle: 'Today',
  schedule: [
    { title: 'Team activation', detail: 'Training ground A', meta: '10:00 · 45 min', tone: 'info', icon: 'calendar', route: '/pages/training-session' },
    { title: 'Player review', detail: 'Ali Khaled · Performance room', meta: '14:30 · 20 min', tone: 'warning', icon: 'users', route: '/pages/player-evaluation' },
    { title: 'Tactical session', detail: 'Full U21 squad', meta: '17:00 · 90 min', tone: 'positive', icon: 'team', route: '/pages/training-session' },
    { title: 'Video review', detail: 'Previous match clips', meta: '19:00 · 30 min', tone: 'info', icon: 'video', route: '/pages/sports-video' },
    { title: 'Staff debrief', detail: 'Coaching room', meta: '19:40 · 20 min', tone: 'neutral', icon: 'users', route: '/pages/sports-staff' },
  ],
  tableTitle: 'Player status', tableDescription: 'Latest readiness, attendance and availability for the active squad.',
  columns: ['Readiness', 'Attendance', 'Availability'], rows: playerRows,
  quickAction: { label: 'Create training session', route: '/pages/training-session', icon: 'calendar' },
  insight: 'Readiness is improving, but two players have a combined fatigue and pain signal. Review them before assigning full training load.',
};

const adminDashboard: DashboardConfig = {
  title: 'Administration Dashboard', eyebrow: 'PLATFORM OVERVIEW',
  description: 'A focused overview of organizations, users and system activity across the platform.',
  contextLabel: 'Organization', contextValue: 'All organizations',
  kpis: [
    { label: 'Active players', value: '248', detail: 'Across 14 teams', trend: '+12 this month', tone: 'positive', icon: 'users', route: '/pages/sports-player' },
    { label: 'Active teams', value: '14', detail: '4 age groups', trend: 'All operational', tone: 'info', icon: 'team', route: '/pages/sports-team' },
    { label: 'Staff accounts', value: '38', detail: 'Coaches and medical', trend: '3 pending activation', tone: 'warning', icon: 'roles', route: '/pages/sports-staff' },
    { label: 'Data completion', value: '93%', detail: 'Core records complete', trend: '+5% this month', tone: 'positive', icon: 'chart', route: '/pages/sports-player' },
  ],
  trendTitle: 'Platform activity', trendValue: '1,284', trendChange: '+16% interactions this month',
  trendPoints: '8,126 54,116 100,119 146,102 192,88 238,94 284,69 330,73 376,52 422,58 468,31 514,20',
  attentionTitle: 'Administration attention',
  attention: [
    { title: '3 accounts pending', detail: 'Staff activation is incomplete', meta: 'Access control', tone: 'warning', icon: 'roles', route: '/pages/user' },
    { title: 'U18 roster incomplete', detail: 'Two player profiles need a position', meta: 'Data quality', tone: 'neutral', icon: 'users', route: '/pages/sports-player-team' },
    { title: 'Monthly review ready', detail: 'Organization performance summary', meta: 'Generated today', tone: 'info', icon: 'chart', route: '/pages/sports-organization' },
    { title: 'Medical access review', detail: 'Two staff permissions expire soon', meta: 'Due in 2 days', tone: 'danger', icon: 'lock', route: '/roles' },
    { title: 'Attendance sync delayed', detail: 'U16 training records need review', meta: 'Last sync 3 hours ago', tone: 'warning', icon: 'check', route: '/pages/training-attendance' },
  ],
  scheduleTitle: 'Recent activity',
  schedule: [
    { title: 'New coach account', detail: 'Karim Samir · U18', meta: '09:42 today', tone: 'positive', icon: 'users', route: '/pages/sports-coach' },
    { title: 'Team roster updated', detail: 'Future Stars U21', meta: 'Yesterday', tone: 'info', icon: 'team', route: '/pages/sports-player-team' },
    { title: 'Role policy updated', detail: 'Medical staff access', meta: '2 days ago', tone: 'warning', icon: 'lock', route: '/roles' },
    { title: 'Organization activated', detail: 'Sports Organization 5', meta: '3 days ago', tone: 'positive', icon: 'grid', route: '/pages/sports-organization' },
    { title: 'Player records imported', detail: '24 profiles · Future Stars Academy', meta: '4 days ago', tone: 'info', icon: 'users', route: '/pages/sports-player' },
  ],
  tableTitle: 'Organization overview', tableDescription: 'Demo operating status across the most active organizations.',
  columns: ['Players', 'Teams', 'Status'],
  rows: [
    { initials: 'FS', name: 'Future Stars Academy', subtitle: 'Cairo · Football', values: [{ text: '126' }, { text: '7' }, { text: 'Healthy', tone: 'positive' }], route: '/pages/sports-organization' },
    { initials: 'NU', name: 'Nile United', subtitle: 'Giza · Football', values: [{ text: '82' }, { text: '5' }, { text: 'Review', tone: 'warning' }], route: '/pages/sports-organization' },
    { initials: 'OA', name: 'Olympic Academy', subtitle: 'Alexandria · Multisport', values: [{ text: '40' }, { text: '2' }, { text: 'Healthy', tone: 'positive' }], route: '/pages/sports-organization' },
  ],
  quickAction: { label: 'Create user account', route: '/pages/user', icon: 'users' },
  insight: 'Platform adoption increased this month. Completing the three pending staff accounts will bring access setup to 100%.',
};

const doctorDashboard: DashboardConfig = {
  title: 'Medical Dashboard', eyebrow: 'PLAYER HEALTH & RETURN TO PLAY',
  description: 'Four players require medical action today, including one return-to-play decision.',
  contextLabel: 'Medical scope', contextValue: 'Future Stars Academy',
  kpis: [
    { label: 'New injuries', value: '2', detail: 'Reported in last 7 days', trend: '1 needs examination', tone: 'danger', icon: 'medical', route: '/pages/player-injury' },
    { label: 'Active rehabilitation', value: '6', detail: '2 near completion', trend: '83% on schedule', tone: 'info', icon: 'activity', route: '/pages/rehabilitation-plan' },
    { label: 'Medical reviews', value: '4', detail: 'Due today', trend: 'Next at 11:30', tone: 'warning', icon: 'calendar', route: '/pages/player-wellness' },
    { label: 'Return to play', value: '1', detail: 'Awaiting clearance', trend: 'Expected today', tone: 'positive', icon: 'check', route: '/pages/player-injury' },
  ],
  trendTitle: 'Rehabilitation progress', trendValue: '74%', trendChange: '+9 points this month',
  trendPoints: '8,140 54,136 100,120 146,125 192,100 238,93 284,82 330,71 376,66 422,44 468,49 514,25',
  attentionTitle: 'Medical queue',
  attention: [
    { title: 'Youssef Mostafa', detail: 'Pain increased from 3 to 7', meta: 'High · Review now', tone: 'danger', icon: 'medical', route: '/pages/player-injury' },
    { title: 'Ahmed Fathy', detail: 'Return-to-play assessment due', meta: 'Due today', tone: 'warning', icon: 'check', route: '/pages/rehabilitation-plan' },
    { title: 'Mazen Ali', detail: 'Rehab session result missing', meta: 'Overdue by 1 day', tone: 'neutral', icon: 'tasks', route: '/pages/rehabilitation-session' },
    { title: 'Omar Hassan', detail: 'Fatigue score increased overnight', meta: 'Review before training', tone: 'warning', icon: 'heart', route: '/pages/player-wellness' },
    { title: 'Weekly medical report', detail: 'Two case notes are incomplete', meta: 'Due at 17:00', tone: 'info', icon: 'chart', route: '/pages/player-injury' },
  ],
  scheduleTitle: 'Today’s reviews',
  schedule: [
    { title: 'Hamstring review', detail: 'Youssef Mostafa', meta: '11:30 · Treatment room', tone: 'danger', icon: 'medical', route: '/pages/player-injury' },
    { title: 'Rehabilitation session', detail: 'Ahmed Fathy', meta: '13:00 · Rehab gym', tone: 'info', icon: 'activity', route: '/pages/rehabilitation-session' },
    { title: 'Return-to-play test', detail: 'Karim Nabil', meta: '16:00 · Field 2', tone: 'positive', icon: 'check', route: '/pages/rehabilitation-plan' },
    { title: 'Wellness review', detail: 'U21 flagged players', meta: '17:30 · Medical office', tone: 'warning', icon: 'heart', route: '/pages/player-wellness' },
    { title: 'Medical staff handover', detail: 'Open cases and restrictions', meta: '18:15 · 20 min', tone: 'neutral', icon: 'users', route: '/pages/sports-staff' },
  ],
  tableTitle: 'Active cases', tableDescription: 'Current medical status and rehabilitation progress.',
  columns: ['Case', 'Rehab', 'Availability'],
  rows: [
    { initials: 'YM', name: 'Youssef Mostafa', subtitle: 'Hamstring · Moderate', values: [{ text: 'Day 4' }, { text: '20%', tone: 'warning' }, { text: 'Unavailable', tone: 'danger' }], route: '/pages/player-injury' },
    { initials: 'AF', name: 'Ahmed Fathy', subtitle: 'Ankle · Mild', values: [{ text: 'Day 12' }, { text: '82%', tone: 'positive' }, { text: 'Modified', tone: 'warning' }], route: '/pages/rehabilitation-plan' },
    { initials: 'KN', name: 'Karim Nabil', subtitle: 'Knee · Recovery', values: [{ text: 'Day 21' }, { text: '96%', tone: 'positive' }, { text: 'Review', tone: 'info' }], route: '/pages/rehabilitation-plan' },
    { initials: 'OA', name: 'Omar Adel', subtitle: 'Groin · Mild', values: [{ text: 'Day 6' }, { text: '58%', tone: 'warning' }, { text: 'Modified', tone: 'warning' }], route: '/pages/rehabilitation-plan' },
    { initials: 'MK', name: 'Mostafa Kamal', subtitle: 'Shoulder · Recovery', values: [{ text: 'Day 15' }, { text: '88%', tone: 'positive' }, { text: 'Modified', tone: 'info' }], route: '/pages/rehabilitation-plan' },
  ],
  quickAction: { label: 'Report new injury', route: '/pages/player-injury', icon: 'medical' },
  insight: 'Pain has increased for one active case. Keep the player unavailable until the scheduled review is completed.',
};

const playerDashboard: DashboardConfig = {
  title: 'My Dashboard', eyebrow: 'MY PERFORMANCE',
  description: 'You are ready for today’s training. Complete your wellness check-in before 16:00.',
  contextLabel: 'Current team', contextValue: 'Future Stars U21',
  kpis: [
    { label: 'Overall score', value: '84', detail: 'Season performance', trend: '+3 since last review', tone: 'positive', icon: 'trophy', route: '/pages/player-evaluation' },
    { label: 'Readiness', value: '88%', detail: 'Ready to train', trend: '+6% from yesterday', tone: 'positive', icon: 'activity', route: '/pages/player-wellness' },
    { label: 'Attendance', value: '94%', detail: 'Current month', trend: '17 of 18 sessions', tone: 'positive', icon: 'check', route: '/pages/training-attendance' },
    { label: 'My tasks', value: '3', detail: '1 due today', trend: '8 completed this month', tone: 'warning', icon: 'tasks', route: '/pages/player-task' },
  ],
  trendTitle: 'My performance trend', trendValue: '84', trendChange: '+8 points this season',
  trendPoints: '8,132 54,128 100,108 146,114 192,97 238,83 284,87 330,65 376,70 422,48 468,51 514,28',
  attentionTitle: 'My actions',
  attention: [
    { title: 'Daily wellness check-in', detail: 'Share sleep, fatigue and readiness', meta: 'Due before 16:00', tone: 'warning', icon: 'heart', route: '/pages/player-wellness' },
    { title: 'Finishing practice', detail: 'Complete 30 target repetitions', meta: 'Due today', tone: 'info', icon: 'tasks', route: '/pages/player-task' },
    { title: 'Coach feedback available', detail: 'Your latest evaluation was published', meta: 'New', tone: 'positive', icon: 'chart', route: '/pages/player-evaluation' },
    { title: 'Match preparation video', detail: 'Review opponent defensive shape', meta: '12 minutes', tone: 'info', icon: 'video', route: '/pages/sports-video' },
    { title: 'Hydration target', detail: 'Complete 2.5 litres before training', meta: '1.4 litres logged', tone: 'warning', icon: 'activity', route: '/pages/player-wellness' },
  ],
  scheduleTitle: 'My day',
  schedule: [
    { title: 'Mobility routine', detail: 'Personal task · 15 minutes', meta: '09:00', tone: 'info', icon: 'activity', route: '/pages/player-task' },
    { title: 'Tactical session', detail: 'Training ground A', meta: '17:00 · 90 min', tone: 'positive', icon: 'calendar', route: '/pages/training-session' },
    { title: 'Recovery check', detail: 'Submit post-training wellness', meta: 'After training', tone: 'warning', icon: 'heart', route: '/pages/player-wellness' },
    { title: 'Video assignment', detail: 'Review 8 attacking clips', meta: '20:00 · 20 min', tone: 'info', icon: 'video', route: '/pages/sports-video' },
    { title: 'Tomorrow’s gym session', detail: 'Strength block B', meta: 'Tomorrow · 10:30', tone: 'neutral', icon: 'activity', route: '/pages/training-session' },
  ],
  tableTitle: 'Recent development', tableDescription: 'Your latest coach assessment by performance area.',
  columns: ['Previous', 'Current', 'Trend'],
  rows: [
    { initials: 'TE', name: 'Technical', subtitle: 'Ball control and execution', values: [{ text: '78' }, { text: '84' }, { text: '+6', tone: 'positive' }], route: '/pages/player-evaluation' },
    { initials: 'PH', name: 'Physical', subtitle: 'Speed, strength and fitness', values: [{ text: '82' }, { text: '86' }, { text: '+4', tone: 'positive' }], route: '/pages/player-evaluation' },
    { initials: 'TA', name: 'Tactical', subtitle: 'Decisions and positioning', values: [{ text: '80' }, { text: '81' }, { text: '+1', tone: 'info' }], route: '/pages/player-evaluation' },
    { initials: 'ME', name: 'Mental', subtitle: 'Focus, confidence and resilience', values: [{ text: '76' }, { text: '82' }, { text: '+6', tone: 'positive' }], route: '/pages/player-evaluation' },
    { initials: 'TW', name: 'Teamwork', subtitle: 'Communication and support', values: [{ text: '85' }, { text: '87' }, { text: '+2', tone: 'positive' }], route: '/pages/player-evaluation' },
  ],
  quickAction: { label: 'Complete wellness check-in', route: '/pages/player-wellness', icon: 'heart' },
  insight: 'Your strongest improvement is technical execution. Keep your current training rhythm and focus next on tactical decisions.',
};

const parentDashboard: DashboardConfig = {
  title: 'Parent Dashboard', eyebrow: 'MY CHILDREN',
  description: 'Omar has one training session today and no urgent actions.',
  contextLabel: 'Selected child', contextValue: 'Omar Hassan',
  kpis: [
    { label: 'Next activity', value: '17:00', detail: 'Tactical training today', trend: 'Training ground A', tone: 'info', icon: 'calendar', route: '/pages/training-session' },
    { label: 'Attendance', value: '94%', detail: 'Current month', trend: 'Excellent consistency', tone: 'positive', icon: 'check', route: '/pages/training-attendance' },
    { label: 'Development', value: 'Improving', detail: 'Latest coach review', trend: '+3 points this month', tone: 'positive', icon: 'chart', route: '/pages/player-evaluation' },
    { label: 'Health status', value: 'Available', detail: 'Full participation', trend: 'No action needed', tone: 'positive', icon: 'heart', route: '/pages/player-injury' },
  ],
  trendTitle: 'Development trend', trendValue: 'Improving', trendChange: 'Steady progress over 3 months',
  trendPoints: '8,126 54,120 100,112 146,117 192,96 238,89 284,78 330,82 376,59 422,52 468,43 514,31',
  attentionTitle: 'Updates',
  attention: [
    { title: 'Coach feedback published', detail: 'Positive progress in finishing', meta: 'New · Today', tone: 'positive', icon: 'chart', route: '/pages/player-evaluation' },
    { title: 'Saturday match confirmed', detail: 'Arrival requested by 14:15', meta: 'Schedule update', tone: 'info', icon: 'trophy', route: '/pages/sports-match' },
    { title: 'Monthly attendance summary', detail: '17 of 18 sessions attended', meta: 'Available now', tone: 'neutral', icon: 'check', route: '/pages/training-attendance' },
    { title: 'New training video', detail: 'Coach shared finishing highlights', meta: 'Added today', tone: 'info', icon: 'video', route: '/pages/sports-video' },
    { title: 'Wellness streak', detail: 'Seven check-ins completed on time', meta: 'Great consistency', tone: 'positive', icon: 'heart', route: '/pages/player-wellness' },
  ],
  scheduleTitle: 'Upcoming',
  schedule: [
    { title: 'Tactical training', detail: 'Training ground A', meta: 'Today · 17:00', tone: 'positive', icon: 'calendar', route: '/pages/training-session' },
    { title: 'Future Stars vs Nile U21', detail: 'Academy stadium', meta: 'Saturday · 15:00', tone: 'info', icon: 'trophy', route: '/pages/sports-match' },
    { title: 'Coach review', detail: 'Monthly development update', meta: 'Monday · 18:30', tone: 'neutral', icon: 'users', route: '/pages/player-evaluation' },
    { title: 'Recovery session', detail: 'Mobility and stretching', meta: 'Tuesday · 16:00', tone: 'info', icon: 'activity', route: '/pages/training-session' },
    { title: 'Academy workshop', detail: 'Nutrition for young athletes', meta: 'Thursday · 19:00', tone: 'positive', icon: 'calendar', route: '/pages/sports-notification' },
  ],
  tableTitle: 'Development summary', tableDescription: 'A simple view of the latest published coach assessment.',
  columns: ['Last month', 'Now', 'Progress'],
  rows: [
    { initials: 'SK', name: 'Technical skills', subtitle: 'Ball control and finishing', values: [{ text: 'Good' }, { text: 'Very good' }, { text: 'Improving', tone: 'positive' }], route: '/pages/player-evaluation' },
    { initials: 'FT', name: 'Fitness', subtitle: 'Movement and endurance', values: [{ text: 'Good' }, { text: 'Good' }, { text: 'Stable', tone: 'info' }], route: '/pages/player-evaluation' },
    { initials: 'TM', name: 'Teamwork', subtitle: 'Communication and decisions', values: [{ text: 'Good' }, { text: 'Very good' }, { text: 'Improving', tone: 'positive' }], route: '/pages/player-evaluation' },
    { initials: 'AT', name: 'Attendance habits', subtitle: 'Punctuality and participation', values: [{ text: 'Very good' }, { text: 'Excellent' }, { text: 'Improving', tone: 'positive' }], route: '/pages/training-attendance' },
    { initials: 'WB', name: 'Wellbeing', subtitle: 'Readiness and recovery habits', values: [{ text: 'Good' }, { text: 'Good' }, { text: 'Stable', tone: 'info' }], route: '/pages/player-wellness' },
  ],
  quickAction: { label: 'View full schedule', route: '/pages/training-session', icon: 'calendar' },
  insight: 'Omar is progressing consistently and is fully available. The next important event is Saturday’s match.',
};

const organizationAdminDashboard: DashboardConfig = {
  ...adminDashboard,
  title: 'Organization Dashboard',
  eyebrow: 'ORGANIZATION OPERATIONS',
  description: 'Manage organization teams, staff access, player records and operational quality.',
  kpis: [
    { ...adminDashboard.kpis[0], label: 'Registered players' },
    { ...adminDashboard.kpis[1], label: 'Organization teams' },
    { ...adminDashboard.kpis[2], label: 'Active staff' },
    { ...adminDashboard.kpis[3], label: 'Profile completion' },
  ],
  attentionTitle: 'Organization attention',
  quickAction: { label: 'Create organization user', route: '/pages/user', icon: 'users' },
  insight: 'Player registrations and team activity are growing. Complete staff access reviews to keep every team operational.',
};

const clubAdminDashboard: DashboardConfig = {
  ...adminDashboard,
  title: 'Club Dashboard',
  eyebrow: 'CLUB OPERATIONS',
  description: 'Track club squads, coaching staff, registrations and day-to-day operations.',
  kpis: [
    { ...adminDashboard.kpis[0], label: 'Club players' },
    { ...adminDashboard.kpis[1], label: 'Club teams' },
    { ...adminDashboard.kpis[2], label: 'Coaching staff' },
    { ...adminDashboard.kpis[3], label: 'Roster completion' },
  ],
  attentionTitle: 'Club attention',
  quickAction: { label: 'Create club team', route: '/pages/sports-team', icon: 'team' },
  insight: 'Most squads are fully operational. Finishing the remaining roster and staff records will improve club reporting.',
};

const teamManagerDashboard: DashboardConfig = {
  ...coachDashboard,
  title: 'Team Manager Dashboard',
  eyebrow: 'TEAM LOGISTICS & SCHEDULE',
  description: 'Coordinate the squad, attendance, training schedule and match-day preparation.',
  kpis: [
    { label: 'Squad size', value: '22', detail: '20 registered · 2 pending', trend: '2 new this month', tone: 'info', icon: 'users', route: '/pages/sports-player-team' },
    { label: 'Sessions this week', value: '6', detail: '4 completed · 2 upcoming', trend: 'Next today at 17:00', tone: 'positive', icon: 'calendar', route: '/pages/training-session' },
    { label: 'Attendance', value: '91%', detail: 'Current month', trend: '+2% vs last month', tone: 'positive', icon: 'check', route: '/pages/training-attendance' },
    { label: 'Match readiness', value: '86%', detail: 'Saturday squad preparation', trend: '2 actions remaining', tone: 'warning', icon: 'trophy', route: '/pages/sports-match' },
  ],
  attentionTitle: 'Team administration',
  attention: [
    { title: 'Two registrations pending', detail: 'Player documents need approval', meta: 'Due today', tone: 'warning', icon: 'users', route: '/pages/sports-player-team' },
    { title: 'Saturday travel list', detail: 'Confirm 20-player match squad', meta: '18 of 20 confirmed', tone: 'info', icon: 'trophy', route: '/pages/sports-match' },
    { title: 'Attendance correction', detail: 'One Tuesday record is incomplete', meta: 'Review requested', tone: 'neutral', icon: 'check', route: '/pages/training-attendance' },
    { title: 'Equipment request', detail: 'Training cones and GPS vests', meta: 'Waiting for approval', tone: 'warning', icon: 'tasks', route: '/pages/player-task' },
    { title: 'Parent notification', detail: 'Match arrival time update', meta: 'Send before 18:00', tone: 'danger', icon: 'bell', route: '/pages/sports-notification' },
  ],
  scheduleTitle: 'Team schedule',
  tableTitle: 'Squad administration',
  tableDescription: 'Registration, attendance and availability across the active squad.',
  columns: ['Readiness', 'Attendance', 'Availability'],
  rows: playerRows,
  quickAction: { label: 'Create team session', route: '/pages/training-session', icon: 'calendar' },
  insight: 'The team is operationally ready. Confirm the final travel list and resolve the two registration records before Saturday.',
};

const fitnessCoachDashboard: DashboardConfig = {
  ...coachDashboard,
  title: 'Fitness Coach Dashboard',
  eyebrow: 'PHYSICAL PERFORMANCE & LOAD',
  description: 'Monitor player readiness, training load, testing results and recovery balance.',
  kpis: [
    { label: 'Average readiness', value: '81%', detail: '18 players checked in', trend: '+3% from yesterday', tone: 'positive', icon: 'heart', route: '/pages/player-wellness' },
    { label: 'Training load', value: '428', detail: 'Average AU this week', trend: 'Within target range', tone: 'positive', icon: 'activity', route: '/pages/player-measurement' },
    { label: 'Tests completed', value: '16', detail: 'Speed and power tests', trend: '4 results added today', tone: 'info', icon: 'chart', route: '/pages/player-test-result' },
    { label: 'Recovery alerts', value: '4', detail: '3 fatigue · 1 soreness', trend: 'Review before training', tone: 'warning', icon: 'bell', route: '/pages/player-wellness' },
  ],
  trendTitle: 'Physical readiness trend',
  trendValue: '81%',
  attentionTitle: 'Load and recovery alerts',
  attention: [
    { title: 'Ali Khaled', detail: 'Acute load is 18% above target', meta: 'High · Review now', tone: 'danger', icon: 'activity', route: '/pages/player-measurement' },
    { title: 'Mazen Fathy', detail: 'Sleep quality below baseline', meta: 'Two consecutive days', tone: 'warning', icon: 'heart', route: '/pages/player-wellness' },
    { title: 'Youssef Mostafa', detail: 'Sprint test requires retest', meta: 'Result variance 9%', tone: 'info', icon: 'chart', route: '/pages/player-test-result' },
    { title: 'Three missing check-ins', detail: 'Readiness data not submitted', meta: 'Due before 16:00', tone: 'neutral', icon: 'tasks', route: '/pages/player-wellness' },
    { title: 'Recovery group update', detail: 'Add one player to modified work', meta: 'Coach approval needed', tone: 'warning', icon: 'users', route: '/pages/training-session' },
  ],
  scheduleTitle: 'Performance schedule',
  schedule: [
    { title: 'Speed testing', detail: 'U21 wide players', meta: '10:00 · Indoor track', tone: 'info', icon: 'chart', route: '/pages/player-test-result' },
    { title: 'Gym monitoring', detail: 'Strength block B', meta: '12:30 · Performance gym', tone: 'positive', icon: 'activity', route: '/pages/training-session' },
    { title: 'Readiness review', detail: 'Full U21 squad', meta: '15:45 · 20 min', tone: 'warning', icon: 'heart', route: '/pages/player-wellness' },
    { title: 'Pitch load session', detail: 'High-speed exposure', meta: '17:00 · Field 1', tone: 'positive', icon: 'activity', route: '/pages/training-session' },
    { title: 'Data sync', detail: 'GPS and testing results', meta: '19:00 · Performance office', tone: 'neutral', icon: 'chart', route: '/pages/player-measurement' },
  ],
  tableTitle: 'Player physical status',
  tableDescription: 'Readiness, attendance and current availability for the squad.',
  quickAction: { label: 'Record player measurement', route: '/pages/player-measurement', icon: 'activity' },
  insight: 'Overall readiness is positive, but two players have elevated load combined with poor recovery. Modify their training dose today.',
};

const physiotherapistDashboard: DashboardConfig = {
  ...doctorDashboard,
  title: 'Physiotherapy Dashboard',
  eyebrow: 'REHABILITATION & RECOVERY',
  description: 'Manage treatment sessions, rehabilitation milestones and safe return-to-training progress.',
  kpis: [
    { label: 'Treatment queue', value: '7', detail: 'Five scheduled today', trend: 'Next at 10:30', tone: 'warning', icon: 'medical', route: '/pages/rehabilitation-session' },
    { label: 'Active plans', value: '6', detail: 'Four progressing on target', trend: '83% on schedule', tone: 'positive', icon: 'activity', route: '/pages/rehabilitation-plan' },
    { label: 'Milestones due', value: '3', detail: 'Strength and running targets', trend: 'One overdue', tone: 'danger', icon: 'tasks', route: '/pages/rehabilitation-plan' },
    { label: 'Return to training', value: '2', detail: 'Modified participation', trend: 'Review this week', tone: 'info', icon: 'check', route: '/pages/player-injury' },
  ],
  trendTitle: 'Rehabilitation completion trend',
  attentionTitle: 'Rehabilitation priorities',
  scheduleTitle: 'Treatment schedule',
  quickAction: { label: 'Add treatment session', route: '/pages/rehabilitation-session', icon: 'activity' },
  insight: 'Four rehabilitation plans are progressing on time. Prioritize the overdue strength milestone before increasing field exposure.',
};

const analystDashboard: DashboardConfig = {
  ...adminDashboard,
  title: 'Data & Analytics Dashboard',
  eyebrow: 'PERFORMANCE & DATA QUALITY',
  description: 'Monitor data completeness, reporting coverage and performance signals across every dataset.',
  contextLabel: 'Dataset', contextValue: 'All performance data',
  kpis: [
    { label: 'Records analyzed', value: '18,420', detail: 'Across 12 connected datasets', trend: '+1,284 this month', tone: 'positive', icon: 'chart', route: '/pages/player-evaluation' },
    { label: 'Data completeness', value: '93%', detail: 'Core fields populated', trend: '+5% this month', tone: 'positive', icon: 'check', route: '/pages/sports-player' },
    { label: 'Quality alerts', value: '27', detail: '18 warning · 9 critical', trend: '11 resolved this week', tone: 'warning', icon: 'bell', route: '/pages/sports-notification' },
    { label: 'Freshness', value: '96%', detail: 'Sources updated on time', trend: 'Last refresh 8 min ago', tone: 'info', icon: 'activity', route: '/pages/training-attendance' },
  ],
  trendTitle: 'Data volume trend',
  trendValue: '18,420',
  attentionTitle: 'Data quality queue',
  attention: [
    { title: '18 missing player positions', detail: 'Roster dataset requires cleanup', meta: 'High impact', tone: 'danger', icon: 'users', route: '/pages/sports-player' },
    { title: 'Attendance import variance', detail: 'U16 source differs by 12 records', meta: 'Detected today', tone: 'warning', icon: 'check', route: '/pages/training-attendance' },
    { title: 'Wellness response gap', detail: 'Three teams below 80% coverage', meta: 'Last 7 days', tone: 'warning', icon: 'heart', route: '/pages/player-wellness' },
    { title: 'Evaluation outliers', detail: 'Seven scores require validation', meta: 'Review model rules', tone: 'info', icon: 'chart', route: '/pages/player-evaluation' },
    { title: 'Monthly export ready', detail: 'Organization KPI package generated', meta: 'Updated 12 min ago', tone: 'positive', icon: 'tasks', route: '/pages/sports-organization' },
  ],
  scheduleTitle: 'Analytics activity',
  schedule: [
    { title: 'Daily source refresh', detail: '12 datasets processed', meta: '08:00 · Complete', tone: 'positive', icon: 'check', route: '/pages/sports-organization' },
    { title: 'Quality rules scan', detail: '27 issues identified', meta: '09:15 · Complete', tone: 'warning', icon: 'chart', route: '/pages/sports-notification' },
    { title: 'Performance report', detail: 'U21 monthly analysis', meta: '11:30 · Generated', tone: 'info', icon: 'chart', route: '/pages/player-evaluation' },
    { title: 'Medical data review', detail: 'Availability and rehab records', meta: '14:00 · Scheduled', tone: 'neutral', icon: 'medical', route: '/pages/player-injury' },
    { title: 'Leadership dashboard', detail: 'Weekly KPI publication', meta: '17:00 · Scheduled', tone: 'positive', icon: 'users', route: '/pages/sports-organization' },
  ],
  tableTitle: 'Dataset health',
  tableDescription: 'Coverage, freshness and quality status across major reporting areas.',
  columns: ['Records', 'Complete', 'Status'],
  rows: [
    { initials: 'PL', name: 'Player profiles', subtitle: 'Identity and registration records', values: [{ text: '4,280' }, { text: '96%' }, { text: 'Healthy', tone: 'positive' }], route: '/pages/sports-player' },
    { initials: 'AT', name: 'Attendance', subtitle: 'Training participation records', values: [{ text: '8,642' }, { text: '92%' }, { text: 'Review', tone: 'warning' }], route: '/pages/training-attendance' },
    { initials: 'WL', name: 'Wellness', subtitle: 'Daily readiness responses', values: [{ text: '3,904' }, { text: '88%' }, { text: 'Review', tone: 'warning' }], route: '/pages/player-wellness' },
    { initials: 'EV', name: 'Evaluations', subtitle: 'Coach and scout assessments', values: [{ text: '1,126' }, { text: '98%' }, { text: 'Healthy', tone: 'positive' }], route: '/pages/player-evaluation' },
    { initials: 'MD', name: 'Medical records', subtitle: 'Injury and rehabilitation data', values: [{ text: '468' }, { text: '95%' }, { text: 'Healthy', tone: 'positive' }], route: '/pages/player-injury' },
  ],
  quickAction: { label: 'Open evaluations', route: '/pages/player-evaluation', icon: 'chart' },
  insight: 'Data coverage is strong overall. Attendance variance and wellness response gaps are the two highest-impact issues for this reporting cycle.',
};

const scoutDashboard: DashboardConfig = {
  ...coachDashboard,
  title: 'Scouting Dashboard',
  eyebrow: 'PLAYER DISCOVERY',
  description: 'Review prospects, compare evaluations, organize shortlists and analyze player video.',
  contextLabel: 'Scouting list', contextValue: 'U21 prospects',
  kpis: [
    { label: 'Active prospects', value: '42', detail: 'Across 8 competitions', trend: '+6 this month', tone: 'positive', icon: 'users', route: '/pages/sports-player' },
    { label: 'Evaluations', value: '18', detail: 'Completed this month', trend: '5 awaiting review', tone: 'info', icon: 'chart', route: '/pages/player-evaluation' },
    { label: 'Shortlisted', value: '13', detail: 'Five high priority', trend: '3 updated this week', tone: 'warning', icon: 'tasks', route: '/pages/sports-player' },
    { label: 'Video coverage', value: '78%', detail: '33 prospects with footage', trend: '+12 clips this week', tone: 'positive', icon: 'video', route: '/pages/sports-video' },
  ],
  trendTitle: 'Prospect activity',
  trendValue: '42',
  attentionTitle: 'Scouting priorities',
  attention: [
    { title: 'Adam Nasser', detail: 'High-potential winger needs live review', meta: 'Priority · This week', tone: 'danger', icon: 'users', route: '/pages/sports-player' },
    { title: 'Five evaluations pending', detail: 'Reports submitted by regional scouts', meta: 'Review by Friday', tone: 'warning', icon: 'chart', route: '/pages/player-evaluation' },
    { title: 'Video coverage missing', detail: 'Four shortlisted players lack footage', meta: 'Request clips', tone: 'warning', icon: 'video', route: '/pages/sports-video' },
    { title: 'Duplicate prospect profiles', detail: 'Two records may refer to one player', meta: 'Data review', tone: 'neutral', icon: 'users', route: '/pages/sports-player' },
    { title: 'Shortlist meeting ready', detail: 'Comparison report generated', meta: 'Today · 16:00', tone: 'positive', icon: 'tasks', route: '/pages/player-evaluation' },
  ],
  scheduleTitle: 'Scouting schedule',
  schedule: [
    { title: 'U18 academy match', detail: 'Future Stars vs Olympic Academy', meta: 'Today · 15:00', tone: 'info', icon: 'trophy', route: '/pages/sports-match' },
    { title: 'Video review block', detail: 'Six winger prospects', meta: 'Today · 18:30', tone: 'positive', icon: 'video', route: '/pages/sports-video' },
    { title: 'Shortlist meeting', detail: 'Recruitment committee', meta: 'Tomorrow · 11:00', tone: 'warning', icon: 'users', route: '/pages/player-evaluation' },
    { title: 'Regional tournament', detail: 'Cairo U21 championship', meta: 'Saturday · 12:00', tone: 'info', icon: 'calendar', route: '/pages/sports-match' },
    { title: 'Evaluation deadline', detail: 'Complete five prospect reports', meta: 'Sunday · 20:00', tone: 'danger', icon: 'chart', route: '/pages/player-evaluation' },
  ],
  tableTitle: 'Top prospects',
  tableDescription: 'Latest scout scores, video coverage and shortlist status.',
  columns: ['Score', 'Videos', 'Status'],
  rows: [
    { initials: 'AN', name: 'Adam Nasser', subtitle: 'Winger · 19 · Cairo United', values: [{ text: '91' }, { text: '8' }, { text: 'Priority', tone: 'positive' }], route: '/pages/sports-player' },
    { initials: 'YS', name: 'Yassin Salah', subtitle: 'Midfielder · 20 · Nile FC', values: [{ text: '88' }, { text: '5' }, { text: 'Shortlist', tone: 'info' }], route: '/pages/sports-player' },
    { initials: 'MK', name: 'Mostafa Kamal', subtitle: 'Defender · 18 · Olympic Academy', values: [{ text: '86' }, { text: '6' }, { text: 'Shortlist', tone: 'info' }], route: '/pages/sports-player' },
    { initials: 'HA', name: 'Hassan Adel', subtitle: 'Forward · 19 · Delta Stars', values: [{ text: '84' }, { text: '3' }, { text: 'Monitor', tone: 'warning' }], route: '/pages/sports-player' },
    { initials: 'ON', name: 'Omar Nabil', subtitle: 'Goalkeeper · 20 · Alexandria SC', values: [{ text: '82' }, { text: '4' }, { text: 'Monitor', tone: 'warning' }], route: '/pages/sports-player' },
  ],
  quickAction: { label: 'Create evaluation', route: '/pages/player-evaluation', icon: 'chart' },
  insight: 'Three prospects combine strong recent scores with complete video coverage. Adam Nasser should be prioritized for a live review.',
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, AppHeaderComponent, SidebarComponent, AppIconComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  sidebarCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
  selectedPeriod: DashboardPeriod = '30D';
  selectedChartMetric = 'primary';
  contextOpen = false;
  quickActionsOpen = false;
  selectedContext = '';
  readonly periods: DashboardPeriod[] = ['7D', '30D', '90D'];

  constructor(
    public auth: AuthService,
    public dataMode: DataModeService,
    public language: LanguageService,
    private store: LocalEntityStoreService
  ) {}

  get config(): DashboardConfig {
    const base = this.configForRole(this.auth.currentUser.role);
    return this.isOrganizationDashboard
      ? this.organizationDashboard(base, this.selectedContext || base.contextValue)
      : base;
  }

  get currentContext(): string {
    const base = this.configForRole(this.auth.currentUser.role);
    return this.selectedContext || base.contextValue;
  }

  get chartMetrics(): DashboardChartMetric[] {
    const role = this.auth.currentUser.role;
    const config = this.config;
    const kpiValue = (index: number, fallback: number) => this.numericValue(config.kpis[index]?.value, fallback);

    if (role === 'DataAnalyst') {
      return [
        { id: 'primary', label: 'Volume', title: config.trendTitle, baseValue: 18420, format: 'number', periodScale: true },
        { id: 'secondary', label: 'Coverage', title: 'Data coverage trend', baseValue: 93, format: 'percent' },
        { id: 'quality', label: 'Quality', title: 'Quality resolution trend', baseValue: 88, format: 'percent' },
      ];
    }
    if (['SuperAdmin', 'OrganizationAdmin', 'ClubAdmin'].includes(role)) {
      return [
        { id: 'primary', label: 'Activity', title: config.trendTitle, baseValue: this.numericValue(config.trendValue, 1284), format: 'number', periodScale: true },
        { id: 'secondary', label: 'Players', title: 'Active player growth', baseValue: kpiValue(0, 248), format: 'number' },
        { id: 'quality', label: 'Completion', title: 'Data completion trend', baseValue: kpiValue(3, 93), format: 'percent' },
      ];
    }
    if (['Doctor', 'Physiotherapist'].includes(role)) {
      return [
        { id: 'primary', label: 'Recovery', title: config.trendTitle, baseValue: this.numericValue(config.trendValue, 74), format: 'percent' },
        { id: 'secondary', label: 'Cases', title: 'Active medical cases', baseValue: 9, format: 'number', periodScale: true },
        { id: 'quality', label: 'Clearance', title: 'Return-to-play clearance', baseValue: 82, format: 'percent' },
      ];
    }
    if (role === 'Player') {
      return [
        { id: 'primary', label: 'Performance', title: config.trendTitle, baseValue: this.numericValue(config.trendValue, 84), format: 'score' },
        { id: 'secondary', label: 'Readiness', title: 'Readiness trend', baseValue: kpiValue(1, 88), format: 'percent' },
        { id: 'quality', label: 'Attendance', title: 'Attendance trend', baseValue: kpiValue(2, 94), format: 'percent' },
      ];
    }
    if (role === 'Parent') {
      return [
        { id: 'primary', label: 'Development', title: config.trendTitle, baseValue: 84, format: 'score' },
        { id: 'secondary', label: 'Attendance', title: 'Attendance trend', baseValue: kpiValue(1, 94), format: 'percent' },
        { id: 'quality', label: 'Availability', title: 'Training availability', baseValue: 96, format: 'percent' },
      ];
    }
    if (role === 'Scout') {
      return [
        { id: 'primary', label: 'Prospects', title: 'Prospect activity', baseValue: 42, format: 'number', periodScale: true },
        { id: 'secondary', label: 'Evaluations', title: 'Completed evaluations', baseValue: 18, format: 'number', periodScale: true },
        { id: 'quality', label: 'Coverage', title: 'Scouting coverage', baseValue: 78, format: 'percent' },
      ];
    }
    if (role === 'FitnessCoach') {
      return [
        { id: 'primary', label: 'Readiness', title: config.trendTitle, baseValue: 81, format: 'percent' },
        { id: 'secondary', label: 'Load', title: 'Training load trend', baseValue: 428, format: 'number' },
        { id: 'quality', label: 'Testing', title: 'Testing completion trend', baseValue: 86, format: 'percent' },
      ];
    }
    if (role === 'TeamManager') {
      return [
        { id: 'primary', label: 'Attendance', title: 'Team attendance trend', baseValue: 91, format: 'percent' },
        { id: 'secondary', label: 'Sessions', title: 'Completed session activity', baseValue: 24, format: 'number', periodScale: true },
        { id: 'quality', label: 'Readiness', title: 'Match readiness trend', baseValue: 86, format: 'percent' },
      ];
    }
    return [
      { id: 'primary', label: 'Readiness', title: config.trendTitle, baseValue: this.numericValue(config.trendValue, 82), format: 'percent' },
      { id: 'secondary', label: 'Attendance', title: 'Team attendance trend', baseValue: kpiValue(2, 91), format: 'percent' },
      { id: 'quality', label: 'Training load', title: 'Training load balance', baseValue: 76, format: 'percent' },
    ];
  }

  get trendView(): DashboardTrendView {
    const metricIndex = Math.max(0, this.chartMetrics.findIndex((item) => item.id === this.selectedChartMetric));
    const metric = this.chartMetrics[metricIndex] || this.chartMetrics[0];
    const seed = this.chartSeed(metric.id);
    const value = this.metricPeriodValue(metric, seed);
    const points = this.periodTrendPoints(seed, metricIndex);
    const [endX, endY] = points.split(' ').at(-1)!.split(',').map(Number);
    const change = metric.format === 'number'
      ? `+${3 + seed % 15}% over ${this.periodLabel}`
      : `+${2 + seed % 8} points over ${this.periodLabel}`;
    return {
      title: metric.title,
      value: this.formatMetricValue(value, metric.format),
      change,
      points,
      endX,
      endY,
      axisLabels: this.selectedPeriod === '7D'
        ? ['7 days ago', 'Mid-week', 'Today']
        : this.selectedPeriod === '30D'
          ? ['30 days ago', 'Mid-period', 'Today']
          : ['90 days ago', 'Mid-period', 'Today'],
    };
  }

  get operationsCharts(): DashboardOperationsCharts {
    const role = this.auth.currentUser.role;
    const seed = this.textSeed(`${role}-${this.currentContext}`);
    if (role === 'DataAnalyst') {
      return {
        title: 'Data operations', scope: this.currentContext,
        distribution: { title: 'Records by dataset', total: '18.4K', totalLabel: 'Records', slices: [
          { label: 'Attendance', value: 38, color: '#08743f' },
          { label: 'Wellness', value: 25, color: '#31ad70' },
          { label: 'Evaluations', value: 21, color: '#4189ee' },
          { label: 'Medical', value: 16, color: '#e79a26' },
        ] },
        breakdown: { title: 'Dataset completeness', bars: [
          { label: 'Players', value: 96, display: '96%' },
          { label: 'Attendance', value: 92, display: '92%' },
          { label: 'Wellness', value: 88, display: '88%' },
          { label: 'Evaluations', value: 98, display: '98%' },
        ] },
        status: { title: 'Quality issue status', items: [
          { label: 'Resolved', value: 31, detail: 'Closed this week', tone: 'positive' },
          { label: 'Warning', value: 18, detail: 'Needs validation', tone: 'warning' },
          { label: 'Critical', value: 9, detail: 'Blocks reporting', tone: 'danger' },
        ] },
      };
    }
    if (['SuperAdmin', 'OrganizationAdmin', 'ClubAdmin'].includes(role)) {
      const players = Math.max(1, this.numericValue(this.config.kpis[0]?.value, 248));
      const staff = Math.max(1, this.numericValue(this.config.kpis[2]?.value, 38));
      const senior = 32 + seed % 8;
      const under21 = 30 + (seed >> 2) % 8;
      const organizationCount = this.currentContext === 'All organizations' ? Math.max(1, this.organizationNames.length) : 1;
      const completion = this.numericValue(this.config.kpis[3]?.value, 93);
      const review = organizationCount === 1 ? (completion < 90 ? 1 : 0) : Math.min(1, organizationCount);
      const setup = organizationCount > 2 ? 1 : 0;
      return {
        title: 'Operations overview', scope: this.currentContext,
        distribution: {
          title: 'Players by age group', total: new Intl.NumberFormat('en').format(players), totalLabel: 'Players',
          slices: [
            { label: 'Senior', value: senior, color: '#08743f' },
            { label: 'U21', value: under21, color: '#31ad70' },
            { label: 'Academy', value: 100 - senior - under21, color: '#9bd6b5' },
          ],
        },
        breakdown: {
          title: 'Staff composition',
          bars: [
            { label: 'Coaches', value: 42, display: String(Math.round(staff * .42)) },
            { label: 'Medical', value: 24, display: String(Math.round(staff * .24)) },
            { label: 'Management', value: 19, display: String(Math.round(staff * .19)) },
            { label: 'Scouting', value: 15, display: String(Math.max(1, Math.round(staff * .15))) },
          ],
        },
        status: {
          title: 'Organization health',
          items: [
            { label: 'Healthy', value: Math.max(0, organizationCount - review - setup), detail: 'Operating normally', tone: 'positive' },
            { label: 'Review', value: review, detail: 'Needs attention', tone: 'warning' },
            { label: 'Setup', value: setup, detail: 'Onboarding', tone: 'info' },
          ],
        },
      };
    }
    if (['Doctor', 'Physiotherapist'].includes(role)) {
      return {
        title: 'Medical operations', scope: this.currentContext,
        distribution: { title: 'Cases by injury type', total: '9', totalLabel: 'Active cases', slices: [
          { label: 'Muscle', value: 44, color: '#df5959' }, { label: 'Joint', value: 33, color: '#e79a26' }, { label: 'Other', value: 23, color: '#8fb5e8' },
        ] },
        breakdown: { title: 'Rehabilitation stages', bars: [
          { label: 'Assessment', value: 28, display: '2' }, { label: 'Treatment', value: 56, display: '4' }, { label: 'Field rehab', value: 72, display: '2' }, { label: 'Clearance', value: 88, display: '1' },
        ] },
        status: { title: 'Player availability', items: [
          { label: 'Available', value: 18, detail: 'Full training', tone: 'positive' }, { label: 'Modified', value: 3, detail: 'Restricted load', tone: 'warning' }, { label: 'Unavailable', value: 1, detail: 'Medical hold', tone: 'danger' },
        ] },
      };
    }
    if (role === 'Scout') {
      return {
        title: 'Scouting overview', scope: this.currentContext,
        distribution: { title: 'Prospects by position', total: '42', totalLabel: 'Prospects', slices: [
          { label: 'Attack', value: 36, color: '#08743f' }, { label: 'Midfield', value: 38, color: '#4189ee' }, { label: 'Defence', value: 26, color: '#e79a26' },
        ] },
        breakdown: { title: 'Evaluation stages', bars: [
          { label: 'Identified', value: 86, display: '36' }, { label: 'Reviewed', value: 62, display: '26' }, { label: 'Shortlisted', value: 31, display: '13' }, { label: 'Approved', value: 12, display: '5' },
        ] },
        status: { title: 'Shortlist status', items: [
          { label: 'High priority', value: 5, detail: 'Ready for review', tone: 'positive' }, { label: 'Monitoring', value: 6, detail: 'More data needed', tone: 'info' }, { label: 'On hold', value: 2, detail: 'Awaiting video', tone: 'warning' },
        ] },
      };
    }
    if (role === 'FitnessCoach') {
      return {
        title: 'Physical performance overview', scope: this.currentContext,
        distribution: { title: 'Squad load zones', total: '22', totalLabel: 'Players', slices: [
          { label: 'Optimal', value: 64, color: '#08743f' },
          { label: 'Under target', value: 18, color: '#4189ee' },
          { label: 'Over target', value: 18, color: '#e79a26' },
        ] },
        breakdown: { title: 'Physical qualities', bars: [
          { label: 'Speed', value: 82, display: '82%' },
          { label: 'Power', value: 76, display: '76%' },
          { label: 'Endurance', value: 88, display: '88%' },
          { label: 'Mobility', value: 71, display: '71%' },
        ] },
        status: { title: 'Recovery status', items: [
          { label: 'Ready', value: 18, detail: 'Normal training', tone: 'positive' },
          { label: 'Monitor', value: 3, detail: 'Reduced load', tone: 'warning' },
          { label: 'Hold', value: 1, detail: 'Medical review', tone: 'danger' },
        ] },
      };
    }
    if (['Player', 'Parent'].includes(role)) {
      return {
        title: 'Development overview', scope: this.currentContext,
        distribution: { title: 'Development focus', total: '84', totalLabel: 'Overall score', slices: [
          { label: 'Technical', value: 38, color: '#08743f' }, { label: 'Physical', value: 34, color: '#4189ee' }, { label: 'Tactical', value: 28, color: '#e79a26' },
        ] },
        breakdown: { title: 'Weekly training mix', bars: [
          { label: 'Technical', value: 78, display: '3.5h' }, { label: 'Tactical', value: 61, display: '2.7h' }, { label: 'Physical', value: 52, display: '2.3h' }, { label: 'Recovery', value: 34, display: '1.5h' },
        ] },
        status: { title: 'Current status', items: [
          { label: 'Training', value: 4, detail: 'Sessions this week', tone: 'positive' }, { label: 'Tasks', value: 3, detail: 'One due today', tone: 'warning' }, { label: 'Reviews', value: 1, detail: 'Coach feedback', tone: 'info' },
        ] },
      };
    }
    return {
      title: 'Team operations', scope: this.currentContext,
      distribution: { title: 'Squad by position', total: '22', totalLabel: 'Players', slices: [
        { label: 'Attack', value: 27, color: '#08743f' }, { label: 'Midfield', value: 36, color: '#31ad70' }, { label: 'Defence', value: 37, color: '#8fb5e8' },
      ] },
      breakdown: { title: 'Training focus', bars: [
        { label: 'Technical', value: 82, display: '32%' }, { label: 'Tactical', value: 74, display: '29%' }, { label: 'Physical', value: 61, display: '24%' }, { label: 'Recovery', value: 38, display: '15%' },
      ] },
      status: { title: 'Squad availability', items: [
        { label: 'Available', value: 18, detail: 'Full participation', tone: 'positive' }, { label: 'Modified', value: 3, detail: 'Adjusted training', tone: 'warning' }, { label: 'Injured', value: 1, detail: 'Unavailable', tone: 'danger' },
      ] },
    };
  }

  get operationsDonutGradient(): string {
    let offset = 0;
    const stops = this.operationsCharts.distribution.slices.map((slice) => {
      const start = offset;
      offset += slice.value;
      return `${slice.color} ${start}% ${offset}%`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }

  get pulseScore(): number {
    const role = this.auth.currentUser.role;
    const value = role === 'DataAnalyst'
      ? this.numericValue(this.config.kpis[1]?.value, 93)
      : ['SuperAdmin', 'OrganizationAdmin', 'ClubAdmin'].includes(role)
        ? this.numericValue(this.config.kpis[3]?.value, 93)
        : ['Doctor', 'Physiotherapist'].includes(role)
          ? this.numericValue(this.config.trendValue, 74)
          : role === 'Parent'
            ? this.numericValue(this.config.trendValue, 84)
          : role === 'Scout'
            ? this.numericValue(this.config.kpis[3]?.value, 78)
            : role === 'TeamManager'
              ? this.numericValue(this.config.kpis[3]?.value, 86)
              : this.numericValue(this.config.kpis[0]?.value, 82);
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  get pulseStatus(): string {
    if (this.pulseScore >= 90) return 'Exceptional';
    if (this.pulseScore >= 80) return 'Strong position';
    if (this.pulseScore >= 70) return 'On track';
    return 'Needs focus';
  }

  get pulseGaugeGradient(): string {
    return `conic-gradient(#55d98b 0 ${this.pulseScore}%, rgba(255,255,255,.12) ${this.pulseScore}% 100%)`;
  }

  get momentumChange(): number {
    return 3 + this.textSeed(`${this.auth.currentUser.role}-${this.currentContext}-${this.selectedPeriod}`) % 8;
  }

  get weeklyActivity(): DashboardActivityBar[] {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const seed = this.textSeed(`${this.auth.currentUser.role}-${this.currentContext}-weekly-${this.selectedPeriod}`);
    return labels.map((label, index) => {
      const wave = Math.sin((index + 1) * 1.3) * 14;
      const value = Math.max(30, Math.min(100, Math.round(62 + wave + ((seed >> index) % 23))));
      return { label, value, display: `${value}%` };
    });
  }

  get activityHeatmap(): number[] {
    const seed = this.textSeed(`${this.currentContext}-${this.selectedPeriod}-activity-map`);
    return Array.from({ length: 28 }, (_, index) => 1 + ((seed + index * 11 + (index % 5) * 7) % 5));
  }

  kpiSpark(label: string, index: number): number[] {
    const seed = this.textSeed(`${label}-${this.currentContext}-${this.selectedPeriod}`);
    return Array.from({ length: 9 }, (_, point) => {
      const progress = 42 + point * 5;
      const wave = Math.sin((point + 1) * (index + 1.2)) * 13;
      return Math.max(22, Math.min(96, Math.round(progress + wave + ((seed >> (point % 7)) % 13))));
    });
  }

  get periodLabel(): string {
    return this.selectedPeriod === '7D' ? '7 days' : this.selectedPeriod === '30D' ? '30 days' : '90 days';
  }

  selectPeriod(period: DashboardPeriod): void {
    this.selectedPeriod = period;
  }

  selectChartMetric(metricId: string): void {
    this.selectedChartMetric = metricId;
  }

  get quickActions(): DashboardQuickAction[] {
    switch (this.auth.currentUser.role) {
      case 'SuperAdmin':
      case 'OrganizationAdmin':
      case 'ClubAdmin':
        return [
          { label: 'Create user account', detail: 'Add a new platform user', route: '/pages/user', icon: 'users' },
          { label: 'Create team', detail: 'Set up a new sports team', route: '/pages/sports-team', icon: 'team' },
          { label: 'Create organization', detail: 'Add an organization workspace', route: '/pages/sports-organization', icon: 'grid' },
        ];
      case 'Doctor':
      case 'Physiotherapist':
        return [
          { label: 'Report injury', detail: 'Open a new medical case', route: '/pages/player-injury', icon: 'medical' },
          { label: 'Add rehab session', detail: 'Record rehabilitation work', route: '/pages/rehabilitation-session', icon: 'activity' },
          { label: 'Review wellness', detail: 'Check medical wellness flags', route: '/pages/player-wellness', icon: 'heart' },
        ];
      case 'Player':
        return [
          { label: 'Wellness check-in', detail: 'Submit today’s readiness', route: '/pages/player-wellness', icon: 'heart' },
          { label: 'Open my tasks', detail: 'Review assigned actions', route: '/pages/player-task', icon: 'tasks' },
        ];
      case 'Parent':
        return [
          { label: 'View child profile', detail: 'Open the linked player', route: '/pages/sports-player', icon: 'users' },
          { label: 'View attendance', detail: 'Review recent participation', route: '/pages/training-attendance', icon: 'check' },
          { label: 'Open notifications', detail: 'Review the latest updates', route: '/pages/sports-notification', icon: 'bell' },
        ];
      case 'Scout':
        return [
          { label: 'Create evaluation', detail: 'Assess a player prospect', route: '/pages/player-evaluation', icon: 'chart' },
          { label: 'Open player list', detail: 'Review player profiles', route: '/pages/sports-player', icon: 'users' },
          { label: 'Review media', detail: 'Open scouting videos', route: '/pages/sports-video', icon: 'video' },
        ];
      case 'DataAnalyst':
        return [
          { label: 'Open evaluations', detail: 'Analyze player scoring', route: '/pages/player-evaluation', icon: 'chart' },
          { label: 'Open attendance', detail: 'Review participation data', route: '/pages/training-attendance', icon: 'check' },
          { label: 'Open wellness', detail: 'Analyze readiness records', route: '/pages/player-wellness', icon: 'heart' },
        ];
      case 'FitnessCoach':
        return [
          { label: 'Record measurement', detail: 'Add a physical measurement', route: '/pages/player-measurement', icon: 'activity' },
          { label: 'Record test result', detail: 'Add player testing data', route: '/pages/player-test-result', icon: 'chart' },
          { label: 'Review wellness', detail: 'Check player readiness', route: '/pages/player-wellness', icon: 'heart' },
        ];
      case 'TeamManager':
        return [
          { label: 'Create training session', detail: 'Plan the next team session', route: '/pages/training-session', icon: 'calendar' },
          { label: 'Take attendance', detail: 'Record player participation', route: '/pages/training-attendance', icon: 'check' },
          { label: 'Assign player task', detail: 'Create a team action', route: '/pages/player-task', icon: 'tasks' },
        ];
      default:
        return [
          { label: 'Create training session', detail: 'Plan the next team session', route: '/pages/training-session', icon: 'calendar' },
          { label: 'Take attendance', detail: 'Record player participation', route: '/pages/training-attendance', icon: 'check' },
          { label: 'Create evaluation', detail: 'Assess player performance', route: '/pages/player-evaluation', icon: 'chart' },
        ];
    }
  }

  get featureCards(): DashboardFeatureCard[] {
    const catalog: Record<string, DashboardFeatureCard> = {
      organizations: { label: 'Organizations', description: 'Workspaces, status and data coverage', value: '6', meta: '5 operating normally', route: '/pages/sports-organization', icon: 'grid', tone: 'positive' },
      users: { label: 'Users & access', description: 'Accounts, roles and permissions', value: '146', meta: '3 pending activation', route: '/pages/user', icon: 'roles', tone: 'warning' },
      teams: { label: 'Teams & rosters', description: 'Squads, registrations and assignments', value: '14', meta: '248 active players', route: '/pages/sports-team', icon: 'team', tone: 'info' },
      players: { label: 'Player profiles', description: 'Registration and development records', value: '248', meta: '93% complete', route: '/pages/sports-player', icon: 'users', tone: 'positive' },
      wellness: { label: 'Player wellness', description: 'Readiness, fatigue and daily check-ins', value: '18/22', meta: '3 need review', route: '/pages/player-wellness', icon: 'heart', tone: 'positive' },
      matches: { label: 'Sports matches', description: 'Fixtures, results and match preparation', value: '2', meta: 'Matches this week', route: '/pages/sports-match', icon: 'trophy', tone: 'info' },
      training: { label: 'Training sessions', description: 'Plan and monitor team sessions', value: '6', meta: 'Sessions this week', route: '/pages/training-session', icon: 'calendar', tone: 'positive' },
      attendance: { label: 'Attendance', description: 'Track player training participation', value: '91%', meta: 'Current month', route: '/pages/training-attendance', icon: 'check', tone: 'info' },
      tasks: { label: 'Player tasks', description: 'Assignments, deadlines and completion', value: '17', meta: '5 due today', route: '/pages/player-task', icon: 'tasks', tone: 'warning' },
      evaluations: { label: 'Player evaluations', description: 'Performance reviews and development', value: '42', meta: '12 published this month', route: '/pages/player-evaluation', icon: 'chart', tone: 'positive' },
      injuries: { label: 'Injuries', description: 'Medical cases and player availability', value: '9', meta: '4 active cases', route: '/pages/player-injury', icon: 'medical', tone: 'danger' },
      rehabilitation: { label: 'Rehabilitation plans', description: 'Recovery milestones and return-to-play', value: '6', meta: '83% on schedule', route: '/pages/rehabilitation-plan', icon: 'activity', tone: 'warning' },
      treatments: { label: 'Treatment sessions', description: 'Physiotherapy work and outcomes', value: '14', meta: '5 scheduled today', route: '/pages/rehabilitation-session', icon: 'medical', tone: 'info' },
      measurements: { label: 'Player measurements', description: 'Body, load and physical tracking', value: '64', meta: '11 updated today', route: '/pages/player-measurement', icon: 'activity', tone: 'positive' },
      testing: { label: 'Fitness testing', description: 'Speed, power and endurance results', value: '38', meta: '16 completed this week', route: '/pages/player-test-result', icon: 'chart', tone: 'info' },
      media: { label: 'Media library', description: 'Player videos and scouting clips', value: '128', meta: '28 new clips', route: '/pages/sports-video', icon: 'video', tone: 'neutral' },
      notifications: { label: 'Notifications', description: 'Alerts, reminders and team updates', value: '12', meta: '4 require action', route: '/pages/sports-notification', icon: 'bell', tone: 'warning' },
    };
    const roleFeatures: Record<UserRole, string[]> = {
      SuperAdmin: ['organizations', 'users', 'teams', 'players', 'matches', 'training', 'attendance', 'evaluations', 'injuries', 'media', 'notifications'],
      OrganizationAdmin: ['organizations', 'users', 'teams', 'players', 'matches', 'training', 'attendance', 'evaluations', 'media', 'notifications'],
      ClubAdmin: ['users', 'teams', 'players', 'matches', 'training', 'attendance', 'evaluations', 'injuries', 'media', 'notifications'],
      TeamManager: ['teams', 'players', 'matches', 'training', 'attendance', 'tasks', 'media', 'notifications'],
      Coach: ['wellness', 'matches', 'training', 'attendance', 'tasks', 'evaluations', 'injuries', 'media', 'notifications'],
      FitnessCoach: ['wellness', 'training', 'attendance', 'injuries', 'rehabilitation', 'measurements', 'testing', 'notifications'],
      Doctor: ['wellness', 'injuries', 'rehabilitation', 'treatments', 'measurements', 'testing', 'notifications'],
      Physiotherapist: ['wellness', 'injuries', 'rehabilitation', 'treatments', 'measurements', 'training', 'notifications'],
      Player: ['wellness', 'matches', 'training', 'attendance', 'tasks', 'evaluations', 'injuries', 'rehabilitation', 'media', 'notifications'],
      Parent: ['players', 'matches', 'training', 'attendance', 'evaluations', 'injuries', 'media', 'notifications'],
      Scout: ['players', 'matches', 'evaluations', 'measurements', 'testing', 'media', 'notifications'],
      DataAnalyst: ['organizations', 'teams', 'players', 'wellness', 'attendance', 'evaluations', 'injuries', 'measurements', 'testing', 'notifications'],
    };
    return roleFeatures[this.auth.currentUser.role].map((key) => catalog[key]);
  }

  get recentChanges(): DashboardItem[] {
    const context = this.currentContext;
    if (this.isOrganizationDashboard) {
      return [
        { title: 'New player profiles', detail: `${context} roster`, meta: '+4 since your last visit', tone: 'positive', icon: 'users', route: '/pages/sports-player' },
        { title: 'Access waiting for review', detail: `${context} staff`, meta: '2 accounts pending', tone: 'warning', icon: 'roles', route: '/pages/user' },
        { title: 'Data completion improved', detail: `${context} records`, meta: '+3% this week', tone: 'info', icon: 'chart', route: '/pages/sports-organization' },
      ];
    }
    if (['Doctor', 'Physiotherapist'].includes(this.auth.currentUser.role)) {
      return [
        { title: 'New medical case', detail: 'Hamstring injury reported', meta: '18 min ago', tone: 'danger', icon: 'medical', route: '/pages/player-injury' },
        { title: 'Rehab milestone', detail: 'Ahmed reached 82%', meta: 'Today', tone: 'positive', icon: 'activity', route: '/pages/rehabilitation-plan' },
        { title: 'Clearance requested', detail: 'Return-to-play review', meta: 'Due today', tone: 'warning', icon: 'check', route: '/pages/player-injury' },
      ];
    }
    if (this.auth.currentUser.role === 'Player') {
      return [
        { title: 'Performance improved', detail: 'Overall score increased', meta: '+3 points', tone: 'positive', icon: 'chart', route: '/pages/player-evaluation' },
        { title: 'New coach feedback', detail: 'Finishing practice review', meta: 'Today', tone: 'info', icon: 'tasks', route: '/pages/player-task' },
        { title: 'Schedule updated', detail: 'Training starts at 17:00', meta: 'New', tone: 'warning', icon: 'calendar', route: '/pages/training-session' },
      ];
    }
    if (this.auth.currentUser.role === 'Parent') {
      return [
        { title: 'Coach message received', detail: 'Positive development update', meta: '20 min ago', tone: 'positive', icon: 'users', route: '/pages/player-evaluation' },
        { title: 'Match time confirmed', detail: 'Saturday fixture at 15:00', meta: 'Today', tone: 'info', icon: 'trophy', route: '/pages/sports-match' },
        { title: 'Attendance recorded', detail: 'Omar attended tactical training', meta: 'Yesterday', tone: 'positive', icon: 'check', route: '/pages/training-attendance' },
      ];
    }
    if (this.auth.currentUser.role === 'Scout') {
      return [
        { title: 'New prospect added', detail: 'Adam Nasser · Winger', meta: '35 min ago', tone: 'positive', icon: 'users', route: '/pages/sports-player' },
        { title: 'Evaluation completed', detail: 'Yassin Salah scored 88', meta: 'Today', tone: 'info', icon: 'chart', route: '/pages/player-evaluation' },
        { title: 'New scouting video', detail: 'Six match clips uploaded', meta: 'Today', tone: 'positive', icon: 'video', route: '/pages/sports-video' },
      ];
    }
    if (this.auth.currentUser.role === 'DataAnalyst') {
      return [
        { title: 'Dataset refreshed', detail: '18,420 records processed', meta: '8 min ago', tone: 'positive', icon: 'chart', route: '/pages/sports-organization' },
        { title: 'Quality alerts resolved', detail: 'Eleven validation issues closed', meta: 'Today', tone: 'positive', icon: 'check', route: '/pages/sports-notification' },
        { title: 'Report generated', detail: 'U21 monthly performance', meta: '12 min ago', tone: 'info', icon: 'chart', route: '/pages/player-evaluation' },
      ];
    }
    if (this.auth.currentUser.role === 'TeamManager') {
      return [
        { title: 'Registration approved', detail: 'Two players added to the squad', meta: 'Today', tone: 'positive', icon: 'users', route: '/pages/sports-player-team' },
        { title: 'Attendance updated', detail: 'Tuesday session finalized', meta: '1 hr ago', tone: 'info', icon: 'check', route: '/pages/training-attendance' },
        { title: 'Match time changed', detail: 'Saturday kickoff moved to 15:00', meta: 'New', tone: 'warning', icon: 'trophy', route: '/pages/sports-match' },
      ];
    }
    if (this.auth.currentUser.role === 'FitnessCoach') {
      return [
        { title: 'Test results imported', detail: 'Sixteen speed and power results', meta: 'Today', tone: 'positive', icon: 'chart', route: '/pages/player-test-result' },
        { title: 'Load alert resolved', detail: 'Omar returned to target range', meta: '45 min ago', tone: 'positive', icon: 'activity', route: '/pages/player-measurement' },
        { title: 'Check-ins received', detail: 'Nineteen players submitted wellness', meta: 'Today', tone: 'info', icon: 'heart', route: '/pages/player-wellness' },
      ];
    }
    return [
      { title: 'Readiness decreased', detail: 'Ali Khaled dropped 18%', meta: 'Since yesterday', tone: 'warning', icon: 'activity', route: '/pages/player-wellness' },
      { title: 'Availability changed', detail: 'Ahmed moved to modified', meta: '1 hr ago', tone: 'danger', icon: 'medical', route: '/pages/player-injury' },
      { title: 'Wellness completed', detail: '2 new player check-ins', meta: 'Today', tone: 'positive', icon: 'check', route: '/pages/player-wellness' },
    ];
  }

  get freshness(): DashboardFreshness {
    const confidence = this.isOrganizationDashboard
      ? Number(this.config.kpis[3]?.value.replace('%', '') || 93)
      : ['Doctor', 'Physiotherapist'].includes(this.auth.currentUser.role)
        ? 89
        : this.auth.currentUser.role === 'Player'
          ? 100
          : 96;
    return {
      updated: 'Updated 8 minutes ago',
      confidence,
      detail: confidence >= 95 ? 'All critical sources are reporting' : 'Some records still need attention',
      tone: confidence >= 95 ? 'positive' : confidence >= 85 ? 'warning' : 'danger',
    };
  }

  get contextOptions(): string[] {
    switch (this.auth.currentUser.role) {
      case 'SuperAdmin':
        return ['All organizations', ...this.organizationNames];
      case 'OrganizationAdmin':
      case 'ClubAdmin':
      case 'DataAnalyst':
        return ['All organizations', ...this.organizationNames];
      case 'Doctor':
      case 'Physiotherapist':
        return ['Future Stars Academy', 'Future Stars U21', 'Future Stars U18'];
      case 'Parent':
        return ['Omar Hassan', 'Maya Hassan'];
      case 'Scout':
        return ['U21 prospects', 'U18 prospects', 'Shortlist'];
      case 'Player':
        return ['Future Stars U21'];
      default:
        return ['Future Stars U21', 'Future Stars U18', 'First Team'];
    }
  }

  private get organizationNames(): string[] {
    const names = this.store
      .list('SportsOrganization', { pageSize: 1000 })
      .data.map((organization) => String(organization['name'] || organization.id));
    return [...new Set(names)];
  }

  toggleContext(event: MouseEvent): void {
    event.stopPropagation();
    this.quickActionsOpen = false;
    this.contextOpen = !this.contextOpen;
  }

  selectContext(option: string, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedContext = option;
    this.contextOpen = false;
  }

  toggleQuickActions(event: MouseEvent): void {
    event.stopPropagation();
    this.contextOpen = false;
    this.quickActionsOpen = !this.quickActionsOpen;
  }

  @HostListener('document:click')
  closeContext(): void {
    this.contextOpen = false;
    this.quickActionsOpen = false;
  }

  @HostListener('document:keydown.escape')
  closeContextOnEscape(): void {
    this.contextOpen = false;
    this.quickActionsOpen = false;
  }

  get today(): string {
    const locale = this.language.language() === 'ar' ? 'ar-EG' : 'en';
    return new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  }

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return this.language.text('Good morning', 'صباح الخير');
    if (hour < 18) return this.language.text('Good afternoon', 'مساء الخير');
    return this.language.text('Good evening', 'مساء الخير');
  }

  trackByTitle(_index: number, item: { title?: string; label?: string }): string {
    return item.title || item.label || String(_index);
  }

  private configForRole(role: UserRole): DashboardConfig {
    switch (role) {
      case 'SuperAdmin': return adminDashboard;
      case 'OrganizationAdmin': return organizationAdminDashboard;
      case 'ClubAdmin': return clubAdminDashboard;
      case 'TeamManager': return teamManagerDashboard;
      case 'Coach': return coachDashboard;
      case 'FitnessCoach': return fitnessCoachDashboard;
      case 'Doctor': return doctorDashboard;
      case 'Physiotherapist': return physiotherapistDashboard;
      case 'Player': return playerDashboard;
      case 'Parent': return parentDashboard;
      case 'Scout': return scoutDashboard;
      case 'DataAnalyst': return analystDashboard;
    }
  }

  private get isOrganizationDashboard(): boolean {
    return ['SuperAdmin', 'OrganizationAdmin', 'ClubAdmin'].includes(this.auth.currentUser.role);
  }

  private organizationDashboard(base: DashboardConfig, context: string): DashboardConfig {
    const names = this.organizationNames.length ? this.organizationNames : ['Future Stars Academy'];
    const selectedNames = context === 'All organizations' ? names : [context];
    const stats = selectedNames.map((name) => this.organizationStats(name));
    const players = stats.reduce((sum, item) => sum + item.players, 0);
    const teams = stats.reduce((sum, item) => sum + item.teams, 0);
    const staff = stats.reduce((sum, item) => sum + item.staff, 0);
    const completion = Math.round(stats.reduce((sum, item) => sum + item.completion, 0) / stats.length);
    const seed = selectedNames.reduce((sum, name) => sum + this.textSeed(name), 0);
    const scope = context === 'All organizations' ? 'the full platform' : context;
    const pendingAccounts = Math.max(1, seed % 5);
    const incompleteProfiles = Math.max(1, seed % 4);
    const rows = selectedNames.slice(0, 6).map((name) => {
      const item = this.organizationStats(name);
      return {
        initials: name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase(),
        name,
        subtitle: `${item.completion}% data complete`,
        values: [
          { text: String(item.players) },
          { text: String(item.teams) },
          { text: item.completion >= 90 ? 'Healthy' : 'Review', tone: item.completion >= 90 ? 'positive' as const : 'warning' as const },
        ],
        route: '/pages/sports-organization',
      };
    });
    return {
      ...base,
      description: `A focused operating overview for ${scope}.`,
      kpis: [
        { ...base.kpis[0], value: String(players), detail: `Across ${teams} teams`, trend: `+${Math.max(2, seed % 15)} this month` },
        { ...base.kpis[1], value: String(teams), detail: `${selectedNames.length} organization${selectedNames.length === 1 ? '' : 's'}`, trend: teams > 3 ? 'All operational' : 'Growing capacity' },
        { ...base.kpis[2], value: String(staff), detail: 'Coaches and medical', trend: `${Math.max(1, seed % 4)} pending activation` },
        { ...base.kpis[3], value: `${completion}%`, detail: 'Core records complete', trend: `+${Math.max(1, seed % 6)}% this month`, tone: completion >= 90 ? 'positive' : 'warning' },
      ],
      trendValue: String(players * 4 + teams * 13),
      trendChange: `+${Math.max(5, seed % 19)}% interactions this month`,
      trendPoints: this.organizationTrend(seed),
      attention: [
        { title: `${pendingAccounts} account${pendingAccounts === 1 ? '' : 's'} pending`, detail: `Access setup for ${scope}`, meta: 'Access control', tone: 'warning', icon: 'roles', route: '/pages/user' },
        { title: `${incompleteProfiles} profile${incompleteProfiles === 1 ? '' : 's'} incomplete`, detail: `Required fields in ${scope}`, meta: 'Data quality', tone: 'neutral', icon: 'users', route: '/pages/sports-player' },
        { title: 'Monthly review ready', detail: `${context} performance summary`, meta: 'Generated today', tone: 'info', icon: 'chart', route: '/pages/sports-organization' },
        ...base.attention.slice(3),
      ],
      tableDescription: context === 'All organizations' ? 'Operating status across all organizations.' : `Current operating status for ${context}.`,
      rows,
      insight: `${scope} is ${completion}% data complete. ${completion >= 90 ? 'Reporting is reliable for operational decisions.' : 'Complete the missing profiles before relying on cross-team comparisons.'}`,
    };
  }

  private organizationStats(name: string): { players: number; teams: number; staff: number; completion: number } {
    const seed = this.textSeed(name);
    return {
      players: 32 + seed % 95,
      teams: 2 + seed % 7,
      staff: 7 + seed % 22,
      completion: 82 + seed % 17,
    };
  }

  private organizationTrend(seed: number): string {
    const values = Array.from({ length: 12 }, (_, index) => {
      const x = 8 + index * 46;
      const progress = 132 - index * 9;
      const variation = ((seed >> (index % 7)) + index * 5) % 24;
      return `${x},${Math.max(20, progress + variation - 12)}`;
    });
    return values.join(' ');
  }

  private numericValue(value: string | undefined, fallback: number): number {
    const numeric = Number(String(value || '').replace(/[^0-9.-]/g, ''));
    return Number.isFinite(numeric) ? numeric : fallback;
  }

  private metricPeriodValue(metric: DashboardChartMetric, seed: number): number {
    if (metric.periodScale) {
      const factor: Record<DashboardPeriod, number> = { '7D': .25, '30D': 1, '90D': 2.8 };
      return Math.max(1, Math.round(metric.baseValue * factor[this.selectedPeriod]));
    }
    const periodOffset: Record<DashboardPeriod, number> = { '7D': 2, '30D': 0, '90D': -3 };
    const variation = periodOffset[this.selectedPeriod] + (seed % 3) - 1;
    if (metric.format === 'percent') return Math.max(0, Math.min(100, Math.round(metric.baseValue + variation)));
    return Math.max(0, Math.round(metric.baseValue + variation));
  }

  private formatMetricValue(value: number, format: DashboardChartFormat): string {
    if (format === 'percent') return `${value}%`;
    if (format === 'score') return String(value);
    return new Intl.NumberFormat('en').format(value);
  }

  private chartSeed(metricId: string): number {
    return this.textSeed(`${this.auth.currentUser.role}-${this.currentContext}-${metricId}-${this.selectedPeriod}`);
  }

  private periodTrendPoints(seed: number, metricIndex: number): string {
    const pointCount: Record<DashboardPeriod, number> = { '7D': 7, '30D': 10, '90D': 12 };
    const count = pointCount[this.selectedPeriod];
    const volatility: Record<DashboardPeriod, number> = { '7D': 9, '30D': 14, '90D': 19 };
    return Array.from({ length: count }, (_, index) => {
      const x = Math.round(8 + (506 * index) / (count - 1));
      const progress = 136 - index * (100 / (count - 1));
      const wave = Math.sin((index + 1) * (metricIndex + 1.35)) * volatility[this.selectedPeriod];
      const noise = ((seed >> (index % 8)) % 15) - 7;
      const y = Math.max(20, Math.min(146, Math.round(progress + wave + noise)));
      return `${x},${y}`;
    }).join(' ');
  }

  private textSeed(value: string): number {
    return [...value].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  }
}
