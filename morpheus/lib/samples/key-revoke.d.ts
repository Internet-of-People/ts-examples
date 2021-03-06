import { Crypto } from '@internet-of-people/sdk';
export declare const keyRevoke: (network: string, vaultPath: string, keyIdToRevoke: Crypto.Types.Authentication, didFromRevoke: Crypto.Did, signerKeyId: Crypto.Types.Authentication, gasPassphrase: string) => Promise<void>;
