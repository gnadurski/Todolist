//let lastTaskIsNumber = 3
//let completedCount = 0

window.onload = load

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
async function putData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function add() {

    postData('http://localhost:8080/api/tasks', { "zadanie": document.getElementById("input").value.toString(), "completed": false })
        .then(data => {
            console.log(data)
        })

    load()
}

function remove(event) {
    let parent = document.getElementById("pendingTasks")
    let child = event.target.parentElement
    let box = document.getElementById("completedTasks")
    let button = event.target
    let thisTask = JSON.parse(child.dataset.data)
    let newTask = {...thisTask, completed: true}
    button.removeEventListener("click", remove)
    button.addEventListener("click", uncomplete) // a moze bym zrobil to inaczej - ifa sprawdzajacego, czy completed jest true czy nie i nadajacemu odpowiednia funkcje

    //completedCount = completedCount + 1

    putData('http://localhost:8080/api/tasks', newTask)
    load()
}
function uncomplete(event) {
    let parent = document.getElementById("completedTasks")
    let child = event.target.parentElement
    let box = document.getElementById("pendingTasks")
    let button = event.target
    let thisTask = JSON.parse(child.dataset.data)
    let newTask = {...thisTask, completed: false}
    button.removeEventListener("click", uncomplete)
    button.addEventListener("click", remove) // tu tak samo

    putData('http://localhost:8080/api/tasks', newTask)
    load()
    //box.appendChild(child)
}
function showCompleted() {
    let old = document.getElementById("pendingTasks")
    let young = document.getElementById("completedTasks")
    let menuOld = document.getElementById("menuNew")
    let menuYoung = document.getElementById("menuCompleted")

    old.classList.add("hidden")
    young.classList.remove("hidden")
    menuOld.classList.remove("active")
    menuYoung.classList.add("active")

}
function showPending() {
    let old = document.getElementById("completedTasks")
    let young = document.getElementById("pendingTasks")
    let menuOld = document.getElementById("menuCompleted")
    let menuYoung = document.getElementById("menuNew")

    old.classList.add("hidden")
    young.classList.remove("hidden")
    menuOld.classList.remove("active")
    menuYoung.classList.add("active")

}

function load() {
    let parent = document.getElementById("pendingTasks")
    let box = document.getElementById("completedTasks")
    parent.innerHTML = ""
    box.innerHTML = ""
    fetch('http://localhost:8080/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i]
                let taskElement = document.createElement("div")
                taskElement.innerHTML = task.zadanie
                taskElement.dataset.data = JSON.stringify(task)
                taskElement.classList.add("task")
                button = document.createElement("button")
                button.innerHTML = "x"
                taskElement.appendChild(button)
                if (task.completed) {
                    button.addEventListener("click", uncomplete)
                    box.appendChild(taskElement)

                } else {
                    button.addEventListener("click", remove)
                    parent.appendChild(taskElement)
                }
            }
        })
    /*if (typeof(Storage) !== "undefined") {

        //

        while(loadedTaskIsNumber < window.localStorage.getItem("pendingCount")){
            
            if(window.localStorage.getItem("t" + i) !== null){
                task = document.createElement("div")
                task.innerHTML = window.localStorage.getItem("t" + i)
                task.classList.add("task")

                button = task.getElementsByTagName("input")[0]
                button.addEventListener("click", remove)

                parent.appendChild(task)            
                
                loadedTaskIsNumber = loadedTaskIsNumber + 1
            }
            i = i + 1
        }
        while(loadedCompletedIsNumber < window.localStorage.getItem("completedCount")){
            if(window.localStorage.getItem("c" + j )!== null){
                task = document.createElement("div")
                task.innerHTML = window.localStorage.getItem("c" + j)
                task.classList.add("task")

                button = task.getElementsByTagName("input")[0]
                button.addEventListener("click", uncomplete)
            
                box.appendChild(task)
                loadedCompletedIsNumber = loadedCompletedIsNumber + 1
            }
            j = j + 1
        }

    } else {
        // No web storage Support.
    }*/
}
function clearButton() {
    window.localStorage.clear()
    window.localStorage.setItem("pendingCount", 0)
}