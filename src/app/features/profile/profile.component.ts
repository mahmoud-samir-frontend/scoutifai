import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { AuthService } from '../../services/auth.service';
import { DataModeService } from '../../services/data-mode.service';
import { SportsApi } from '../../services/api';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, AppHeaderComponent, SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile: any;
  loading = false;
  error = '';
  sidebarCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
  deleteDialog = false;
  deleteConfirmation = '';
  deleteMessage = '';
  constructor(
    public auth: AuthService,
    private mode: DataModeService,
    private api: SportsApi,
    public language: LanguageService
  ) {}
  ngOnInit() {
    if (this.mode.mode() === 'live') {
      this.loading = true;
      this.api.getMyProfile().subscribe({
        next: (value) => (this.profile = value),
        error: () => (this.error = 'Your profile could not be loaded.'),
        complete: () => (this.loading = false),
      });
      return;
    }
    const user = this.auth.currentUser;
    this.profile = {
      user: {
        name: user.name,
        userName: user.username || user.email,
        emailAddress: user.email,
        userTypes: [user.role],
        organizationName: 'Future Stars Academy',
        clubName: 'Future Stars FC',
        sportName: 'Football',
      },
      profileType: user.role,
      player:
        user.role === 'Player'
          ? {
              record: {
                name: user.name,
                playerNumber: 8,
                registrationNumber: 'FSA-2026-008',
                medicalStatus: 'Available',
                playerStatus: 'Active',
              },
              teams: [{ name: 'U21 Team' }],
              latestWellness: {
                readinessScore: 8,
                fatigueLevel: 4,
                sleepHours: 8,
              },
              activeInjuries: [],
            }
          : null,
      coach: user.role.includes('Coach')
        ? { record: { name: user.name, status: 'Active' } }
        : null,
      staff: null,
      sportsProfiles: [],
      linkedPlayers: [],
      recentVideos: [],
    };
  }
  get user() {
    return this.profile?.user || {};
  }
  get role() {
    return (
      this.profile?.profileType ||
      this.user.userTypes?.[0] ||
      this.auth.currentUser.role
    );
  }
  get record() {
    return (
      this.profile?.player?.record ||
      this.profile?.coach?.record ||
      this.profile?.staff?.record ||
      {}
    );
  }
  get distinctEmail() {
    const username = String(this.user.userName || '')
      .trim()
      .toLowerCase();
    const email = String(
      this.user.emailAddress || this.auth.currentUser.email || ''
    ).trim();
    return email && email.toLowerCase() !== username ? email : '';
  }
  openDeleteAccount() {
    this.deleteConfirmation = '';
    this.deleteMessage = '';
    this.deleteDialog = true;
  }
  requestAccountDeletion() {
    if (this.deleteConfirmation !== 'DELETE') return;
    const id = this.auth.currentUser.id || this.user.id;
    if (!id && this.mode.mode() === 'live') {
      this.deleteMessage = this.language.text(
        'Your user account ID is unavailable.',
        'معرّف حساب المستخدم غير متاح.'
      );
      return;
    }
    if (this.mode.mode() === 'live') {
      this.api.remove('User', String(id)).subscribe({
        next: () => this.auth.logout(),
        error: (error) =>
          (this.deleteMessage =
            error?.error?.message ||
            this.language.text(
              'The account could not be deleted.',
              'تعذر حذف الحساب.'
            )),
      });
      return;
    }
    this.auth.deleteDemoAccount();
  }
}
