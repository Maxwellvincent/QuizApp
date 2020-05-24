let questionElement = $("#question");
let randomQuestion;
let currentQuestionIndex;
const questions = [
    {
        question: "A solution with a pH of 4 would be considered?",
        choices:["Acidic","Basic","Neutral","Ionic"],
        answer: 0
    },
    {
        question: "A covalent bond is what type of sharing?",
        choices:["Equal sharing between to atoms","Unequal sharing between atoms", "No sharing between atoms", "Ionic bonding"],
        answer: 0
    },
    {
        question: "Hydrogen bonding is experienced between what molecules?",
        choices: ["Metals","Salts","H,N,O,F","Group 1 elements"],
        answer: 2
    },
    {
        question: "What is STP?",
        choices: ["Universal gas law", "The scientific method", "A hypothesis","Standard Temperature and pressure"],
        answer: 3
    },
    {
        question: "What is the powerhouse of the cell?",
        choices: ["Cell wall", "Mitochondria","ER","Nucleus"],
        answer: 1
    }
]

// this function removes the hide class from all the elements. 
function removeHide(){
    $(".question-container").removeClass("hide");
    $("#question").removeClass("hide");
    $("fieldset").removeClass("hide");
    $(".input-cnt").removeClass("hide");
}

function startQuiz(){
    // grab the start button, add event listener to it. 
    const startButton = $("#start-button");
    const nextButton = $("#next-button");
    startButton.on("click", function(){
        $(".question-container").show();
        randomQuestion = questions.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        nextQuestion();
        // hides the start button
        startButton.addClass("hide");
        removeHide();
        nextButton.removeClass("hide");
    });
}

// calls a function to show the next question
// grabs the question object and sets it to the DOM.
function showNextQuestion(questions){
    questionElement.text(questions.question);
}

// This function allows us to grab a random question, from the question object. 
// passes this random question to the show question function, which then sets the question. 
function nextQuestion(){
 showNextQuestion(randomQuestion[currentQuestionIndex]);
}


function setAnswerChoices(){
    
}

function handleQuiz(){
    $(".question-container").hide();
    startQuiz();
}

handleQuiz();