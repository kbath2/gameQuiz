const questionText = document.querySelector(".question-text");
const optionBox = document.querySelector(".option-box");
const questionIndex = 2;


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
        description: ""
    },
    {
        question: "Quem foi criador da apple?",
        options: ['Steve Ditko', 'Bill Gates', 'George Foreman', 'Steve Jobs'],
        answer: 3,
        description: "A Apple foi fundada por Steve Wozniak, Steve Jobs e Ronald Wayne com o nome de Apple Computers INC., em 1976, na Califórnia"
    },

]

function load() {
    questionText.innerHTML = myApp[questionIndex].question;
    createOptions();
}

function createOptions() {
    for (let i = 0; i < myApp[questionIndex].options.length; i++) {
        const option = document.createElement("div");
        option.innerHTML = myApp[questionIndex].options[i];
        option.classList.add("option");
        option.id = i;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    }
}

function check(ele) {
    const id = ele.id;
    if (id == myApp[questionIndex].answer) {
        ele.classList.add("correct");
    } else {
        ele.classList.add("wrong");
    }

    disableOptions()
}

function disableOptions() {
    for (let i = 0; i < optionBox.children.length; i++) {
        optionBox.children[i].removeAttribute("onclick");
    }
}

window.onload = () => {
    load();
}