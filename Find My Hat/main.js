const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;


function generateField(col, row, freqOfHoles) {
    const gamefield = new Array(col).fill(0).map(() => new Array(row));
    for (let y = 0; y < col; y++) {
        for (let x = 0; x < row; x++) {
            const prob = Math.random();
            gamefield[y][x] = prob > freqOfHoles ? fieldCharacter : hole;
        }
    }
    return gamefield;
}

function printField(gamefield) {
    clear();
    gamefield.forEach(row => console.log(row.join('')));
}

// prompt user input for their next move
function getNextMove(direction, place) {
    switch (direction) {
        case 'up':
            return [place[0] - 1, place[1]];
        case 'right':
            return [place[0], place[1] + 1];
        case 'down':
            return [place[0] + 1, place[1]];
        case 'left':
            return [place[0], place[1] - 1];
        default:
            return place;
    }
}

function outOfBounds(place, col, row) {
    return (
        place[0] < 0 ||
        place[0] >= col ||
        place[1] < 0 ||
        place[1] >= row
    );
}

function start() {
    const freqOfHoles = 0.17;

    const gamefield = generateField(col, row, freqOfHoles);
    
    // setting default setting of user at 0,0 position and hats at random
    let userAt = [0, 0]; 
    let hatIsAt = [Math.floor(Math.random() * col), Math.floor(Math.random() * row)];
    while (hatIsAt[0] === 0 && hatIsAt[1] === 0) {
        hatIsAt = [Math.floor(Math.random() * col), Math.floor(Math.random() * row)];
    }
    gamefield[userAt[0]][userAt[1]] = pathCharacter;
    gamefield[hatIsAt[0]][hatIsAt[1]] = hat;

    let playing = true;
    while (playing) {
        printField(gamefield);
        // req. prompt and result prior to ending game
        const userInput = prompt('Which way?').toLowerCase();
        const nextMove = getNextMove(userInput, userAt);
        if (outOfBounds(nextMove, col, row)) {
            console.log("Out of bounds -  Game End!");
            playing = false;
            break;
        }
        const nextTile = gamefield[nextMove[0]][nextMove[1]];
        if (nextTile === hole) {
            console.log("Sorry, you fell down a hole!");
            playing = false;
            break;
        } else if (nextTile === hat) {
            console.log("Congrats, you found your hat!");
            playing = false;
            break;
        }
        gamefield[nextMove[0]][nextMove[1]] = pathCharacter;
        userAt = nextMove;
    }
}

// getting user's inputs // .toLowerCase - so caps (U R D L) are still accepted --> req.

function getNextMove(userInput, place) {
    switch (userInput.toLowerCase()) {
        case 'u':
            return [place[0] - 1, place[1]];
        case 'r':
            return [place[0], place[1] + 1];
        case 'd':
            return [place[0] + 1, place[1]];
        case 'l':
            return [place[0], place[1] - 1];
        default:
            return place;
    }
}




start();