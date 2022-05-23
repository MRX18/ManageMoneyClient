
export class ResponseError {
    title: string | null = null;
    status: number | null = null;
    errors: {[key: string]: Array<string>} | null = null;
}