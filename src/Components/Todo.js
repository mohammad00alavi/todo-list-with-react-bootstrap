import React, { useState } from "react";
import {Button, Form, Col, Row, ListGroup} from 'react-bootstrap';


export default function Todo(props) {
  const [task, setTask] = useState({ isEditing: false, task: props.task });

  function handleChange(evt) {
    const inputValue = evt.target.value;
    setTask({ ...task, task: inputValue });
  }
  function handleRemove() {
    props.removeTodo(props.id);
  }
  function toggleForm() {
    setTask({ ...task, isEditing: !task.isEditing });
  }
  function handleUpdate(evt) {
    evt.preventDefault();
    props.updateTodo(props.id, task.task);
    setTask({...task, isEditing: false });
  }
  function handleToggle(evt) {
    props.toggleTodo(props.id);
  }

  let result;
  if (task.isEditing) {
    result = (
      <Form onSubmit={handleUpdate} className="TodoEdit">
        <Row>
          <Col xs={8}>
            <Form.Control type="text" value={task.task} name="task" onChange={handleChange} size="lg"/>
          </Col>
          <Col xs={2}>
            <Button className="updateBtn btn" type="submit" size="md" variant="success">
            Done
            </Button>
          </Col>
        </Row>
      </Form>
    );
  } else {
    result = (
      <Row className="Todo">
        <Col xs={8}>
          <ListGroup.Item as='li' onClick={handleToggle} variant={props.completed ? 'secondary' : null}>{props.task}</ListGroup.Item>
        </Col>
        <Col xs={2}>
          <Button className="editBtn btn" type="submit" size="md" onClick={toggleForm} variant="info">
          Edit
          </Button>
        </Col>
        <Col xs={2}>
          <Button className="removeBtn btn" type="submit" size="md" onClick={handleRemove} variant="danger">
            Delete
          </Button>
        </Col>
      </Row>
    );
  }
  return result;
}
