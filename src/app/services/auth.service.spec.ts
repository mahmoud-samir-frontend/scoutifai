import { AuthService, UserRole } from './auth.service';

describe('AuthService demo accounts', () => {
  let service: AuthService;
  let navigatedTo = '';

  beforeEach(() => {
    localStorage.clear();
    service = new AuthService({ navigate: (parts: string[]) => { navigatedTo = parts.join('/'); }, navigateByUrl: () => undefined } as never, {} as never);
  });

  it('provides a working account for every supported role', () => {
    const roles: UserRole[] = ['SuperAdmin','OrganizationAdmin','ClubAdmin','TeamManager','Coach','FitnessCoach','Doctor','Physiotherapist','Player','Parent','Scout','DataAnalyst'];
    expect(new Set(service.demoUsers.map(user => user.role))).toEqual(new Set(roles));
    for (const user of service.demoUsers) {
      expect(service.login(user.email, user.password)).withContext(user.role).toBeTrue();
      expect(JSON.parse(localStorage.getItem('sports_user') || '{}').role).toBe(user.role);
      expect(navigatedTo).withContext(user.role).toBe('/dashboard');
    }
  });

  it('registers, persists, and signs in a new demo account by username', () => {
    const result = service.registerDemo({firstName:'Mariam',lastName:'Adel',userName:'mariam.adel',emailAddress:'mariam@futurestars.eg',userTypes:'Coach',password:'Coach@2026'});
    expect(result.ok).toBeTrue();
    expect(service.login('mariam.adel', 'Coach@2026')).toBeTrue();
    expect(service.currentUser.name).toBe('Mariam Adel');
    expect(navigatedTo).toBe('/dashboard');
  });

  it('rejects duplicate demo usernames and emails', () => {
    const payload={firstName:'Mariam',lastName:'Adel',userName:'mariam',emailAddress:'mariam@futurestars.eg',userTypes:'Player',password:'Player@2026'};
    expect(service.registerDemo(payload).ok).toBeTrue();
    expect(service.registerDemo(payload).ok).toBeFalse();
  });
});
