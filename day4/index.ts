import { join } from "path";
import { readTextFile } from "../utils/readTextFile";

const file = readTextFile(join(__dirname, 'data.txt'));

const splitCard = (card: string): string[][] => card
    .replace(/Card\s*\d+:\s*/, '')
    .split('|')
    .map(s => s.trim().split(/\s+/));

const partOne = (input: string[]): number => {
    return input.reduce((acc, card) => {
        const [winningNumbers, ownedNumbers] = splitCard(card);

        const winningSet = new Set(winningNumbers);

        return acc += ownedNumbers.reduce((points, num) => winningSet.has(num) ? points > 0 ? points * 2 : 1 : points, 0);
    }, 0);
}

const partTwo = (input: string[]): number => {
    const scratchCards = new Array(input.length).fill(1);

    input.forEach((card, cardIndex) => {
        const [winningNumbers, ownedNumbers] = splitCard(card);

        const winningSet = new Set(winningNumbers);

        const matches = ownedNumbers.reduce((matches, num) => winningSet.has(num) ? matches + 1 : matches, 0);

        for (let i = cardIndex + 1; i < cardIndex + 1 + matches; i ++) {
            scratchCards[i] += scratchCards[cardIndex];
        }
    });

    return scratchCards.reduce((acc, val) => acc += val, 0);
}

console.log(partOne(file));
console.log(partTwo(file));