import { readTextFile } from "../utils/readTextFile";

type HandConfig = {
    bid: number,
    handStrength: number,
    strengthIndex: number
};

type WithOccurrences = Omit<HandConfig, 'handStrength'> & { occurrences: Record<string, number> };

// const strengthScale = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
// Strength scale for Part 2
const strengthScale = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

const hands = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 2],
    [1, 2, 2],
    [1, 1, 3],
    [2, 3],
    [1, 4],
    [5]
];

const getHandConfig = (hand: string, bid: number): HandConfig => {
    const splitHand = hand.split('');
    const handLength = splitHand.length;

    const { occurrences, ...config } = splitHand.reduce<WithOccurrences>((acc, curr, index) => ({
        ...acc,
        occurrences: {
            ...acc.occurrences,
            [curr]: acc.occurrences[curr] ? acc.occurrences[curr] + 1 : 1
        },
        // Increasing the strengthIndex by magnitude of index (Cards are given more weight the further left they are)
        strengthIndex: acc.strengthIndex + (strengthScale.indexOf(curr) * (100 ** (handLength - index)))
    }), { bid, occurrences: {}, strengthIndex: 0 });

    const { J = 0, ...rest } = occurrences;

    const sortedOccurrences = Object.values(rest).sort();

    // Returning 0 if there are only J's in the hand
    const mostCommonOccurrence = sortedOccurrences.pop() ?? 0;
    const newOccurrences = [...sortedOccurrences, mostCommonOccurrence + J];

    const handStrength = hands.reduce((acc, curr, index) => curr.every((y, innerIndex) => newOccurrences[innerIndex] === y) ? index : acc, 0);

    return { ...config, handStrength };
}

const main = (input: string[]): number => {
    const configs = input.map(x => {
        const [hand, bid] = x.split(' ');

        return getHandConfig(hand, Number(bid))
    });

    const sortedConfigs = configs.sort((a, b) => {
        if (a.handStrength === b.handStrength) {
            return a.strengthIndex - b.strengthIndex;
        }

        return a.handStrength - b.handStrength;
    });

    return sortedConfigs.reduce((acc, curr, index) => acc += curr.bid * (index + 1), 0);
}

const file = readTextFile('day7/data.txt');

console.log(main(file));