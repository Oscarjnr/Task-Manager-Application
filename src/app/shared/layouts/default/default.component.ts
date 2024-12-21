import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksComponent } from '../../../pages/tasks/tasks.component';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.css'
})
export class DefaultComponent {

}
