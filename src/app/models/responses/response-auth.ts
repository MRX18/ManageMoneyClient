export interface Jwt {
    fullName: string,
    token: string
}

export class Response<T> {
    notificationType: number | null = null;
    message: string | null = null;
    data: T | null = null;
}