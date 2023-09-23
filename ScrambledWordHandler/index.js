import express from 'express';
import cors from 'cors';
import { scrambleWord, wordToScramble } from './ScrambledWords.js';
import bodyParser from 'body-parser';
import { checkAnswer } from './CheckAnswer.js';

const app = express();
app.use(cors());
app.use(bodyParser.text())
let unscrambledWord;
app.get("/data", (req,res) => {
    let [scrambled, unscrambled] = wordToScramble();
    unscrambledWord = unscrambled;
    res.send(scrambled);
});

app.post("/data", (req,res) => {
    let correctOrNot = checkAnswer(req.body, unscrambledWord);
    res.status(200).send(`${correctOrNot.toString()},${unscrambledWord}`);
});


app.listen(9000,()=>console.log("app is running"));