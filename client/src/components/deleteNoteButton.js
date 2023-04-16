import React from 'react';
import { API } from '../api/api';
import Button from 'react-bootstrap/Button';

function DeleteButton({ noteId, notes, setNotes }) {
    const api = new API()

    async function deleteNoteFromDatabase(id) {
        const deleteNote = api.deleteData.bind(api)
        // Remove the note from the database
        let response = await deleteNote(id);

        setNotes(notes.filter(note => note.id !== id));
    }

    return (
        <div>
            <Button onClick={() => deleteNoteFromDatabase(noteId)}>Delete</Button>
        </div>
    );
}

export default DeleteButton;
