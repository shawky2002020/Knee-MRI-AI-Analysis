import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import gsap from 'gsap';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  returnUrl!: string;

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
    private loadingService:LoaderService

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const loginBtn = document.querySelector('.login-btn');
    if (this.loginForm.valid) {
      loginBtn?.classList.add('loading');
      this.userService.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loadingService.showLoader()
          setTimeout(() => {
            this.toast.success(`Hello ${this.userService.currentUser.name}`)
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
}
