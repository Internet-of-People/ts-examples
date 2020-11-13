import { Crypto } from '@internet-of-people/sdk';
export declare const rightAdd: (network: string, vaultPath: string, keyIdToAdd: Crypto.Types.Authentication, didToAdd: Crypto.Did, signerKeyId: Crypto.Types.Authentication, gasPassphrase: string) => Promise<void>;
