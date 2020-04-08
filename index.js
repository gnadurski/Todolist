function add(){
    let parent = document.getElementById("container")
    let task = document.createElement("div")
    let description = document.getElementById("input").value
    let buttonRemove = document.createElement("input")

    task.innerHTML = description + " "
    task.classList.add("task")
    buttonRemove.type = "checkbox"
    buttonRemove.addEventListener("click", remove) 

    parent.appendChild(task)
    task.appendChild(buttonRemove)
}
function remove(){
    let parent = document.getElementById("container")
    let child = event.target.parentElement
    setTimeout(() => {parent.removeChild(child)}, 1000)
}