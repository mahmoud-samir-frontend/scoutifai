import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandLogoComponent } from '../../../shared/components/brand-logo/brand-logo.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AppIconComponent } from '../../../shared/components/app-icon/app-icon.component';
import { LanguageService } from '../../../services/language.service';
import { DataModeService } from '../../../services/data-mode.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppToastComponent } from '../../../shared/components/app-toast/app-toast.component';
@Component({ selector:'app-login', standalone:true, imports:[CommonModule, FormsModule, RouterLink, BrandLogoComponent, AppIconComponent, AppToastComponent], templateUrl:'./login.component.html', styleUrl:'./login.component.scss' })
export class LoginComponent {
  email=''; password=''; remember=false; error=''; showPassword=false;
  busy=false; success='';
  toastType:'success'|'error'='success';toastMessage='';private toastTimer?:ReturnType<typeof setTimeout>;
  constructor(public auth:AuthService,public language:LanguageService,public dataMode:DataModeService,route:ActivatedRoute){const registeredUsername=route.snapshot.queryParamMap.get('username');const rememberedUsername=localStorage.getItem('sports_remembered_username');if(registeredUsername)this.email=registeredUsername;else if(rememberedUsername){this.email=rememberedUsername;this.remember=true;}if(route.snapshot.queryParamMap.get('registered'))this.showToast(this.language.text('Account created successfully. You can sign in now.','تم إنشاء الحساب بنجاح. يمكنك تسجيل الدخول الآن.'),'success');}
  useAccount(email:string,password:string){this.email=email;this.password=password;this.error='';}
  submit(){this.error='';if(this.dataMode.mode()==='demo'){if(!this.auth.login(this.email,this.password)){this.showToast(this.language.text('Username or password is incorrect.','اسم المستخدم أو كلمة المرور غير صحيحة.'),'error');return;}this.updateRememberedUsername();return;}this.busy=true;this.auth.loginLive(this.email,this.password).subscribe({next:()=>this.updateRememberedUsername(),error:(response)=>{this.busy=false;const message=response?.status===401?this.language.text('Username or password is incorrect.','اسم المستخدم أو كلمة المرور غير صحيحة.'):this.language.text('Unable to sign in. Please check the server and try again.','تعذر تسجيل الدخول. تحقق من الخادم وحاول مرة أخرى.');this.showToast(message,'error');},complete:()=>this.busy=false});}
  showToast(message:string,type:'success'|'error'){this.toastMessage=message;this.toastType=type;clearTimeout(this.toastTimer);this.toastTimer=setTimeout(()=>this.toastMessage='',5000);}
  private updateRememberedUsername(){if(this.remember)localStorage.setItem('sports_remembered_username',this.email.trim());else localStorage.removeItem('sports_remembered_username');}
}
