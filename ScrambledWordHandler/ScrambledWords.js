import csv from 'csv-parser';
import fs from 'fs';
const results = [];

function wordToScramble() {
    let regularWord;
    const fileContents = fs.readFileSync('./english-words.csv').toString();
    let arrayOfWords = fileContents.split('\n');
    let word = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
    console.log(word);
    return [(scrambleWord(word)).replace(/\s/g, ""), word];
}

function scrambleWord(word) {
    let stringToArray = word.split('');
    var i,j,k
    for (i = 0; i < stringToArray.length; i++) {
        j = Math.floor(Math.random() * i)
        k = stringToArray[i]
        stringToArray[i] = stringToArray[j]
        stringToArray[j] = k
    }
    return stringToArray.join('');
}

export { scrambleWord, wordToScramble };