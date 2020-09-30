import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Button, Form, Col, Row } from "react-bootstrap";

export default function TodoForm(props) {
	const [task, setTask] = useState({ tasks: "" });
	function handleChange(evt) {
		setTask({
			[evt.target.name]: evt.target.value,
		});
	}

	function allStorage() {
		var values = [],
			keys = Object.keys(localStorage),
			i = keys.length;

		while (i--) {
			values.push(JSON.parse(localStorage.getItem(keys[i])));
		}
		let newValues = values.sort((a, b) => {
			return a.index - b.index;
		});
		return newValues;
	}

	function maxNumber() {
		if (allStorage().length === 0) {
			return null;
		}
		let values = allStorage(),
			valuesLastNum = values[values.length - 1].index,
			num = valuesLastNum + 1;
		return num;
	}

	function number() {
		let keys = Object.keys(localStorage).length;
		let num = keys + 1;
		return num;
	}

	function index() {
		if (maxNumber() > number()) {
			return maxNumber();
		} else {
			return number();
		}
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		props.createTodo({ ...task, id: uuid(), completed: false, index: index() });
		setTask({ tasks: "" });
	}
	return (
		<Form className="TodoForm" onSubmit={handleSubmit}>
			<Row className="justify-content-md-center">
				<Col xs={6}>
					<Form.Control
						type="text"
						placeholder="Enter A Task..."
						size="lg"
						id="task"
						name="task"
						value={task.tasks}
						onChange={handleChange}
						required
					/>
				</Col>
				<Col xs={2}>
					<Button className="addTaskBtn" variant="info" type="submit" size="lg">
						Add Task
					</Button>
				</Col>
			</Row>
		</Form>
	);
}
