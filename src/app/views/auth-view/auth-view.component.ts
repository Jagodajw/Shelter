import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRootService } from 'src/app/services/auth-root.service';
import { Auth } from './auth-view.interface';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss'],
})
export class AuthViewComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private form: FormBuilder,
    private readonly auth: AuthRootService
  ) {}

  ngOnInit() {
    if (this.auth.isAuthorized) this.router.navigate(['/app-view']);

    this.loginForm = this.form.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  onSubmit() {
    this.auth
      .login(this.loginForm.value as Auth)
      .subscribe(() => this.router.navigate(['/app-view/pets']));
  }
}
