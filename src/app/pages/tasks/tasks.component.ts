import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { ITaskPriority, ITaskStatus, ITaskType, TaskCardComponent } from '../../shared/components/task-card/task-card.component';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITask } from '../../core/models/task.model';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskCardComponent, SlidePanelComponent, ReactiveFormsModule, RouterOutlet, FormsModule, FontAwesomeModule, CommonModule, DatePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  taskService = inject(TaskService);
  faCoffee = faCoffee;
  faEdit = faEdit;
  faTrash = faTrash;
  //@Input() task!: ITask;//
  taskObj: Task = new Task();
  sortBy: string = '';
  searchText: string = '';
  taskList: Task[] = [];
  selectedTask: any = null;
  taskForm: FormGroup;
  taskStatus = ITaskStatus;
  taskPriority = ITaskPriority;
  isSlidePanelOpen = false;
  taskId: number | null = null;
  taskCreated = false;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router:Router, falconLibrary: FaIconLibrary){
    falconLibrary.addIcons(faPlus);
      this.taskForm = this.formBuilder.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        priority: new FormControl('Low', [Validators.required]),
        status: new FormControl('Open', [Validators.required]),
        dueDate: new FormControl(null, [Validators.required]),
      });
  }

  
  ngOnInit(): void {
    const presentData = localStorage.getItem("createdtask");
    if (presentData != null) {
      this.taskList = JSON.parse(presentData);
    }
  }


    saveTask() {
      const presentData = localStorage.getItem("createdtask");
      const taskToSave = {
        ...this.taskObj,
        ...this.taskForm.value,
          dueDate: this.taskForm.get('dueDate')?.value ? new Date(this.taskForm.get('dueDate')?.value).toISOString() : null,

      };
      if (presentData != null) {
        const presentArray = JSON.parse(presentData);
        taskToSave.id = presentArray.length + 1;
        presentArray.push(taskToSave);
        this.taskList = presentArray.map((task: ITask) => this.transformToTask(task));
        localStorage.setItem("createdtask", JSON.stringify(presentArray))
      } else {
        const newArray = [];
        taskToSave.id = 1;
        newArray.push(taskToSave);
        this.taskList = newArray.map(task => this.transformToTask(task));
        localStorage.setItem("createdtask", JSON.stringify(newArray))
      }
      this.onCloseSlidePanel()
    }


  transformToTask(task: ITask): Task {
    return {
      ...task,
      dueDate: new Date(task.dueDate)
    };
  }

  onEdit(item: Task){
    this.taskObj = item;
    this.openSlidePanel();
  }


  updateTask() {
    debugger;
    const formValues = this.taskForm.value;
    const currentTaskIndex = this.taskList.findIndex(m => m.id === this.taskObj.id);

    if (currentTaskIndex !== -1) {
        this.taskList[currentTaskIndex] = {
            ...this.taskList[currentTaskIndex],
            ...formValues
        };

        localStorage.setItem("createdtask", JSON.stringify(this.taskList));
        alert("Task updated successfully");
        this.onCloseSlidePanel();
    }
}


  onDelete(item: Task){
    const isDelete = confirm("Are you sure you want to delete this task?");
    if(isDelete) {
      const currentTask = this.taskList.findIndex(m => m.id === item.id);
      if(currentTask !== -1) {
        this.taskList.splice(currentTask, 1);
        localStorage.setItem("createdtask", JSON.stringify(this.taskList));
        alert("Task deleted");
        this.onCloseSlidePanel();
      }else {
        alert("Task not found. Unable to delete");
      }

    }

  }

  onFilter() {
    debugger
    const presentData = localStorage.getItem("createdtask");
    if (presentData != null) {
      const localData = JSON.parse(presentData);
      if (this.sortBy == "Priority") {
        const filteredData = localData.filter((m:Task) => m.priority.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()))
        this.taskList = filteredData;
      }
      if (this.sortBy == "Status") {
        const filteredData = localData.filter((m:Task) => m.status.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()))
        this.taskList = filteredData;
      }
    } 
  }  


  isOverdue(dueDate: Date): boolean {
    const dueDateObj = new Date(dueDate);
  
    if (isNaN(dueDateObj.getTime())) {
      return false;
    }
  
    return dueDateObj < new Date();
  }


  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.taskObj = new Task();
    this.isSlidePanelOpen = false;
  }

  onSubmit(){
    if (this.taskForm.valid) {

    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  openTaskModal(task: any) {
    this.selectedTask = task;
  }

  closeTaskModal() {
    this.selectedTask = null;
  }

  onModalContentClick(event: MouseEvent) {
    event.stopPropagation();
  }  

}

  export class Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    status: ITaskType;
    priority: ITaskPriority;

    constructor() {
      this.id = 0;
      this.title = '';
      this.description = '';
      this.dueDate = new Date();
      this.status = 'Open';
      this.priority = 'High';
    }

}
