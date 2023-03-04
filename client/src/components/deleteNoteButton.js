import React from 'react';
import { API } from '../api/api';

function DeleteButton({ noteId, notes, setNotes }) {
    const api = new API()
    //const deleteNoteFromDatabase = api.deleteData.bind(api)

    async function deleteNoteFromDatabase(id) {
        const deleteNote = api.deleteData.bind(api)
        // Remove the note from the database
        let response = await deleteNote(id);

        setNotes(notes.filter(note => note.id !== id));
        //let status = await response.status
        //console.log(status)
        //console.log(response)
        //console.log(response.status)
        //
        //if (response.status === 200) {
        //    console.log('success')
        //    setNotes(notes.filter(note => note.id !== id));
        //}
    }

    return (
        <button onClick={() => deleteNoteFromDatabase(noteId)}>Delete</button>
    );
}

export default DeleteButton;
