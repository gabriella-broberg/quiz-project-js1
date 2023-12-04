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
        question: "Vilka av följande är operativsystem?", 
        type: "checkbox", //checkbox-frågorna räknas inte rätt i resultat, måste fixa det 
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
        question: "Vilka av följande är frontend-ramverk eller bibliotek?", //checkbox-frågorna räknas inte rätt i resultat, måste fixa det 
        type: "checkbox", //checkbox-frågorna räknas inte rätt i resultat, måste fixa det 
        choices: ["React", "Express", "Vue", "Django"],
        correctAnswers: ["React", "Vue"]
      },

];

let currentQuestionIndex = 0;
let userAnswers = [];
let correctAnswers = 0;


const quizContainer = document.getElementById("questions-container");
const quizForm = document.getElementById("quiz-form");
const nextButton = document.getElementById("next-button");

// Visa första frågan när sidan laddas
showQuestion();

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion) {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        // Beroende på frågetyp, skapa olika HTML-struktur
        if (currentQuestion.type === "trueFalse") {
            questionElement.innerHTML = `
                <p>${currentQuestionIndex + 1}. ${currentQuestion.question}</p>
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
                <p>${currentQuestionIndex + 1}. ${currentQuestion.question}</p>
                ${choices}
            `;
        } else if (currentQuestion.type === "checkbox") {
            const choices = currentQuestion.choices.map(choice => `
                <label>
                    <input type="checkbox" name="q${currentQuestionIndex + 1}" value="${choice}"> ${choice}
                </label>
            `).join('');
            questionElement.innerHTML = `
                <p>${currentQuestionIndex + 1}. ${currentQuestion.question}</p>
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

function nextQuestion() {
    // Spara användarens svar innan du går till nästa fråga
    const currentAnswer = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    
    if (!currentAnswer) {
        // If the user hasn't answered the current question, show an alert
        alert("Du måste besvara frågan innan du kan gå vidare.");
        return;
    }

    // Öka indexet för nästa fråga
    currentQuestionIndex++;

    // Visa nästa fråga
    showQuestion();
}


    


// Lägg till lyssnare för Nästa fråga-knappen
nextButton.addEventListener("click", nextQuestion);