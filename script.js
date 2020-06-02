const startButton = $("#start-button");
const nextButton = $("#next-button");
const questionElement = $("#question");
let score = 0;
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

        clearStat();

        updateResults();
    });
}


// this functions calls the show question function, which outputs the question onto the page.  
function nextQuestion(){
    // this empties the previous form elements, so that the new elements can be added to DOM.
    $('.answer-form').empty();

    showQuestion(randomQuestion[currentQuestionIndex]);
    nextButton.addClass("hide");
}


// Question is passed into this function by nextquestion.
function showQuestion(questions){
    questionElement.text(questions.question);
    let correctAnswer = questions.answer;

    questions.choices.forEach(function(choice,choiceindex){
        // need to create new dom elements to append questions to. 
        $('.answer-form').append(`
            <buttton class="answers" tabIndex="0" id="${choiceindex}">${choice}</button>
        `);
    });

    let answerButtons = $('.answers');
    let arrayOfAnswers = Array.from(answerButtons);
        // this functions adds a click event to each answer-input
        // may need to add this to each new question, bc it runs once?
        answerButtons.on('click', function(e){
            nextButton.removeClass("hide");
            // If the radio button that is clicked is checked(true), then
            console.log(e.target);
            // we want to see if the value (this.value) is equal to the question.answer
            // If it is then, run this function questionCorrect
            // also increase score by 1
            // then show next button, to generate next question
            // if(this.checked === true){
            //     answerChoices();
            // }

            if(this.id == correctAnswer){
                questionCorrect();

                // need to increase the score and the currentindex
                score++

            } else if(this.id != correctAnswer){
                console.log(arrayOfAnswers);

                // find the button with the correct answer
                arrayOfAnswers.forEach((button) => {
                    if(button.id == correctAnswer){
                        button.classList.add("right");
                    }
                });

                questionWrong();
            }


        });


}

// Next grab the next button add a click event

nextButton.on("click", (e)=>{
    currentQuestionIndex++;

    // need to check if the answer was correct, and then add to score. 


    // need to clear, and reset the background color
    clearStat();
    // Need to check if all questions are done, and if so send to end page.
    if(currentQuestionIndex < randomQuestion.length){
        console.log(score);
        // need to generate the next question
        nextQuestion();

        // need to create a function to update the currentQuestion index dynamically
        updateResults()


    } else {
        console.log(score);
        console.log("game is done.");
        // NEED TO IMPLEMENT FUNCTIONALITY HERE, TO PRESENT LAST SCREEN / OR DYNAMICALLY UPDATE PAGE
        $('.container').empty();
        $('.container').append(`
            <h1 id="results">You scored ${score}/${randomQuestion.length}</h1>
            <h2>${(score/randomQuestion.length) * 100} %</h2>
            <div class="controls">
                <button id="restart-button">Restart Quiz</button>
            </div>
        `);
        $('#restart-button').on('click', function(){
            console.log(score);
            window.location.reload();
            console.log("restart!!"); 
        })
    }

        
})

function updateResults(){
    $(".input-cnt").append(`<input type="text" id="counter" value="Current question: ${currentQuestionIndex + 1}/${randomQuestion.length}"></input>`);

    $(".input-cnt").append(`<input type="text" id="score" value="Score: ${score}"</input>`);
}

function clearStat() {
    $('body').removeClass("wrong correct");
    $(".input-cnt").empty();
    $('body h2').remove();
}

// function answerChoices(){
    
//     // grabbed each input, need to remove the checked from the uncheck,
//             // may add a class to them to turn red
//             // and the checked one to green
//             // maybe an If statement.
//             let options = $('.answer-form input').toArray();
//             options.forEach(function(option){
//             if(randomQuestion[currentQuestionIndex].answer != this.value){
//                 option.parentElement.setAttribute("class", "right");
//             }    
//             if(option.checked === false){
//                 option.parentElement.setAttribute("class", "wrong");
//                 option.disabled = true;
//             }
//             if(option.checked === true){
//                 option.parentElement.setAttribute("class", "correct");
//             }
//             });
// }

function questionCorrect(){
    $('body').addClass("correct");
    $('body').append(`<h2>CORRECT!!!</h2>`);
}

function questionWrong(){
    $('body').addClass("wrong");
    $('body').append(`<h2>Wrong!!!</h2>`);
}

function handleQuiz(){
    $(".question-container").hide();
    startQuiz();
}

handleQuiz();

