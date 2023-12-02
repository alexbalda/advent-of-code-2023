import { readTextFile } from "../utils/readTextFile";
import { join } from 'path';

const COLORS = ['blue', 'green', 'red'] as const;
const PATTERN = new RegExp(`\\d+ (${COLORS.join('|')})`);

const processInput = (input: string): string[] => input.split(/: |, |; /);

// Part 1
const getSumOfValidIds = (input: string[]): number => {
    const thresholds: Record<string, number> = {
        blue: 14,
        green: 13,
        red: 12
    };

    return input.reduce((total, val, index) => {
        const processedInput = processInput(val);

        const isValid = processedInput.every(x => {
            const match = x.match(PATTERN);

            if (match) {
                const [num, color] = match[0].split(' ');

                if (Number(num) > thresholds[color]) {
                    return false;
                }
            }

            return true;
        });

        return total += (isValid ? index + 1 : 0);
    }, 0);
}

// Part 2
const getSumOfPowers = (input: string[]): number => {
    return input.reduce((total, val) => {
        const processedInput = processInput(val);

        const { red, blue, green } = processedInput.reduce((acc, num) => {
            const match = num.match(PATTERN);

            if (match) {
                const [num, color] = match[0].split(' ');

                return {...acc, [color]: [...acc[color as typeof COLORS[number]], num]};
            }
            
            return acc;
        }, {
            red: [],
            blue: [],
            green: []
        });

        return total += Math.max(...red) * Math.max(...blue) * Math.max(...green);
    }, 0);
}

const file = readTextFile(join(__dirname, './data.txt'));

console.log(getSumOfValidIds(file));
console.log(getSumOfPowers(file));