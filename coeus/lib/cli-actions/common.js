"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.principalParameter = (ref, cliFlag) => {
    return ref.defineStringParameter({
        parameterLongName: `--${cliFlag}`,
        argumentName: 'PRINCIPAL',
        description: 'The owner of the domain. Currently a pubkey.',
        required: true,
    });
};
exports.domainParameter = (ref) => {
    return ref.defineStringParameter({
        parameterLongName: '--domain',
        argumentName: 'DOMAIN',
        description: 'The domain, e.g. .schema.iop',
        required: true,
    });
};
exports.dataParameter = (ref) => {
    return ref.defineStringParameter({
        parameterLongName: '--data',
        argumentName: 'DATA',
        description: 'The data that satisfies the schema of the given domain\'s parent domain.',
        required: true,
    });
};
exports.expiresAtHeightParameter = (ref) => {
    return ref.defineIntegerParameter({
        parameterLongName: '--expires-at-height',
        argumentName: 'EXPIRES_AT_HEIGHT',
        description: 'The blockheight when the given domain are going to be expired.',
        required: true,
    });
};
exports.networkParameter = (ref) => {
    return ref.defineChoiceParameter({
        parameterLongName: '--network',
        alternatives: ['local-testnet', 'testnet', 'devnet', 'mainnet'],
        description: 'The network you would like to run against the script.',
        required: false,
        defaultValue: 'local-testnet'
    });
};
//# sourceMappingURL=common.js.map