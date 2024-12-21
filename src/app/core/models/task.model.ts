import { ITaskType, ITaskPriority } from '../../shared/components/task-card/task-card.component'


export interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: ITaskType;
  priority: ITaskPriority;
}
