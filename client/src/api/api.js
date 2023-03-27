class API {
    baseUrl = process.env.REACT_APP_URL

    async getData() {
        const response = await fetch(`${this.baseUrl}/api/get-notes`,
            {
                method: 'GET'
            });
        const data = await response.json()

        return data
    };

    async postData(text) {
        //event.preventDefault()
        console.log(text)
        let data = { noteText: text }
        const response = await fetch(`${this.baseUrl}/add-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result)
        return result;
    };

    async deleteData(noteId) {
        console.log(noteId)
        let data = { noteId: noteId }
        const response = await fetch(`${this.baseUrl}/delete-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result)
        return result;
    };
}

//module.exports = API
export { API }
