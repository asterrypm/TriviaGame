
//Create a function and object that identifies the variables for the trivia questions and answers in an array
//create the variables within the object for two timers: once that times the question and one that handles the transition to the next question
//create a function containing the counters for correct and 


$.fn.trivia = function() {
    var tva = this;
    tva.playerPick = null;
    tva.answers = {
        correct: 0,
        incorrect: 0
    };
    tva.images = null;
    tva.count = 30;
    tva.current = 0;
    tva.questions = [{
        images: ["Kileaua.jpg"],
        question: "Where can the most active volcano in the world be found?",
        choices: ["Kileaua Volcano - United States", "Etna Volcano - Italy", "Ambrym Volcano - Vanuatu", "Eyjafjallajokull Volcano - Iceland"],
        correct: 0
        
        
    }, {
        images: ["../images/guernica.jpg"],
        question: "Where can you see this painting: 'Guernica'?",
        choices: ["Colombia", "Brazil", "Mexico", "Spain"],
        correct: 3
        
    }, {
        images: ["../images/Saltoangel.jpg"],
        question: "Where can you find the tallest waterfall?",
        choices: ["Gullfoss - Iceland", "Yosemite Falls - United States", "Angel Falls - Venezuela", "Iguazu Falls - Brazil"],
        correct: 2

    }, {
        images: ["../images/Copacabana.jpg"],
        question: "What country has the largest population of Portuguese speakers?",
        choices: ["Brazil", "Portugal", "Argentina", "Spain"],
        correct: 0

    }, {
        images: ["../images/boxjellyfish.jpg"],
        question: "What country has the most deadly animals?",
        choices: ["Namibia", "Panama", "Australia", "Honduras"],
        correct: 2

    }, {
        images: ["../images/manta.jpg"],
        question: "Ranked as one of the best dives in the entire world, where can you go scuba diving with Manta Rays?",
        choices: ["Palau - Micronesia", "Great Barrier Reef- Australia", "Jaco Beach - Costa Rica", "Big Island - United States"],
        correct: 3

    }, {
        images: ["../images/machupicchu.jpg"],
        question: "In what country would you find this ancient structure of Machu Picchu?",
        choices: ["Peru", "Chile", "Mexico", "Cuba"],
        correct: 0

    }, {
        images: ["../images/machupicchu.jpg"],
        question: "In what country would you find this ancient structure of Machu Picchu?",
        choices: ["Peru", "Chile", "Mexico", "Cuba"],
        correct: 0

    }, {
        images: ["../images/machupicchu.jpg"],
        question: "In what country would you find this ancient structure of Machu Picchu?",
        choices: ["Peru", "Chile", "Mexico", "Cuba"],
        correct: 0

    },  {
        images: ["../images/machupicchu.jpg"],
        question: "In what country would you find this ancient structure of Machu Picchu?",
        choices: ["Peru", "Chile", "Mexico", "Cuba"],
        correct: 0

    },  {
        images:["../images/olymp ics.jpg"],
        question: "Which country has had the honor of hosting the most Olympic Games?",
        choices: ["France", "United States", "Russia", "Japan"],
        correct: 1
    }];

    //create a function that asks the question and initiates the timer using the start button and puts 30 seconds on the clock.//
    tva.ask = function() {
        if (tva.questions[tva.current]) {
            $("#timer").html("Time remaining: " + "00:" + tva.count + " secs");
            $("#question_div").html(tva.questions[tva.current].question);
            var imgSrc = tva.questions[tva.current].images[0];
            var image = $('<img class="gameImage" src="assets/images/'+ imgSrc +'">');
            $(".images").html(image);    
            var choicesArr = tva.questions[tva.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {

                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(tva.timer, 1000);
        } else {
            //display the number of correct and incorrect answers in the browser//
            $('body').append($('</div>', {
                text: 'Unanswered: ' + (
                    tva.questions.length - (tva.answers.correct + tva.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    tva.timer = function() {
        tva.count--;
        if (tva.count <= 0) {
            setTimeout(function() {
                tva.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + tva.count + " secs");
        }
    };
    //Clear the timer and reset to 30 on each question and display next question//
    tva.nextQ = function() {
        tva.current++;
        clearInterval(window.triviaCounter);
        tva.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            tva.cleanUp();
            tva.ask();
        }, 1000)
    };
    tva.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $(".images").html('');    
        $('.correct').html('Correct answers: ' + tva.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + tva.answers.incorrect);
    };
    tva.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        tva.answers[string]++;
        $('.' + string).html(string + ' answers: ' + tva.answers[string]);
    };
    return tva;
};
var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        tva = Trivia || $(window).trivia(),
        index = tva.questions[tva.current].correct,
        correct = tva.questions[tva.current].choices[index];

        //Display in browser whether or not the answer is correct or incorrect.//
    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer is: " + correct);
        tva.answer(false);
    } else {
        $('#choices_div').text("Correct! The correct answer is: " + correct);
        tva.answer(true);
    }
     tva.nextQ();
});