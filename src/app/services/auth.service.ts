import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PublicRegistrationPayload, SportsApi } from './api';
export type UserRole =
  | 'SuperAdmin'
  | 'OrganizationAdmin'
  | 'ClubAdmin'
  | 'TeamManager'
  | 'Coach'
  | 'FitnessCoach'
  | 'Doctor'
  | 'Physiotherapist'
  | 'Player'
  | 'Parent'
  | 'Scout'
  | 'DataAnalyst';
export interface DemoUser {
  name: string;
  email: string;
  username?: string;
  password: string;
  role: UserRole;
  initials: string;
  id?: string;
  playerId?: string;
  organizationId?: string;
  teamId?: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly registeredUsersKey = 'sports_registered_users';
  private readonly defaultLandingPage = '/dashboard';
  readonly demoUsers: DemoUser[] = [
    {
      name: 'System Admin',
      email: 'admin@sports.com',
      password: 'Admin@123',
      role: 'SuperAdmin',
      initials: 'SA',
      id: 'user-admin',
    },
    {
      name: 'Nour Organization Admin',
      email: 'organization@sports.com',
      password: 'Organization@123',
      role: 'OrganizationAdmin',
      initials: 'NO',
    },
    {
      name: 'Khaled Club Admin',
      email: 'club@sports.com',
      password: 'Club@123',
      role: 'ClubAdmin',
      initials: 'KC',
    },
    {
      name: 'Mona Team Manager',
      email: 'manager@sports.com',
      password: 'Manager@123',
      role: 'TeamManager',
      initials: 'MM',
    },
    {
      name: 'Ahmed Mohamed',
      email: 'coach@sports.com',
      password: 'Coach@123',
      role: 'Coach',
      initials: 'AM',
      id: 'user-coach',
      organizationId: 'org-future',
      teamId: 'team-u21',
    },
    {
      name: 'Hassan Fitness Coach',
      email: 'fitness@sports.com',
      password: 'Fitness@123',
      role: 'FitnessCoach',
      initials: 'HF',
    },
    {
      name: 'Dr. Tarek Hassan',
      email: 'doctor@sports.com',
      password: 'Doctor@123',
      role: 'Doctor',
      initials: 'TH',
      id: 'user-doctor',
      organizationId: 'org-future',
      teamId: 'team-u21',
    },
    {
      name: 'Omar Hassan',
      email: 'player@sports.com',
      password: 'Player@123',
      role: 'Player',
      initials: 'OH',
      id: 'user-player',
      playerId: 'player-omar',
      organizationId: 'org-future',
      teamId: 'team-u21',
    },
    {
      name: 'Dr. Sara Ali',
      email: 'physio@sports.com',
      password: 'Physio@123',
      role: 'Physiotherapist',
      initials: 'SA',
      id: 'user-physio',
      organizationId: 'org-future',
      teamId: 'team-u21',
    },
    {
      name: 'Mahmoud Parent',
      email: 'parent@sports.com',
      password: 'Parent@123',
      role: 'Parent',
      initials: 'MP',
    },
    {
      name: 'Youssef Scout',
      email: 'scout@sports.com',
      password: 'Scout@123',
      role: 'Scout',
      initials: 'YS',
    },
    {
      name: 'Laila Data Analyst',
      email: 'analyst@sports.com',
      password: 'Analyst@123',
      role: 'DataAnalyst',
      initials: 'LD',
    },
  ];
  get allDemoUsers(): DemoUser[] {
    return [...this.demoUsers, ...this.registeredDemoUsers()];
  }
  constructor(private router: Router, private api: SportsApi) {}
  login(email: string, password: string): boolean {
    const login = email.trim().toLowerCase();
    const user = this.allDemoUsers.find(
      (item) =>
        (item.email.toLowerCase() === login ||
          item.username?.toLowerCase() === login) &&
        item.password === password
    );
    if (!user) return false;
    localStorage.setItem('sports_token', 'demo-session-token');
    localStorage.setItem('sports_user', JSON.stringify(user));
    localStorage.removeItem('sports_acl');
    this.router.navigate([this.defaultLandingPage]);
    return true;
  }
  registerDemo(payload: PublicRegistrationPayload): {
    ok: boolean;
    message?: string;
  } {
    const email = payload.emailAddress.trim().toLowerCase(),
      username = payload.userName.trim().toLowerCase();
    if (
      this.allDemoUsers.some(
        (user) =>
          user.email.toLowerCase() === email ||
          user.username?.toLowerCase() === username
      )
    )
      return { ok: false, message: 'The username or email is already in use.' };
    const name =
      `${payload.firstName.trim()} ${payload.lastName.trim()}`.trim();
    const users = this.registeredDemoUsers();
    users.push({
      name,
      email,
      username: payload.userName.trim(),
      password: payload.password,
      role: payload.userTypes as UserRole,
      initials: name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase(),
    });
    localStorage.setItem(this.registeredUsersKey, JSON.stringify(users));
    return { ok: true };
  }
  loginLive(username: string, password: string) {
    return this.api.authenticate(username, password).pipe(
      switchMap((response) =>
        this.api.getMyProfile().pipe(
          catchError(() => of(null)),
          map((profile) => ({ response, profile }))
        )
      ),
      tap(({ response, profile }) => {
        const raw = response.user || response;
        const profileData = profile?.data || profile?.result || profile || {};
        const role = this.normalizeRole(
          raw.userTypes || raw.role || profileData?.profileType || raw.type
        );
        const name = raw.name || raw.userName || username;
        const user: DemoUser = {
          name,
          email: raw.emailAddress || username,
          password: '',
          role,
          initials: name
            .split(/\s+/)
            .slice(0, 2)
            .map((part: string) => part[0])
            .join('')
            .toUpperCase(),
          id: String(profileData?.user?.id || raw.id || ''),
          playerId:
            this.findId(profileData, 'playerId') ||
            String(
              profileData?.player?.record?.id || profileData?.player?.id || ''
            ),
          organizationId:
            this.findId(profileData, 'organizationId') ||
            String(raw.organizationId || ''),
          teamId:
            this.findId(profileData, 'teamId') || String(raw.teamId || ''),
        };
        const table = response.acl?.table || raw.acl?.table || {};
        localStorage.setItem('sports_token', 'live-basic-session');
        localStorage.setItem('sports_user', JSON.stringify(user));
        localStorage.setItem('sports_acl', JSON.stringify(table));
        this.router.navigateByUrl(this.defaultLandingPage);
      })
    );
  }
  registerLive(payload: PublicRegistrationPayload) {
    return this.api.register(payload);
  }
  get currentUser(): DemoUser {
    try {
      return JSON.parse(localStorage.getItem('sports_user') || '') as DemoUser;
    } catch {
      return this.demoUsers[1];
    }
  }
  logout(): void {
    localStorage.removeItem('sports_token');
    localStorage.removeItem('sports_user');
    localStorage.removeItem('sports_acl');
    this.api.clearCredentials();
    this.router.navigate(['/login']);
  }
  deleteDemoAccount(): void {
    const current = this.currentUser;
    const users = this.registeredDemoUsers().filter(
      (user) => user.email !== current.email
    );
    localStorage.setItem(this.registeredUsersKey, JSON.stringify(users));
    this.logout();
  }
  private registeredDemoUsers(): DemoUser[] {
    try {
      const value = JSON.parse(
        localStorage.getItem(this.registeredUsersKey) || '[]'
      );
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }
  private findId(value: any, key: string): string {
    const pending = [value],
      visited = new Set<any>();
    while (pending.length) {
      const item = pending.shift();
      if (!item || typeof item !== 'object' || visited.has(item)) continue;
      visited.add(item);
      if (typeof item[key] === 'string' && item[key]) return item[key];
      pending.push(...Object.values(item));
    }
    return '';
  }
  private normalizeRole(value: unknown): UserRole {
    const raw = String(Array.isArray(value) ? value[0] || '' : value || '')
      .replace(/[\s_-]/g, '')
      .toLowerCase();
    const roles: Record<string, UserRole> = {
      admin: 'SuperAdmin',
      superadmin: 'SuperAdmin',
      organizationadmin: 'OrganizationAdmin',
      clubadmin: 'ClubAdmin',
      teammanager: 'TeamManager',
      coach: 'Coach',
      fitnesscoach: 'FitnessCoach',
      doctor: 'Doctor',
      physiotherapist: 'Physiotherapist',
      player: 'Player',
      parent: 'Parent',
      scout: 'Scout',
      dataanalyst: 'DataAnalyst',
    };
    return roles[raw] || 'Player';
  }
}
