import { useState, useEffect } from 'react';
import { API } from './api/api';
import AddNoteForm from './components/addNote';
import DeleteButton from './components/deleteNoteButton';

export default function MyApp() {
    const [data, setData] = useState([]);
    const api = new API()
    console.log('hello')
    console.log(process.env.REACT_APP_URL)

    useEffect(() => {
        async function fetchData() {
            let resData = await api.getData()
            setData(resData.data)
        }
        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {data.map(obj => (
                    <li key={obj.id}>
                        <div>{obj.noteText}</div>
                        <div>{obj.date}</div>
                        <DeleteButton noteId={obj.id} notes={data} setNotes={setData} />
                    </li>
                ))}
            </ul>
            <AddNoteForm notes={data} setNotes={setData} />
        </div>

    );
}