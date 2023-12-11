import { readTextFile } from "../utils/readTextFile";

const file = readTextFile('day9/data.txt');

const buildSequence = (sequence: number[], arrIndex = 1, acc = [sequence]): number[][] => {
    acc[arrIndex] = [];

    for (let i = 1; i < sequence.length; i ++) {
        const diff = sequence[i] - sequence[i - 1];

        acc[arrIndex].push(diff);
    }

    if (acc[arrIndex].every(x => x === 0)) {
        return acc;
    };

    return buildSequence(acc[arrIndex], ++arrIndex, acc);
}

const partOne = (input: string[]): number => {
    const sequences = input.map(x => x.split(' ').map(Number));
    const histories = [];

    for (let i = 0; i < sequences.length; i ++) {
        const builtSequence = buildSequence(sequences[i]);

        for (let i = builtSequence.length - 1; i >= 0; i --) {
            if (i === 0) {
                histories.push(builtSequence[i][builtSequence[i].length - 1]);
            } else {
                const lastCurrent = builtSequence[i][builtSequence[i].length - 1];
                const lastNext = builtSequence[i - 1][builtSequence[i - 1].length - 1];

                builtSequence[i - 1].push(lastCurrent + lastNext);
            }
        }   
    }

    return histories.reduce((acc, curr) => acc += curr, 0);
}

const partTwo = (input: string[]): number => {
    const sequences = input.map(x => x.split(' ').map(Number));
    const histories = [];

    for (let i = 0; i < sequences.length; i ++) {
        const builtSequence = buildSequence(sequences[i]);

        for (let i = builtSequence.length - 1; i >= 0; i --) {
            if (i === 0) {
                histories.push(builtSequence[i][0]);
            } else {
                const firstCurrent = builtSequence[i][0];
                const firstNext = builtSequence[i - 1][0];

                builtSequence[i - 1].unshift(firstNext - firstCurrent);
            }
        }   
    }

    return histories.reduce((acc, curr) => acc += curr, 0);
}

console.log(`Part One: ${partOne(file)}`);
console.log(`Part Two: ${partTwo(file)}`);