import bcrypt from "bcrypt";

function encriptByBcrypt(infoDescrypt: string): string {
    const encrypt: string = bcrypt.hashSync(infoDescrypt, 10); 

    return encrypt; 
}  

function descriptByBcrypt(infoEncrypt: string, password: string): boolean {
    const encrypt: boolean = bcrypt.compareSync(password,infoEncrypt); 

    return encrypt; 
} 

export const crypts = { 
    encriptByBcrypt,
    descriptByBcrypt
}