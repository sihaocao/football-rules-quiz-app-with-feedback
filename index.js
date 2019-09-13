let questions = [
    {
        question: "B1 intercepts a pass and begins to advance. B1 is pursued by A2, who cannot see B3 approach. B3 contacts A2 with his shoulder below the neck and shoulders, above the waist, in the side.",
        choice1: "No problem",
        choice2: "B3 should be flagged for targeting",
        choice3: "B3 should be flagged for a blindside block",
        choice4: "B3 should be flagged for unnecessary roughness",
        answer: 3,
        detail: "B3 should be flagged for a blindside block",
        reference: "NFHS 2-3-10, 9-4-3n"
    },
    {
        question: "First and 10 for team A at its own three yardline. A1 is in his end zone when he muffs a backward pass from A2. A3 recovers the loose ball and is downed in the end zone. B4 is flagged for grabbing and twisting A3’s facemask in the process of making the tackle.",
        choice1: "Team B scores a Safety",
        choice2: "The penalty is enforced from team A's 20 yardline",
        choice3: "The penalty is enforced from team A's goalline",
        choice4: "The penalty is enforced from the previous spot",
        answer: 3,
        detail: "The penalty is enforced from team A's goalline",
        reference: "NFHS 10-5-2"
    },
    {
        question: "K1’s field-goal attempt hits the ground at team R’s five yardline, is muffed by R2 at his own two yardline, then rolls into the end zone. Six yards deep in the end zone, K3 falls on the ball.",
        choice1: "It's a touchback; it will be team R's ball at its own 20 yardline",
        choice2: "Team K scores a touchdown",
        choice3: "Team K scores a safety",
        choice4: "It will be team R's ball at the spot of the fumble - his own two yardline",
        answer: 1,
        detail: "It's a touchback; it will be team R's ball at its own 20 yardline",
        reference: "NFHS 4-2-2d-1, 6-3-1a"
    },
    {
        question: "First and 10 for team A from its own 20 yardline midway through the first quarter. A1 fumbles at team A’s 25 yardline. The ball rolls forward and out of bounds at team A’s 29 yardline.",
        choice1: "It will be second and 10 for team A from its 20 yardline",
        choice2: "It will be second and 5 for team A from its 25 yardline",
        choice3: "It will be second and 1 for team A from its 29 yardline",
        choice4: "All are possible",
        answer: 3,
        detail: "It will be second and 1 for team A from its 29 yardline",
        reference: "NFHS 3-4-3a, 4-3-1, 4-3-2"
    },
    {
        question: "During the dead-ball interval between downs, quarterback A1 and safety B2 go to their respective sidelines to receive instructions. All coaches remain in the team box and the players remain on their respective sides of the neutral zone and on the field.",
        choice1: "Only team A is guilty of an illegal conference",
        choice2: "Only team B is guilty of an illegal conference",
        choice3: "Each team is guilty of an illegal conference",
        choice4: "No problem",
        answer: 4,
        detail: "No problem",
        reference: "NFHS 9-8-1f Note"
    }
];

const correctOptions = ["CORRECT!", "SUPER!", "AWESOME!", "FABULOUS!", "GREAT!"]; // feedback words for when user selects a correct answer

const wrongOptions = ["INCORRECT!", "CLOSE!", "ALMOST!", "NEGATIVE!", "WRONG!"]; // feedback words for when user selects a wrong answer

const choices = Array.from($('.choice-text')); // gets an array from game.html with the class="choice-text", there are 4 in all

let currentQuestion = {};
let questionCounter = 0;
let score = 0;
let availableQuestions = [];


// starting the game
function startGame() {
    questionCounter = 0;
    score = 0;
    $('#score').text(`${score} / ${questions.length}`);
    availableQuestions = [...questions];
    getNewQuestion();
}


// getting a new question from availableQuestions array
function getNewQuestion() {
    // if no more available questions, then go to end page
    if (availableQuestions.length === 0) {                  // if there are no more questions in the availableQuestions array
        localStorage.setItem("mostRecentScore", score);     // store the user score in memory
        return window.location.assign("end.html");         // go to the end page
    }

    // with one question remaining, the next question button's text changes to "DONE"
    if (availableQuestions.length === 1) {
        $('.nextQuestionButton').text(`DONE!`);
    }

    // updating the HUD question dashboard
    questionCounter++;                                                                      // increase question number by 1
    $('#progressText').text(`Question: ${questionCounter} of ${questions.length}`);         // using template literal to display progress statistic in words
    $('#progressBarFull').css('width', `${questionCounter / questions.length * 100}%`);     // using template literal to display progress statistic in visual form

    // randomly selects a question from the "questions" bank
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);    // randomly generate the index of which object (question, answer choices, and answer) to pick
        currentQuestion = availableQuestions[questionIndex];                        // actually selecting a question based on the random index
        $('#question').text(currentQuestion.question);                              // populates the question field with the randomly selected question
    
    // populate the answer choice fields for the matching question
    choices.forEach( choice => {                                                    // for each of the 4 choices,
        const number = choice.dataset['number'];                                    // sets variable "number" equal to the number in "data-number" for each choice
        $(choice).text(currentQuestion['choice' + number]);                         // gets the value for the answers of the matching question for each choice
    });

    availableQuestions.splice(questionIndex, 1);             // reduce the availableQuestions array by the "used" object (question, answer choices, and answer)

    $('.choice-container').slideDown(300);                   // show the answer choices

    $('.feedback').hide();                                   // hide the feedback section at the beginning of each question
};


// determine whether an answer is right or wrong and how it will affect the user score
choices.forEach( choice => {                                        // for each of the 4 choices,
    $(choice).on('click', function(event) {                         // listen for the click on any of the choices
        const selectedChoice = event.currentTarget;    // was event.target        // the selected choice is the one that the user clicks on
        const selectedAnswer = selectedChoice.dataset["number"];    // sets variable "selectedAnswer" equal to the number in "data-number" for each choice

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";    // if selectedAnswer is the same as the actual answer, then apply the class "correct", otherwise, apply the class "incorrect"

        // selectedChoice.parentElement.classList.add(classToApply);       // add the "correct" or "incorrect class to the parent element (i.e., id="game")
        
        // // how long to allow users to see the user answer selection
        // setTimeout( function() {                                        // setting the timeout function
        //     selectedChoice.parentElement.classList.remove(classToApply);    // remove the "correct" or "incorrect" class to the parent element (i.e., id="game")
        // }, 1000);                                                           // how long to wait before the next question is shown to the user                                             
        
        // how is the user answer scored
        if (classToApply === "correct") {                               // if the correct answer is selected,
            incrementScore();                                           // increase the user score
            userFeedback();                                             // execute userFeedback function
            $('.user-solution-outcome').text(`${correctOptions[Math.floor(Math.random() * correctOptions.length)]}`);                   // randomly generates feedback comment for the correct answer
            $('.answer-result').html(`<img class="correct-answer-icon" src="https://i.imgur.com/3YJjcUe.gif" alt="touchdown">`);        // image shown for correct response
        } else {                    
            userFeedback();                                             // execute userFeedback functin
            $('.user-solution-outcome').text(`${wrongOptions[Math.floor(Math.random() * wrongOptions.length)]}`);                       // randomly generates feedback comment for the wrong answer
            $('.answer-result').html(`<img class="wrong-answer-icon" src="https://i.imgur.com/orHQn2e.gif" alt="incomplete">`);         // image shown for wrong response
        };
    });
});


// increase the score for correct user selections
function incrementScore() {
    score++;                                                            // increase the score by 1 for every question that the user answers correctly
    $('#score').text(`${score} / ${questions.length}`);                 // update with the new score in the id="score" for every time that a user answers a qusetion correctly
}


// user feedback after an answer is clicked
function userFeedback() {
    $('.choice-container').slideUp(300);                                // slide up (hide effect) the answer choices
    $('.feedback').show();                                              // show the user feedback section 
    $('.right-answer').text(`The correct answer: ${currentQuestion.detail}.`);          // what the correct answer should be
    $('.reference').text(`Reference: ${currentQuestion.reference}`);                    // reference the section in the book where this rule can be found
}

// when user clicks on "NEXT QUESTION" button
function ontoNextQuestion() {
    $('.nextQuestionButton').on('click', function(event) {
        getNewQuestion();                                                  // get a new question once the user has made an answer selection
    });
}


// start the quiz
startGame();

// when "NEXT QUESTION" button is clicked
ontoNextQuestion();