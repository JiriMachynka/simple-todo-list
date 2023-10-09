"use client";

import { useFormik } from "formik";
import { Todo, TTodo } from "./actions/todo";
import { useState } from "react";
import TodoComponent from "./components/Todo";
import * as Yup from "yup";

const TodoSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required")
});

export default function Home() {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema: TodoSchema,
    onSubmit: (values, { resetForm }) => {
      const { name, description } = values;

      if (editedTodo) {
        const todo = new Todo();
        todo.update(editedTodo.id, name, description);
        setTodos(allTodos => allTodos.map(todo => {
          return {
            ...todo,
            name: todo.id === editedTodo.id ? name : todo.name,
            description: todo.id === editedTodo.id ? description : todo.description
          }
        }));
        setEditedTodo(null);
      } else {
        const todo = new Todo();
        todo.add(name, description);
        
        setTodos(allTodos => {
          return [...allTodos, todo];
        });
      }

      resetForm();
    }
  });

  const [todos, setTodos] = useState<TTodo[]>(JSON.parse(localStorage.getItem("todos") || "[]"));
  const [editedTodo, setEditedTodo] = useState<TTodo | null>(null);

  const handleState = (id: string) => {
    const currentTodo = todos.find(todo => todo.id === id)!;
    setTodos(allTodos => allTodos.map(todo => {
      return {
        ...todo,
        completed: todo.id === id ? !todo.completed : todo.completed
      }
    }));
    new Todo().update(id, currentTodo.name, currentTodo.description, !currentTodo.completed);
  }

  const handleUpdate = (id: string) => {
    const currentTodo = todos.find(todo => todo.id === id)!;
    formik.setFieldValue("name", currentTodo.name);
    formik.setFieldValue("description", currentTodo.description);
    setEditedTodo({
      id: currentTodo.id,
      name: currentTodo.name,
      description: currentTodo.description,
      completed: currentTodo.completed
    });
  }

  const handleDelete = (id: string) => {
    new Todo().remove(id);
    setTodos(allTodos => allTodos.filter(todo => todo.id !== id));
  }

  return (
    <main className="flex flex-col gap-5 max-w-lg mx-auto">
      <h1 className="text-4xl font-bold text-center py-5 tracking-wider underline uppercase">Simple todo app</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="text-lg font-bold">Name:</label>
          <input 
            id="name"
            className="border-2 border-black rounded-md p-2"
            type="text" 
            name="name" 
            onChange={formik.handleChange} 
            value={formik.values.name} 
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 font-bold">{formik.errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="description" className="text-lg font-bold">Description:</label>
          <input 
            id="description"
            className="border-2 border-black rounded-md p-2"
            type="text" 
            name="description" 
            onChange={formik.handleChange} 
            value={formik.values.description} 
          />
          {formik.errors.description && formik.touched.description && (
            <p className="text-red-500 font-bold">{formik.errors.description}</p>
          )}
        </div>
        <input 
          type="submit" 
          className="bg-slate-800 text-lg text-white font-semibold py-3 rounded-md hover:cursor-pointer hover:bg-slate-700" 
          value={editedTodo ? "Edit todo" : "Create todo"} 
        />
      </form>
      {todos.map(todo => {
        return (
          <TodoComponent
            key={todo.id}
            {...todo}
            handleDelete={handleDelete}
            handleState={handleState}
            handleUpdate={handleUpdate}
          />
        );
      })}
    </main>
  )
}
