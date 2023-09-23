

function checkAnswer(guess, answer) {
    guess = guess.toLowerCase();
    answer = answer.toLowerCase();
    answer = answer.trim();
    if (guess === answer) {
        return true;
    } else {
        return false;
    }
}

export { checkAnswer };