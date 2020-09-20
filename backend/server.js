const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static("./frontend"))
app.use(bodyParser.json())

let tasks = [{ 'zadanie': 'sklep', 'id': 1, 'completed': false }, { 'zadanie': 'wizyta', 'id': 2, 'completed': true }]
let lastTaskId = 3

let updTaskNr = 0
//GET /tasks - pobieramy liste taskow

app.get('/api/tasks', function (req, res, next) {
    console.log("hej, przyszedl request")
    res.json(tasks)

})

//POST /tasks - zapisujemy taska
app.post('/api/tasks', function (req, res, next){
    let postedTask = req.body
    postedTask.id = lastTaskId
    lastTaskId = lastTaskId + 1

    tasks.push(postedTask)

    res.json(postedTask)
})


//PUT /tasks/:nr - aktualizujemy taska numer :nr
app.put('/api/tasks', function (req, res, next){
    let updatedTaskNr = req.body
    tasks[updatedTaskNr.id - 1].completed = !tasks[updatedTaskNr.id - 1].completed
    res.json(tasks[updatedTaskNr.id - 1])
})


app.listen(8080, function () {
    console.log('Listening!')
})

module.exports = app

//odczytaj z body obiekt task z kluczami zadanie i completed 
//i musisz nadac mu nowe unikalne id 
//i dodac do tablicy taskow
//i napisac response (caly ten obiekt plus jego nowe id w srodku)