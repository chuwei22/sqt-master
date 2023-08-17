/**
 * @namespace Score
 * @author Chuwei.Xiong
 * @version Aug.2023
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score of the game.
 * Currently it is implemented as a single number,
 * but could include other information such as the number of lines cleared.
 * @typedef {object} Score
 * @memberof Score
 */

/**
 * Returns a game state for a new Tetris Game.
 * this is a function that returns a new score object.
 * @function
 * @memberof Score
 * @returns {object} new score object for new game.
 */
Score.new_score = function () {
    return {
        "score": 0,
        "lines_cleared": 0,
        "level": 1,
        "lastTetris": false
    };
};


/**
 * returns the level players are on based on the number of lines cleared.
 * @function
 * @memberof Score
 * @param {Score} object score.
 * @returns {number} current level of the game.
 */
Score.level = function (score) {
    return (Math.floor(score.lines_cleared / 10) + 1);
};


/**
 * updates the score object with the number of lines cleared and the score
 * also catches the back-to-back tetris and updates the score accordingly.
 * @function
 * @memberof Score
 * @param {number} noOfLines the number of lines cleared at once.
 * @param {object} object score.
 * @return {object} score object with updated score and lines cleared.
 */

Score.cleared_lines = function (noOfLines, score) {
    if (noOfLines === 1) {
        score.score = score.score + (100 * score.level);
        score.lastTetris = false;
    } else if (noOfLines === 2) {
        score.score = score.score + (300 * score.level);
        score.lastTetris = false;
    } else if (noOfLines === 3) {
        score.score = score.score + (500 * score.level);
        score.lastTetris = false;
    } else if (noOfLines === 4 && score.lastTetris === false) {
        score.score = score.score + (800 * score.level);
        score.lastTetris = true;
    } else if (noOfLines === 4 && score.lastTetris === true) {
        score.score = score.score + (1200 * score.level);
        score.lastTetris = true;
    }
    score.lines_cleared = score.lines_cleared + noOfLines;
    return score;
};


/**
 * this function adds a given number of points to the score.
 * @function
 * @memberof Score
 * @param {number} pointAdd.the number of points to be added to the score.
 * @param {object} object score.
 * returns {object} score object with updated score.
 */

Score.add_points = function (pointAdd, score) {
    score.score = score.score + pointAdd;
    return score;
};


export default Object.freeze(Score);
