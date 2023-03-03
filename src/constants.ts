export const ENCRYPTION_CONFIG = {
    encryption: "AES-GCM",
    keyAlgo: "PBKDF2",
    hash: "SHA-512",
    iterations: 2_100_000,
} as const;
