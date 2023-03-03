import { ENCRYPTION_CONFIG } from "./constants";

const { encryption, keyAlgo, hash, iterations } = ENCRYPTION_CONFIG;

const fileToUint8Array = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(new Uint8Array(reader.result as ArrayBuffer));
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

export const encryptFileWithPassword = async (
    file: File,
    password: string
): Promise<{
    data: ArrayBuffer;
    iv: Uint8Array;
    salt: Uint8Array;
    extension: string;
}> => {
    const fileData = await fileToUint8Array(file);

    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const importedKey = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        { name: keyAlgo },
        false,
        ["deriveKey"]
    );
    const key = await window.crypto.subtle.deriveKey(
        {
            name: keyAlgo,
            salt,
            iterations: iterations,
            hash: hash,
        },
        importedKey,
        { length: 32 * 8, name: encryption },
        false,
        ["encrypt"]
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const data = await window.crypto.subtle.encrypt(
        { name: encryption, iv },
        key,
        fileData
    );

    return {
        data,
        iv,
        salt,
        extension: file.type,
    };
};

export const decryptFileWithPassword = async (
    encryptedData: ArrayBuffer,
    salt: Uint8Array,
    iv: Uint8Array,
    password: string
): Promise<ArrayBuffer> => {
    const importedKey = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        { name: keyAlgo },
        false,
        ["deriveKey"]
    );

    const key = await window.crypto.subtle.deriveKey(
        {
            name: keyAlgo,
            salt: new Uint8Array(salt),
            iterations: iterations,
            hash: hash,
        },
        importedKey,
        { length: 32 * 8, name: encryption },
        false,
        ["decrypt"]
    );

    let decryptedData: ArrayBuffer | null = null;

    try {
        decryptedData = await window.crypto.subtle.decrypt(
            { name: encryption, iv: new Uint8Array(iv) },
            key,
            encryptedData
        );
    } catch {}

    return decryptedData;
};
