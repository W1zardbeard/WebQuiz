import express from "express";
import pg from "pg";
import {router as HTMLroutes} from "./routes/html.js";
import {router as CSSroutes} from "./routes/css.js";
import {router as JSroutes} from "./routes/JavaScript.js";
import {router as ACroutes} from "./routes/accessability.js";
import{user as user} from "./global.js";


const app = express();
const port = 3000;

export const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "webDevQuiz",
    password: "1234",
    port: 5432,
  });
  db.connect();


app.use(express.static("public"));
app.use([express.json(), express.urlencoded({ extended: true })])
app.use('/HTML', HTMLroutes);
app.use('/CSS', CSSroutes);
app.use('/JavaScript', JSroutes);
app.use('/Accessibility', ACroutes);


import * as j from './data.json' assert {type: 'json'};
var data = j.default.quizzes

var state = "none";



async function createNewUser(emailAddress){
    const addEmail = await db.query(
        "INSERT INTO users (email) VALUES ($1) ON CONFLICT DO NOTHING",
        [emailAddress]
    );

    const fetchEmail = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [emailAddress]
    );
    return fetchEmail.rows;
}





app.get("/", (req, res) => {
 
    res.render("index.ejs",{
        data: data,
        quizState: state
    });
})



app.post("/submitEmail", async (req, res) =>{
    //console.log(req.body.emailField);
    const email = await createNewUser(req.body.emailField);
    user.email = email[0].email;
    user.id = email[0].id;
    console.log(user.email + user.id);
    res.redirect("/subjectPick");
})

app.get("/subjectPick", (req, res) => {
 
    res.render("subjectPick.ejs",{
        email: user.email,
        data: data,
        quizState: state
    });
})


app.get("/results", async (req, res) =>{


    var htmlResults;
    var cssResults;
    var jsResults;
    var accessResults;

    //Queries
    //HTML
    try{
        var htmlSearchResults = await db.query(
            "SELECT result FROM users AS u JOIN htmlresults AS html ON u.id = html.userid WHERE u.id = $1",
            [user.id]
        )
    } catch(err){
        console.log(err);
    }
    //CSS
    try{
        var cssSearchResults = await db.query(
            "SELECT result FROM users AS u JOIN cssresults AS css ON u.id = css.userid WHERE u.id = $1",
            [user.id]
        )
    } catch(err){
        console.log(err);
    }
    //JS
    try{
        var jsSearchResults = await db.query(
            "SELECT result FROM users AS u JOIN jsresults AS js ON u.id = js.userid WHERE u.id = $1",
            [user.id]
        )
    } catch(err){
        console.log(err);
    }
    //Access
    try{
        var accessSearchResults = await db.query(
            "SELECT result FROM users AS u JOIN accessresults AS ac ON u.id = ac.userid WHERE u.id = $1",
            [user.id]
        )
    } catch(err){
        console.log(err);
    }



    //Checking the length to see if there is actually a record, if here is assign it - if not mark it as no record
        //html
    if(htmlSearchResults.rows.length == 0){
        htmlResults = "NoRecord";
    } else{
        htmlResults = htmlSearchResults.rows[0].result;
    }

        //CSS
    if(cssSearchResults.rows.length == 0){
        cssResults = "NoRecord";
    } else{
        cssResults = cssSearchResults.rows[0].result;
    }
    
        //js
    if(jsSearchResults.rows.length == 0){
        jsResults = "NoRecord";
    } else{
        jsResults = jsSearchResults.rows[0].result;
    }

        //access
    if(accessSearchResults.rows.length == 0){
        accessResults = "NoRecord";
    } else{
        accessResults = accessSearchResults.rows[0].result;
    }
    
    console.log(htmlResults);
    console.log(cssResults);
    console.log(jsResults);
    console.log(accessResults);
   
    //render
    res.render("userResults.ejs",{
        email: user.email,
        htmlResults: htmlResults,
        cssResults: cssResults,
        jsResults: jsResults,
        accessResults: accessResults
    });
    
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });