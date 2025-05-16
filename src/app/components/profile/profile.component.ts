import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
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
import { Router } from '@angular/router';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: User | null = null;
  private userSub!: Subscription;
  profileForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    // this.userSub = this.authService.currentUser$.subscribe((user) => {
    //   this.user = user;
    // });

    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      newPassword: ['', Validators.minLength(6)],
      confirmPassword: ['', Validators.minLength(6)],
    });
    this.loadProfile();
  }

  loadProfile() {
    const profileData = {
      username: this.user?.username,
      email: this.user?.email,
      password: this.user?.password,
    };

    this.profileForm.patchValue(profileData); //usually used to save the form data when navigating beteween forms pages (using api) or when the user wants to update old data
    // patchValue is does not include validations.. but the setValue does????.
    this.profileForm.markAllAsTouched(); // used to validate the data once it is loaded
  }

  UpdateProfile() {
    if (!this.user) return;

    this.userService.getUserById(this.user.id).subscribe((fullUser) => {
      let password = fullUser.password;

      if (
        this.profileForm.value.newPassword ===
          this.profileForm.value.confirmPassword &&
        this.profileForm.value.newPassword.trim() !== ''
      ) {
        password = btoa(this.profileForm.value.newPassword);
      }

      const updatedUser: User = {
        id: this.user!.id,
        username: this.profileForm.value.username,
        email: this.profileForm.value.email,
        password: password,
        role: this.user!.role,
      };

      this.userService.UpdateProfile(updatedUser).subscribe({
        next: () => {
          console.log('Form Submitted');
          this.authService.login(updatedUser);
          this.router.navigate(['/']);
          this.profileForm.reset();
        },
        error: (err) => {
          console.log('Error on Update', err);
        },
      });
    });
  }
}
