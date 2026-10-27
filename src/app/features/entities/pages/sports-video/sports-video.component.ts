import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from '../../../../shared/components/app-header/app-header.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { DocumentedEntity } from '../../../../models/generated/entities';
import { LocalEntityStoreService } from '../../../../services/local-entity-store.service';
import { PermissionService } from '../../../../services/permission.service';
import { DataModeService } from '../../../../services/data-mode.service';
import { SportsApi } from '../../../../services/api';
import { AuthService } from '../../../../services/auth.service';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-sports-video',
  standalone: true,
  imports: [CommonModule, FormsModule, AppHeaderComponent, SidebarComponent],
  templateUrl: './sports-video.component.html',
  styleUrl: './sports-video.component.scss',
})
export class SportsVideoComponent implements OnInit {
  videos: DocumentedEntity[] = [];
  players: DocumentedEntity[] = [];
  links: DocumentedEntity[] = [];
  comments: DocumentedEntity[] = [];
  tags: DocumentedEntity[] = [];
  selected?: DocumentedEntity;
  search = '';
  type = '';
  team = '';
  visibility = '';
  dialog: '' | 'video' | 'link' | 'comment' = '';
  toast = '';
  sidebarCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
  videoForm: Record<string, any> = {};
  linkForm: Record<string, any> = {};
  commentForm: Record<string, any> = {};
  file?: { name: string; type: string; contents: string };
  mediaFileReading = false;
  deleteTarget?: DocumentedEntity;
  deleting = false;
  loading = false;
  videoSource = '';
  mediaIsImage = false;
  videoLoading = false;
  videoError = '';
  currentPlayerId = '';
  currentUserId = '';
  profilePlayer?: DocumentedEntity;
  constructor(
    private store: LocalEntityStoreService,
    public permission: PermissionService,
    private mode: DataModeService,
    private api: SportsApi,
    private auth: AuthService,
    public language: LanguageService
  ) {}
  ngOnInit() {
    this.load();
  }
  get filteredVideos() {
    const q = this.search.trim().toLowerCase();
    return this.videos.filter(
      (v) =>
        (!q ||
          String(v['name'] || '')
            .toLowerCase()
            .includes(q)) &&
        (!this.type || v['videoType'] === this.type) &&
        (!this.team || v['team'] === this.team) &&
        (!this.visibility || v['visibility'] === this.visibility)
    );
  }
  get teams() {
    return [
      ...new Set(
        this.videos.map((v) => String(v['team'] || '')).filter(Boolean)
      ),
    ];
  }
  get uploadPlayers() {
    return this.profilePlayer &&
      !this.players.some((item) => item.id === this.profilePlayer!.id)
      ? [this.profilePlayer, ...this.players]
      : this.players;
  }
  get isPlayerLogin() {
    const role = this.auth.currentUser.role as string | string[];
    return Array.isArray(role) ? role.includes('Player') : role === 'Player';
  }
  get linkedPlayers() {
    const ids = new Set(
      this.links
        .filter((link) => link['video'] === this.selected?.id)
        .map((link) => link['player'])
    );
    return this.players.filter((player) => ids.has(player.id));
  }
  get selectedComments() {
    return this.comments.filter((item) => item['video'] === this.selected?.id);
  }
  get selectedTags() {
    return this.tags
      .filter((item) => item['video'] === this.selected?.id)
      .sort(
        (a, b) => Number(a['timeSecond'] || 0) - Number(b['timeSecond'] || 0)
      );
  }
  load() {
    if (this.mode.mode() === 'live') {
      this.loading = true;
      this.api.getMyProfile().subscribe({
        next: (profile) => {
          const profileData = profile?.data || profile?.result || profile;
          this.currentUserId = String(profileData?.user?.id || '');
          const player =
            profileData?.player?.record ||
            profileData?.player?.data ||
            profileData?.player;
          const playerId = this.extractPlayerId(profileData);
          const matchingPlayer = this.findLoggedInPlayer();
          this.currentPlayerId =
            playerId ||
            matchingPlayer?.id ||
            (this.isPlayerLogin ? this.currentUserId : '');
          if (this.currentPlayerId && this.dialog === 'video')
            this.videoForm['playerId'] = this.currentPlayerId;
          this.profilePlayer = player;
          if (
            player &&
            playerId &&
            !this.players.some((item) => item.id === playerId)
          )
            this.players.unshift(player);
          if (this.currentPlayerId)
            this.api.listPlayerVideos(this.currentPlayerId).subscribe({
              next: (r) => {
                this.videos = r.list || [];
                this.comments = this.videos.flatMap(
                  (video) => (video['comments'] as DocumentedEntity[]) || []
                );
                this.prepareThumbnails();
              },
              complete: () => (this.loading = false),
            });
          else
            this.api.list('SportsVideo', { pageSize: 100 }).subscribe({
              next: (r) => {
                this.videos = r.data;
                this.prepareThumbnails();
              },
              complete: () => (this.loading = false),
            });
        },
        error: () =>
          this.api.list('SportsVideo', { pageSize: 100 }).subscribe({
            next: (r) => {
              this.videos = r.data;
              this.prepareThumbnails();
            },
            complete: () => (this.loading = false),
          }),
      });
      for (const entity of [
        'SportsPlayer',
        'PlayerVideoLink',
        'VideoComment',
        'VideoTimelineTag',
      ])
        this.api
          .list(entity as any, { pageSize: 100 })
          .subscribe({ next: (r) => this.assign(entity, r.data) });
      return;
    }
    this.videos = this.store.list('SportsVideo', { pageSize: 100 }).data;
    this.players = this.store.list('SportsPlayer', { pageSize: 500 }).data;
    if (this.isPlayerLogin) {
      const player = this.players.find(
        (item) =>
          String(item['name'] || '').toLowerCase() ===
          this.auth.currentUser.name.toLowerCase()
      );
      this.currentPlayerId = player?.id || '';
      this.profilePlayer = player;
    }
    this.links = this.store.list('PlayerVideoLink', { pageSize: 500 }).data;
    this.comments = this.store.list('VideoComment', { pageSize: 500 }).data;
    this.tags = this.store.list('VideoTimelineTag', { pageSize: 500 }).data;
    this.prepareThumbnails();
  }
  select(video: DocumentedEntity) {
    this.releaseVideo();
    this.selected = video;
    this.mediaIsImage = this.isImage(video);
    const image = this.mediaIsImage ? this.thumbnail(video) : '';
    if (image) {
      this.videoSource = image;
      return;
    }
    const direct = this.playable(video);
    if (direct) {
      this.videoSource = direct;
      return;
    }
    if (
      this.mode.mode() === 'live' &&
      (video['externalStorageKey'] ||
        video['attachmentId'] ||
        video['downloadPath'] ||
        video['filePath'])
    ) {
      this.videoLoading = true;
      this.api.downloadVideo(video).subscribe({
        next: (blob) => {
          this.mediaIsImage = blob.type.startsWith('image/');
          this.videoSource = URL.createObjectURL(blob);
          this.videoLoading = false;
        },
        error: () => {
          this.videoError = 'The stored media could not be downloaded.';
          this.videoLoading = false;
        },
      });
    }
  }
  back() {
    this.releaseVideo();
    this.selected = undefined;
  }
  openCreate() {
    this.selected = undefined;
    this.videoForm = {
      playerId: this.currentPlayerId || '',
      name: '',
      user: 'demo-user',
      uploader: 'demo-user',
      organization: 'org-future',
      videoType: 'Skill',
      processingStatus: 'Ready',
      visibility: 'PlayerAndCoach',
      roleInVideo: 'Primary',
      startSecond: 0,
    };
    this.file = undefined;
    this.dialog = 'video';
  }
  saveVideo() {
    if (this.isPlayerLogin) {
      this.videoForm['playerId'] =
        this.currentPlayerId || this.findLoggedInPlayer()?.id || '';
    }
    if (!String(this.videoForm['name'] || '').trim()) {
      this.notify('Media title is required.');
      return;
    }
    if (!this.videoForm['playerId']) {
      this.notify('Please select a player.');
      return;
    }
    if (this.mode.mode() === 'live') {
      if (!this.file) {
        this.notify('Please select an image or video file.');
        return;
      }
      this.api
        .uploadPlayerVideo({
          playerId: this.videoForm['playerId'],
          title: this.videoForm['name'],
          fileName: this.file.name,
          contentType: this.file.type,
          fileData: this.file.contents,
          organizationId: this.videoForm['organizationId'] || undefined,
          sportId: this.videoForm['sportId'] || undefined,
          teamId: this.videoForm['teamId'] || undefined,
          videoType: this.videoForm['videoType'],
          visibility: this.videoForm['visibility'],
          description: this.videoForm['description'],
          recordedDate: this.videoForm['recordedDate'],
          durationSeconds: this.videoForm['durationSeconds'],
          roleInVideo: this.videoForm['roleInVideo'],
          startSecond: this.videoForm['startSecond'],
          endSecond: this.videoForm['endSecond'],
          notes: this.videoForm['notes'],
        })
        .subscribe({
          next: () => this.finish('Media uploaded and linked to player.'),
          error: (e) =>
            this.notify(e?.error?.message || 'Media could not be uploaded.'),
        });
      return;
    }
    try {
      const { playerId, ...values } = this.videoForm;
      if (this.file?.type.startsWith('image/'))
        values['thumbnail'] = `data:${this.file.type};base64,${this.file.contents}`;
      values['contentType'] = this.file?.type || '';
      const video = this.store.create('SportsVideo', values as any);
      this.store.create('PlayerVideoLink', {
        name: `${
          this.players.find((p) => p.id === playerId)?.['name'] || 'Player'
        } — ${video['name']}`,
        user: 'demo-user',
        video: video.id,
        player: playerId,
        organization: 'org-future',
        roleInVideo: 'Primary',
        startSecond: 0,
        endSecond: Number(video['durationSeconds'] || 0),
      } as any);
      this.finish('Media created and linked to player.');
    } catch (e) {
      this.notify(
        e instanceof Error ? e.message : 'Media could not be created.'
      );
    }
  }
  edit(video: DocumentedEntity, event: Event) {
    event.stopPropagation();
    this.videoForm = { ...video };
    this.selected = video;
    this.dialog = 'video';
  }
  saveExisting() {
    if (!this.selected) return;
    if (this.mode.mode() === 'live') {
      this.api
        .update('SportsVideo', this.selected.id, this.videoForm)
        .subscribe({
          next: () => this.finish('Video updated.'),
          error: () => this.notify('Video could not be updated.'),
        });
      return;
    }
    this.store.update('SportsVideo', this.selected.id, this.videoForm as any);
    this.finish('Video updated.');
  }
  remove(video: DocumentedEntity, event: Event) {
    event.stopPropagation();
    if (this.permission.canDelete('SportsVideo')) this.deleteTarget = video;
  }
  confirmDelete() {
    const video = this.deleteTarget;
    if (!video || this.deleting) return;
    this.deleting = true;
    if (this.mode.mode() === 'live')
      this.api
        .remove('SportsVideo', video.id)
        .subscribe({
          next: () => { this.deleteTarget = undefined; this.deleting = false; this.finish('Media deleted.'); },
          error: () => { this.deleting = false; this.notify('Media could not be deleted.'); }
        });
    else {
      this.store.remove('SportsVideo', video.id);
      this.deleteTarget = undefined;
      this.deleting = false;
      this.finish('Media deleted.');
    }
  }
  openLink() {
    this.linkForm = {
      name: '',
      user: 'demo-user',
      video: this.selected?.id,
      player: '',
      organization: 'org-future',
      roleInVideo: 'Primary',
      startSecond: 0,
      endSecond: Number(this.selected?.['durationSeconds'] || 0),
    };
    this.dialog = 'link';
  }
  saveLink() {
    const player = this.players.find((p) => p.id === this.linkForm['player']);
    this.linkForm['name'] = `${player?.['name'] || 'Player'} — ${
      this.selected?.['name'] || 'Video'
    }`;
    if (this.mode.mode() === 'live') {
      this.api.create('PlayerVideoLink', this.linkForm).subscribe({
        next: () => this.finish('Player linked to video.'),
        error: () => this.notify('Player could not be linked.'),
      });
      return;
    }
    try {
      this.store.create('PlayerVideoLink', this.linkForm as any);
      this.finish('Player linked to video.');
    } catch (e) {
      this.notify(
        e instanceof Error ? e.message : 'Player could not be linked.'
      );
    }
  }
  unlink(player: DocumentedEntity) {
    const link = this.links.find(
      (item) =>
        item['video'] === this.selected?.id && item['player'] === player.id
    );
    if (!link) return;
    if (this.mode.mode() === 'live')
      this.api
        .remove('PlayerVideoLink', link.id)
        .subscribe({ next: () => this.finish('Player removed.') });
    else {
      this.store.remove('PlayerVideoLink', link.id);
      this.finish('Player removed.');
    }
  }
  openComment() {
    this.commentForm = {
      comment: '',
      timeSecond: 0,
      commentType: 'General',
      visibility: 'Team',
    };
    this.dialog = 'comment';
  }
  saveComment() {
    if (!this.selected || !String(this.commentForm['comment'] || '').trim()) {
      this.notify('Please write a comment.');
      return;
    }
    const values = {
      name: 'Coach comment',
      video: this.selected.id,
      organization: 'org-future',
      user: 'demo-user',
      status: 'Active',
      ...this.commentForm,
    };
    if (this.mode.mode() === 'live') {
      this.api.addVideoComment(this.selected.id, values).subscribe({
        next: () => this.finish('Comment added.'),
        error: () => this.notify('Comment could not be added.'),
      });
      return;
    }
    try {
      this.store.create('VideoComment', values as any);
      this.finish('Comment added.');
    } catch (e) {
      this.notify(
        e instanceof Error ? e.message : 'Comment could not be added.'
      );
    }
  }
  onFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.file = undefined;
    if (!file) return;
    const readFile = () => {
      this.mediaFileReading = true;
      const reader = new FileReader();
      reader.onload = () => {
        const data = String(reader.result || '');
        this.file = {
          name: file.name,
          type: file.type || 'application/octet-stream',
          contents: data.split(',')[1] || data,
        };
        this.mediaFileReading = false;
      };
      reader.onerror = () => {
        this.mediaFileReading = false;
        input.value = '';
        this.notify('The selected file could not be read.');
      };
      reader.readAsDataURL(file);
    };
    if (!file.type.startsWith('video/')) {
      readFile();
      return;
    }
    this.mediaFileReading = true;
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      const duration = video.duration;
      URL.revokeObjectURL(video.src);
      if (!Number.isFinite(duration) || duration <= 0 || duration > 60.05) {
        input.value = '';
        this.mediaFileReading = false;
        this.notify(duration > 60.05 ? 'Video must be one minute or shorter.' : 'The video duration could not be detected.');
        return;
      }
      this.videoForm['durationSeconds'] = Math.ceil(duration);
      readFile();
    };
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      input.value = '';
      this.mediaFileReading = false;
      this.notify('The selected video is not valid.');
    };
    video.src = URL.createObjectURL(file);
  }
  duration(seconds: unknown) {
    const value = Number(seconds || 0);
    return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
  }
  tagPosition(tag: DocumentedEntity) {
    return Math.min(
      100,
      Math.max(
        0,
        (100 * Number(tag['timeSecond'] || 0)) /
          Number(this.selected?.['durationSeconds'] || 1)
      )
    );
  }
  playable(video: DocumentedEntity) {
    const url = String(video['externalUrl'] || '');
    return /\.(mp4|webm|ogg)(\?|$)/i.test(url) ? url : '';
  }
  isImage(media: DocumentedEntity) {
    const contentType = String(media['contentType'] || '').toLowerCase();
    const mediaType = String(media['mediaType'] || '').toLowerCase();
    const fileName = String(media['fileName'] || media['filePath'] || '');
    return (
      contentType.startsWith('image/') ||
      ['photo', 'image'].includes(mediaType) ||
      /\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/i.test(fileName)
    );
  }
  thumbnail(video: DocumentedEntity) {
    return String(video['thumbnail'] || video['_generatedThumbnail'] || '');
  }
  private prepareThumbnails() {
    for (const video of this.videos) {
      if (video['thumbnail'] || video['_generatedThumbnail']) continue;
      const cacheKey = `sports_video_thumbnail:${video.id}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        video['_generatedThumbnail'] = cached;
        // Older cached thumbnails may have been generated before the list API
        // exposed a media type or duration. Keep probing those records so the
        // card can distinguish photos and show the real video length.
        if (this.isImage(video) || Number(video['durationSeconds']) > 0)
          continue;
      }
      const direct = this.playable(video);
      if (direct) this.captureThumbnail(video, direct);
      else if (
        this.mode.mode() === 'live' &&
        (video['externalStorageKey'] ||
          video['attachmentId'] ||
          video['downloadPath'] ||
          video['filePath'])
      )
        this.api.downloadVideo(video).subscribe((blob) => {
          if (this.isImage(video) || blob.type.startsWith('image/')) {
            video['contentType'] = blob.type || 'image/*';
            video['mediaType'] = 'photo';
            const reader = new FileReader();
            reader.onload = () =>
              (video['_generatedThumbnail'] = String(reader.result || ''));
            reader.readAsDataURL(blob);
            return;
          }
          const url = URL.createObjectURL(blob);
          this.captureThumbnail(video, url, true);
        });
    }
  }
  private captureThumbnail(
    record: DocumentedEntity,
    source: string,
    revoke = false
  ) {
    const media = document.createElement('video');
    media.muted = true;
    media.preload = 'metadata';
    media.playsInline = true;
    media.onloadedmetadata = () => {
      if (Number.isFinite(media.duration) && media.duration > 0)
        record['durationSeconds'] = Math.round(media.duration);
      media.currentTime = Math.min(0.25, Math.max(0, media.duration / 20));
    };
    media.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 480;
      canvas.height = 270;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(media, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL('image/jpeg', 0.72);
        record['_generatedThumbnail'] = image;
        try {
          localStorage.setItem(`sports_video_thumbnail:${record.id}`, image);
        } catch {}
      }
      if (revoke) URL.revokeObjectURL(source);
    };
    media.onerror = () => {
      if (revoke) URL.revokeObjectURL(source);
    };
    media.src = source;
  }
  private releaseVideo() {
    if (this.videoSource.startsWith('blob:'))
      URL.revokeObjectURL(this.videoSource);
    this.videoSource = '';
    this.videoError = '';
    this.videoLoading = false;
  }
  private assign(entity: string, data: DocumentedEntity[]) {
    if (entity === 'SportsVideo') {
      this.videos = data;
      this.prepareThumbnails();
    } else if (entity === 'SportsPlayer') {
      this.players = data;
      if (this.isPlayerLogin && !this.currentPlayerId) {
        this.currentPlayerId = this.findLoggedInPlayer()?.id || '';
        if (this.currentPlayerId && this.dialog === 'video')
          this.videoForm['playerId'] = this.currentPlayerId;
      }
    }
    else if (entity === 'PlayerVideoLink') this.links = data;
    else if (entity === 'VideoComment') this.comments = data;
    else this.tags = data;
  }
  private finish(message: string) {
    this.dialog = '';
    this.load();
    this.notify(message);
  }
  private notify(message: string) {
    this.toast = message;
    setTimeout(() => (this.toast = ''), 2600);
  }
  private findLoggedInPlayer() {
    const name = this.auth.currentUser.name.toLowerCase();
    const email = this.auth.currentUser.email.toLowerCase();
    return this.players.find(
      (item) =>
        String(item['name'] || '').toLowerCase() === name ||
        String(item['emailAddress'] || item['email'] || '').toLowerCase() ===
          email
    );
  }
  private extractPlayerId(profile: any): string {
    const direct = [
      profile?.player?.record?.id,
      profile?.player?.record?.playerId,
      profile?.player?.data?.id,
      profile?.player?.id,
      profile?.playerId,
      profile?.sportsUserProfile?.playerId,
      profile?.profile?.playerId,
      profile?.userProfile?.playerId,
    ].find((value) => typeof value === 'string' && value.length > 0);
    if (direct) return direct;

    const pending: any[] = [profile];
    const visited = new Set<any>();
    while (pending.length) {
      const value = pending.shift();
      if (!value || typeof value !== 'object' || visited.has(value)) continue;
      visited.add(value);
      if (typeof value.playerId === 'string' && value.playerId)
        return value.playerId;
      pending.push(...Object.values(value));
    }
    return '';
  }
}
