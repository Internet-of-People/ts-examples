# IOP Coeus Examples

This repository contains example codes how can IOP DNS be used.  Also, you can even test it via command line commands described below.

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
$ ./coeus.sh --help

# Run an action
$ ./coeus.sh ACTION ACTION_PARAMETERS
```

## Notes

### Network Selection

By default all commands connects to a local test node. You can overwrite it with `--network=[testnet|devnet|mainnet]` parameter;

### Used Addresses

The scripts right now use two addresses which you have to make sure have some HYDs on it.

#### Testnet

- tfGrjiGiL3Rs4etZw6SchqXt8JJ1VFzNHB: for register, renew, update, transfer
- thPGZgTWACKgaPFFg7Ev59bUzoyeLehQqP: for delete

#### Devnet

- dNRwKawmMBpZzBbH19nWH5BzD8WAPfDdad: for register, renew, update, transfer
- dQYM9Z8ZBLiPVuwxkAaoePFb5eBoMKEYHA: for delete

#### Mainnet

- hFU745UqLLHqMZMz2qjEomBWBBJMhYyTE6: for register, renew, update, transfer
- hQCNZyoVFi8nkWTvNKF3uHTafRapCQBDNy: for delete

## Available Commands

### Register

```bash
$ ./coeus.sh register --domain=".schema.iop" --data="{}" --expires-at-height=1000
```

### Renew

```bash
$ ./coeus.sh renew --domain=".schema.iop" --expires-at-height=1001
```

### Update

```bash
$ ./coeus.sh update --domain=".schema.iop" --data='{"note":"Do not panic and carry a towel"}'
```

### Transfer

```bash
$ ./coeus.sh transfer --domain=".schema.iop"
```

### Delete

```bash
$ ./coeus.sh delete --domain=".schema.iop"
```
