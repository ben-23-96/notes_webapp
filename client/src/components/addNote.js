import React, { useState } from 'react';
import { API } from '../api/api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function AddNoteForm({ notes, setNotes }) {
    const [noteText, setNoteText] = useState('');
    const api = new API()
    async function addNoteToDatabase(note) {
        const addNote = api.postData.bind(api)
        let response = await addNote(note)
        let newNote = response.noteInfo
        console.log(response.status)
        console.log(notes)
        setNoteText('')
        setNotes([...notes, newNote])
    }

    function handleNoteTextChange(event) {
        setNoteText(event.target.value);
    }

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