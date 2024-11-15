document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    const answers = document.querySelectorAll('.answers');
    const feedbackElements = document.querySelectorAll('.feedback');
    const result = document.querySelector('.result');
    const progressBar = document.querySelector('.progress');
    let currentQuestion = 0;

    function showQuestion(index) {
        questions.forEach((q, i) => q.style.display = i === index ? 'block' : 'none');
        answers.forEach((a, i) => a.style.display = i === index ? 'grid' : 'none');
        feedbackElements.forEach((f, i) => f.innerText = ''); // Clear feedback
    }

    function updateProgress() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    answers.forEach((answerGroup, questionIndex) => {
        answerGroup.addEventListener('click', (e) => {
            if (e.target.classList.contains('answer')) {
                const selectedAnswer = e.target.dataset.answer;
                const correctAnswer = answerGroup.querySelector('#correct') ? answerGroup.querySelector('#correct').dataset.answer : null;

                feedbackElements[questionIndex].innerText = selectedAnswer === correctAnswer
                    ? "Correct! 🎉"
                    : "Wrong answer! ❌";
                feedbackElements[questionIndex].style.color = selectedAnswer === correctAnswer ? '#2ecc71' : '#e74c3c';

                if (questionIndex === questions.length - 1) {
                    result.style.display = 'block';
                } else {
                    setTimeout(() => {
                        currentQuestion++;
                        showQuestion(currentQuestion);
                        updateProgress();
                    }, 1000);
                }
            }
        });
    });

    // Initial state
    showQuestion(currentQuestion);
    updateProgress();
});
