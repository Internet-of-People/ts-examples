import { Crypto } from '@internet-of-people/sdk';
export declare const didTombstone: (network: string, vaultPath: string, didToTombstone: Crypto.Did, signerKeyId: Crypto.Types.Authentication, gasPassphrase: string) => Promise<void>;
