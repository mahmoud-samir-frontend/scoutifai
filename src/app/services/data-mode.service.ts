import { Injectable, signal } from '@angular/core';

export type DataMode='demo'|'live';
@Injectable({providedIn:'root'})
export class DataModeService{
  readonly mode=signal<DataMode>((localStorage.getItem('sports_data_mode') as DataMode)||'demo');
  toggle(){this.set(this.mode()==='demo'?'live':'demo');}
  set(mode:DataMode){this.mode.set(mode);localStorage.setItem('sports_data_mode',mode);}
}
