import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import gsap from 'gsap';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../core/services/loader.service';
// import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
declare const google: any; // Add at the top of your component

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit , OnInit {
  loginForm: FormGroup;
  returnUrl!: string;
  // socialUser?: SocialUser;
  isLoggedin?: boolean;

  @ViewChild('bgEl') bg!: ElementRef;
  @ViewChild('formEl') form!: ElementRef;
  @ViewChild('containerEl') container!: ElementRef;
  t1 = gsap.timeline();

  ngAfterViewInit(): void {
    this.t1
    .from(this.bg.nativeElement, {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: 'power2.inOut',
  })
  .from(this.container.nativeElement, {
      duration: 1,
      opacity: 0,
      ease: 'power2.inOut',
  },'>-.5')
  .from(this.form.nativeElement.children, {
      duration: .7,
      opacity: 0,
      y: 50,
      stagger:{
        amount:.1
      },
      ease: 'power2.inOut', 
  },'>-.5')
}


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService : UserService,
    private activeRoute: ActivatedRoute,
    private toast : ToastrService,
    private loadingService:LoaderService,
    // private socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });


  }
  ngOnInit(): void {
    (window as any).handleCredentialResponse = this.handleCredentialResponse.bind(this);
  
    const interval = setInterval(() => {
      if (typeof google !== 'undefined' && google.accounts?.id) {
        clearInterval(interval);
  
        google.accounts.id.initialize({
          client_id: '207869563888-ampsencfvdkvrvis9r2k0gcc3uhk6m33.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this),
          auto_select: true, // ✅ enables automatic login if user has previously approved
          cancel_on_tap_outside: true, // ✅ enables cancel button
          context: 'signin', // ✅ enables one-tap sign-up
          prompt: 'select_account', // ✅ enables account selection
        });
  
        google.accounts.id.renderButton(
          document.getElementById("googleButtonDiv"),
          {
            theme: "outline",      // "outline" | "filled_blue" | "filled_black"
            size: "large",         // "small" | "medium" | "large"
            text: "continue_with",   // "signin_with" | "signup_with" | "continue_with"
            shape: "pill",  // "rectangular" | "pill" | "circle" | "square"
            logo_alignment: "center" // "left" | "center"
          }
        );
      }
    }, 100);
  }
  

  // signInWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  onSubmit() {
    const loginBtn = document.querySelector('.login-btn');
    if (this.loginForm.valid) {
      loginBtn?.classList.add('loading');
      this.userService.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loadingService.showLoader()
          setTimeout(() => {
            this.router.navigateByUrl('app/dashboard');
            loginBtn?.classList.remove('loading');
            this.toast.clear()
          }, 1000);
        },
        error:(err)=>{
          console.log(err);
          loginBtn?.classList.remove('loading');
          this.toast.error(err.error.message)
        }
       
      });
    } else {
      console.log('Form is invalid');
      loginBtn?.classList.remove('loading');

    }
  }
  handleCredentialResponse(response: any) {
    const idToken = response.credential;
  
    this.userService.loginWithGoogle(idToken).subscribe({
      next: (res) => {
        this.loadingService.showLoader()
        setTimeout(() => {
          this.router.navigateByUrl('app/dashboard');
          this.toast.clear()
        }, 1000);
      },
      error:(err)=>{
        console.log(err);
        this.toast.error('Failed to Login')
      }
    });
  }
  
}
