import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';


const EditingTask = ({task, handleChange}) => {

  const handleSubmit = e => e.preventDefault();

  return (
    <Form noValidate onSubmit={handleSubmit} className="m-2" id={`EdiitngTask${task.id}`}>
      <Row noValidate className="mb-2">

        {/* Short name */}
        <Col sm="6">
          <Form.Group className="mt-0">
            <Form.Label>
              <div className="text-center m-0 p-0"> Short Name </div>
            </Form.Label>
            <Form.Control id="inputShortName" type="text" onChange={handleChange} name='name' value={task.name}/>
          </Form.Group>
        </Col>

        {/* Priority */}
        <Form.Group as={Col} sm="2" className="lh-1 mt-2 mt-sm-0">
          <Form.Label className="mt-2"> Priority </Form.Label>
          <Form.Select name='priority' value={task.priority} onChange={handleChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </Form.Select>
        </Form.Group>

        {/* Category */}
        <Form.Group as={Col} sm="2" className="lh-1 ps-sm-0 mt-2 mt-sm-0">
          <Form.Label className="mt-2">Category</Form.Label>
          <Form.Select className="ps-1 pe-0" name='category' value={task.category} onChange={handleChange}>
            <option value="Shopping">Shopping</option>
            <option value="Working">Working</option>
            <option value="Food">Food</option>
            <option value="Free Time">Free Time</option>
            <option value="Sport">Sport</option>
            <option value="Travel">Travel</option>
            <option value="Holiday">Holiday</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        {/* Time */}
        <Form.Group as={Col} sm="2" className="lh-1 ps-sm-0 mt-2 mt-sm-0">
          <Form.Label className="mt-2"> Time </Form.Label>
          <Form.Control className="ps-1 pe-0" id="inputTime" type="time" onChange={handleChange} name='time' value={task.time}/>
        </Form.Group>
      </Row>

      {/* Description */}
      <Row>
        <Form.Group className="mt-1" as={Col} sm={12}>
          <Form.Label>
            <div className="text-center m-0 p-0"> Description </div>
          </Form.Label>
          <Form.Control style={{minHeight:'5rem'}} as="textarea" id="inputDescription" onChange={handleChange} name='text' value={task.text}/>
        </Form.Group>
      </Row>

    </Form>
  );
}
 
export default EditingTask;