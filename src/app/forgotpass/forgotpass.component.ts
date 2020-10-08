import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

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
  db: CollectionReference;
  recordpresent: boolean =false;
  docid: string;
  constructor(private fb: FormBuilder,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router ) {
    this.db = afs.collection('student').ref
  }
  ngAfterViewInit(): void {
    window['recaptcha'] = new firebase.auth.RecaptchaVerifier('otpbtn',{
      size :'invisible'
    });
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
      // ...
    }).catch(error=> {

      this.alert = 'bad verification code'
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
    this.db.doc(this.passwordform.value.rollno).get()
    .then(doc=>{
      if(doc.exists && doc.data().phoneno == this.phoneno){
        this.db.doc(doc.id).update({
          password : this.passwordform.value.password
        }).then(result =>{
          console.log(result);
          window.alert('password changed successfuly')
          this.router.navigate(['studentlogin'])
        }).catch(err=>{
          this.alert = "error updating the password"
        })
      }else{
        this.alert = "no record found with this enrollment number and registered phone number";
      }
    }).catch(err=>{
      this.alert = "unknown error occured";
    })

  }

}
