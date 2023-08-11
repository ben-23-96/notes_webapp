import React from 'react';
import { API } from '../api/api';

/**
 * DeleteButton is a component that handles deleting notes.
 * It renders a button that, when clicked, removes the note from the database and updates the notes state.
 *
 * param {Object} props - Contains 'noteId', 'notes', and 'setNotes' properties to manage the notes state.
 */
function DeleteButton({ noteId, notes, setNotes }) {
    const api = new API();

    // send a request to remove the note from the database and update the notes state so the note is no longer displayed.
    async function deleteNoteFromDatabase(id) {
        const deleteNote = api.deleteData.bind(api);
        let response = await deleteNote(id);

        setNotes(notes.filter(note => note.id !== id));
    }

    return (
        <button onClick={() => deleteNoteFromDatabase(noteId)}>Delete</button>
    );
}

export default DeleteButton;
