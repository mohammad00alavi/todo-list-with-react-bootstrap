import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { Col, Row, Container, ListGroup, Badge } from "react-bootstrap";

export default function TodoList() {

	const [todo, setTodo] = useState({ todos: [] });

	let valueStorage = allStorage();

	useEffect(() => {
    setTodo({
			todos: [...valueStorage],
		});
  },[]);

	function allStorage() {
		var values = [],
			keys = Object.keys(localStorage),
			i = keys.length;

		while (i--) {
			values.push(JSON.parse(localStorage.getItem(keys[i])));
		}
		return values;
	}

	function create(newTodo) {
		setTodo({
			todos: [...todo.todos, newTodo],
		});
		localStorage.setItem(newTodo.id, JSON.stringify(newTodo));
	}

	function remove(id) {
		setTodo({
			todos: todo.todos.filter(t => t.id !== id),
		});
		localStorage.removeItem(id);
	}

	function update(id, updatedTask) {
		const updatedTodos = todo.todos.map(td => {
			if (td.id === id) {
				return { ...td, task: updatedTask };
			}
			return td;
		});
		setTodo({ todos: updatedTodos });
		let localvalue = JSON.parse(localStorage.getItem(id)) ;
		localvalue.task = updatedTask;
		localStorage.setItem(id, JSON.stringify(localvalue))
	}

	function toggleCompletion(id) {
		const updatedTodos = todo.todos.map(td => {
			if (td.id === id) {
				return { ...td, completed: !td.completed };
			}
			return td;
		});
		setTodo({ todos: updatedTodos });
		let localvalue = JSON.parse(localStorage.getItem(id));
		localvalue.completed = !localvalue.completed;
		localStorage.setItem(id, JSON.stringify(localvalue));
	}

	const todos = todo.todos.map(td => {
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
					<h2>
						Todo List <Badge variant="info">{todos.length}</Badge>
					</h2>
				</Col>
			</Row>
			<TodoForm createTodo={create} />
			<Row className="justify-content-md-center">
				<Col xs={8}>
					<ListGroup as="ul" className="TodosContainer">
						{todos}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
}