var board;
var score = 0;
var rows = 4;
var cols = 4;
let hasWon = false

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();

            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();

    const newGameButton = document.getElementById("newGame");
    newGameButton.addEventListener("click", resetGame);
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile")

    if (num > 0) {
        tile.innerText = num.toString();

        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

function filterZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZero(row);

    for (let i = 0; i < row.length; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);

    while (row.length < cols) {
        row.push(0);
    }

    return row;
}

document.addEventListener("keyup", (event) => {
    if (event.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }

    else if (event.code == "ArrowRight") {
        slideRight();
        setTwo();
    }

    else if (event.code == "ArrowUp") {
        slideUp();
        setTwo();
    }

    else if (event.code == "ArrowDown") {
        slideDown();
        setTwo();
    }

    document.getElementById("score").innerText = score;

    if (checkGameOver()) {
        const gameOverMessage = document.getElementById("gameOverMessage");
        gameOverMessage.style.display = "flex";
        gameOverMessage.style.flexDirection = "column";
        gameOverMessage.style.alignItems = "center";
        gameOverMessage.style.padding = "40px 225px";

        const tryAgainButton = document.getElementById("tryAgain");
        tryAgainButton.addEventListener("click", resetGame);
    }
})

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];

        row.reverse();
        row = slide(row);
        row.reverse();

        board[r] = row;

        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];

        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];

        row.reverse();
        row = slide(row);
        row.reverse();

        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;

    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function checkGameOver() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] == 0) {
                return false;
            }

            if (r > 0 && board[r][c] == board[r - 1][c]) return false;
            if (r < rows - 1 && board[r][c] == board[r + 1][c]) return false;
            if (c > 0 && board[r][c] == board[r][c - 1]) return false;
            if (c < cols - 1 && board[r][c] == board[r][c + 1]) return false;
        }
    }

    return true;
}

function resetGame() {
    const gameOverMessage = document.getElementById("gameOverMessage");
    gameOverMessage.style.display = "none";

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    score = 0;
    hasWon = false;

    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    setGame();
    document.getElementById("score").innerText = score;
}