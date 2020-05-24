const startButton = $("#start-button");
const nextButton = $("#next-button");
const questionElement = $("#question");
// grabs all the input types for the answers. 
const answerButtons = $('label');
console.log(answerButtons);
// undeclared variable random question
let randomQuestion;
// logs the position of the index of each question
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

// Function is responsible for starting the quiz app. 
function startQuiz(){
    // grab the start button, add event listener to it. 
    startButton.on("click", function(){
        $(".question-container").show();
        // take the variable randomquestion, which finds a random question from our list of objects.
        randomQuestion = questions.sort(() => Math.random() - .5);
        // allows the quiz to know that this will be the first question of the index.
        currentQuestionIndex = 0;
        nextQuestion();
        // hides the start button
        startButton.addClass("hide");
        removeHide();
        nextButton.removeClass("hide");
    });
}

// this functions calls the show question function, which outputs the question onto the page.  
function nextQuestion(){
    showQuestion(randomQuestion[currentQuestionIndex]);
   }

// Question is passed into this function by nextquestion.
function showQuestion(questions){
    questionElement.text(questions.question);
    questions.choices.forEach(function(choice,choiceindex){
        console.log(choice);
        // need to create new dom elements to append questions to. 
        $('.answer-form').append(`
            <fieldset id="">
            <input type="radio" id="a" name="answer" value="${choiceindex}">
            <label for="${choiceindex}">${choice}</label>
            </fieldset>
        `);
    })
}



function setAnswerChoices(){
    
}



function handleQuiz(){
    $(".question-container").hide();
    startQuiz();
}

handleQuiz();