import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UserAuthService } from 'src/app/services/Auth/user-auth-service.service';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private toastr: ToastrService,private formBuilder: FormBuilder, private loginService: LoginService,private userAuthService: UserAuthService,private router: Router) {}

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
    this.loginService.login(loginRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle invalid credentials error
          this.toastr.error('Nom d\'utilisateur ou mot de passe invalide', 'Erreur de Connexion');
        } else {
          // Handle other errors
          this.toastr.error('Une erreur s\'est produite lors de la connexion', 'Erreur');
        }
        return of(null); // Return a new observable to complete the stream
      })
    ).subscribe((response) => {
      if (response && response.jwt) {
        // Handle successful login
        this.toastr.success('Connexion réussie !', 'Bienvenue',{closeButton: false,});
        this.userAuthService.setRole(response.role);
        this.userAuthService.setToken(response.jwt);
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 3300);
      }
    });
  }
}
