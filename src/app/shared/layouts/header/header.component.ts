import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);
  taskService = inject(TaskService);
  isDropdownOpen = false;



  registerObj: any = {
    email: '',
    password: ''
  }

  loginObj: any = {
    email: '',
    password: ''
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }


  onLogin() {
    const localData = localStorage.getItem("taskmanageruser");
    if (localData != null) {
      const users = JSON.parse(localData);

      const isUserFound = users.find((m:any) => m.email == this.loginObj.email && m.password == this.loginObj.password)
      if (isUserFound != undefined) {
        this.router.navigateByUrl('task')
        this.taskService.currentUser.set(users);
      } else {
        alert("Wrong email or password")
      }
    }
  }

  onLogout(){
    this.taskService.currentUser.set(null);
    this.router.navigate(['/']);
  }
  
}
