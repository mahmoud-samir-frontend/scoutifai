import { PermissionService } from './permission.service';
import { UserRole } from './auth.service';

describe('PermissionService role matrix', () => {
  beforeEach(() => localStorage.clear());

  function permissions(role: UserRole) { return new PermissionService({currentUser:{role}} as never); }

  it('gives administrators management access', () => {
    for(const role of ['SuperAdmin','OrganizationAdmin','ClubAdmin'] as UserRole[]) expect(permissions(role).access('SportsPlayer')).toBe('manage');
  });

  it('keeps read-only roles from changing records', () => {
    expect(permissions('DataAnalyst').access('SportsPlayer')).toBe('read');
    expect(permissions('Parent').access('SportsPlayer')).toBe('read');
    expect(permissions('Player').access('SportsPlayer')).toBe('read');
    expect(permissions('Player').access('TrainingSession')).toBe('read');
  });

  it('limits specialist roles to their working areas', () => {
    expect(permissions('Doctor').access('PlayerInjury')).toBe('manage');
    expect(permissions('Physiotherapist').access('PlayerInjury')).toBe('read');
    expect(permissions('Scout').access('PlayerEvaluation')).toBe('manage');
    expect(permissions('Coach').access('SportsOrganization')).toBe('none');
  });

  it('keeps player write actions limited to self-service workflows', () => {
    const service=permissions('Player');
    expect(service.canCreate('TrainingAttendance')).toBeFalse();
    expect(service.canCreate('PlayerTask')).toBeFalse();
    expect(service.canEdit('PlayerTask')).toBeTrue();
    expect(service.canCreate('PlayerWellness')).toBeTrue();
    expect(service.canDelete('PlayerWellness')).toBeFalse();
  });
});
