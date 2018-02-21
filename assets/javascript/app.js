
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
        images: ["../images/Kileaua.jpg"],
        question: "Where can the most active volcano in the world be found?",
        choices: ["Kilauea Volcano - United States", "Etna Volcano - Italy", "Ambrym Volcano - Vanuatu", "Eyjafjallajokull Volcano - Iceland"],
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
        images: ["../images/friedtarantula.jpg"],
        question: "Fried Tarantulas are considered a delicacy in which country?",
        choices: ["Vietnam", "China", "North Korea", "Cambodia"],
        correct: 3

    }, {
        images: ["../images/lisbon.jpg"],
        question: "What country has the most liberal recreational drug policy?",
        choices: ["Netherlands", "Portugal", "Switzerland", "Czech Republic"],
        correct: 1

    },  {
        images: ["../images/oilrefinery.jpg"],
        question: "What country produces the most oil?",
        choices: ["Russia", "United States", "Iran", "Saudi Arabia"],
        correct: 3

    },  {
        images: ["../images/healthy.jpg"],
        question: "What country is ranked as the healthiest overall based on factors like health risks, life expectancy, and causes of death?",
        choices: ["Singapore", "Chile", "Italy", "Australia"],
        correct: 2

    },  {
        images: ["../images/atlantis.jpg"],
        question: "In what city is this underwater hotel found?",
        choices: ["Dubai", "Cairns", "Orlando", "Papeete"],
        correct: 0

    },  {
        images: ["../images/ChristTheRedeemer.jpg"],
        question: "Where can you find this statue?",
        choices: ["Spain", "Brazil", "Mexico", "Italy"],
        correct: 1

    },  {
        images: ["../images/coffeebeans.jpg"],
        question: "Which country produces the most coffee?",
        choices: ["United States", "South Africa", "Mexico", "Brazil"],
        correct: 3

    },  {
        images: ["../images/scorpion_vodka.jpg"],
        question: "In what country is the exotic drink of Scorpion Vodka famous?",
        choices: ["Finland", "Russia", "England", "Netherlands"],
        correct: 2

    },  {
        images: ["../images/languages.jpg"],
        question: "In what country are the most languages spoken?",
        choices: ["India", "China", "France", "Papau New Guinea"],
        correct: 3

    },  {
        images: ["../images/coffee.jpg"],
        question: "Which country is the largest consumer of coffee?",
        choices: ["Serbia", "Finland", "Colombia", "China"],
        correct: 1

    },  {
        images: ["../images/Everest.jpg"],
        question: "Where is the tallest (highest altitude) mountain?",
        choices: ["Mauna Kea - Hawaii, US", "Chimborazo - Ecuador", "K2 - China/Pakistan border", "Mt. Everest - China/Nepal border"],
        correct: 3

    },  {
        images: ["../images/Norway.jpg"],
        question: "According to the latest 'World Happiness Report' released in 2017, which measures how satisfied adults are with their lives, which country ranks higest?",
        choices: ["Norway", "Switzerland", "New Zealand", "Denmark"],
        correct: 0

    },  {
        images:["../images/olympics.jpg"],
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
    $('#coverphoto').hide();
    $('.result').remove();
    $('div').html('');
    $('.main-content').removeClass('secret');
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