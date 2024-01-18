

var htmlResult;
var cssResult;
var jsResult;
var accessResult;

export function saveResult(quiz, result){
    console.log(quiz + result);
    if(result == "Right"){
        switch (quiz){
            case 0:
                htmlResult++;
                break;
            case 1:
                cssResult++
                break;
            case 2:
                jsResult++;
                break;
            case 3:
                accessResult++;
                break;
        }
    }
}



