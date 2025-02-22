import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  returnUrl!: string;

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
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'];
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.router.navigateByUrl(this.returnUrl);
          alert(`hello ${res.user.name}`)
        },
       
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
