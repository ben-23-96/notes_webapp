import React, { useState } from 'react';
import { API } from '../api/api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function AddNoteForm({ notes, setNotes }) {
    // notes and setNotes from App.js, notes the notes displayed, setNotes the useState to update them

    //noteText the text in the form input used to add a note
    const [noteText, setNoteText] = useState('');
    const api = new API()

    async function addNoteToDatabase(note) {
        const addNote = api.postData.bind(api)
        // make post request to backend to add note to database
        let response = await addNote(note)
        let newNote = response.noteInfo
        console.log(response.status)
        // clear form input 
        setNoteText('')
        // update page to display newly added note
        setNotes([...notes, newNote])
    }

    function handleNoteTextChange(event) {
        setNoteText(event.target.value);
    }

    // value of noteText is changed when the content of the form input is changed, when button is clicked noteText added to database
    return (
        <div className="row ms-3">
            <div className="col-10">
                <InputGroup>
                    <InputGroup.Text>New Note</InputGroup.Text>
                    <Form.Control type="text" value={noteText} onChange={handleNoteTextChange} />
                </InputGroup>
            </div>
            <div className="col-2">
                <Button onClick={() => addNoteToDatabase(noteText)}>Add</Button>
            </div>
        </div>
    );
}

export default AddNoteForm;