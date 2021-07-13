# IOP SSI (Project Morpheus) Examples

This repository contains example codes how can IOP SSI be used.  Also, you can even test it via command line commands described below.

The `src/samples` contains the actual code you'll need in your application, while the `src/cli-actions` contains code that requires by the cli code.

## Requirements

- NodeJS 12
- A running Hydra node. It can be local, testnet/devnet/mainnet.

## Install & Build

```bash
$ npm install
$ npm run build
```

## Run

```bash
# Get help
$ ./morpheus.sh --help

# Run an action
$ ./morpheus.sh ACTION ACTION_PARAMETERS
```

### Recommended Steps to Discover

We recommend to follow these steps to discover how the SSI SDK really works.

1. Transfer HYD
1. Register a content id as a proof of existence
1. Query a content id
1. Query a content id's history
1. Init Vault
1. Create DID
1. Add Key to a DID

## Notes

### Network Selection

By default all commands connects to a testnet node. You can overwrite it with `--network=[local-testnet|devnet|mainnet]` parameter;

## Available Commands

### Init Vault

```bash
$ ./morpheus.sh vault-init --vault-path="~/vault.dat" --unlock-password="YOUR_PASSWORD"
```

### Dump Vault

```bash
$ ./morpheus.sh vault-dump --vault-path="~/vault.dat"
```

### Create DID

```bash
$ ./morpheus.sh did-create --vault-path="~/vault.dat" --unlock-password="YOUR_PASSWORD"
```

### Transfer HYD

```bash
$ ./morpheus.sh transfer --vault-path="~/vault.dat" --unlock-password="YOUR_PASSWORD" --to="tmaw6nAhMGMEGyKBNPKZdtyBBxh9K5qw1S" --amount=10
```

### Register Proof of Existence

```bash
$ ./morpheus.sh poe-register --vault-path="~/vault.dat" --unlock-password="YOUR_PASSWORD" --content-id="cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFa" 
```

### Query Proof of Existence

```bash
$ ./morpheus.sh poe-query --content-id="cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFa" --at-height=42
```

### Query Proof of Existence History

```bash
$ ./morpheus.sh poe-query-history --content-id="cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFa"
```

### Add Key to a DID

```bash
$ ./morpheus.sh key-add --vault-path="~/vault.dat" --unlock-password="YOUR_PASSWORD" --keyid="iez22NLTaxVhYV1jfECpMCA6bR" --did="did:morpheus:ezue9r5y1Y41UZdrzM4rmdEc" --signer-keyid="iezue9r5y1Y41UZdrzM4rmdEc"
```

### Revoke Key From a DID

```bash
$ ./morpheus.sh key-revoke --vault-path="~/vault.dat" --unlock-password="YOUR_PASSWORD" --keyid="iez22NLTaxVhYV1jfECpMCA6bR" --did="did:morpheus:ezue9r5y1Y41UZdrzM4rmdEc" --signer-keyid="iezue9r5y1Y41UZdrzM4rmdEc"
```

### Add Right to a Key

```bash
$ ./morpheus.sh right-add --vault-path="~/vault.dat" --unlock-password="YOUR_PASSWORD" --keyid="iez22NLTaxVhYV1jfECpMCA6bR" --did="did:morpheus:ezue9r5y1Y41UZdrzM4rmdEc" --signer-keyid="iezue9r5y1Y41UZdrzM4rmdEc" --right="impersonate"
```

### Revoke Right from a Key

```bash
$ ./morpheus.sh right-revoke --vault-path="~/vault.dat" --unlock-password="YOUR_PASSWORD" --keyid="iez22NLTaxVhYV1jfECpMCA6bR" --did="did:morpheus:ezue9r5y1Y41UZdrzM4rmdEc" --signer-keyid="iezue9r5y1Y41UZdrzM4rmdEc" --right="impersonate"
```

### Tombstone DID

```bash
$ ./morpheus.sh did-tombstone --vault-path="~/vault.dat" --unlock-password="YOUR_PASSWORD" --did="did:morpheus:ezue9r5y1Y41UZdrzM4rmdEc" --signer-keyid="iezue9r5y1Y41UZdrzM4rmdEc"
```