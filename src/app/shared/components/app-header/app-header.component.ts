import { Component, HostListener, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AppIconComponent } from '../app-icon/app-icon.component';
import { LanguageService } from '../../../services/language.service';
import { DataModeService } from '../../../services/data-mode.service';

@Component({
  selector:'app-header',standalone:true,imports:[RouterLink,AppIconComponent],
  template:`<header><h1>{{title}}</h1><label class="mode-switch" title="Demo / Live"><input type="checkbox" [checked]="dataMode.mode()==='live'" (change)="switchMode()"><span class="mode-track"><i></i></span><b>{{dataMode.mode()==='demo'?'Demo':'Live'}}</b></label><label class="language-switch" [title]="language.language()==='en'?'العربية':'English'"><app-icon name="globe"/><input type="checkbox" [checked]="language.language()==='ar'" (change)="language.toggle()"><span class="language-track"><i></i></span><b>{{language.language()==='en'?'EN':'AR'}}</b></label><div class="user-menu" (click)="$event.stopPropagation()"><button type="button" class="user" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen"><span class="avatar">{{auth.currentUser.initials}}</span><span><b>{{auth.currentUser.name}}</b><small>{{auth.currentUser.role}}</small></span><i>⌄</i></button><nav [class.open]="menuOpen"><a routerLink="/profile" (click)="menuOpen=false"><app-icon name="users"/>{{language.text('My profile','ملفي الشخصي')}}</a><button type="button" (click)="auth.logout()"><app-icon name="logout"/>{{language.text('Sign out','تسجيل الخروج')}}</button></nav></div></header>`,
  styleUrl:'./app-header.component.scss'
})
export class AppHeaderComponent{
  @Input() title='';menuOpen=false;
  constructor(public auth:AuthService,public language:LanguageService,public dataMode:DataModeService){}
  switchMode(){this.dataMode.toggle();location.reload();}
  toggleMenu(){this.menuOpen=!this.menuOpen;}
  @HostListener('document:click') closeMenu(){this.menuOpen=false;}
  @HostListener('document:keydown.escape') closeMenuOnEscape(){this.menuOpen=false;}
}
