import { Crypto } from '@internet-of-people/sdk';
export declare const didTombstone: (vaultPath: string, didToTombstone: Crypto.Did, signerKeyId: Crypto.Types.Authentication, gasPassphrase: string) => Promise<void>;
