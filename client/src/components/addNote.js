import React, { useState } from 'react';
import { API } from '../api/api';

/**
 * AddNoteForm is a component that handles adding new notes.
 * It includes an input field for the note text and a button to submit the new note.
 *
 * param {Object} props - Contains 'notes' and 'setNotes' properties to manage the notes state.
 */
function AddNoteForm({ notes, setNotes }) {
    const [noteText, setNoteText] = useState('');
    const api = new API();

    // send a reques to add the note to the database and update the notes state so the newly added note is displayed
    async function addNoteToDatabase(note) {
        const addNote = api.postData.bind(api);
        let response = await addNote(note);
        let newNote = response.noteInfo;

        setNotes([...notes, newNote]);
    }

    // Update the noteText state with the input value.
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
