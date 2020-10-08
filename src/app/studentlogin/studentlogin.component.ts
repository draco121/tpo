import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit,OnDestroy {

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private router: Router) {
    this.db = this.afs.collection('student').ref;
    this.local = window.sessionStorage;
   }
  ngOnDestroy(): void {

  }

  loginform = this.fb.group({
    rollno: ['', Validators.required],
    password: ['', Validators.required]
  })
  alert: String = null;
  local: Storage
  db :CollectionReference;
  ngOnInit(): void {
  }

  login() {
    this.db.doc(this.loginform.value.rollno).get().then(doc =>{
      if(doc.exists)
      {
        let data = doc.data();
        if(data.password==this.loginform.value.password)
        {
          this.local.setItem('token',stringify(data));
          this.router.navigate(['dashboard'])
        }else{
          this.local.removeItem('token')
          this.alert = "wrong password"
        }

      }else{
        this.alert = "no record found please register"
      }
    }).catch(err=>{
      this.alert ="unknown error occured"
    })
  }

}
