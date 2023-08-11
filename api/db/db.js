const { DynamoDBClient, ScanCommand, PutItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');
const { v4 } = require('uuid');
require('dotenv').config();

const client = new DynamoDBClient({
    region: 'eu-west-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    }
});

async function addNote({ note }) {
    let item = {
        NoteID: { S: v4() },
        note: { M: { noteText: { S: note }, date: { S: new Date().toDateString() } } }
    }
    const params = {
        TableName: 'notesDb',
        Item: item
    };


    const command = new PutItemCommand(params);
    const data = await client.send(command);
    return { data, item }
}

async function getNotes() {
    const params = {
        TableName: 'notesDb',
    };

    try {
        const command = new ScanCommand(params);
        const data = await client.send(command);
        //console.log(data.Items)
        return data.Items
    } catch (err) {
        console.log('Error', err);
    }
}

async function deleteNote({ noteId }) {
    const params = {
        TableName: "notesDb",
        Key: { NoteID: { S: noteId } },
    };
    try {
        const command = new DeleteItemCommand(params)
        let data = await client.send(command);
        return data
    } catch (error) {
        console.error(`Error deleting note ${noteId}: ${error}`);
    }
}

module.exports = { getNotes, addNote, deleteNote }


