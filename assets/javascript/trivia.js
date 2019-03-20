$(function() {
  var output = [];
  var number = 25;
  var intervalId;
  function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }
  function decrement() {
    number--;
    $("#timer").html("Time left: " + "<span>" + number + "</span>");

    if (number === 0) {
      showResults();
      $("#timer").html("Time's up!");
    }
  }
  function stop() {
    clearInterval(intervalId);
    
  }
  var quizContainer = document.getElementById("quiz");
  var resultsContainer = $("#results");
  var submitButton = $("#submit");
  var startButton = $("#start");
  var triviaQuestions = [
    {
      question: "Which is the best carbonated beverage? (according to a scot!)",
      answers: {
        a: "Beer",
        b: "Pepsi",
        c: "Coca-Cola",
        d: "Irn-Bru"
      },
      correctAnswer: "d"
    },
    {
      question: "What's the favorite alcoholic drink in Scotland?",
      answers: {
        a: "Whisky",
        b: "Vodka",
        c: "Tequila",
        d: "Whiskey"
      },
      correctAnswer: "a"
    },
    {
      question: "Who is the famous hero depicted in Braveheart?",
      answers: {
        a: "Achilles",
        b: "William Wallace",
        c: "Alexander the Great",
        d: "Rocky Balboa"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the capital of Scotland?",
      answers: {
        a: "London",
        b: "Berlin",
        c: "Edinburgh",
        d: "Glasgow"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the national flower of Scotland?",
      answers: {
        a: "Rose",
        b: "Dandelion",
        c: "Chysanthemum",
        d: "Thistle"
      },
      correctAnswer: "d"
    },
    {
      question: "Which animal is the national animal of Scotland?",
      answers: {
        a: "Platypus",
        b: "Unicorn",
        c: "Rhinoceros",
        d: "Giraffe"
      },
      correctAnswer: "b"
    }
  ];
  console.log(triviaQuestions[5].answers.b);
  submitButton.hide();

  function buildQuiz() {
    run();
    startButton.hide();
    submitButton.show();

    triviaQuestions.forEach((currentQuestion, questionNumber) => {
      var answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
      );
    });
    quizContainer.innerHTML = output.join("");
    var timerDiv = $("#timer");
    timerDiv.html("Time left: " + "<span>" + number + "</span>");
  }

  function showResults() {
    var answerContainers = quizContainer.querySelectorAll(".answers");

    var numCorrect = 0;

    triviaQuestions.forEach((currentQuestion, questionNumber) => {
      var answerContainer = answerContainers[questionNumber];
      

      var selector = `input[name=question${questionNumber}]:checked`;
      

      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;

        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });
    resultsContainer.html(numCorrect + " out of " + triviaQuestions.length);
    stop();
    submitButton.hide()
  }

  startButton.on("click", buildQuiz);

  submitButton.on("click", showResults);
});
