import { Component, Input } from '@angular/core';
import { ITask } from '../../../core/models/task.model';

export type ITaskType = 'Open' | 'In-Progress' | 'Pending' |'Completed';
export type ITaskPriority = 'Low' | 'Medium' | 'High';
export const ITaskPriority = ['Low', 'Medium', 'High'];
export const ITaskStatus = ['Open', 'In-Progress', 'Pending', 'Completed'];

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() type!: ITaskType;
  @Input() priority!: ITaskPriority;
  @Input() task!: ITask;
  
}

