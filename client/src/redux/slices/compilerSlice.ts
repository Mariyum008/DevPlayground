// import  {PayloadAction} from "@reduxjs/toolkit/react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType{
    fullCode: {
        html: string
        css : string
        javascript : string        
    }
    currentLanguage: "html" | "css" | "javascript";
    // currentCode: string
}
const initialState: CompilerSliceStateType = {
    fullCode: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <input type="text" id="taskInput" placeholder="Add a new task...">
        <button id="addTaskButton">Add Task</button>
        <ul id="taskList"></ul>
    </div>

    <script src="script.js"></script>
</body>
</html>
`,
        css:`body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

input[type="text"] {
    width: 80%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
}

button {
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
}

button:hover {
    background-color: #218838;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background: #f9f9f9;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li .delete {
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
}

li .delete:hover {
    background: #c82333;
}
`,
        javascript: `const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
        taskInput.value = '';
    }
});

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});
`,
    },
    currentLanguage: "html",
};

const compilerSlice = createSlice({
    name:"compilerSlice",
    initialState,
    reducers : {
        updateCurrentLanguage:(state, action:PayloadAction<CompilerSliceStateType["currentLanguage"]>) => {
            state.currentLanguage = action.payload;
        },
    updateCodeValue : (state, action:PayloadAction<string>) => {
       
        state.fullCode[state.currentLanguage] = action.payload;
    },
    updateFullCode: (state, action: PayloadAction<CompilerSliceStateType["fullCode"]>) => {
        state.fullCode = action.payload;
   }
},
});

export default compilerSlice.reducer;
export const {updateCurrentLanguage
, updateCodeValue , updateFullCode} = compilerSlice.actions;
