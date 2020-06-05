const startButton = $("#start-button");
const nextButton = $("#next-button");
const submitButton = $("#submit-button");
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
    submitButton.removeClass("hide");
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
    submitButton.removeClass("hide");
}


// Question is passed into this function by nextquestion.
function showQuestion(questions){
    questionElement.text(questions.question);
    let correctAnswer = questions.answer;

    questions.choices.forEach(function(choice,choiceindex){
        // need to create new dom elements to append questions to. 
        $('.answer-form').append(`

            <fieldset id="${choiceindex}">
            <label for="${choiceindex}"><input type="radio" class="radio" name="answer" value="${choiceindex}">
            ${choice}</label>
            </fieldset>
        `);
    });
    let radioBtn = $(":radio").toArray();
    let answerForm = $('fieldset');
    let arrayOfAnswers = Array.from(answerForm);
        // this functions adds a click event to each answer-input
        // may need to add this to each new question, bc it runs once?
        submitButton.on("click", () => {
            console.log(score);
            let chosenAnswer; 
            radioBtn.filter(function(button) {
                if(button.checked == true) {
                    chosenAnswer = button.value;
                }
            });


            if(checkButton() == false){
                alert("please select button!");
            } else {
            
            if(chosenAnswer == correctAnswer){
                radioBtn.forEach((button) => {button.disabled = true});
                questionCorrect();

                // need to increase the score and the currentindex
                score++

                submitButton.addClass("hide");
                nextButton.removeClass("hide");
                } else {
                    radioBtn.forEach((button) => {button.disabled = true});
                    // Need to implement code for wrong answers, also need to add classes
                    // when finish style the App larger text!!
                    // find button that is correct
                    radioBtn.filter(function(button){
                        if(button.value == correctAnswer){
                            // change the fieldset to green
                            console.log(button.parentElement.classList.add("right"));
                        }
                    })

                    questionWrong();
                    submitButton.addClass("hide");
                    nextButton.removeClass("hide");
                
                }

            }
            
                console.log(score);
        
        });
 

        console.log(score);
}

// makes sure a button is clicked
function checkButton(){
    let radioBtn = $(":radio").toArray();
    let sum = 0;
    radioBtn.forEach((button) => {
        if(button.checked === false){
            sum++;
        }
    });
    if(sum < 4){
        return true;
    } else {
        return false;
    }
}

// Next grab the next button add a click event
nextButton.on("click", (e)=>{
    currentQuestionIndex++;

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

