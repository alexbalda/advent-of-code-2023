import { readTextFile } from "../utils/readTextFile";

const file = readTextFile('day5/data.txt');

const getNumericValues = (line: string): number[] => line
    .replace(/[^\d\s]/g, '')
    .trim()
    .split(' ')
    .reduce<number[]>((acc, val) => {
        if (!val) {
            return acc;
        }

        return [...acc, Number(val)];
    }, []);

const buildMaps = (input: string[]): number[][][] => {
    const maps: number[][][] = [];

    let currIndex = 0;

    input.forEach(line => {
        const [type] = line.match(/[a-z]*-to-[a-z]*/g) ?? [];
        const values = getNumericValues(line);

        if (type) {
            currIndex = maps.length;
            maps[currIndex] = [];
        }

        if (values.length) {
            maps[currIndex].push(values);
        }
    });

    return maps.map(x => x.sort(([_a, sourceA], [_b, sourceB]) => sourceA - sourceB));
}

const mapValue = (seed: number, map: number[][]) => {
    for (let i = 0; i < map.length; i ++) {
        const [destination, source, range] = map[i];

        const isWithinRange = seed >= source && seed < source + range;

        if (isWithinRange) {
            const diff = seed - source;

            return destination + diff;
        }
    }

    return seed;
}

const partOne = (input: string[]): number => {
    const [seeds, ...rest] = input;

    const processedSeeds = getNumericValues(seeds);

    const maps = buildMaps(rest);

    let minLocation = Number.MAX_SAFE_INTEGER;

    for (const seed of processedSeeds) {
        const location = maps.reduce(mapValue, seed);

        if (location < minLocation) {
            minLocation = location;
        }
    }

    return minLocation;
}

// Sluggish Execution Time
const partTwo = (input: string[]): number => {
    const [seeds, ...rest] = input;

    const processedSeeds = getNumericValues(seeds);

    const maps = buildMaps(rest);

    let minLocation = Number.MAX_SAFE_INTEGER;

    for(let i = 0; i < processedSeeds.length; i += 2) {
        const start = processedSeeds[i];
        const end = start + processedSeeds[i + 1] - 1;
        const [seedToSoilMap] = maps;
    
        for(let j = 0; j < seedToSoilMap.length; j++) {
            const [_, source, range] = seedToSoilMap[j];

            const seedToSoilMapEnd = source + range - 1;
            const seedToSoilMapStart = source;

            const rangeOverlap = Math.min(end, seedToSoilMapEnd) - Math.max(start, seedToSoilMapStart);

            if (rangeOverlap >= 0) {
                const rangeStart = start >= seedToSoilMapStart ? start : seedToSoilMapStart;
                const rangeEnd = end <= seedToSoilMapEnd ? end : seedToSoilMapEnd;
    
                for (let k = rangeStart; k <= rangeEnd; k++) {
                    const location = maps.reduce(mapValue, k);

                    if (location < minLocation) {
                        minLocation = location;
                    }
                }
            }
        }
    }

    return minLocation;
}

console.log('Part One: ', partOne(file));
console.log('Part Two: ', partTwo(file));
