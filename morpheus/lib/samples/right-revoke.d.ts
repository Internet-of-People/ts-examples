import { Crypto } from '@internet-of-people/sdk';
export declare const rightRevoke: (vaultPath: string, keyIdToRevoke: Crypto.Types.Authentication, didToAdd: Crypto.Did, signerKeyId: Crypto.Types.Authentication, gasPassphrase: string) => Promise<void>;
