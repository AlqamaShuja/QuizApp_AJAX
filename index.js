var quizData = [];
var i = 0, score = 0;

$(document).ready(function () {
    $.ajax({
        url: "quiz.json",
        method: "GET",
        success: function (data) {
            quizData = [...data];
            getQuestion(quizData);
        }
    });

    $("#nextBtn").on("click", function () {
        selectedValue = $('input[name="quiz"]:checked').val();
        if (selectedValue === quizData[i].correctAnswer) {
            score++;
        }
        i++;
        if (i !== quizData.length) {
            getQuestion();

        } else {
            $(".container").html(`
                <h1>Quiz End</h1>
                <h3>Your Score is ${score}</h3>
                <button id="startAgainBtn">Start Again</button>
            `);
        }
    });

    $("#startAgainBtn").click(function () {
        console.log("Click Again start")
        i = 0;
        getQuestion();
    })

});


function getQuestion() {
    data = quizData[i]
    $(".quiz-question").html(data.question);
    // let inp = document.createElement("input")
    var output = ""

    for (let j = 1; j < 5; j++) {
        let optionNo = "option" + j;
        let opt = data[optionNo];
        output += `<input type="radio" id=${optionNo} name="quiz" value=${optionNo}>
            <label for=${optionNo}>${opt}</label><br>
        `;
    }
    $(".quiz-answer").html(output);
}