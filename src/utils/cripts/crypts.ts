import Cryptr from "cryptr";
import bcrypt from "bcrypt";

function encryptByCrypt(infoDescrypt: string): string { 
    const cryptr: Cryptr = new Cryptr('myTotallySecretKey');
    const encrypt: string = cryptr.encrypt(infoDescrypt);

    return encrypt;
}

function descriptByCrypt(infoEncrypt: string): string { 
    const cryptr: Cryptr = new Cryptr('myTotallySecretKey');
    const descrypt: string = cryptr.decrypt(infoEncrypt); 

    return descrypt;
} 

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
    encryptByCrypt,
    descriptByBcrypt,
    descriptByCrypt
}