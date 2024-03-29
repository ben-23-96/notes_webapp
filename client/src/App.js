import { useState, useEffect } from 'react';
import { API } from './api/api';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AddNoteForm from './components/addNote';
import DeleteButton from './components/deleteNoteButton';

/**
 * It manages the state of the notes, fetches data from the API, and renders the list of notes
 * along with AddNoteForm and DeleteButton components.
 */
export default function MyApp() {
    // State to manage the notes data.
    const [data, setData] = useState([]);
    const api = new API()

    useEffect(() => {
        // send a request to api to retrieve notes from database
        // update state with data
        async function fetchData() {
            // get notes from database add them to data list
            let resData = await api.getData()
            setData(resData.data)
        }
        fetchData();
    }, []);

    return (
        <div>
            <Container className='mt-4'>
                <ul className="justify-content-center">
                    <Row className='pb-4'>
                        <Col>
                            <h3>Date</h3>
                        </Col>
                        <Col>
                            <h3>Note</h3>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    {data.map((obj) => (
                        <li key={obj.id}>
                            <Row className='py-2'>
                                <Col sm={2}>{obj.date}</Col>
                                <Col sm={8}>{obj.noteText}</Col>
                                <Col sm={2}>
                                    <DeleteButton noteId={obj.id} notes={data} setNotes={setData} />
                                </Col>
                            </Row>
                        </li>
                    ))}
                </ul>
                <AddNoteForm notes={data} setNotes={setData} />
            </Container>
        </div>
    );
}
