import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppIconComponent } from '../app-icon/app-icon.component';

@Component({
  selector:'app-toast',
  standalone:true,
  imports:[CommonModule,AppIconComponent],
  template:`<aside *ngIf="message" class="toast" [class.error]="type==='error'" role="alert" aria-live="assertive"><span class="status"><app-icon [name]="type==='success'?'check':'medical'"/></span><div><strong>{{type==='success'?'Success':'Something went wrong'}}</strong><p>{{message}}</p></div><button type="button" (click)="closed.emit()" aria-label="Close notification">×</button></aside>`,
  styles:[`:host{position:fixed;z-index:1000;top:24px;right:24px}.toast{width:min(390px,calc(100vw - 32px));display:grid;grid-template-columns:38px 1fr 24px;gap:11px;align-items:start;padding:15px 14px;border:1px solid #bce3ca;border-radius:13px;background:#f5fff8;color:#174c2d;box-shadow:0 14px 38px #142a1f2b;animation:enter .25s ease-out}.status{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;background:#dff5e7;color:#08743f}.status app-icon{width:19px;height:19px}.toast strong{font-size:13px}.toast p{margin:4px 0 0;font-size:12px;line-height:1.5;color:#4d6858}.toast button{border:0;background:transparent;color:#789084;font-size:20px;line-height:1;padding:0}.toast.error{border-color:#f0c5c5;background:#fff8f8;color:#8e2424}.toast.error .status{background:#ffe4e4;color:#d33d3d}.toast.error p{color:#795050}@keyframes enter{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}@media(max-width:520px){:host{top:16px;right:16px}}`]
})
export class AppToastComponent{@Input() message='';@Input() type:'success'|'error'='success';@Output() closed=new EventEmitter<void>();}
