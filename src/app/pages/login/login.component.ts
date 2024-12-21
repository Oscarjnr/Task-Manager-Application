import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../../core/models/auth.mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  router = inject(Router);
  currentUser = signal<ILogin| null>(null);
  isLoginView: boolean = true;

  constructor(private formB: FormBuilder) {
    this.loginForm = this.formB.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }



  registerObj: any = {
    email: '',
    password: ''
  }

  loginObj: any = {
    email: '',
    password: ''
  }

 /* onSubmit() {
    if (this.loginForm.valid) {

    } else {
      this.loginForm.markAllAsTouched();
    }
  }*/

  onRegister() {
    debugger;
    const localData = localStorage.getItem("taskmanageruser");
    if (localData != null) {
      const localArray = JSON.parse(localData);
      localArray.push(this.registerObj);
      localStorage.setItem("taskmanageruser", JSON.stringify(localArray))
    } else {
      const localArray = [];
      localArray.push(this.registerObj);
      localStorage.setItem("taskmanageruser", JSON.stringify(localArray))
    }
    alert("User Registered");
  }

  onLogin() {
    debugger  
    const localData = localStorage.getItem("taskmanageruser");
    if (localData != null) {
      const users = JSON.parse(localData);

      const isUserFound = users.find((m:any) => m.email == this.loginObj.email && m.password == this.loginObj.password)
      if (isUserFound != undefined) {
        this.router.navigateByUrl('task')
        this.currentUser.set(users);
      } else {
        alert("Wrong email or password")
      }
    }
  }


  setCurrentUser() {
    const localData = localStorage.getItem("taskmanageruser");
    if (!localData) return;
    const user = JSON.parse(localData);
    this.currentUser.set(user);
  }

}