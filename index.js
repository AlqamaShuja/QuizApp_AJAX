var quizData = [];
var i = 0, score = 0;
var userAllSelectedValue = [];

$(document).ready(function () {
    $.ajax({
        url: "quiz.json",
        method: "GET",
        success: function (data) {
            quizData = [...data];
            getQuestion(quizData);
        }
    });

    $(document).on("click", "#nextBtn", function () {
        selectedValue = $('input[name="quiz"]:checked').val();
        userAllSelectedValue[i] = selectedValue;
        
        i++;
        if (i !== quizData.length) {
            getQuestion();
            disabledBtn(i);

        } else {
            for(let k=0; k<quizData.length; k++){
                if (userAllSelectedValue[k] === quizData[k].correctAnswer) {
                    score++;
                }
            }
            $(".container").html(`
                <h1>Quiz End</h1>
                <h3>Your Score is ${score} out of ${quizData.length}</h3>
                <button id="startAgainBtn">Start Again</button>
            `);
        }
    });

    disabledBtn(i);
    

    $(document).on("click", "#previousBtn", function () {
        i--;
        getQuestion();
        $(`input[name=quiz][id=${userAllSelectedValue[i]}]`).prop("checked",true);
        console.log(userAllSelectedValue);
    });

    $(document).on("click", "#startAgainBtn", function () {
        i = 0;
        score = 0;
        userAllSelectedValue = [];
        getQuestion();
    })

});


function disabledBtn(i){
    if (i === 0) {
        $("#previousBtn").prop('disabled', true);
    }else{
        $("#previousBtn").prop('disabled', false);
    }
}


function getQuestion() {
    $(".container").html(`<h1 class="quiz-head">Quiz</h1>
                        <div class="quiz-content">
                            <div class="quiz-question">Question Apear here</div>
                            <div class="quiz-answer">
                            </div>
                            <div id="btn-div">
                                <button id="previousBtn" disabled>Previous</button>
                                <button id="nextBtn">Next</button>
                            </div>
                        </div>`
    );

    data = quizData[i];
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