import React, { useState } from 'react';
import { API } from '../api/api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

/**
 * AddNoteForm is a component that handles adding new notes.
 * It includes an input field for the note text and a button to submit the new note.
 *
 * param {Object} props - Contains 'notes' and 'setNotes' properties to manage the notes state.
 */
function AddNoteForm({ notes, setNotes }) {
    // notes and setNotes from App.js, notes the notes displayed, setNotes the useState to update them

    //noteText the text in the form input used to add a note
    const [noteText, setNoteText] = useState('');
<<<<<<< HEAD
    const api = new API();

    // send a reques to add the note to the database and update the notes state so the newly added note is displayed
    async function addNoteToDatabase(note) {
        const addNote = api.postData.bind(api);
        let response = await addNote(note);
        let newNote = response.noteInfo;

        setNotes([...notes, newNote]);
=======
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
>>>>>>> 766ce5d42afaa7e2a0d43b030002d6baa2a88485
    }

    // Update the noteText state with the input value.
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
