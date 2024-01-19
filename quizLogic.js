import pg from "pg";
import {db} from "./server.js";
import{user as user} from "./global.js";


export var htmlResult = 0;
export var cssResult = 0;
export var jsResult = 0;
export var accessResult = 0;

var specificQuiz;

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

// function determineQuiz(quiz){
//     switch (quiz){
//         case 0:
//             specificQuiz = "htmlresults";
//             break;
//         case 1:
//             specificQuiz = "cssresults";
//             break;
//         case 2:
//             specificQuiz = "jsresults";
//             break;
//         case 3:
//             specificQuiz = "accessresults";
//             break
//     }
//     return specificQuiz;
// }
    



async function checkIfResultsExist(quiz){
    //check which quiz has been passed and then run the relevant query for that table
    switch (quiz){
        case 0:
            var result = await db.query(
                "SELECT COUNT(1) FROM htmlresults WHERE userid = $1",
                [user.id]
            )
            break;
        case 1:
            var result = await db.query(
                "SELECT COUNT(1) FROM cssresults WHERE userid = $1",
                [user.id]
            )
            break;
        case 2:
            var result = await db.query(
                "SELECT COUNT(1) FROM jsresults WHERE userid = $1",
                [user.id]
            )
            break;
        case 3:
            var result = await db.query(
                "SELECT COUNT(1) FROM accessresults WHERE userid = $1",
                [user.id]
            )
            break
    }

    return result.rows[0].count;
    
}


export async function submitResults(quiz){
    //var databaseTable = determineQuiz(quiz);

    //check if result already exists and return 0 or 1 from passed quiz variable
    var check = await checkIfResultsExist(quiz);
    
    //check which quiz has been passed
    switch (quiz){
        //html
        case 0:
            if (check == 0){
                await db.query(
                    "INSERT INTO htmlresults (result, userid) VALUES ($1, $2)",
                    [htmlResult, user.id]
                )
            } else if(check == 1){
                await db.query(
                    "UPDATE htmlresults SET result = $1 WHERE userid = $2",
                    [htmlResult, user.id]
                )
            }        
            break;

        //css
        case 1:
            if (check == 0){
                await db.query(
                    "INSERT INTO cssresults (result, userid) VALUES ($1, $2)",
                    [cssResult, user.id]
                )
            } else if(check == 1){
                await db.query(
                    "UPDATE cssresults SET result = $1 WHERE userid = $2",
                    [cssResult, user.id]
                )
            }
            break;  

        //js
        case 2:
            if (check == 0){
                await db.query(
                    "INSERT INTO jsresults (result, userid) VALUES ($1, $2)",
                    [jsResult, user.id]
                )
            } else if(check == 1){
                await db.query(
                    "UPDATE jsresults SET result = $1 WHERE userid = $2",
                    [jsResult, user.id]
                )
            }
            break;

        //accessible    
        case 3:
            if (check == 0){
                await db.query(
                    "INSERT INTO accessresults (result, userid) VALUES ($1, $2)",
                    [accessResult, user.id]
                )
            } else if(check == 1){
                await db.query(
                    "UPDATE accessresults SET result = $1 WHERE userid = $2",
                    [accessResult, user.id]
                )
            }
            break;
    }
   
}

export function resetScores(){
    htmlResult = 0;
    cssResult = 0;
    jsResult = 0;
    accessResult = 0;
}




