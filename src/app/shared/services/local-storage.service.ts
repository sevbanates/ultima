import { Injectable,  } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    private readonly encryptKey: string = '48a442f4-4ba2-4f02-8443-bf62e1bcb513-f8062ab8-aa32-4fd3-ab39-af3c70ec5e30';
    private readonly localStorageEncryptMode = environment.localStorageEncryptMode;

    constructor() {}

    getItem(key: string): any {
        if (this.localStorageEncryptMode) {
            return this.decryptData(localStorage.getItem(key) ?? null) ?? null;
        }

        const lsData = localStorage.getItem(key) ?? null;
        return (lsData ? JSON.parse(lsData) : null);
    }

    setItem(key: string, model: any) {
        if (this.localStorageEncryptMode) {
            model = this.encryptData(model);
            localStorage.setItem(key, model);
            return;
        }

        localStorage.setItem(key, JSON.stringify(model));
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    removeAllItem() {
        localStorage.clear();
    }

    //Encrypt - Decrypt
    private encryptData(data: any): any {
        try {
            return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptKey).toString();
        } catch (e) {
            console.log(e);
        }
    }

    private decryptData(data: any): any {
        if (!data) { return null; }

        try {
            const bytes = CryptoJS.AES.decrypt(data, this.encryptKey);
            if (bytes.toString()) {
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }
            return data;
        } catch (e) {
            console.log(e);
        }
    }

}