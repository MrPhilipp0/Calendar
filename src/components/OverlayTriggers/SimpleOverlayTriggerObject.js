import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

// const exampleObject = {
//   id: id,
//   text: 'text',
//   placement: 'top',
//   object: 
//   <label>
//     Example Object
//   </label>
// }

const SimpleOverlayTriggerObject = (props) => {
  return ( 
    <OverlayTrigger
        ref={props.ref}
        key={props.id + '_overlayTrigger'}
        placement={props.placement}
        overlay={
          <Popover>
            <Popover.Body>
              {props.text} 
            </Popover.Body>
          </Popover>
        }>
        {props.object}
      </OverlayTrigger>
   );
}
 
export default SimpleOverlayTriggerObject;