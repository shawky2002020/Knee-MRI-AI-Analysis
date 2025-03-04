import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import gsap from 'gsap';

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
      duration: 1,
      opacity: 0,
      y: 50,
      stagger:{
        amount:1
      },
      ease: 'power2.inOut', 
  },'>-.5')
}


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService : UserService,
    private activeRoute: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.router.navigateByUrl('dashboard');
          alert(`hello ${res.user.name}`)
        },
       
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
