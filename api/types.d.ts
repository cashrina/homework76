export interface IMessages {
    id: string;
    author: string;
    message: string;
    datetime:string;
}

export interface MessagesMutation {
    author: string;
    message: string;
}