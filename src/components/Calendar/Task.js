import React from 'react';
import '../../styles/Task.css';

const Task = (props) => {

  const [editing, setEditing] = React.useState(false); //flaga edytowania
  const [shortText, setShortText] = React.useState(props.shortName); //stan którkiej nazwy
  const [text, setText] = React.useState(props.text); //stan opisu
  const [backText, setBackText] = React.useState({shortText, text}); //backup podczas edycji
  
  const handleSubmit = e => e.preventDefault();

  const handleShortTextChange = e => { //aktualizacja krótkiej nazwy
    setShortText(shortText => e.target.value);
  }

  const handleTextChange = e => { //aktualizacja opisu
    setText(text => e.target.value);
  }

  const handleEditClick = (e) => { //działanie buttona edit
    setEditing(editing => !editing);
    const back = {shortText, text};
    setBackText(backText => back)
  }

  const handleBackClick = () => { //działanie buttona back
    setEditing(editing => !editing);
    setShortText(shortText => backText.shortText)
    setText(text => backText.text);
  }

  const handleSaveClick = () => { //działanie buttona save
    setEditing(editing => !editing);
    props.save(props.id, shortText, text);
  }

  const handleDeleteClick = () => { //działanie buttona delete task
    props.delete(props.id);
  }

  const TaskVariant = () => { //wariant wyświetlania taska, w zależności czy jest w stanie edycji czy nie
    if (editing) {
      return (
        <form onSubmit={handleSubmit}>
          <li>
            <div className='taskArea' >
              <input type='text' value={shortText} onChange={handleShortTextChange}/>
              <textarea cols="25" rows="10" value={text} placeholder="Edit task" onChange={handleTextChange}></textarea>
            </div>
            <div>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleBackClick}>Back</button>
            </div>
          </li>
        </form>
      )
    } else {
      return (
        <li>
          <div className='taskArea' >
            <h3>{shortText}</h3>
            <p>{text}</p>
          </div>
          <div>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        </li>
      )
    }
  }

  return (
    TaskVariant()    
  )
}
 
export default Task;