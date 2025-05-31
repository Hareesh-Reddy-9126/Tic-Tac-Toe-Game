let boxes=document.querySelectorAll(".box");
let resetbtn= document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#newbtn");
let msgconatiner = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turno=true;

const winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    turno=true;
    enableboxes();
    msgconatiner.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        if(turno){
            box.innerHTML="o";
            turno= false;
        }else{
            box.innerHTML="x";
            turno=true;
        }
        box.disabled=true;
        checkwinner();
    });
});

const disabledboxes = () => {
    boxes.forEach((box) => {
        box.disabled=true;
    });
}
const enableboxes = () => {
    boxes.forEach((box) => {
        box.disabled=false;
        box.innerHTML="";
    });
}



const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, winner is ${winner}`;
    msgconatiner.classList.remove("hide");
    disabledboxes();

    // Play win sound
    document.getElementById("winSound").play();

    // Simple, big colorful confetti blast
    confetti({
        particleCount: 500,
        spread: 360,
        origin: { y: 0.6 },
        colors: [
            '#FF0000', '#FF4000', '#FF8000', '#FFBF00', '#FFFF00',
            '#BFFF00', '#80FF00', '#40FF00', '#00FF00', '#00FF40',
            '#00FF80', '#00FFBF', '#00FFFF', '#00BFFF', '#0080FF',
            '#0040FF', '#0000FF', '#4000FF', '#8000FF', '#BF00FF',
            '#FF00FF', '#FF00BF', '#FF0080', '#FF0040', '#FFFFFF',
            '#FFD700', '#FF69B4'
        ]
    });
}



const checkwinner = () => {
    for(pattern of winpatterns){
        let pos1val = boxes[pattern[0]].innerHTML;
        let pos2val = boxes[pattern[1]].innerHTML;
        let pos3val = boxes[pattern[2]].innerHTML;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val); 
            }
        }
    }
}

newGamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);