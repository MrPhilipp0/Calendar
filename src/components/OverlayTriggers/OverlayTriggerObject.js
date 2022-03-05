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

// Wyświetlanie krótkiego tekstu przy danym elemencie (np. button) po operacji hover / focus / click 

const OverlayTriggerObject = ({ref, id, placement, text, object}) => {
  return ( 
    <OverlayTrigger
        ref={ref}
        key={id + '_overlayTrigger'}
        placement={placement}
        overlay={
          <Popover>
            <Popover.Body>
              {text} 
            </Popover.Body>
          </Popover>
        }>
        {object}
      </OverlayTrigger>
   );
}
 
export default OverlayTriggerObject;