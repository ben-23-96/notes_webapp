import { useState, useEffect } from 'react';
import { API } from './api/api';
import AddNoteForm from './components/addNote';
import DeleteButton from './components/deleteNoteButton';

/**
 * It manages the state of the notes, fetches data from the API, and renders the list of notes
 * along with AddNoteForm and DeleteButton components.
 */
export default function MyApp() {
    // State to manage the notes data.
    const [data, setData] = useState([]);

    const api = new API();

    useEffect(() => {
        // send a request to api to retrieve notes from database
        // update state with data
        async function fetchData() {
            let resData = await api.getData();
            setData(resData.data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {/* Iterate through the notes data and render a list item for each note */}
                {data.map(obj => (
                    <li key={obj.id}>
                        <div>{obj.noteText}</div>
                        <div>{obj.date}</div>
                        {/* Render a DeleteButton component for each note with required props, the use state for existing notes */}
                        <DeleteButton noteId={obj.id} notes={data} setNotes={setData} />
                    </li>
                ))}
            </ul>
            {/* Render the AddNoteForm component with required props, the use state for existing notes */}
            <AddNoteForm notes={data} setNotes={setData} />
        </div>
    );
}
