import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { isNull } from 'util';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit,AfterViewInit {

  isotpsent = false;
  isotpverified = false;
  phoneno:string;
  code: any;
  confirmationResult:any;
  appVerifier :any
  alert: any;
  constructor(private fb: FormBuilder,private afa: AngularFireAuth ) {

  }
  ngAfterViewInit(): void {
    window['recaptcha'] = new firebase.auth.RecaptchaVerifier('recaptcha');
  }
  passwordform = this.fb.group({
    rollno: ['',Validators.required],
    password: ['',Validators.required]
  })

  ngOnInit(): void {
   firebase.initializeApp(environment.firebaseConfig)
  }

  sendotp() {
    let appVerifier = window['recaptcha']
    this.afa.signInWithPhoneNumber(this.phoneno,appVerifier).
    then((confirmationResult)=>{
      this.isotpsent = true;
      window['confirmationresult'] = confirmationResult
    }).catch(err=>{
        this.alert = "error occured"
        console.log(err)
    })
  }

  verifyotp() {
    let confirmationResult = window['confirmationresult']
    confirmationResult.confirm(this.code).then((result)=> {
      // User signed in successfully.
      this.isotpverified = true;
      console.log(result)
      // ...
    }).catch(function (error) {
      console.log(error)
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  validateform() :boolean{
    if(this.passwordform.valid && this.isotpverified==true)
    {
      return false
    }else {
      return true
    }
  }

  setpassword() {

  }

}
