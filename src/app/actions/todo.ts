import { v4 as uuidv4 } from 'uuid';
import { TTodo } from '../types/types';

export class Todo {
  id: string;
  name: string;
  description: string;
  completed: boolean;

  constructor() {
    this.id = "";
    this.name = "";
    this.description = "";
    this.completed = false;
  }

  add(name: string, description: string) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.completed = false;

    if (typeof window !== 'undefined') {
      const currentTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      localStorage.setItem("todos", JSON.stringify([...currentTodos, this]))
    }
  }

  remove(id: string) {
    if (typeof window !== 'undefined') {
      const currentTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      const newTodos = currentTodos.filter((todo: Todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  }

  update(id: string, name?: string, description?: string, completed?: boolean) {
    if (typeof window !== 'undefined') {
      const currentTodos = JSON.parse(localStorage.getItem("todos") || "[]") as TTodo[];
      const newTodos = currentTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            name: name || todo.name,
            description: description || todo.description,
            completed: completed ?? todo.completed
          }
        }
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  }
}