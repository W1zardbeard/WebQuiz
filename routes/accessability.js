import express from "express";
const router = express.Router();
router.use(express.static("public"));
import * as j from '../data.json' assert {type: 'json'};
import{user as user} from "./../global.js";
import {saveResult, resetScores, accessResult, submitResults} from '../quizLogic.js';

var data = j.default.quizzes

var game = 3;

router.get("/1", (req, res) => {
    var question = 1 - 1;
    res.render("quiz.ejs",{
        email: user.email,
        data: data[game],
        quizState: "Accessability",
        question: question,
        answer: data[game].questions[question].answer
    });
})

router.post("/1", (req, res) =>{
    saveResult(game, req.body.submission);
    res.redirect("2");
})






router.get("/2", (req, res) => {
    var question = 2 - 1;
   
    res.render("quiz.ejs",{
        email: user.email,
        data: data[game],
        quizState: "Accessability",
        question: question,
        answer: data[game].questions[question].answer
    });
})

router.post("/2", (req, res) =>{
    saveResult(game, req.body.submission);
    res.redirect("3");
})



router.get("/3", (req, res) => {
    var question = 3 - 1;

    res.render("quiz.ejs",{
        email: user.email,
        data: data[game],
        quizState: "Accessability",
        question: question,
        answer: data[game].questions[question].answer
    });
})

router.post("/3", (req, res) =>{
    saveResult(game, req.body.submission);
    res.redirect("4");
})



router.get("/4", (req, res) => {
    var question = 4 - 1;
    
    res.render("quiz.ejs",{
        email: user.email,
        data: data[game],
        quizState: "Accessability",
        question: question,
        answer: data[game].questions[question].answer
    });
})

router.post("/4", (req, res) =>{
    saveResult(game, req.body.submission);
    res.redirect("5");
})



router.get("/5", (req, res) => {
    var question = 5 - 1;
 
    res.render("quiz.ejs",{
        email: user.email,
        data: data[game],
        quizState: "Accessability",
        question: question,
        answer: data[game].questions[question].answer
    });
})

router.post("/5", (req, res) =>{
    saveResult(game, req.body.submission);
    res.redirect("6");
})



router.get("/6", (req, res) => {
    var question = 6 - 1;

    res.render("quiz.ejs",{
        email: user.email,
        data: data[game],
        quizState: "Accessability",
        question: question,
        answer: data[game].questions[question].answer
    });
})

router.post("/6", (req, res) =>{
    saveResult(game, req.body.submission);
    res.redirect("7");
})





router.get("/7", (req, res) => {
    var question = 7 - 1;

    res.render("quiz.ejs",{
        email: user.email,
        data: data[game],
        quizState: "Accessability",
        question: question,
        answer: data[game].questions[question].answer
    });
})

router.post("/7", (req, res) =>{
    saveResult(game, req.body.submission);
    res.redirect("8");
})




router.get("/8", (req, res) => {
    var question = 8 - 1;
   
    res.render("quiz.ejs",{
        email: user.email,
        data: data[game],
        quizState: "Accessability",
        question: question,
        answer: data[game].questions[question].answer
    });
})

router.post("/8", (req, res) =>{
    saveResult(game, req.body.submission);
    res.redirect("9");
})





router.get("/9", (req, res) => {
    var question = 9 - 1;

    res.render("quiz.ejs",{
        email: user.email,
        data: data[game],
        quizState: "Accessability",
        question: question,
        answer: data[game].questions[question].answer
    });
})

router.post("/9", (req, res) =>{
    saveResult(game, req.body.submission);
    res.redirect("10");
})




router.get("/10", (req, res) => {
    var question = 10 - 1;
 
    res.render("quiz.ejs",{
        email: user.email,
        data: data[game],
        quizState: "Accessability",
        question: question,
        answer: data[game].questions[question].answer
    });
})

router.post("/10", (req, res) =>{
    saveResult(game, req.body.submission);
    submitResults(game);
    res.redirect("total");
})

router.get("/total", (req, res) => {
    res.render("quizResult.ejs",{
        email: user.email,
        quizState: "Accessability",
        resultNumber: accessResult
    });
    resetScores();
});







export {router as router};