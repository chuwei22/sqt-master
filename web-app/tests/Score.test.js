import Tetris from "../Tetris.js";
import Score from "../Score.js";
import R from "../ramda.js";

const example_game = Tetris.new_game();
const field_string = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-S--------
SSS-------
SSSZ-IOOJJ
TSZZ-IOOJJ
TTZL-IOOJJ
TLLL-IOOJJ`;
example_game.field = field_string.split("\n").map(
    (s) => s.replace(/-/g, " ").split("")
);

describe(`A new tetris game starts on level one with no lines cleared with a score of zero.
The score tracks the lines that get cleared.
A single line clear scores 100 × level
A double line clear scores 300 × level
A triple line clear scores 500 × level
A tetris scores 800 × level
Back to back tetrises score 1200 × level
A soft drop score 1 point per cell descended
A hard drop score 2 point per cell descended
Advancing the turn without manually dropping scores nothing.`, function () {
    it(
        `given a new game
        when score is called
        then the score is an object with level, lines_cleared, and score
        and the level is 1
        and the lines_cleared is 0
        and the score is 0`,
        function () {
            const new_game = Tetris.new_game();
            const score = new_game.score;
            if (Score.level(score) !== 1) {
                throw new Error("New games should start on level one");
            }
            if (score.lines_cleared !== 0) {
                throw new Error("New games should have no lines cleared");
            }
            if (score.score !== 0) {
                throw new Error("New games should have a zero score");
            }
        }
    );

    it(
        `given an unfinished game
        when a line is cleared
        then the lines_cleared inside score is incremented by one`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game = Tetris.hard_drop(game);

            if (game.score.lines_cleared !== 4) {
                throw new Error("Expecting 4 lines to clear");
            }
        }
    );

    it(
        `given an unfinished game
        when a line is cleared
        then the score is incremented by 100 × level`,
        function () {
            let game = example_game;
            game.score = Score.new_score();
            // Slot a T tetromino into the hole and drop.
            // This can only go one deep.
            game.current_tetromino = Tetris.T_tetromino;
            game.score.level = 10;

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 100 * 10) {
                throw new Error("A single row cleared should score 100*level");
            }
        }
    );

    it(
        `given an unfinished game
        when two lines are cleared at once
        then the score is incremented by 300 × level`,
        function () {
            let game = example_game;
            game.score = Score.new_score();
            // Slot an L tetromino into the hole and wait for it to drop.
            game.current_tetromino = Tetris.L_tetromino;
            game = Tetris.rotate_cw(game);
            game.score.level = 10;
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 300 * 10) {
                throw new Error("a double line clear should score 300*level");
            }
        }
    );

    it(
        `given an unfinished game
        when three lines are cleared at once
        then the score is incremented by 500 × level`,
        function () {
            let game = example_game;
            game.score = Score.new_score();
            //new field to test triple line clear
            game.field = [
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', 'S', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    'S', 'S', 'S', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    'S', 'S', 'S', 'Z',
                    ' ', ' ', 'O', 'O',
                    'J', 'J'
                ],
                [
                    'T', 'S', 'Z', 'Z',
                    ' ', 'I', 'O', 'O',
                    'J', 'J'
                ],
                [
                    'T', 'T', 'Z', 'L',
                    ' ', 'I', 'O', 'O',
                    'J', 'J'
                ],
                [
                    'T', 'L', 'L', 'L',
                    ' ', 'I', 'O', 'O',
                    'J', 'J'
                ]
            ];
            // Slot an I tetromino into the hole and wait for it to drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game.score.level = 10;
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 500 * 10) {
                throw new Error("a trible line clear should score 500*level");
            }
        }
    );

    it(
        `given an unfinished game
        when four lines are cleared at once
        then the score is incremented by 800 × level`,
        function () {
            let game = example_game;
            game.score = Score.new_score();
            game.field = [
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', ' ', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    ' ', 'S', ' ', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    'S', 'S', 'S', ' ',
                    ' ', ' ', ' ', ' ',
                    ' ', ' '
                ],
                [
                    'S', 'S', 'S', 'Z',
                    ' ', 'I', 'O', 'O',
                    'J', 'J'
                ],
                [
                    'T', 'S', 'Z', 'Z',
                    ' ', 'I', 'O', 'O',
                    'J', 'J'
                ],
                [
                    'T', 'T', 'Z', 'L',
                    ' ', 'I', 'O', 'O',
                    'J', 'J'
                ],
                [
                    'T', 'L', 'L', 'L',
                    ' ', 'I', 'O', 'O',
                    'J', 'J'
                ]
            ];
            // Slot an I tetromino into the hole and wait for it to drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game.score.level = 10;
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 800 * 10) {
                throw new Error("a tetris line clear should score 800*level");
            }
        }
    );

    it(
        `given an unfinished game
        when a tetris is cleared and the last turn was a tetris
        then the score is incremented by 1200 × level`,
        function () {
            let game = example_game;
            game.score = Score.new_score();
            //set up a tetris before this tetris
            game.score.lastTetris = true;
            // Slot an I tetromino into the hole and wait for it to drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game.score.level = 10;
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 1200 * 10) {
                throw new Error("a back-to-back tetris line clear should score 1200");
            }
        }
    );

    it(
        `given an unfinished game
        when a soft drop is performed
        then the score is incremented by 1 point per cell descended`,
        function () {
            let game = example_game;
            game.score = Score.new_score();
            game.current_tetromino = Tetris.L_tetromino;
            //performa a soft drop with a L tetromino for 1 cell
            game = Tetris.soft_drop(game);
            if (game.score.score !== 1) {
                throw new Error("a soft drop should score 1 point per cell descended");
            }
        }
    );

    it(
        `given an unfinished game
        when a hard drop is performed
        then the score is incremented by 2 point per cell descended`,
        function () {
            let game = example_game;
            game.score = Score.new_score();
            //performa a hard drop with a L tetromino and desent 16 cell
            game.current_tetromino = Tetris.L_tetromino;
            game = Tetris.hard_drop(game);
            if (game.score.score !== 16 * 2) {
                throw new Error("a hard drop should score 2 points per cell descended");
            }
        }
    );


    it(
        `given an unfinished game
        when a turn is advanced without manually dropping
        then the score is not incremented`,
        function () {
            let game = example_game;
            game.score = Score.new_score();
            game.score.lastTetris = true;
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game.score.level = 10;
            //advance the turn without manually dropping or clearing lines
            game = Tetris.next_turn(game);
            if (game.score.score !== 0) {
                throw new Error("advancing the turn without manually dropping should scores nothing");
            }
        }
    );
});
