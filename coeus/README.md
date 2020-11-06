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
