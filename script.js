const addButton = document.getElementById('addButton'); //кнопка Add
const taskText = document.getElementById('taskText'); //Поле для ввода 
const toDoElement = document.getElementById('toDoElement'); //Список toDo
const inProgressElement = document.getElementById('inProgressElement'); //Список inProgress
const doneElement = document.getElementById('doneElement'); //Список note

let notes = [];

function getNoteTemplate(note, index){ //заготовка шаблона для вставки в докуммент
    if (note.status==='toDo')
    {
        return `
        <li class="container flex">
        <span class="w-4/5 text-center py-3 font-bold border-r">${note.title}</span>
        <span class="container flex w-1/5 m-1">
            <input class="w-1/2 bg-green-500 border m-1 font-bold hover:bg-green-600" type="button" data-index="${index}" data-type="next" value="→">
            <input class="w-1/2 bg-red-600 border m-1 font-bold hover:bg-red-700" data-index="${index}" type="button" data-type="remove" value="x">
        </span>
        </li>`;
    }
    else if(note.status === 'inProgress'){
        return `
        <li class="container flex">
        <span class="w-4/5 text-center py-3 font-bold border-r">${note.title}</span>
        <span class="container flex w-1/5 m-1">
            <input class="w-1/3 bg-green-500 border m-1 font-bold hover:bg-green-600" data-index="${index}" type="button" data-type="back" value="←">
            <input class="w-1/3 bg-red-600 border m-1 font-bold hover:bg-red-700" data-index="${index}" type="button" data-type="remove" value="x">
            <input class="w-1/3 bg-green-500 border m-1 font-bold hover:bg-green-600" type="button" data-index="${index}" data-type="next" value="→">

        </span>
        </li>`;
    }
    else if(note.status === 'done'){
        return `
        <li class="container flex">
        <span class="w-4/5 text-center py-3 font-bold border-r">${note.title}</span>
        <span class="container flex w-1/5 m-1">
            <input class="w-1/2 bg-green-500 border m-1 font-bold hover:bg-green-600" data-index="${index}" type="button" data-type="back" value="←">
            <input class="w-1/2 bg-red-600 border m-1 font-bold hover:bg-red-700" data-index="${index}" type="button" data-type="remove" value="x">
        </span>
        </li>`;
    }
}

function render() { //прорисовка тасков по спискам
    toDoElement.innerHTML = '';
    inProgressElement.innerHTML = '';
    doneElement.innerHTML = '';

    for (let i = 0; i < notes.length; i++){
        if(notes[i].status === 'toDo'){
            console.log("to do")
            toDoElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
        }
        else if(notes[i].status === 'inProgress'){
            console.log("in progress")
            inProgressElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
        }
        else if(notes[i].status === 'done'){
            console.log('done')
            doneElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
        }
        else{
            console.log(notes[i].status)
        }
    }
}

addButton.onclick = function() { //создание таска
    if(taskText.value.length === 0){
        return;
    }
    const newNote = {
        title: taskText.value,
        status: 'toDo',
    }

    notes.push(newNote);
    render();
    taskText.value = '';
}

toDoElement.onclick = function(event) //отслеживание событий в листе toDo
    {
    if (event.target.dataset.index)
        {
        const index = Number(event.target.dataset.index)
        const type = event.target.dataset.type
        
        if (type === 'next')
            {
                notes[index].status = 'inProgress';

            } 
        else if (type === 'remove')
            {
                notes.splice(index,1);

            }
        }
    render()
    }

    inProgressElement.onclick = function(event) //отслеживание событий в листе toDo
    {
    if (event.target.dataset.index)
        {
        const index = Number(event.target.dataset.index)
        const status = event.target.dataset.type
        
        if (status === 'next')
            {
                notes[index].status = 'done';


            } 
        else if (status === 'remove')
            {
                notes.splice(index,1);

            }
        else if(status === 'back'){
            notes[index].status = 'toDo';


        }
        }
    render()
    }

    doneElement.onclick = function(event) //отслеживание событий в листе toDo
    {
    if (event.target.dataset.index)
        {
        const index = Number(event.target.dataset.index)
        const status = event.target.dataset.type
        
        if (status === 'remove')
            {
                notes.splice(index,1);
            }
        else if(status === 'back'){
            notes[index].status = 'inProgress';
        }
        }
    render()
    }
