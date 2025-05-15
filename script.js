const canvas = document.getElementById('gameCanvas');
const tontext = canvas.getContext('2d');
const gameOverScreen = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');

const GRID_SIZE = 20;
const SNAKE_SIZE = GRID_SIZE;
const FOOD_SIZE = GRID_SIZE;

let snake, foor, dx, dy, blinkCounter;
let gamePause = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

let currentScoreElem = document.getElementById('current-score');
let highScoreElem = document.getElementById('high-score');

// inisiasi game
function initializeGame() {
    // set inisiasi ularnya
    snack = [
        {
            x: Math.floor(canvas.width / 2 / GRID_SIZE) * GRID_SIZE,
            y: Math.floor(canvas.height / 2 / GRID_SIZE) * GRID_SIZE
        },
        {
            x: Math.floor(canvas.width / 2 / GRID_SIZE) * GRID_SIZE,
            y: Math.floor(canvas.height / 2 / GRID_SIZE + 1) * GRID_SIZE
        }
    ];
    
    // set inisiasi posisi makanan dan arah nya
    food = {
        ...generateFoodPosition(),
        dx: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE,
        dy: (Math.random() < 0.5 ? 1 : -1) * GRID_SIZE
    };

    // set arah ular
    dx = 0;
    dy = -GRID_SIZE;
    blinkCounter = 0;
    score = 0;
    currentScoreElem.textContent = score;
    highScoreElem.textContent = highScore;
}

initializeGame();

// arah gerak ular menggunakan keyboard
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -GRID_SIZE;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = GRID_SIZE;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -GRID_SIZE;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = GRID_SIZE;
                dy = 0;
            }
            break;
    }
});

// generate posisi makanan
function generateFoodPosition() {
    while (true) {
        let newFoodPosition = {
            x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)) * GRID_SIZE,
            y: Math.floor(Math.random() * (canvas.height / GRID_SIZE)) * GRID_SIZE
        };

        let collisionWithSnake = false;
        for (let segment of snake) {
            if (segment.x === newFoodPosition.x && segment.y === newFoodPosition.y) {
                collisionWithSnake = true;
                break;
            }
        }

        // jika makanan tidak bertabrakan dengan ular
        if (!collisionWithSnake) {
            return newFoodPosition;
        }
    }
}

// pengecekan untuk tabrakan dengan dinding dan ular itu sendiri
function checkCollision() {
    // tabrakan dengan dinding
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    ) {
        return true;
    }

    // tabrakan dengan ular itu sendiri
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    return false;
}