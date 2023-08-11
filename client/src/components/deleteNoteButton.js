import React from 'react';
import { API } from '../api/api';
import Button from 'react-bootstrap/Button';

/**
 * DeleteButton is a component that handles deleting notes.
 * It renders a button that, when clicked, removes the note from the database and updates the notes state.
 *
 * param {Object} props - Contains 'noteId', 'notes', and 'setNotes' properties to manage the notes state.
 */
function DeleteButton({ noteId, notes, setNotes }) {
    // notes and setNotes from App.js, notes the notes displayed, setNotes the useState to update them, note id used to identify which not to delete.
    const api = new API()

    // send a request to remove the note from the database and update the notes state so the note is no longer displayed.
    async function deleteNoteFromDatabase(id) {
        const deleteNote = api.deleteData.bind(api);
        let response = await deleteNote(id);
        // Remove the note from the display
        setNotes(notes.filter(note => note.id !== id));
    }

    return (
        <div>
            <Button onClick={() => deleteNoteFromDatabase(noteId)}>Delete</Button>
        </div>
    );
}

export default DeleteButton;
