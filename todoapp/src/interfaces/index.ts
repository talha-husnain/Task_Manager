// interfaces/index.ts
import './index.css';

export interface Task {
  id: number;
  description: string;
  completed: boolean;
  created: Date; // Use string if the date is in ISO format
  priority: 'low' | 'medium' | 'high';
}
