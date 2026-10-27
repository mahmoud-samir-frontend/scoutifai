import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SPORTS_USER_TYPES, SportsApi } from './api';

describe('SportsApi indexed filters', () => {
  let api: SportsApi;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.setItem('sports_user', JSON.stringify({id: 'admin-1'}));
    TestBed.configureTestingModule({providers: [provideHttpClient(), provideHttpClientTesting()]});
    api = TestBed.inject(SportsApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => { http.verify(); localStorage.clear(); });

  it('requests Player users through the permission-aware directory', () => {
    api.list('User', {filters: {userTypes: 'Player'}}).subscribe();
    const request = http.expectOne(item => item.url.endsWith('/SportsUsers'));
    expect(request.request.params.get('userId')).toBe('admin-1');
    expect(request.request.params.get('type')).toBe('Player');
    request.flush({list: [], total: 0});
  });

  it('supports directory lists for every documented sports user type', () => {
    for (const type of SPORTS_USER_TYPES) {
      api.listSportsUsers(type).subscribe();
      const request = http.expectOne(item => item.url.endsWith('/SportsUsers') && item.params.get('type') === type);
      expect(request.request.params.get('userId')).toBe('admin-1');
      request.flush({list: [], total: 0});
    }
  });

  it('gets a complete user by ID before editing', () => {
    api.getUserById('user-1').subscribe(user => {
      expect(user.id).toBe('user-1');
      expect(user['organization']).toBe('organization-1');
    });
    const request = http.expectOne('/Player_Performance/api/v1/User/user-1');
    expect(request.request.method).toBe('GET');
    request.flush({id: 'user-1', organizationId: 'organization-1'});
  });

  it('updates a user by ID with the editable User payload', () => {
    api.updateUser('user-1', {
      firstName: 'Adam',
      organization: 'organization-1',
      userTypes: 'Player',
    }).subscribe();
    const request = http.expectOne('/Player_Performance/api/v1/User/user-1');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({
      firstName: 'Adam',
      organizationId: 'organization-1',
      userTypes: 'Player',
    });
    request.flush({id: 'user-1', firstName: 'Adam'});
  });

  it('creates a user, finds it in its typed directory, deletes it, then confirms it is absent', () => {
    const created = {id:'qa-user-1',name:'QA Coach',userTypes:'Coach'};
    api.create('User', created).subscribe();
    const create = http.expectOne(item => item.url.endsWith('/User'));
    expect(create.request.method).toBe('POST');
    create.flush(created);

    api.listSportsUsers('Coach', {search:'QA Coach'}).subscribe(result => expect(result.data.some(user => user.id === created.id)).toBeTrue());
    const listed = http.expectOne(item => item.url.endsWith('/SportsUsers'));
    expect(listed.request.params.get('q')).toBe('QA Coach');
    listed.flush({list:[created],total:1});

    api.remove('User', created.id).subscribe();
    const removed = http.expectOne(item => item.url.endsWith('/User/qa-user-1'));
    expect(removed.request.method).toBe('DELETE');
    removed.flush({success:true});

    api.listSportsUsers('Coach', {search:'QA Coach'}).subscribe(result => expect(result.data.some(user => user.id === created.id)).toBeFalse());
    http.expectOne(item => item.url.endsWith('/SportsUsers')).flush({list:[],total:0});
  });

  it('does not duplicate Player_Performance in an attachment download path', () => {
    api.downloadVideo({downloadPath: '/Player_Performance/api/v1/Attachment/file/6a943bee9f267913e'}).subscribe();
    const request = http.expectOne('/Player_Performance/api/v1/Attachment/file/6a943bee9f267913e');
    expect(request.request.responseType).toBe('blob');
    request.flush(new Blob());
  });

  it('adds Player_Performance when the attachment path does not include it', () => {
    api.downloadVideo({downloadPath: '/api/v1/Attachment/file/6a943bee9f267913e'}).subscribe();
    const request = http.expectOne('/Player_Performance/api/v1/Attachment/file/6a943bee9f267913e');
    expect(request.request.url).toBe('/Player_Performance/api/v1/Attachment/file/6a943bee9f267913e');
    request.flush(new Blob());
  });

  it('omits empty optional link IDs from create payloads', () => {
    api.create('SportsPlayer', {
      name: 'Player without organization',
      organization: '',
      club: '',
      sport: '',
    }).subscribe();
    const request = http.expectOne('/Player_Performance/api/v1/SportsPlayer');
    expect(request.request.body).toEqual({name: 'Player without organization'});
    request.flush({id: 'player-1', name: 'Player without organization'});
  });
});
