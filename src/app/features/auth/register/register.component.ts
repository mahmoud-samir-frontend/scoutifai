import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataModeService } from '../../../services/data-mode.service';
import { LanguageService } from '../../../services/language.service';
import { AppIconComponent } from '../../../shared/components/app-icon/app-icon.component';
import { BrandLogoComponent } from '../../../shared/components/brand-logo/brand-logo.component';
import { AppToastComponent } from '../../../shared/components/app-toast/app-toast.component';

@Component({selector:'app-register',standalone:true,imports:[CommonModule,FormsModule,RouterLink,BrandLogoComponent,AppIconComponent,AppToastComponent],templateUrl:'./register.component.html',styleUrl:'../login/login.component.scss'})
export class RegisterComponent {
  busy=false;error='';success='';showPassword=false;
  toastType:'success'|'error'='success';toastMessage='';private toastTimer?:ReturnType<typeof setTimeout>;
  registration={firstName:'',lastName:'',userName:'',emailAddress:'',userTypes:'Player',password:'',confirmPassword:''};
  readonly userTypes=['Player','Coach','Doctor','Parent','Scout','TeamManager','FitnessCoach','Physiotherapist','DataAnalyst'];
  constructor(public auth:AuthService,public language:LanguageService,public dataMode:DataModeService,private router:Router){}
  submit(){
    this.error='';this.success='';const form=this.registration;
    if(!form.firstName.trim()||!form.lastName.trim()||!form.userName.trim()||!form.emailAddress.trim()||!form.password){this.showToast(this.language.text('Please complete all required fields.','يرجى إكمال جميع الحقول المطلوبة.'),'error');return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.emailAddress.trim())){this.showToast(this.language.text('Enter a valid email such as name@example.com.','أدخل بريداً إلكترونياً صحيحاً مثل name@example.com.'),'error');return;}
    if(form.password.length<8){this.showToast(this.language.text('Password must be at least 8 characters.','يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.'),'error');return;}
    if(form.password!==form.confirmPassword){this.showToast(this.language.text('Passwords do not match.','كلمتا المرور غير متطابقتين.'),'error');return;}
    const payload={firstName:form.firstName.trim(),lastName:form.lastName.trim(),userName:form.userName.trim(),emailAddress:form.emailAddress.trim(),userTypes:form.userTypes,password:form.password};this.busy=true;
    if(this.dataMode.mode()==='demo'){const result=this.auth.registerDemo(payload);this.busy=false;if(!result.ok){this.showToast(this.language.text(result.message||'Registration failed.','فشل التسجيل.'),'error');return;}this.router.navigate(['/login'],{queryParams:{registered:'1',username:payload.userName}});return;}
    this.auth.registerLive(payload).subscribe({next:()=>this.router.navigate(['/login'],{queryParams:{registered:'1',username:payload.userName}}),error:(response)=>{this.showToast(response?.error?.message||this.language.text('Registration failed. The username or email may already be in use.','فشل التسجيل. قد يكون اسم المستخدم أو البريد الإلكتروني مستخدماً بالفعل.'),'error');this.busy=false;},complete:()=>this.busy=false});
  }
  showToast(message:string,type:'success'|'error'){this.toastMessage=message;this.toastType=type;clearTimeout(this.toastTimer);this.toastTimer=setTimeout(()=>this.toastMessage='',5000);}
}
