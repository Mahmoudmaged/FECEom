import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
declare let $: any;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  errorMessage: boolean = false;
  emailGlobal: String = ''
  message: String = '';
  loginError: boolean = false;
  loginErrorMessage: any;
  load: boolean = false;
  load2: boolean = false;
  decoded: any;
  constructor(private _AuthService: AuthService, public _Router: Router) {

    $("#SuperAdmin").show()
    $(".nav-signUp").show()
    $(".nav-login , .nav-link , .nav-logout").hide()
    localStorage.clear();
  }



  ngOnInit(): void {

  }
  showPassword(action: string, id: string) {

    if (action == 'show') {
      $(`#${id}`).siblings(".fa-eye-slash").hide()
      $(`#${id}`).siblings(".fa-eye").show()
      $(`#${id}`).attr("type", "text")
    } else {
      $(`#${id}`).siblings(".fa-eye").hide()
      $(`#${id}`).siblings(".fa-eye-slash").show()
      $(`#${id}`).attr("type", "password")

    }

  }


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  forgetCode = new FormGroup({
    code: new FormControl('', [Validators.required])
  })

  resetForgetPassword = new FormGroup({
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
    repeatPassword: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required])
  })
  handelSignIn() {
    this.load = true;
    console.log({ rem: $(".checkBoxInput").is(":checked") });

    let Data = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    }
    this._AuthService.signIn(Data).subscribe(res => {

      this.load = false;
      //set token localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      //redirect homePage
      this._Router.navigateByUrl("/admin")
      //Navigate DashBored
      this.loginForm.reset();

    },
      err => {
        this.load = false;
        this.loginError = true;
        const { message } = err.error
        console.log(message);
        if (message == 'Validation error') {
          this.loginErrorMessage = "In-valid data please enter valid data";
        } else if (message == "Email not Exist") {
          this.loginErrorMessage = "This user is not registered please signUp first";
        } else if (message == "Email not confirmed yet") {
          this.loginErrorMessage = "Please confirm your email";
        } else if (message == "In-valid Password") {
          this.loginErrorMessage = "Please enter the correct password";
        } else {
          // this.loginErrorMessage = `${message}`;
          this.loginErrorMessage = `In-valid login data`;

        }
      }
    )
  }

  handelSendCode() {
    this.load = true;

    let Data = {
      email: this.loginForm.controls.email.value,
      code: this.forgetCode.controls.code.value,
    }
    this._AuthService.signIn(Data).subscribe(res => {
      if (res.message == "Done") {
        this.load = false;
        //set token localStorage
        localStorage.setItem('token', res.token);
        //redirect homePage
        this._Router.navigateByUrl("/profile")
        //Navigate DashBored
        this.loginForm.reset();
      }
    },
      err => {
        this.load = false;
        this.loginError = true;
        const { message } = err.error
        console.log(message);
        if (message == 'Validation error') {
          this.loginErrorMessage = "In-valid data please enter valid data";
        } else if (message == "Email not Exist") {
          this.loginErrorMessage = "This user is not registered please signUp first";
        } else if (message == "Email not confirmed yet") {
          this.loginErrorMessage = "Please confirm your email";
        } else if (message == "In-valid Password") {
          this.loginErrorMessage = "Please enter the correct password";
        } else {
          this.loginErrorMessage = `${message}`;
        }
      }
    )
  }

  handelResetForgetPassword() {
    this.load = true;

    let Data = {
      email: this.loginForm.controls.email.value,
      code: this.forgetCode.controls.code.value,
      password: this.resetForgetPassword.controls.password.value,
      repeatPassword: this.resetForgetPassword.controls.repeatPassword.value,
    }
    this._AuthService.signIn(Data).subscribe(res => {
      if (res.message == "Done") {
        this.load = false;
        //set token localStorage
        localStorage.setItem('token', res.token);
        //redirect homePage
        this._Router.navigateByUrl("/profile")
        //Navigate DashBored
        this.loginForm.reset();
      }
    },
      err => {
        this.load = false;
        this.loginError = true;
        const { message } = err.error
        console.log(message);
        if (message == 'Validation error') {
          this.loginErrorMessage = "In-valid data please enter valid data";
        } else if (message == "Email not Exist") {
          this.loginErrorMessage = "This user is not registered please signUp first";
        } else if (message == "Email not confirmed yet") {
          this.loginErrorMessage = "Please confirm your email";
        } else if (message == "In-valid Password") {
          this.loginErrorMessage = "Please enter the correct password";
        } else {
          this.loginErrorMessage = `${message}`;
        }
      }
    )
  }
}
