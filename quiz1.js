//Frågor

const questions = [

    { question: "HTML är ett programmeringsspråk.", 
    type: "trueFalse", 
    answer: "false" },

    { question: "Git används för versionshantering av kod.", 
    type: "trueFalse", 
    answer: "true" },

    { question: "Vilket av följande är ett programmeringsspråk?", 
    type: "multipleChoice", 
    choices: ["HTML", "CSS", "JavaScript", "SQL"], 
    answer: "JavaScript" },

    { 
    question: "Vilka av följande är operativsystem? (du kan välja fler)", 
    type: "checkbox",  
    choices: ["Windows", "Linux", "Chrome", "iOS"],
    correctAnswers: ["Windows", "Linux", "iOS"]
      },

    { question: "CSS står för 'Central Style Sheet'.", 
    type: "trueFalse", 
    answer: "false" },

    { question: "Vad är DOM i JavaScript?", 
    type: "multipleChoice", 
    choices: ["Document Object Model", "Data Output Management", "Digital Object Model", "Dynamic Output Method"], 
    answer: "Document Object Model" },

    { question: "Vilket företag utvecklade JavaScript?", 
    type: "multipleChoice", 
    choices: ["Microsoft", "Netscape", "Oracle", "Google"], 
    answer: "Netscape" },

    { question: "Vilken funktion används för att skriva ut text i JavaScript?", 
    type: "multipleChoice", 
    choices: ["console.log", "print", "write", "output"], 
    answer: "console.log" },

    { question: "Vad gör kommandot 'git pull'?", 
    type: "multipleChoice", 
    choices: ["Hämtar och integrerar ändringar från ett fjärrarkiv", "Skapar en ny gren", "Skickar ändringar till det lokala arkivet", "Tar bort den nuvarande grenen"], 
    answer: "Hämtar och integrerar ändringar från ett fjärrarkiv" },

    { 
    question: "Vilka av följande är frontend-ramverk eller bibliotek? (du kan välja fler)", 
    type: "checkbox", 
    choices: ["React", "Express", "Vue", "Django"],
    correctAnswers: ["React", "Vue"] },

];

/*
let currentQuestionIndex = 0;
let userAnswers = [];
let totalCorrectAnswers = 0;



const quizContainer = document.getElementById("questions-container");
const quizForm = document.getElementById("quiz-form");
const nextButton = document.getElementById("next-button");


//funktion för att Visa fråga
function showQuestion() {
    console.log("Visar fråga");
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion) {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        // Beroende på frågetyp, skapa olika HTML-struktur
        if (currentQuestion.type === "trueFalse") {
            questionElement.innerHTML = `
                <h2>${currentQuestionIndex + 1}. ${currentQuestion.question}</h2>
                <label>
                    <input type="radio" name="q${currentQuestionIndex + 1}" value="true"> Sant
                </label>
                <label>
                    <input type="radio" name="q${currentQuestionIndex + 1}" value="false"> Falskt
                </label>
            `;

        } else if (currentQuestion.type === "multipleChoice") {
            const choices = currentQuestion.choices.map(choice => `
                <label>
                    <input type="radio" name="q${currentQuestionIndex + 1}" value="${choice}"> ${choice}
                </label>
            `).join('');
            questionElement.innerHTML = `
                <h2>${currentQuestionIndex + 1}. ${currentQuestion.question}</h2>
                ${choices}
            `;
            
        } else if (currentQuestion.type === "checkbox") {
            const choices = currentQuestion.choices.map(choice => `
                <label>
                    <input type="checkbox" name="q${currentQuestionIndex + 1}" value="${choice}"> ${choice}
                </label>
            `).join('');
            questionElement.innerHTML = `
                <h2>${currentQuestionIndex + 1}. ${currentQuestion.question}</h2>
                ${choices}
            `;
        }

        // Ta bort tidigare frågeelement
        const previousQuestionElement = document.querySelector(".question");
        if (previousQuestionElement) {
            quizForm.removeChild(previousQuestionElement);
        }

        // Lägg till det nya frågeelementet
        quizForm.appendChild(questionElement);

        if (currentQuestionIndex === questions.length - 1) {
            nextButton.textContent = "Visa resultat";
        }
    } else {
        showResult();
    }
}

// Visa första frågan när sidan laddas
showQuestion();


function nextQuestion() {
    //console.log("Nästa fråga");
    // Spara användarens svar innan du går till nästa fråga
    const currentAnswer = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (!currentAnswer) {
        // If the user hasn't answered the current question, show an alert
       // alert("Du måste besvara frågan innan du kan gå vidare.");
       // return;
    }

    // Öka indexet för nästa fråga
    currentQuestionIndex++;

    // Visa nästa fråga
    showQuestion();
}


// Lägg till lyssnare för Nästa fråga-knappen
nextButton.addEventListener("click", nextQuestion);



// ... tidigare kod ...

function showResult() {
    console.log("Visar resultat");
    userAnswers = [];
    totalCorrectAnswers = 0;
    result = [];

    // Hämta användarens svar
    for (let i = 0; i < questions.length; i++) {
        const answer = document.querySelector(`input[name="q${i + 1}"]:checked`);
        if (answer) {
            userAnswers.push(answer.value);

            const currentQuestion = questions[i];

            if (currentQuestion.type === "trueFalse" || currentQuestion.type === "multipleChoice") {
                if (answer.value === currentQuestion.answer) {
                    totalCorrectAnswers++;
                    result.push(true);
                } else {
                    result.push(false);
                }
            } else if (currentQuestion.type === "checkbox") {
                const userSelected = Array.from(
                    answer.parentNode.parentNode.querySelectorAll("input:checked")
                ).map((input) => input.value);

                const correct =
                    userSelected.length === currentQuestion.correctAnswers.length &&
                    userSelected.every((value) =>
                        currentQuestion.correctAnswers.includes(value)
                    );

                if (correct) {
                    totalCorrectAnswers++;
                    result.push(true);
                } else {
                    result.push(false);
                }
            }
        } else {
            result.push(false);
        }
    }

    // Kontrollera om användaren har besvarat några frågor
    if (userAnswers.length === 0) {
        alert("Du måste besvara minst en fråga innan du kan se resultatet.");
        return;
    }

    // Visa resultat
    const scorePercentage = (totalCorrectAnswers / questions.length) * 100;
    const resultContainer = document.getElementById("result-container");
    const scoreElement = document.getElementById("score");
    const feedbackList = document.getElementById("feedback-list");

    resultContainer.classList.remove("hidden");
    
    scoreElement.textContent = `Du fick ${totalCorrectAnswers.toFixed(1)} av ${
        questions.length
    } poäng.`;

    // Färg och text för resultatfeedback
    if (scorePercentage < 50) {
        scoreElement.style.color = "red";
        feedbackList.innerHTML = "<li>Underkänt</li>";
    } else if (scorePercentage >= 50 && scorePercentage <= 75) {
        scoreElement.style.color = "orange";
        feedbackList.innerHTML = "<li>Bra</li>";
    } else {
        scoreElement.style.color = "green";
        feedbackList.innerHTML = "<li>Riktigt bra jobbat</li>";
    }

    // Visa vilka frågor som är rätt eller fel
    for (let i = 0; i < questions.length; i++) {
        const listItem = document.createElement("li");
        const correctAnswerText = Array.isArray(questions[i].correctAnswers)
            ? ` Rätta svar: ${questions[i].correctAnswers.join(", ")}`
            : ` Rätt svar: ${questions[i].answer}`;
        listItem.textContent = `Fråga ${i + 1}: ${
            result[i] === true ? "Rätt" : "Fel"
        }${correctAnswerText}`;

        feedbackList.appendChild(listItem);
    }
}
*/