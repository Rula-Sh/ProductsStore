import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  userEmail: string = '';
  submitLogin() {
    const { email, password } = this.loginForm.value;

    this.userService.getAllUsers().subscribe((users) => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      console.log('user', user);
      if (user) {
        this.authService.login(user); // pass the user object
        const redirectUrl = this.authService.getRedirectURL();
        console.log('redirectUrl', redirectUrl);
        if (redirectUrl) {
          this.router.navigateByUrl(redirectUrl); // if redirectUrl is not null redirect the user to redirectUrl
          this.authService.setRedirectUrl('');
        } else {
          this.router.navigate(['/']); // if redirectUrl is null redirect to home redirectUrl
        }
      } else {
        alert('Invalid credentials');
      }
      this.loginForm.reset();
    });
  }
}
