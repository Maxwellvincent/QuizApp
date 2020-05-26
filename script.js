const startButton = $("#start-button");
const nextButton = $("#next-button");
const questionElement = $("#question");
let score = 0;
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
        $("input-cnt").append(`<input type="text" id="counter" value="Current question: ${currentQuestionIndex}/5"></input>`)
    });
}

// this functions calls the show question function, which outputs the question onto the page.  
function nextQuestion(){
    // this empties the previous form elements, so that the new elements can be added to DOM.
    $('.answer-form').empty();
    // $('.input-cnt').append(`<div>Score = ${score}</div>`);
    showQuestion(randomQuestion[currentQuestionIndex]);
}


// Question is passed into this function by nextquestion.
function showQuestion(questions){
    questionElement.text(questions.question);
    questions.choices.forEach(function(choice,choiceindex){
        console.log(choice);
        // need to create new dom elements to append questions to. 
        $('.answer-form').append(`
            <fieldset id="${choiceindex}">
            <input type="radio" name="answer" value="${choiceindex}">
            <label for="${choiceindex}">${choice}</label>
            </fieldset>
        `);
    });
        // this functions adds a click event to each answer-input
        // may need to add this to each new question, bc it runs once?
    $('.answer-form').on('click', 'input', function(e){
        // this.check returns the value of true, for any input that is selected. 
        let userAnswer = this.value;
        console.log(this.value);
        nextButton.removeClass("hide");
        // If the radio button that is clicked is checked(true), then
        // we want to see if the value (this.value) is equal to the question.answer
        // If it is then, run this function questionCorrect
        // also increase score by 1
        // then show next button, to generate next question
        if(this.checked === true){
            console.log(questions.answer);
            answerChoices();
            if(this.value == questions.answer){
                questionCorrect();
                console.log("working");
                // Still need to change the background-color to class of correct
                // need to increase the score and the currentindex
                currentQuestionIndex++;
                score++;
                console.log(currentQuestionIndex);
                if(currentQuestionIndex < questions.length + 1){
                    console.log(questions);   
                }
            } else {
                questionWrong();
                // determine what happens when the answer is false 
                console.log("THIS IS WRONG");
            }
            
        }
    });

}

// Next grab the next button add a click event
// need to generate the next question
// make sure all old content is removed and new content added
// increase the score

function answerChoices(){
    // grabbed each input, need to remove the checked from the uncheck,
            // may add a class to them to turn red
            // and the checked one to green
            // maybe an If statement.
            let options = $('.answer-form input').toArray();
            console.log(options);
            options.forEach(function(option){
            if(option.checked === false){
                option.parentElement.setAttribute("class", "wrong");
                option.disabled = true;
            }
            });
}


function questionCorrect(){
    $('body').addClass("correct");
}

function questionWrong(){
    $('body').addClass("wrong");
}



function handleQuiz(){
    $(".question-container").hide();
    startQuiz();
}

handleQuiz();