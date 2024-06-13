import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/resetPassword/reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
})
export class ResetPassComponent implements OnInit {
  resetForm: FormGroup;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.required],
      passwordConfirmer: ['', [Validators.required, this.confirmationValide]],
    });

    // Retrieve token from route parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }
  get f() {
    return this.resetForm.controls;
  }
  hidePassword = true;
  hidePasswordConfirmer = true;

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'passwordConfirmer') {
      this.hidePasswordConfirmer = !this.hidePasswordConfirmer;
    }
  }

  confirmationValide = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.resetForm.controls['password'].value) {
      return { passwordMismatch: true };
    }
    return {};
  };

  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    }

    const newPassword = this.resetForm.value.password;
    this.resetPasswordService.resetPassword(this.token, newPassword).subscribe(
      (response: any) => {
        console.log(response);
        // Handle success response
        alert(response); // Display the message as an alert or handle it according to your application's logic
      },
      (error: any) => {
        console.error('Reset Password error:', error);
        // Handle error response
        alert(error.message); // Display the error message as an alert or handle it according to your application's logic
      }
    );
  }


}
