/******/
// Вообще с вот этими вот функциями беда. Как минимум нужно их выносить в отдельный файл, но там будет капец с импортами, поэтому ладно.
// Претензии к тебе нет если что))

const createToDoElement = (note, index) => {
    return `
        <li class="container flex">
        <span class="w-4/5 text-center py-3 font-bold border-r">${note.title}</span>
        <span class="container flex w-1/5 m-1">
            <input class="w-1/2 bg-green-500 border m-1 font-bold hover:bg-green-600" type="button" data-index="${index}" data-type="next" value="→">
            <input class="w-1/2 bg-red-600 border m-1 font-bold hover:bg-red-700" data-index="${index}" type="button" data-type="remove" value="x">
        </span>
        </li>`;
}

const createInProgressElement = (note, index) => {
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

const createDoneElement = (note, index) => {
    return `
        <li class="container flex">
        <span class="w-4/5 text-center py-3 font-bold border-r">${note.title}</span>
        <span class="container flex w-1/5 m-1">
            <input class="w-1/2 bg-green-500 border m-1 font-bold hover:bg-green-600" data-index="${index}" type="button" data-type="back" value="←">
            <input class="w-1/2 bg-red-600 border m-1 font-bold hover:bg-red-700" data-index="${index}" type="button" data-type="remove" value="x">
        </span>
        </li>`;
}
/******/

let notes = [];

const addButton = document.getElementById('addButton'); //кнопка Add
const taskTitleInput = document.getElementById('taskTitleInput'); //Поле для ввода 

// Columns
const toDoColumn = document.getElementById('toDoColumn'); //Список toDo
const inProgressColumn = document.getElementById('inProgressColumn'); //Список inProgress
const doneColumn = document.getElementById('doneColumn'); //Список note

// Выносим в отдельную функцию чтобы упростить рендер
const resetCols = () => {
    toDoColumn.innerHTML = '';
    inProgressColumn.innerHTML = '';
    doneColumn.innerHTML = '';
};

// Простая функция которая помещает в один элемент другой элемент
const insertElemToCol = (col, elem) => {
    col.insertAdjacentHTML('beforeend', elem);
}

const render = () => {
    resetCols();

    notes.forEach((note, index) => {
        if (note.status === 'toDo') insertElemToCol(toDoColumn, createToDoElement(note, index));
        if (note.status === 'inProgress') insertElemToCol(inProgressColumn, createInProgressElement(note, index));
        if (note.status === 'done') insertElemToCol(doneColumn, createDoneElement(note, index));

        console.error("Note with unknown status", note, note.status);
    });
};

addButton.onclick = function() { //создание таска
    if (taskTitleInput.value.length === 0) return;

    const newNote = {
        title: taskTitleInput.value,
        status: 'toDo',
    }

    taskTitleInput.value = '';
    notes.push(newNote);
    render();
}

// typesFunctions - обычный мап, в который мы передаём объект { название_тайпа: функция(индекс) }
const handleColumnClick = (event, typesFunctions) => {
    if (!event.target.dataset.index) return;

    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;
    const functionToCall = typesFunctions?.[type];

    if (!functionToCall) return;

    typesFunctions[type]?.(index);
    render();
}

toDoColumn.onclick = (event) => handleColumnClick(event, {
    next: (index) => notes[index].status = 'inProgress',
    remove: (index) => notes.splice(index, 1), 
});

inProgressColumn.onclick = (event) => handleColumnClick(event, {
    next: (index) => notes[index].status = 'done',
    remove: (index) => notes.splice(index, 1),
    back: (index) => notes[index].status = 'toDo',
});

doneColumn.onclick = (event) => handleColumnClick(event, {
    remove: (index) => notes.splice(index, 1),
    back: (index) => notes[index].status = 'inProgress',
});