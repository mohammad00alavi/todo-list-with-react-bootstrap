import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import {Col, Row, Container, ListGroup, Badge} from 'react-bootstrap';


export default function TodoList() {
  const [todo, setTodo] = useState({ todos: [] });

  function create(newTodo) {
    setTodo({
      todos: [...todo.todos, newTodo],
    });
  }

  function remove(id) {
    setTodo({
      todos: todo.todos.filter((t) => t.id !== id),
    });
  }

  function update(id, updatedTask) {
    const updatedTodos = todo.todos.map((td) => {
      if (td.id === id) {
        return { ...td, task: updatedTask };
      }
      return td;
    });
    setTodo({ todos: updatedTodos });
  }

  function toggleCompletion(id) {
    const updatedTodos = todo.todos.map((td) => {
      if (td.id === id) {
        return { ...td, completed: !td.completed };
      }
      return td;
    });
    setTodo({ todos: updatedTodos });
  }

  const todos = todo.todos.map((td) => {
    return (
      <Todo
        task={td.task}
        key={td.id}
        id={td.id}
        completed={td.completed}
        removeTodo={remove}
        updateTodo={update}
        toggleTodo={toggleCompletion}
      />
    );
  });
  return (
      <Container className="TodoList">
        <Row className="justify-content-md-center">
          <Col xs={8}>
            <h2>Todo List <Badge variant="info">{todos.length}</Badge></h2>
          </Col>
        </Row>
        <TodoForm createTodo={create} />
        <Row className="justify-content-md-center">
          <Col xs={8}>
            <ListGroup as='ul' className='TodosContainer'>
              {todos}
            </ListGroup>
          </Col>
        </Row>
      </Container>
  );
}
