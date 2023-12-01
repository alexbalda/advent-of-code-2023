import { readTextFile } from "../utils/readTextFile";
import { join } from 'path';

// Keeping the first and last character due to overflows (ex: oneight)
const digitMap = {
    one: 'o1e',
    two: 't2o',
    three: 't3e',
    four: 'f4r',
    five: 'f5e',
    six: 's6x',
    seven : 's7n',
    eight: 'e8t',
    nine: 'n9e',
} as const;

const getCalibrationValue = (input: string): number => {
    const processedInput = Object.entries(digitMap).reduce((acc, [key, value]) => acc.replace(new RegExp(key, 'g'), value), input);

    let firstPointer = 0;
    let secondPointer = processedInput.length - 1;

    while (firstPointer <= secondPointer) {
        const val1 = Number(processedInput[firstPointer])
        const val2 = Number(processedInput[secondPointer]);

        if (!isNaN(val1) && !isNaN(val2)) {
            return Number(`${val1}${val2}`);
        }

        if (isNaN(val1)) {
            firstPointer++;
        }

        if (isNaN(val2)) {
            secondPointer--;
        }
    }

    return 0;
}

const calculateCalibrationSum = (data: string[]): number => data.reduce((acc, curr) => acc + getCalibrationValue(curr), 0);

console.log(calculateCalibrationSum(readTextFile(join(__dirname, './data.txt'))));
