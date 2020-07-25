function add(){
    let parent = document.getElementById("pendingTasks")
    let task = document.createElement("div")
    let description = document.getElementById("input").value
    let buttonRemove = document.createElement("input")

    task.innerHTML = description + " "
    task.classList.add("task")

    //buttonRemove is a button (or checkbox) that removes task
    buttonRemove.type = "checkbox"
    buttonRemove.addEventListener("click", remove) 

    parent.appendChild(task)
    task.appendChild(buttonRemove)
}
function remove(event){
    let parent = document.getElementById("pendingTasks")
    let child = event.target.parentElement
    let box = document.getElementById("completedTasks")
    let button = event.target
    button.removeEventListener("click", remove)
    button.addEventListener("click", uncomplete)

    box.appendChild(child)
   

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