import express from "express";
import pg from "pg";
import {router as HTMLroutes} from "./routes/html.js";
import {router as CSSroutes} from "./routes/css.js";
import {router as JSroutes} from "./routes/JavaScript.js";
import {router as ACroutes} from "./routes/accessability.js";
import{user as user} from "./global.js";


const app = express();
const port = 3000;

const db = new pg.Client({
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
//         "SELECT *
//         FROM users AS u
//         JOIN htmlresults AS html ON u.id = html.userid
//         JOIN cssresults AS css ON u.id = css.userid"
//     )
// }


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


// app.get("/results", async (req, res) =>{
//     const results = await getResults(user.email, user.id);
// })


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });