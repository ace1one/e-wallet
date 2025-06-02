export interface Error{
    status: string;
    clerkError: boolean
    errors: ErrorResponse[]
}

export interface ErrorResponse {
    code: string;
    message: string;
    meta:any
}