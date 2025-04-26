// script.js

// Define the quiz questions and answers
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correctAnswer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: 1,
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Marie Curie", "Galileo Galilei"],
        correctAnswer: 1,
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
    },
];

// Variables to track progress
let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result');

// Function to render the current question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];

    quizContainer.innerHTML = `
        <div class="question">
            <span>${currentQuestionIndex + 1}. ${currentQuestion.question}</span>
            <div class="answers">
                ${currentQuestion.options
                    .map((option, index) => 
                        `<label><input type="radio" name="answer" value="${index}"> ${option}</label>`
                    ).join('')}
            </div>
        </div>
    `;
}

// Function to check the selected answer
function getSelectedAnswer() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer = undefined;
    
    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = parseInt(answer.value);
        }
    });

    return selectedAnswer;
}

// Function to handle the quiz submission
function submitQuiz() {
    const selectedAnswer = getSelectedAnswer();

    if (selectedAnswer === undefined) {
        alert("Please select an answer before submitting.");
        return;
    }

    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Function to display the final score
function showResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';

    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}.`;
    resultContainer.classList.remove('hidden');
}

// Event listener for the submit button
submitButton.addEventListener('click', submitQuiz);

// Initialize the quiz by loading the first question
loadQuestion();