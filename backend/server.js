const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static("./frontend"))
app.use(bodyParser.json())

let tasks = [{ 'zadanie': 'sklep', 'id': 0, 'completed': false }, { 'zadanie': 'wizyta', 'id': 1, 'completed': true }]
let lastTaskId = 3

let updTaskNr = 0
//GET /tasks - pobieramy liste taskow

app.get('/api/tasks', function (req, res, next) {
    console.log("hej, przyszedl request")
    res.json(tasks)

})

//POST /tasks - zapisujemy taska
app.post('/api/tasks', function (req, res, next) {
    let postedTask = req.body
    if (checkTask(postedTask)) {
        postedTask.id = lastTaskId
        lastTaskId = lastTaskId + 1

        tasks.push(postedTask)

        res.json(postedTask)
    } else {
        res.status(400)
        res.json("Cos jest nie tak z tym taskiem")
    }
})


//PUT /tasks/:nr - aktualizujemy taska numer :nr
app.put('/api/tasks', function (req, res, next) {

    let updatedTask = req.body
    let oldTask = tasks.find(x => x.id === updatedTask.id)
    if (oldTask === undefined) {
        res.status(404)
        res.json("Task o tym id nie zostal znaleziony")
    } else if (checkTask(updatedTask)) {
        oldTask.zadanie = updatedTask.zadanie
        oldTask.completed = updatedTask.completed
        res.json(updatedTask)
        /*tasks[req.body.id - 1].completed = !tasks[req.body.id - 1].completed
        res.json(tasks[req.body.id - 1])*/
    } else {
        res.status(400)
        res.json("Cos jest nie tak z tym taskiem")
    }
})

function checkTask(task) {
    if (typeof task.zadanie === "string" && task.zadanie !== "" && typeof task.completed === "boolean") {
        return true
    } else return false
}


app.listen(8080, function () {
    console.log('Listening!')
})

module.exports = app;

//odczytaj z body obiekt task z kluczami zadanie i completed 
//i musisz nadac mu nowe unikalne id 
//i dodac do tablicy taskow
//i napisac response (caly ten obiekt plus jego nowe id w srodku)