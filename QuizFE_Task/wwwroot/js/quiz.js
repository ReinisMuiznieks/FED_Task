window.onload = sendApiRequest;

correct = 0;
incorrect = 0;
questioncount = 1;

function shuffle(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const swapIndex = Math.floor(Math.random() * (i + 1));
        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[swapIndex];
        shuffledArray[swapIndex] = temp;
    }
    return shuffledArray;
}

async function sendApiRequest() {
    let response = await fetch(`https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple`);
    console.log(response);
    data = await response.json();
    console.log(data);
    useApiData(data);
}

function useApiData(data) {
    document.querySelector("#question").innerHTML = `Question: ${data.results[0].question}`;

    const wrongAnswers = (data.results[0].incorrect_answers);
    const correctAnswer = (data.results[0].correct_answer);
    let allAnswers = shuffle([correctAnswer, ...wrongAnswers]);

    const buttonelem = document.querySelectorAll(".answer");
    buttonelem.forEach((button, index) => {
        button.innerHTML = allAnswers[index];
        button.addEventListener("click", onAnswerClicked)
    });
}

function onAnswerClicked(event) {
    const target = event.target;
    const selectedAnswer = target.innerHTML;
    const correctAnswer = (data.results[0].correct_answer);
    var finalsc = document.getElementById("finalscore");

    if (selectedAnswer == correctAnswer) {
        console.log("Correct!")
        sendApiRequest();
        correct++;
        console.log(correct);
        questioncount++;
    }
    else {
        console.log("Incorrect!")
        incorrect++;
        console.log(incorrect);
        sendApiRequest();
        questioncount++;
    }
    finalsc.innerHTML = correct;

    var disp = document.getElementById("display");
    disp.innerHTML = questioncount;

    var playagain = document.getElementById("playagain");

    if (questioncount >= 10) {
        console.log("Game over!");
        //window.location.href = "/";
        playagain.innerHTML = "Play again";
        
    }
}
