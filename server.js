const path = require('path');
const express = require('express');
const bodyParse = require('body-parser');
const PORT = 8000;

const app = express();
app.use(bodyParse.json())
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'))
});

var books = [];
app.get('/books', (req, res) => {
    res.json(books)
})


app.post('/books', (req, res) => {
    const {title, author, publishedDate} = req.body;
    
    const id = Date.now().toString();
    books.push({id, title, author, publishedDate});
    res.json({id, title, author, publishedDate}).save();
 
})

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    const bookIndex = books.findIndex((book) => book.id === id);
    if(bookIndex >= 0) {
        books.splice(bookIndex, 1);
        res.json({
            message: `Holding Id no ${id} successfully deleted`
        })
    } else {
        res.status(404).json({
            message: `Not Found`
        })
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



















