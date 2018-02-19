
//Create a function and object that identifies the variables for the trivia questions and answers in an array
//create the variables within the object for two timers: once that times the question and one that handles the transition to the next question
//create a function containing the counters for correct and incorrect answers



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
        question: "In Aladdin, what is the name of Jasmine's pet tiger?",
        choices: ["Rajah", "Bo", "Iago", "Jack"],
        correct: 0
        //images: ["../images/Rajah.gif"],//
        
    }, {
        question: "In Peter Pan, Captain Hook had a hook on which part of his     body?",
        choices: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
        correct: 1

    }, {
        question: "In the Lion King, where does Mufasa and his family live?",
        choices: ["Rocky Mountain", "Forest", "Desert", "Pride Rock"],
        correct: 3

    }, {
        question: "In Beauty and the Beast, how many eggs does Gaston eat for    breakfast?",
        choices: ["2 Dozen", "5 Dozen", "5000", "0"],
        correct: 1

    }, {
        question: "In Alice in Wonderland, what is the name of Alice’s kitten?",
        choices: ["Dinah", "Sammie", "Kat", "Luna"],
        correct: 0

    }, {
        question: "After being on earth, where did Hercules first meet his   father Zeus?",
        choices: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
        correct: 2

    }, {
        question: "During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
        choices: ["Yellow", "Blue", "Gold", "White"],
        correct: 2

    }, {
        question: "In Bambi, what word does the owl use to describe falling in love?",
        choices: ["Whimsical", "Miserable", "Joyful", "Twitterpatted"],
        correct: 3
    }];

    //create a function that asks the question and initiates the timer using the start button and puts 30 seconds on the clock.//
    tva.ask = function() {
        if (tva.questions[tva.current]) {
            $("#timer").html("Time remaining: " + "00:" + tva.count + " secs");
            $("#question_div").html(tva.questions[tva.current].question);
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