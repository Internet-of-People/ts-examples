import { Crypto } from '@internet-of-people/sdk';
export declare const keyAdd: (vaultPath: string, keyIdToAdd: Crypto.Types.Authentication, didToAdd: Crypto.Did, signerKeyId: Crypto.Types.Authentication, expiresAtHeight: number, gasPassphrase: string) => Promise<void>;
