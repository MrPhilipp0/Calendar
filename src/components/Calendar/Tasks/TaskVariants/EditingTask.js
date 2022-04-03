import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { CATEGORIES } from '../../../../store/constants';
import { ReactComponent as EditingTaskSVG } from '../../../../SVG/editingTask.svg';

const margins = 'mt-2 ms-2 fw-bold';

const EditingTask = ({task, handleChange}) => {

  return (
    <Form noValidate onSubmit={e => e.preventDefault()} className="m-2" id={`EdiitngTask${task.id}`}>
      <Row>
        <Col lg={6} className="d-flex justify-content-center mt-4">
          <EditingTaskSVG style={{width:"65%", height:'100%'}}/>
        </Col>
        <Col lg={6}>
        {/* Name */}
        <Form.Group as={Col} lg={12} className="mt-2">
          <Form.Label className={margins}> Name </Form.Label>
          <Form.Control id="inputDescription" type="input" onChange={handleChange} name='name' value={task.name}/>
        </Form.Group>

        {/* Priority */}
        <Form.Group as={Col} lg={12} className="mt-2">
          <Form.Label className={margins}> Priority </Form.Label>
          <Form.Select name='priority' value={task.priority} onChange={handleChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </Form.Select>
        </Form.Group>

        {/* Category */}
        <Form.Group as={Col} lg={12} className="mt-2">
          <Form.Label className={margins}>Category</Form.Label>
          <Form.Select className="ps-2 pe-0" name='category' value={task.category} onChange={handleChange}>
            {CATEGORIES.map((category, index) => <option key={index} value={category}>{category}</option>)}
          </Form.Select>
        </Form.Group>
        
        {/* Time */}
        <Form.Group as={Col} lg={12} className="mt-2">
          <Form.Label className={margins}> Time </Form.Label>
          <Form.Control className="ps-2 pe-2" id="inputTime" type="time" onChange={handleChange} name='time' value={task.time}/>
        </Form.Group>
        
        {/* Date */}
        <Form.Group as={Col} lg={12} className="mt-2">
          <Form.Label className={margins}> Date </Form.Label>
          <Form.Control className="ps-2 pe-2" id="inputDate" type="date" onChange={handleChange} name='date' value={task.idDay.split('.').reverse().join('-')}/>
        </Form.Group>
        

        {/* Description */}
        <Form.Group as={Col} lg={12} className="mt-2">
          <Form.Label className={margins}> Description </Form.Label>
          <Form.Control style={{minHeight:'5rem'}} as="textarea" id="inputDescription" onChange={handleChange} name='text' value={task.text}/>
        </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
 
export default EditingTask;