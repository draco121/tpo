import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit,OnDestroy {

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private router: Router) {
    this.db = this.afs.collection('student').ref;
    this.local = window.sessionStorage
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
    this.db.where('rollno','==',this.loginform.value.rollno).get().
    then((querySnapshot)=>{
      if(querySnapshot.size!==0)
      {
          this.db.where('rollno','==',this.loginform.value.rollno).where('password','==',this.loginform.value.password).limit(1).get().
          then((docs)=>{
            if(docs.size!==0){
             docs.forEach(doc=>{
               let token = doc.data()
               this.local.setItem('token',stringify(token))
               this.router.navigate(['dashboard'])
             })
            }else{
              this.alert = 'wrong enrollment number or password'
            }

          })
      }else{
        this.alert = 'no record found'
      }
    })
  }
}
