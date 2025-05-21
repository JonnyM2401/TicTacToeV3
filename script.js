document.addEventListener("DOMContentLoaded", () => {

    let turnOfX = true;
    let turnesPlayed = 0;
    let winner = null;
    let scoreX = 0;
    let scoreO = 0;

    // show score
    function loadScore() {
        document.getElementById("scoreX").innerHTML = `X: ${scoreX}`;
        document.getElementById("scoreO").innerHTML = `O: ${scoreO}`;
    }
    loadScore();

    // get all squares from gamebard as objects
    const squares = Object.fromEntries(
        Array.from(document.querySelectorAll(".gameboardSquare")).map(element => [element.id, element])
    ); 


    //add eventlisener to every square 
    function startGame() {
        Object.values(squares).forEach((element) => {
            element.addEventListener("click", changeToPlayerColor);
            element.innerHTML = "";
        });
    }
    startGame();

    function changeToPlayerColor(e) {
        // change color to current player
        if (turnOfX) {
            e.target.style.backgroundColor = "#66b032";
            e.target.innerHTML = "X";
        } else {
            e.target.style.backgroundColor = "#fd5308";
            e.target.innerHTML = "O";
        }
        // disable EventListener
        e.target.removeEventListener("click", changeToPlayerColor);
        // change current player
        turnOfX = !turnOfX;
        turnesPlayed++;
        checkIfGameOver();
    }

    function checkIfGameOver() {
        // all winpatterns in arrays with IDs
        const winPatterns = [
            // row
            ["aa", "ab", "ac"],
            ["ba", "bb", "bc"],
            ["ca", "cb", "cc"],
            // column
            ["aa", "ba", "ca"],
            ["ab", "bb", "cb"],
            ["ac", "bc", "cc"],
            // diagonal
            ["aa", "bb", "cc"],
            ["ac", "bb", "ca"],
        ];

        for (const pattern of winPatterns) {
            const [A, B, C] = pattern;
            const colorA = document.getElementById(A).style.backgroundColor;
            const colorB = document.getElementById(B).style.backgroundColor;
            const colorC = document.getElementById(C).style.backgroundColor;

            if (colorA && colorA === colorB && colorA === colorC) {
                disableGameboard();
                if (colorA == "rgb(102, 176, 50)") {
                    winner = "X";
                    scoreX++;
                } else {
                    winner = "O";
                    scoreO++;
                }
                document.getElementById("message").innerHTML = `The winner is: ${winner}`;
                document.getElementById("messageboard").style.backgroundColor = colorA;
                document.getElementById("messageboard").style.display = "flex";
                loadScore();
                break;
            } else {
                if (winner === null && turnesPlayed === 9) {
                    document.getElementById("message").innerHTML = "Draw!";
                    document.getElementById("messageboard").style.backgroundColor = "#feb300";
                    document.getElementById("messageboard").style.display = "flex";
                }
            }
        }
    }

    function disableGameboard() {
        // remove EventListener
        Object.values(squares).forEach((element) => {
            element.removeEventListener("click", changeToPlayerColor);
        });
    }


    // start a new round
    document.getElementById("playAgainButton").addEventListener("click", () => {
        turnOfX = true;
        turnesPlayed = 0;
        winner = null;

        document.getElementById("message").innerHTML = "";
        document.getElementById("messageboard").style.display = "none";
        
        Object.values(squares).forEach((element) => {
            element.style.backgroundColor = null;
        });
        startGame();
    });

    document.getElementById("scoreResetButton").addEventListener("click", () => {
        scoreX = 0;
        scoreO = 0;
        loadScore();
    });

});
