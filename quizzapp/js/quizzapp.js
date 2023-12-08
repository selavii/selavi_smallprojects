const questions = [{
    question: "If a plane crashes on the border between the United States and Canada, where do they bury the survivors?",
    answers: [
        {text: "Nowhere", correct:false},
        {text: "Survivors aren’t buried!", correct:true},
        {text: "United States", correct:false},
        {text: "Canada", correct:false},
    ]
},
    {
        question: " If it takes eight men ten hours to build a wall, how long would it take four men?",
        answers: [
            {text: "6 hours", correct:false},
            {text: "24 hours", correct:false},
            {text: "15 hours", correct:false},
            {text: "No time, because the wall is already built", correct:true},
        ]
    },
    {
        question: "  A cowboy rode into town on Friday. He stayed in town for three days and rode out on Friday. How is that possible?",
        answers: [
            {text: "It is impossible", correct:false},
            {text: "The storyteller does not know the week days", correct:false},
            {text: "He is living in another dimension", correct:false},
            {text: "His horse is named Friday", correct:true},
        ]
    },
    {
        question: "  Which is the smallest continent in the world",
        answers: [
            {text: "Australia", correct:true},
            {text: "Europe", correct:false},
            {text: "China", correct:false},
            {text: "Arctic", correct:false},
        ]
    },
    {
        question: "  Which is the largest desert in the world",
        answers: [
            {text: "Kalahari", correct:false},
            {text: "Antarctica", correct:true},
            {text: "Sahara", correct:false},
            {text: "Gobi", correct:false},
        ]
    }
];



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}



function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex ++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }
    else {
        showScore();
    }
}
nextButton.addEventListener("click" ,()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();}
})
startQuiz();







