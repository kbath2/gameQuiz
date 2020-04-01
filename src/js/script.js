const questionText = document.querySelector(".question-text");
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".correct-question-num");
const answerDescription = document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const correctAnswers = document.querySelector(".correct-answers");
const seeResultBtm = document.querySelector(".see-result-btn");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizHomeBox = document.querySelector(".quiz-home-box");
const quizBox = document.querySelector(".quiz-box");
const quizOverBox = document.querySelector(".quiz-over-box");
const startAgainQuizBtn = document.querySelector(".start-again-quiz-btn");
const goHomeBtn = document.querySelector(".go-home-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn")
let attempt = 0;
let questionIndex = 0;
let number = 0;
let score = 0;
let myArray = [];
let interval;


// perguntas, opções, respostas e descrições
const myApp = [{
        question: "Qual das alternativas a seguir se tornou o primeiro país a liberar todas as formas de transporte público?",
        options: ["Monaco", "Liechtenstein", "Luxembourg", "Andorra"],
        answer: 2,
        description: "Luxemburgo na Europa tornou-se o primeiro país a libertar todas as formas de transporte público. É o segundo menor país da União Europeia"
    },
    {
        question: "Que país deve sediar os eventos de Commonwealth em 2022?",
        options: ["Australia", "India", "Brunei", "Cameroon"],
        answer: 1,
        description: "Índia sediará eventos de Commonwealth em Chandigarh em janeiro de 2022"
    },
    {
        question: "Em que data ocorreu, o terrível atentado contra as torres gêmeas?",
        options: ['11/09/02', '11/11/01', '11/09/01', '11/09/00'],
        answer: 2,
        description: "Em 11 de setembro ocorreu uma das grandes trajedias dos EUA"
    },
    {
        question: "Quem é conhecido como o Pai da eletricidade?",
        options: ['Graham Bell', 'Thomas Edison', 'Nikola Tesla', 'Albert Einstein'],
        answer: 2,
    },
    {
        question: "Quem foi criador da apple?",
        options: ['Steve Ditko', 'Bill Gates', 'George Foreman', 'Steve Jobs'],
        answer: 3,
        description: "A Apple foi fundada por Steve Wozniak, Steve Jobs e Ronald Wayne com o nome de Apple Computers INC., em 1976, na Califórnia"
    },

]

function load() {
    number++;
    questionText.innerHTML = myApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML = number + " / " + myApp.length;
}

function createOptions() {
    optionBox.innerHTML = "";
    let animationDelay = 0.2;
    for (let i = 0; i < myApp[questionIndex].options.length; i++) {
        const option = document.createElement("div");
        option.innerHTML = myApp[questionIndex].options[i];
        option.classList.add("option");
        option.id = i;
        option.style.animationDelay = animationDelay + "s";
        animationDelay = animationDelay + 0.2;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    }
}

function generateRandomQuestion() {
    const randomNumber = Math.floor(Math.random() * myApp.length)
    let hitDuplicate = 0;
    if (myArray.length == 0) {
        questionIndex = randomNumber;
    } else {
        for (let i = 0; i < myArray.length; i++) {
            if (randomNumber == myArray[i]) {
                hitDuplicate = 1;
            }
        }
        if (hitDuplicate == 1) {
            generateRandomQuestion();
            return;
        } else {
            questionIndex = randomNumber;
        }
    }
    myArray.push(randomNumber);
    load();
}

function check(ele) {
    const id = ele.id;
    if (id == myApp[questionIndex].answer) {
        ele.classList.add("correct");
        score++;
        scoreBoard();
    } else {
        ele.classList.add("wrong");
        for (let i = 0; i < optionBox.children.length; i++) {
            if (optionBox.children[i].id == myApp[questionIndex].answer) {
                optionBox.children[i].classList.add("show-correct")
            }
        }
    }
    attempt++;
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
    stopTimer();

    if (number == myApp.length) {
        gameOver();
    }
}

function timeIsUp() {
    showTimeUpText();
    for (let i = 0; i < optionBox.children.length; i++) {
        if (optionBox.children[i].id == myApp[questionIndex].answer) {
            optionBox.children[i].classList.add("show-correct")
        }
    }
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
}

function startTimer() {
    let timeLimit = 15;
    remainingTime.innerHTML = timeLimit;
    remainingTime.classList.remove("less-time");
    interval = setInterval(() => {
        timeLimit--;
        if (timeLimit < 10) {
            timeLimit = "0" + timeLimit;
        }
        if (timeLimit < 6) {
            remainingTime.classList.add("less-time")
        }
        remainingTime.innerHTML = timeLimit;
        if (timeLimit == 0) {
            clearInterval(interval);
            timeIsUp();
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(interval);
}

function disableOptions() {
    for (let i = 0; i < optionBox.children.length; i++) {
        optionBox.children[i].removeAttribute("onclick");
    }
}

function showAnswerDescription() {
    if (typeof myApp[questionIndex].description !== 'undefined') {
        answerDescription.classList.add("show");
        answerDescription.innerHTML = myApp[questionIndex].description;
    }
}

function hideAnswerDescription() {
    answerDescription.classList.remove("show");
    answerDescription.innerHTML = "";
}

function showNextQuestionBtn() {
    nextQuestionBtn.classList.add("show");
}

function hideNextQuestionBtn() {
    nextQuestionBtn.classList.remove("show");
}

function showTimeUpText() {
    timeUpText.classList.add("show")
}

function hideTimeUpText() {
    timeUpText.classList.remove("show")
}

function scoreBoard() {
    correctAnswers.innerHTML = score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
    generateRandomQuestion();
    hideNextQuestionBtn();
    hideAnswerDescription();
    hideTimeUpText();
    startTimer();
}

function quizResult() {
    document.querySelector(".total-questions").innerHTML = myApp.length;
    document.querySelector(".total-attemp").innerHTML = attempt;
    document.querySelector(".total-correct").innerHTML = score;
    document.querySelector(".total-wrong").innerHTML = attempt - score;
    const percentage = (score / myApp.length) * 100;
    document.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%"
}

function resertQuiz() {
    attempt = 0;
    //questionIndex = 0;
    number = 0;
    score = 0;
    myArray = [];
}

function gameOver() {
    nextQuestionBtn.classList.remove("show");
    seeResultBtm.classList.add("show");
}

seeResultBtm.addEventListener("click", () => {
    /*quizBox.style.display = "none";*/
    quizBox.classList.remove("show");
    seeResultBtm.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResult();
})

startAgainQuizBtn.addEventListener("click", () => {
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show");
    resertQuiz();
    nextQuestion();
})

goHomeBtn.addEventListener("click", () => {
    quizOverBox.classList.remove("show");
    quizHomeBox.classList.add("show");
    resertQuiz();
})

startQuizBtn.addEventListener("click", () => {
    quizHomeBox.classList.remove("show");
    quizBox.classList.add("show");
    nextQuestion();
})

window.onload = () => {
    //load();

}