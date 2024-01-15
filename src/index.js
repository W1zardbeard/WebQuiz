import $ from "jquery";
var clickedOptionText;
var clickedOption;
var correctOption;
var clickerCount = false;


$( document ).ready(function() {
   

    correctOption = $(".answerCard:contains('" + correctAnswer + "')").filter(function(index){
        return $(this).children().children(".answerText").text() == correctAnswer;
    });
  
});








$(".answerCard").on("click", function(){
    clickedOption = $(this);
    clickedOptionText = $(this).children().children(".answerText").text()
    $(".submitAnswerBtn").prop('disabled', false);
    //console.log(clickedOption);
    $('input[type="radio"]').next().children(".questionLetterCont").removeClass("selectedIcon");
    $(this).children().children(".questionLetterCont").addClass("selectedIcon");
})


$(".submitAnswerBtn").on("click", function(){
    console.log("Clicked option text: " + clickedOptionText);
    console.log("Correct answer: " + correctAnswer);
    console.log(correctOption);
    console.log($(correctOption).children().children(".answerText").text())

    if(clickedOptionText == correctAnswer && clickerCount == false){
        console.log("correct");
        if(questionEnd == 9){
            $(".submitAnswerBtn").html("Finish");
        }else{
            $(".submitAnswerBtn").html("Next question");
        }
        $(clickedOption).children(".card-input-element").removeClass("card-input-element");
        $(clickedOption).children(".card-input-element").addClass("correct");
        $(clickedOption).children(".optionCard").addClass("correct");
        $(clickedOption).children().children(".questionLetterCont").addClass("selectedIconCorrect");
        $(clickedOption).children(".optionCard").children("#correct").removeClass("hidden");
        $(clickedOption).children(".optionCard").children("#incorrect").addClass("hidden");
        $(".answerCard").addClass("noMouseEvents");
        clickerCount = true;
       
        
    } else if (clickedOptionText != correctAnswer && clickerCount == false){
        console.log("Wrong");
            if(questionEnd == 9){
                $(".submitAnswerBtn").html("Finish");
            }else{
                $(".submitAnswerBtn").html("Next question");
            }
        
        $(clickedOption).children(".card-input-element").removeClass("card-input-element");
        $(clickedOption).children(".card-input-element").addClass("incorrect");
        $(clickedOption).children(".optionCard").addClass("incorrect");
        $(clickedOption).children().children(".questionLetterCont").addClass("selectedIconInorrect");

        //$(clickedOption).children(".optionCard").children("#incorrect").removeClass("hidden");
        $(clickedOption).children(".optionCard").children("#incorrect").removeClass("hide");

        // $(correctOption).children(".card-input-element").addClass("correct");
        // $(correctOption).children(".optionCard").addClass("correct");
        // $(correctOption).children().children(".questionLetterCont").addClass("selectedIconCorrect");
        $(correctOption).children(".optionCard").children("#correct").removeClass("hidden");
        $(correctOption).children(".optionCard").children("#incorrect").addClass("hidden");
        $(correctOption).children(".optionCard").children("#incorrect").addClass("hide");
        $(".answerCard").addClass("noMouseEvents");
        clickerCount = true;
    } else if (clickerCount == true){
        $(this).attr("form", "form");
    }
})
