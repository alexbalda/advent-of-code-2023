import { readTextFile } from "../utils/readTextFile";

const file = readTextFile('day6/data.txt');

const getNums = (line: string): number[] => line
    .trim()
    .split(/\s+/)
    .map(Number)
    .filter(x => !isNaN(x));

const waysToBeatRecord = (time: number, record: number): number => {
    let ways = 0;

    for (let i = 1; i < time; i ++) {
        const distance = i * (time - i);

        if (distance > record) {
            ways ++;
        }
    }

    return ways;
}

const times = getNums(file[0]);
const records = getNums(file[1]);

let product = 1;

for (let i = 0; i < times.length; i ++) {
    product *= waysToBeatRecord(times[i], records[i]);
}

console.log(`Part One: ${product}`);

const wholeTime = times.join('');
const wholeRecord = records.join('');

console.log(`Part Two: ${waysToBeatRecord(Number(wholeTime), Number(wholeRecord))}`);