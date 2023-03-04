import React, { useState } from 'react';
import { API } from '../api/api';

function AddNoteForm({ notes, setNotes }) {
    const [noteText, setNoteText] = useState('');
    const api = new API()
    async function addNoteToDatabase(note) {
        const addNote = api.postData.bind(api)
        let response = await addNote(note)
        let newNote = response.noteInfo
        console.log(response.status)
        console.log(notes)
        setNotes([...notes, newNote])
    }

    function handleNoteTextChange(event) {
        setNoteText(event.target.value);
    }

    return (
        <div>
            <input type="text" value={noteText} onChange={handleNoteTextChange} />
            <button onClick={() => addNoteToDatabase(noteText)}>Add New</button>
        </div>
    );
}

export default AddNoteForm;