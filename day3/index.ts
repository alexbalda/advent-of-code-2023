import { join } from "path"
import { readTextFile } from "../utils/readTextFile"

const ADJACENT_COORDINATES = [
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1]
];

const partOne = (input: string[]): number => {
    let hasAdjacent = false;
    let numStr = '';
    const resultingNums = [];

    for (let i=0; i < input.length; i++) {
        const cols = input[i].split('');

        for (let j=0; j < cols.length; j++) {
            const value = Number(input[i][j]);

            // If it's not a number, process the previous numbers if they have an adjacent symbol
            if (isNaN(value)) {
                if (hasAdjacent) {
                    resultingNums.push(Number(numStr));
                }

                hasAdjacent = false;
                numStr = '';

                continue;
            };

            // If it's a number and the current configuration is valid, add the number to the existing string
            if (!isNaN(value) && hasAdjacent) {
                numStr += value;
                continue;
            }

            hasAdjacent = ADJACENT_COORDINATES.some(([x, y]) => {
                if ((j + y > cols.length - 1 || j + y < 0) || (i + x > input.length - 1 || i + x < 0)) {
                    return false;
                };

                const adjacentElement = input[i + x][j + y];

                return isNaN(Number(adjacentElement)) && adjacentElement !== '.';
            });

            numStr += value;
        }
    }

    return resultingNums.reduce((acc, value) => acc += value, 0);
}

const partTwo = (input: string[]): number => {
    let hasAdjacent = false;
    let numStr = '';
    let gearCoordinates: {x: number; y: number} | null = null;
    const config: Array<{
        num: number;
        adjacentGearCoords: { x: number; y: number }
    }> = [];

    for (let i = 0; i < input.length; i ++) {
        const cols = input[i].split('');

        for (let j = 0; j < cols.length; j ++) {
            const value = Number(input[i][j]);

            if (isNaN(value)) {
                if (hasAdjacent && gearCoordinates) {
                    config.push({
                        num: Number(numStr),
                        adjacentGearCoords: gearCoordinates
                    })
                }

                hasAdjacent = false;
                gearCoordinates = null;
                numStr = '';

                continue;
            };

            if (!isNaN(value) && hasAdjacent) {
                numStr += value;
                continue;
            }


            hasAdjacent = ADJACENT_COORDINATES.some(([x, y]) => {
                if ((j + y > cols.length - 1 || j + y < 0) || (i + x > input.length - 1 || i + x < 0)) {
                    return false;
                };

                const adjacentSymbol = input[i + x][j + y];

                if (adjacentSymbol === '*') {
                    gearCoordinates = { x: i + x, y: j + y };

                    return true;
                }

                return false;
            });

            numStr += value;
        }
    }

    let ratio = 0;

    for (let i = 0; i < config.length; i ++) {
        for (let j = i + 1; j < config.length; j ++) {
            if (config[i].adjacentGearCoords.x === config[j].adjacentGearCoords.x && config[i].adjacentGearCoords.y === config[j].adjacentGearCoords.y) {
                ratio += config[i].num * config[j].num;
            }
        }
    }

    return ratio;
}

const file = readTextFile(join(__dirname, 'data.txt'));

console.log(partOne(file));
console.log(partTwo(file));