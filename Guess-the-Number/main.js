// 랜덤 번호 지정
// 유저가 번호 입력 & go 버튼 입력
// 만약 유저가 랜덤 번호 맞추면, "맞췄습니다!"
// 랜던번호 < 유저번호 "Down!"
// 랜던번호 > 유저번호 "Up!"
// Reset 버튼 누르면 Reset
// 5번 기회 다쓰면 게임 종료 -> 더이상 추측 불가능
// 범위 밖에 숫자를 입력하면 알려주고, 기회를 깎지 않음
// 유저가 이미 입력한 숫자를 또 입력하면 알려주고 기회는 깎지 않음


// Variables
let computerNum = 0;
let playButton = document.getElementById("play-button");
let resetButton = document.querySelector(".button-reset");
let userInput = document.querySelector("#user-input");
let resultAreaImg = document.querySelector(".main-img");
let resultText = document.querySelector(".result-text");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area")
let history = [];


// Event
chanceArea.innerHTML = `You have ${chances} chances left`;
playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("click", focusInput)


//Function
function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log('Correct Answer', computerNum);
}
pickRandomNum();

function play() {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 100) {
        chanceArea.textContent = "Pick a number from 1 to 100!"
        return;
    }

    if (history.includes(userValue)) {
        chanceArea.textContent = "You've already entered this number. Try a different one!"
        return;
    }

    chances--;
    chanceArea.textContent = `You have ${chances} chances left`;

    if (userValue < computerNum) {
        resultAreaImg.src =
            "https://media0.giphy.com/media/3ov9jExd1Qbwecoqsg/200.gif";
        // chanceArea.textContent = "UP!!!";
    } else if (userValue > computerNum) {
        resultAreaImg.src = "https://media.giphy.com/media/r2puuhrnjG7vy/giphy.gif";
        // chanceArea.textContent = "DOWN!!!";
    } else {
        resultAreaImg.src =
            "https://media.tenor.com/images/0a81b89954678ebe228e15e35044f7a5/tenor.gif";
        chanceArea.textContent = "You've Guess Correctly";
        gameOver = true;
        playButton.disabled = true;
        history = [];
    }

    history.push(userValue);

    if (chances == 0) {
        gameOver = true;
    }
    if(gameOver) {
        playButton.disabled = true;
        history = [];
    }
}

function reset() {
    //userInput 창 정리
    userInput.value = "";

    //새로운 번호 생성
    pickRandomNum();

    // resetArea 정리
    chanceArea.textContent = "Here's the Result";
}

function focusInput() {
    userInput.value = "";
}