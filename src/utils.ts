import { Note } from './schema';
import { Guid } from 'guid-typescript';
import { IInsecureUser } from '@fluidframework/test-runtime-utils';

export function getRotation(note: Note) {
    const i = hashCode(note.id);

    const rotationArray = [
        'rotate-1',
        '-rotate-2',
        'rotate-2',
        '-rotate-1',
        '-rotate-3',
        'rotate-3',
    ];

    return rotationArray[i % rotationArray.length];
}

function hashCode(str: string): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = 31 * h + str.charCodeAt(i);
    }
    return h;
}

export const generateTestUser = (): IInsecureUser => {
    const user = {
        id: Guid.create().toString(),
        name: '[TEST USER]',
    };
    return user;
};