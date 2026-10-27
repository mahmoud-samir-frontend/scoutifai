import { LocalEntityStoreService } from './local-entity-store.service';

describe('LocalEntityStoreService CRUD and sorting', () => {
  let store: LocalEntityStoreService;

  beforeEach(() => { localStorage.clear(); store = new LocalEntityStoreService(); });

  it('creates, edits, and deletes a record', () => {
    const created = store.create('Sport', {name:'Futsal',code:'FT',organization:'org',category:'TeamSport',status:'Active'});
    expect(store.get('Sport', created.id)?.name).toBe('Futsal');
    store.update('Sport', created.id, {name:'Indoor Futsal'});
    expect(store.get('Sport', created.id)?.name).toBe('Indoor Futsal');
    store.remove('Sport', created.id);
    expect(store.get('Sport', created.id)).toBeUndefined();
  });

  it('sorts numeric values numerically and dates chronologically', () => {
    store.seed('PlayerWellness', [
      {id:'a',name:'A',player:'p',organization:'o',recordDate:'2026-10-01',sleepHours:10} as never,
      {id:'b',name:'B',player:'p',organization:'o',recordDate:'2026-02-01',sleepHours:2} as never
    ]);
    expect(store.list('PlayerWellness',{sortBy:'sleepHours'}).data.map(item=>item.sleepHours)).toEqual([2,10]);
    expect(store.list('PlayerWellness',{sortBy:'recordDate'}).data.map(item=>item.id)).toEqual(['b','a']);
  });
});
