import { readFileSync } from 'fs';

export const readTextFile = (path: string): string[] => {
    const file = readFileSync(path);

    return file.toString().split('\n');
}