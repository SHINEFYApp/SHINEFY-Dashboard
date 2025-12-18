export interface manageSubadmin {
    name: string,
    phoneNumber: string,
    isSms: boolean ,
    email: string,
    password: string,
    confirmPassword: string,
    privileges : Record<number, string[]>
}