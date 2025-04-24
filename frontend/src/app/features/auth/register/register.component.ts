import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, userResponse } from '../../../core/models/user.model';
import gsap from 'gsap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('bgEl') bg!: ElementRef;
  @ViewChild('formEl') form!: ElementRef;
  // @ViewChild('containerEl') container!: ElementRef;
  t1 = gsap.timeline();


  registerForm!: FormGroup;
  returnUrl!: string;
  user!:User;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toast : ToastrService,
    private activeRoute: ActivatedRoute
  ) {
    userService.userObservable.subscribe({
      next:(newuser)=>{
        this.user=newuser;
      }
    })
  }

  ngAfterViewInit(): void {
    const container = document.querySelector('.container') as HTMLElement
    this.t1
    .from(this.bg.nativeElement, {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: 'power2.inOut',
  })
  .from(container, {
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


  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'];
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe({
        next : (res)=>{
          this.toast.success(`Hello ${this.user.name}`)
          this.router.navigateByUrl('app/dashboard');

        }
      })
    }
    else{
      console.log('form is invalid');
      
    }
  }
}
