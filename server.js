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

// async function getResults(email, id){
//     const searchResults = await db.query(
//         "SELECT * FROM users AS u JOIN htmlresults AS html ON u.id = html.userid JOIN cssresults AS css ON u.id = css.userid JOIN jsresults AS js ON u.id = js.userid JOIN accessresults AS ac ON u.id = ac.userid"
//     )

// }

async function getResults(email, id){
    try{
        var htmlSearchResults = await db.query(
            "SELECT result FROM users AS u JOIN htmlresults AS html ON u.id = html.userid WHERE u.id = $1",
            [id]
        )
    } catch(err){
        console.log(err);
    }

    

    

    // const cssSearchResults = await db.query(
    //     "SELECT result FROM users AS u JOIN cssresults AS css ON u.id = css.userid WHERE u.id = $1",
    //     [id]
    // )

    // const jsSearchResults = await db.query(
    //     "SELECT result FROM users AS u JOIN jsresults AS js ON u.id = js.userid WHERE u.id = $1",
    //     [id]
    // )

    // const accessSearchResults = await db.query(
    //     "SELECT result FROM users AS u JOIN accessresults AS ac ON u.id = ac.userid WHERE u.id = $1",
    //     [id]
    // )

    console.log(htmlSearchResults.rows.length);
   // return [htmlSearchResults, cssSearchResults, jsSearchResults, accessSearchResults];
        return [htmlSearchResults];
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
    const results = await getResults(user.email, user.id);


// FIGURE THIS SHIT OUT, maybe something like if .row length > 0 then
// Also you manually set the user and email so go change that once you figure it out

    // if(results.length > 0 ){
    //     console.log("suck")
    // }
    // var htmlResults = ;
    // var cssResults = ;
    // var jsResults = ;
    // var accessResults = ;

    // res.render("userResults.ejs",{
    //     email: user.email,
    //     htmlResults: results[0].rows[0].result,
    //     cssResults: results[1].rows[0].result,
    //     jsResults: results[2].rows[0].result,
    //     accessResults: results[3].rows[0].result
    // });
    
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });