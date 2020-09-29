import React, { useState } from "react";
import { v4 as uuid} from "uuid";
import {Button, Form, Col, Row} from 'react-bootstrap';

export default function TodoForm(props) {
  const [task, setTask] = useState({ tasks: "" });

  function handleChange(evt) {
    setTask({
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.createTodo({ ...task, id: uuid(), completed: false });
    setTask({ tasks: "" });
  }
  return (
    <Form className="TodoForm" onSubmit={handleSubmit}>
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <Form.Control type="text" placeholder="Enter A Task..." size="lg" id="task" name="task" value={task.tasks} onChange={handleChange} required/>
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
