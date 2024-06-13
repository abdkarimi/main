import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forgetPassword/forget-password.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
})
export class ForgetPassComponent implements OnInit {
  forgetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private forgetPasswordService: ForgetPasswordService) {}

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.forgetForm.controls;
  }
  onSubmit() {
    if (this.forgetForm.invalid) {
      return;
    }

    const email = this.forgetForm.value.email;

    console.log(email);

    this.forgetPasswordService.forgetPassword(email).subscribe(
      (response: any) => { // Specify type for response
        console.log(response);
      },
      (error: any) => { // Specify type for error
        console.error('Forget Password error:', error);
      }
    );
  }

}
