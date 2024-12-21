import { inject, Injectable, signal } from '@angular/core';
import {  ITask } from '../models/task.model';
import { Task } from '../../pages/tasks/tasks.component';
import { ILogin } from '../models/auth.mode';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  currentUser = signal<ILogin | null>(null);

    private localStorageKey = 'tasks';

    constructor() {}


    getTask(id:number) : ITask | any {
        const tasksJson = localStorage.getItem(this.localStorageKey);
        const tasks: ITask[] = tasksJson ? JSON.parse(tasksJson): [];
        console.log(id);
        console.log(tasks);
        console.log(tasks.find((n) => n.id==id));
        return tasks.find((n) => n.id==id)
    }

    addTask(task: ITask): ITask {
        let tasks: ITask[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]')
        task.id = this.genetateId();
        tasks.push({ ...task, id: Date.now() });
        localStorage.setItem(this.localStorageKey, JSON.stringify(tasks))
        return task;
      }
      
      delete(id:number):void {
        let tasks:ITask[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]')
        const index = tasks.findIndex(n=>n.id===id);
        if(index !==-1){
            tasks.slice(index,1);
            localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
        }
      }

    private genetateId(): number {
        const tasks:ITask[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
        const ids = tasks.map(task => task.id);
        const maxId = Math.max(...ids);
        return maxId >= 0 ? maxId+1 :0
    }
     
}
