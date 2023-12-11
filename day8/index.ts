import { readTextFile } from "../utils/readTextFile";

const file = readTextFile('day8/data.txt');

type Direction = 'L' | 'R';
type Steps = Record<string, Record<Direction, string>>;

const partOne = (input: string[]): number => {
    const dir = input[0].split('') as Direction[];

    const steps = input.slice(2).reduce<Steps>((acc, value) => {
        const [step, locations] = value.split(' = ');
        const [left, right] = locations.replace(/[\(\)]/g, '').split(', ');

        return {
            ...acc,
            [step]: {
                L: left,
                R: right
            }
        };
    }, {});

    return traverse(dir, steps);
}

const traverse = (dir: Direction[], steps: Steps, current = "AAA", trips = 0): number => {
    for (const direction of dir) {
        current = steps[current][direction];
        trips++;

        if (current === "ZZZ") return trips;
    }

    return traverse(dir, steps, current, trips);
}

const lcm = (...numbers: number[]) => numbers.reduce((a, b) => a * b / gcd(a, b));

const gcd = (...numbers: number[]) => numbers.reduce((a, b) => {
    while (b) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
});

const partTwo = (input: string[]): number => {
    const dir = input[0].split('') as Direction[];

    const steps = input.slice(2).reduce<Steps>((acc, value) => {
        const [step, locations] = value.split(' = ');
        const [left, right] = locations.replace(/[\(\)]/g, '').split(', ');

        return {
            ...acc,
            [step]: {
                L: left,
                R: right
            }
        };
    }, {});

    const initialPaths = Object.keys(steps).filter(key => key.endsWith('A'));

    const result = Array(initialPaths.length).fill(0);

    for (let i = 0; i < initialPaths.length; i++) {
        while (!initialPaths[i].endsWith("Z")) {
            for (const direction of dir) {
                initialPaths[i] = steps[initialPaths[i]][direction];
                result[i]++;

                if (initialPaths[i].endsWith("Z")) break;
            }
        }
    }

    return lcm(...result);
}

console.log("Part one: ", partOne(file));
console.log("Part two: ", partTwo(file));