// Questions for the quiz
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    }
];

// Variables to manage the quiz
let currentQuestionIndex = 0;
let score = 0;

// Elements from the DOM
const questionElement = document.querySelector('.quiz-question');
const optionsContainer = document.querySelector('.options');
const submitButton = document.querySelector('.submit-button');
const resultElement = document.querySelector('.result');
const nextButton = document.querySelector('.next-button');

// Function to start the quiz
function startQuiz() {
    score = 0; // Reset score
    currentQuestionIndex = 0; // Reset question index
    resultElement.style.display = 'none'; // Hide result initially
    nextButton.style.display = 'none'; // Hide next button initially
    showQuestion(); // Show the first question
}

// Function to show the current question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.textContent = option;
        optionDiv.classList.add('option');
        optionDiv.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(optionDiv);
    });

    submitButton.style.display = 'block'; // Show submit button
}

// Function to handle option selection
function selectOption(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++; // Increment score if the answer is correct
    }
    submitButton.style.display = 'none'; // Hide submit button
    nextButton.style.display = 'block'; // Show next button
    displayResult(); // Display result of the current question
}

// Function to display result of the current question
function displayResult() {
    const currentQuestion = questions[currentQuestionIndex];
    resultElement.textContent = selectedOption === currentQuestion.answer 
        ? "Correct!" 
        : `Wrong! The correct answer is: ${currentQuestion.answer}`;
    resultElement.style.display = 'block'; // Show result
}

// Event listener for the submit button
submitButton.addEventListener('click', () => {
    const selectedOption = optionsContainer.querySelector('.option.selected');
    if (!selectedOption) {
        alert("Please select an answer!"); // Alert if no option is selected
        return;
    }
    selectOption(selectedOption.textContent);
});

// Event listener for the next button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Show the next question
    } else {
        showScore(); // Show the final score
    }
});

// Function to display final score
function showScore() {
    questionElement.textContent = `Quiz Finished! Your score: ${score} out of ${questions.length}`;
    optionsContainer.innerHTML = ''; // Clear options
    submitButton.style.display = 'none'; // Hide submit button
    nextButton.style.display = 'none'; // Hide next button
}

// Start the quiz on page load
startQuiz();
