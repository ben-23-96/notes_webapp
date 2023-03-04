var express = require('express');
var router = express.Router();
const { getNotes, addNote, deleteNote } = require('../db/db')

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

router.get('/get-notes', async function (req, res, next) {
    let data = await getNotes()
    let dataToSend = data.map(data => ({ "id": data.NoteID.S, "noteText": data.note.M.noteText.S, "date": data.note.M.date.S }))
    res.send({ data: dataToSend });
});

router.post('/add-note', async function (req, res, next) {
    //console.log(req)
    console.log(req.body)
    let text = req.body.noteText
    console.log(req.body.noteText)
    try {
        var dbResponse = await addNote({ note: text })
        console.log(dbResponse.data)
        console.log(dbResponse.item)
    } catch (err) {
        res.status(500).json({ message: "error writing note to database", error: err.message })
    }
    if (dbResponse.data['$metadata'].httpStatusCode === 200) {
        var noteInfo = { "id": dbResponse.item.NoteID.S, "noteText": dbResponse.item.note.M.noteText.S, "date": dbResponse.item.note.M.date.S }
        res.status(200).json({ message: "note successfully written to the database", noteInfo: noteInfo })
    } else {
        res.status(500).json({ message: "error writing note to database", error: dbResponse.data })
    }
});

router.post('/delete-note', async function (req, res, next) {
    console.log(req.body)
    let noteId = req.body.noteId
    try {
        var dbResponse = await deleteNote({ noteId: noteId })
    } catch (err) {
        res.status(500).json({ message: "error deleting note from database", error: err })
    }
    if (dbResponse['$metadata'].httpStatusCode === 200) {
        res.statusCode = 200
        res.send({ message: "note successfully deleted from the database" })
    } else {
        res.status(500).json({ message: "error deleting note from database", error: dbResponse })
    }
});



module.exports = router;