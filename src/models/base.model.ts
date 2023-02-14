export interface MangaDexEmpty {
    result: ('error' | 'ok');
    errors?: MangaDexError[];
}

export interface MangaDexRoot<T> extends MangaDexEmpty {
    response: string;
    data: T;
}

export interface MangaDexError {
    id: string;
    status: number;
    title: string;
    detail: string;
}

export interface MangaDexModel {
    id: string;
    type: string;
}

export interface MangaDexAttributes<T> extends MangaDexModel {
    attributes: T;
}

export interface MangaDexCollection<T> extends MangaDexRoot<T[]> {
    limit: number;
    offset: number;
    total: number;
}

export interface Localization { [key: string]: string; }

export type LocalizationList = Localization[];

export interface Relationship {
    type: string;
    id: string;
}