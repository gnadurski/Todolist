function add(){
    let parent = document.getElementById("container")
    let task = document.createElement("div")
    let description = document.getElementById("input").value
    let buttonRemove = document.createElement("button")

    task.innerHTML = description 
    task.classList.add("task")
    buttonRemove.innerHTML = "x"
    buttonRemove.addEventListener("click", remove) 

    parent.appendChild(task)
    task.appendChild(buttonRemove)
}
function remove(){
    let parent = document.getElementById("container")
    let child = event.target.parentElement
    parent.removeChild(child)
}