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

By default all commands connects to a local test node. You can overwrite it with `--network=[testnet|devnet|mainnet]` parameter;

## Available Commands

### Init Vault

```bash
$ ./morpheus.sh vault-init --at="/home/marvin/vault.dat"
```

### Dump Vault

```bash
$ ./morpheus.sh vault-dump --at="/home/marvin/vault.dat"
```

### Create DID

```bash
$ ./morpheus.sh did-create --vault-path="/home/marvin/vault.dat"
```

### Transfer HYD

```bash
$ ./morpheus.sh transfer --from-passphrase="YOUR_PASSPHRASE" --to="tYkupfpnXHR9xtvWowscsWhyxvJLafb8ik" --amount=10
```

### Register Proof of Existence

```bash
$ ./morpheus.sh poe-register --content-id="cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFa" --gas-passphrase="YOUR_PASSPHRASE"
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
$ ./morpheus.sh key-add --vault-path="/home/marvin/vault.dat" --gas-passphrase="YOUR_PASSPHRASE" --keyid="iezxjqMH7vT8b8WFuKNSosYjo" --to-did="did:morpheus:ezqztJ6XX6GDxdSgdiySiT3J" --signer-keyid="iezqztJ6XX6GDxdSgdiySiT3J"
```

### Revoke Key From a DID

```bash
$ ./morpheus.sh key-revoke --vault-path="/home/marvin/vault.dat" --gas-passphrase="YOUR_PASSPHRASE" --keyid="iezxjqMH7vT8b8WFuKNSosYjo" --from-did="did:morpheus:ezqztJ6XX6GDxdSgdiySiT3J" --signer-keyid="iezqztJ6XX6GDxdSgdiySiT3J"
```

### Add Right to a Key

```bash
$ ./morpheus.sh right-add --vault-path="/home/marvin/vault.dat" --gas-passphrase="YOUR_PASSPHRASE" --keyid="iezxjqMH7vT8b8WFuKNSosYjo" --on-did="did:morpheus:ezqztJ6XX6GDxdSgdiySiT3J" --signer-keyid="iezqztJ6XX6GDxdSgdiySiT3J"
```

### Revoke Right from a Key

```bash
$ ./morpheus.sh right-revoke --vault-path="/home/marvin/vault.dat" --gas-passphrase="YOUR_PASSPHRASE" --keyid="iezxjqMH7vT8b8WFuKNSosYjo" --on-did="did:morpheus:ezqztJ6XX6GDxdSgdiySiT3J" --signer-keyid="iezqztJ6XX6GDxdSgdiySiT3J"
```

### Tombstone DID

```bash
$ ./morpheus.sh did-tombstone --vault-path="/home/marvin/vault.dat" --gas-passphrase="YOUR_PASSPHRASE" --did="did:morpheus:ezqztJ6XX6GDxdSgdiySiT3J" --signer-keyid="iezqztJ6XX6GDxdSgdiySiT3J"
```