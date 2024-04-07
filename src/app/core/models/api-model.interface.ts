export interface IGetApisResponse {
    count: number;
    entries: IApi[];
}

export interface IApi {
    API: string,
    Description: string,
    Auth: string,
    HTTPS: boolean,
    Cors: 'yes'|'no'|'unknown',
    Link: string,
    Category: string
}