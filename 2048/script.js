const board = document.getElementById('board');
let grid = [];

function initializeGame() {
    grid = Array(4).fill().map(() => Array(4).fill(0));
    addNewTile();
    addNewTile();
    renderBoard();
}

function addNewTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) emptyCells.push([i, j]);
        }
    }
    if (emptyCells.length) {
        const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.textContent = grid[i][j] === 0 ? '' : grid[i][j];
            cell.className = `tile tile-${grid[i][j]}`;
            board.appendChild(cell);
        }
    }
}

function moveUp() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
            if (grid[row][col] !== 0) {
                let newRow = row;
                while (newRow > 0 && grid[newRow - 1][col] === 0) {
                    grid[newRow - 1][col] = grid[newRow][col];
                    grid[newRow][col] = 0;
                    newRow--;
                    moved = true;
                }
                // اگر دو کاشی مشابه برخورد کنند، جمع شوند
                if (newRow > 0 && grid[newRow - 1][col] === grid[newRow][col]) {
                    grid[newRow - 1][col] *= 2;
                    grid[newRow][col] = 0;
                    moved = true;
                }
            }
        }
    }
    if (moved) {
        addNewTile();
        renderBoard();
    }
}

function moveDown() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        for (let row = 2; row >= 0; row--) {
            if (grid[row][col] !== 0) {
                let newRow = row;
                while (newRow < 3 && grid[newRow + 1][col] === 0) {
                    grid[newRow + 1][col] = grid[newRow][col];
                    grid[newRow][col] = 0;
                    newRow++;
                    moved = true;
                }
                // اگر دو کاشی مشابه برخورد کنند، جمع شوند
                if (newRow < 3 && grid[newRow + 1][col] === grid[newRow][col]) {
                    grid[newRow + 1][col] *= 2;
                    grid[newRow][col] = 0;
                    moved = true;
                }
            }
        }
    }
    if (moved) {
        addNewTile();
        renderBoard();
    }
}

function moveLeft() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            if (grid[row][col] !== 0) {
                let newCol = col;
                while (newCol > 0 && grid[row][newCol - 1] === 0) {
                    grid[row][newCol - 1] = grid[row][newCol];
                    grid[row][newCol] = 0;
                    newCol--;
                    moved = true;
                }
                // اگر دو کاشی مشابه برخورد کنند، جمع شوند
                if (newCol > 0 && grid[row][newCol - 1] === grid[row][newCol]) {
                    grid[row][newCol - 1] *= 2;
                    grid[row][newCol] = 0;
                    moved = true;
                }
            }
        }
    }
    if (moved) {
        addNewTile();
        renderBoard();
    }
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        for (let col = 2; col >= 0; col--) {
            if (grid[row][col] !== 0) {
                let newCol = col;
                while (newCol < 3 && grid[row][newCol + 1] === 0) {
                    grid[row][newCol + 1] = grid[row][newCol];
                    grid[row][newCol] = 0;
                    newCol++;
                    moved = true;
                }
                // اگر دو کاشی مشابه برخورد کنند، جمع شوند
                if (newCol < 3 && grid[row][newCol + 1] === grid[row][newCol]) {
                    grid[row][newCol + 1] *= 2;
                    grid[row][newCol] = 0;
                    moved = true;
                }
            }
        }
    }
    if (moved) {
        addNewTile();
        renderBoard();
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    }
});

initializeGame();