import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UserAuthService } from 'src/app/services/Auth/user-auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,private userAuthService: UserAuthService,private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  hide = true;

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    console.log(loginRequest)
    this.loginService.login(loginRequest).subscribe(
      (response) => {
        console.log(response);
        if(response.jwt!=null){
          alert("Hello, Your token is "+response.jwt);
          // const jwtToken = response.jwt;
          this.userAuthService.setRole(response.role);
          this.userAuthService.setToken(response.jwt);
          // localStorage.setItem('jwt', jwtToken);
          this.router.navigateByUrl("/dashboard");
        }
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
