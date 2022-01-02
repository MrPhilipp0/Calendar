import React from 'react';
import '../../styles/Task.css';

const Task = (props) => {

  const [editing, setEditing] = React.useState(false); //flaga edytowania
  const [shortText, setShortText] = React.useState(props.shortName); //stan którkiej nazwy
  const [text, setText] = React.useState(props.text); //stan opisu
  const [check, setCheck] = React.useState(props.checkbox); //stan checkboxa
  const [important, setImportant] = React.useState(props.important); //stan ważności zadania
  const [backText, setBackText] = React.useState({shortText, text}); //backup podczas edycji
  
  const handleSubmit = e => e.preventDefault();

  const handleShortTextChange = e => { //aktualizacja krótkiej nazwy
    e.target.value.length < 16 && setShortText(shortText => e.target.value);
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

  const handleCheckedClick = e => {
    setCheck(check => !check);
    props.check(props.id, e.target.checked);
  }

  const handleImportantChange = e => {
    setImportant(important => Number(e.target.value));
    props.changeImportant(props.id, e.target.value);
  }

  const importantStars = () => {
    let stars = '';
    for (let i=0; i<important; i++) {
      stars += '*';
    }
    return stars;
  }

  const TaskVariant = () => { //Wyświetlania taska, w zależności czy jest w stanie edycji czy nie
    if (editing) {
      return (
        <form onSubmit={handleSubmit}>
          <li>
            <div className='taskArea' >
              <input type='text' value={shortText} onChange={handleShortTextChange}/>
              <textarea cols="25" rows="10" value={text} placeholder="Edit task" onChange={handleTextChange}></textarea>
            </div>
            <div>
              <select name="important" onChange={handleImportantChange} defaultValue={important}>
                <option value='1'>*</option>
                <option value='2'>**</option>
                <option value='3'>***</option>
              </select>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleBackClick}>Back</button>
            </div>
          </li>
        </form>
      )
    } else {
      return (
        <li>
          <div className='taskArea'>
            <input type="checkbox" onChange={handleCheckedClick} checked={check}/>
            <div>
              <h3>{shortText}</h3>
              <p>{text}</p>
            </div>
          </div>
          <div>
            <p>{importantStars()}</p>
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