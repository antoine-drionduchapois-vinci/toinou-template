import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../auth/token.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, TokenService],
})
export class LoginComponent {
  //TODO login page
  user: User;
  email = '';
  password = '';

  @ViewChild('form') form: NgForm;

  constructor(
    private readonly authServvice: AuthService,
    private readonly router: Router
  ) {}

  async login() {
    try {
      if (!this.form.valid) {
        console.error('Field missing');
      }
      const result = await this.authServvice.login(this.email, this.password);
      if (result) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error(error.error.message);
    }
  }
}
