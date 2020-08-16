let lastTaskIsNumber = 0
let completedCount = 0

if(window.localStorage.getItem("pendingCount") === null){
    window.localStorage.setItem("pendingCount", 0)
}

function add(){
    let parent = document.getElementById("pendingTasks")
    let task = document.createElement("div")
    let description = document.getElementById("input").value
    let buttonRemove = document.createElement("input")
    let hiddenNumber = document.createElement("div")
    let pendings = parseInt(window.localStorage.getItem("pendingCount")) + 1

    hiddenNumber.innerHTML = lastTaskIsNumber
    hiddenNumber.classList.add("number")

    task.innerHTML = description + " "
    task.classList.add("task")

    //buttonRemove is a button (or checkbox) that removes task
    buttonRemove.type = "checkbox"
    buttonRemove.addEventListener("click", remove) 

    parent.appendChild(task)
    task.appendChild(buttonRemove)
    task.appendChild(hiddenNumber)

    window.localStorage.setItem('t' + lastTaskIsNumber, task.innerHTML)
    lastTaskIsNumber = lastTaskIsNumber + 1
    window.localStorage.setItem("pendingCount", pendings)
}
function remove(event){
    let parent = document.getElementById("pendingTasks")
    let child = event.target.parentElement
    let box = document.getElementById("completedTasks")
    let button = event.target
    button.removeEventListener("click", remove)
    button.addEventListener("click", uncomplete)
    
    window.localStorage.removeItem("t" + child.innerHTML.slice(-7, -6))

    window.localStorage.setItem("c" + completedCount, child.innerHTML)
    completedCount = completedCount + 1
    window.localStorage.setItem("completedCount", completedCount)
    box.appendChild(child)
    window.localStorage.setItem("pendingCount", window.localStorage.getItem("pendingCount") - 1)

    //$(child).hide("slow");
    //setTimeout(() => {parent.removeChild(child)}, 1000) //if it stays like this it will probably be possible to add the same task to completed multiple times by spam clicking
}
function showCompleted(){
    let old = document.getElementById("pendingTasks")
    let young = document.getElementById("completedTasks")
    let menuOld = document.getElementById("menuNew")
    let menuYoung = document.getElementById("menuCompleted")

    old.classList.add("hidden")
    young.classList.remove("hidden")
    menuOld.classList.remove("active")
    menuYoung.classList.add("active")

}
function showPending(){
    let old = document.getElementById("completedTasks")
    let young = document.getElementById("pendingTasks")
    let menuOld = document.getElementById("menuCompleted")
    let menuYoung = document.getElementById("menuNew")

    old.classList.add("hidden")
    young.classList.remove("hidden")
    menuOld.classList.remove("active")
    menuYoung.classList.add("active")

}
function uncomplete(event){
    let parent = document.getElementById("completedTasks")
    let child = event.target.parentElement
    let box = document.getElementById("pendingTasks")
    let button = event.target
    button.removeEventListener("click", uncomplete)
    button.addEventListener("click", remove)

    box.appendChild(child)
}
function load(){
    let parent = document.getElementById("pendingTasks")
    let box = document.getElementById("completedTasks")
    let task
    let loadedTaskIsNumber = 0
    let loadedCompletedIsNumber = 0
    let i = 0
    let j = 0
    if (typeof(Storage) !== "undefined") {

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
    }
}
function clearButton(){
    window.localStorage.clear()
    window.localStorage.setItem("pendingCount", 0)
}