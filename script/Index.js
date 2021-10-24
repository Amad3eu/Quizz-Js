class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}
let questions = [
    new Question("Qual método JavaScript permite que você filtre os elementos de uma matriz", ["indexOf()", "map()", "filter()", "reduce()"], "filter()"),
    new Question("Qual método JavaScript permite que você verifique se um elemento está em uma matriz", ["isNaN()", "includes()", "findIndex()", "isOdd()"], "includes()"),
    new Question("Qual método transforma JSON em um objeto JavaScript?", ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"], "JSON.parse()"),
    new Question("Qual objeto JavaScript arredonda para o número inteiro mais próximo", ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"], "Math.round()")
];

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

const display = {
    elementShown: function(id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function() {
        endQuizHTML = `
        <h1>Finish!</h1>
        <h3> Sua pontuação: ${quiz.score} / ${quiz.questions.length}</h3>`;
        this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
        this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
        let choices = quiz.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
                document.getElementById(id).onclick = function() {
                    quiz.guess(guess);
                    quizApp();
                }
            }
            // affichage choix + prise en compte du choix
        for (let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guessHandler("guess" + i, choices[i]);
        }
    },
    progress: function() {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
};

// Game logic
quizApp = () => {
        if (quiz.hasEnded()) {
            display.endQuiz();
        } else {
            display.question();
            display.choices();
            display.progress();
        }
    }
    // Create Quiz
let quiz = new Quiz(questions);
quizApp();