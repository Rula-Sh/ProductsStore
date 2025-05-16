import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  userForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  createUser() {
    var user: Omit<User, 'id'> = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: btoa(this.userForm.value.password),
      role: 'Customer',
    };
    this.userService.CreateUser(user).subscribe({
      next: (value) => {
        console.log('Form Submitted');
        this.authService.login(value);
        this.router.navigate(['/']);
        this.userForm.reset();
      },
      error: (err) => {
        console.log('Error on Signup', err);
      },
    });
  }
}

// user = {
//     username: '',
//     email: '',
//     password: '',
//     role: 'customer',
//     id: 0,
//     cart: {
//       id: 0,
//       name: '',
//       price: '',
//       properties: '',
//       image: '',
//       quantity: 0,
//       productTotal: 0,
//     },
//   };
