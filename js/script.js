const puzzle = document.getElementById("puzzle");
const app = document.getElementById("app");
const body_el = document.querySelector("body");
const solve = document.getElementById("btn_solve");
const solution_display = document.getElementById("solution");
const night_mode = document.getElementById("night-mode");
let night = false;
let values = [];

const puzzle_size = 81;



for(let i = 0; i < puzzle_size; i++){
    const input_el = document.createElement("input");
    input_el.setAttribute('type','number');
    input_el.setAttribute('min',1);
    input_el.setAttribute('max',9);
    input_el.setAttribute('maxlength',1);
    input_el.style.border = "1px solid black";
    input_el.style.textAlign = "center";
    input_el.style.backgroundColor = "#eee";
    input_el.style.fontSize = "22px";
    if(
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)){
        input_el.style.backgroundColor = "#ffe590";
    }
    puzzle.appendChild(input_el);
    if(i % 9+72 == i){
        input_el.style.borderBottom = "2px solid black";
    }if(i % 9 == i){
        input_el.style.borderTop = "2px solid black";
    }if(i % 9 == 0){
        input_el.style.borderLeft = "2px solid black";
    }if(i % 9 == 8){
        input_el.style.borderRight = "2px solid black";
    }
    puzzle.appendChild(input_el);
}

const getInfo = () =>{
    values = [];
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input=>{
        if(input.value){
            values.push(input.value);
        }else{
            values.push('.');
        }
    });
}

const handleResponse = (data)=>{
    let inputs = document.querySelectorAll("input");
    if(data.solvable && data.solution){
        inputs.forEach((input,i)=>{
            input.value = data.solution[i];
        });
        solution_display.innerText = 'Esta é a resposta do seu puzzle ;)';
        values = [];
    }else{
        solution_display.innerText = 'Este puzzle é muito difícil para mim :(';
    }
}

const solve_puzzle = () =>{
    getInfo();
    const data = {numbers:values.join('')};
    solution_display.innerText = "Aguarde um pouco, estou tentando resolver...";
    fetch('http://localhost:8000/solve',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }
    ).then(res=>res.json())
    .then(data=>handleResponse(data))
    .catch(err=>console.error(err));
}

btn_solve.addEventListener("click",solve_puzzle);
night_mode.addEventListener("click",(e)=>{
    if(night){
        body_el.style.color = "black";
        body_el.style.backgroundColor = "#f9e79f";
        app.style.backgroundColor = "white";
        solve.style.backgroundColor = "#ffe590";
        solve.style.color = "black";
        e.target.style.backgroundColor = "#8098ab";
        e.target.style.color = "white";
        document.querySelectorAll("input[type=number]").forEach((item,i)=>{
            item.style.color = "black";
            if(
                ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
                ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
                ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
                ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
                ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)){
                item.style.backgroundColor = "#ffe590";
            }
        });
    }else{
        body_el.style.color = "white";
        body_el.style.backgroundColor = "#20284c";
        app.style.backgroundColor = "#8098ab";
        solve.style.backgroundColor = "#20284c";
        solve.style.color = "white";
        e.target.style.backgroundColor = "#ffe590";
        e.target.style.color = "black";
        document.querySelectorAll("input[type=number]").forEach((item,i)=>{
            if(
                ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
                ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
                ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
                ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
                ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)){
                item.style.backgroundColor = "#20284c";
                item.style.color = "white";
            }
        });

    }
    night = !night;
});