const express = require("express")
const fs = require("fs")
const path = require("path")
const mongoose = require('mongoose');
// const bodyparser = require("body-parser")
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/contactdance', {useNewUrlParser: true});
const app = express();
const port = 80

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    Name: String,
    Age: String,
    Gender: String,
    email: String,
    Phone: String,
    Adress: String,
});

const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const msg = {}
    res.status(200).render('home.pug', msg);
})


app.get('/contact', (req, res)=>{
    const msg = {}
    res.status(200).render('contact.pug', msg);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
      res.send("This item has been saved to the database.")  
    })
    .catch(()=>{
        res.status(400).send("Item could not save in the database.")
    })
    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});