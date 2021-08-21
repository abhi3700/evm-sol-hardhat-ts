# Ethereum Solidity Hardhat Template
Ethereum + Solidity + Hardhat + Typechain

Ethereum with Solidity contracts using Hardhat testing framework in TypeScript

## Use
- [Hardhat](https://github.com/nomiclabs/hardhat): compile and run the smart contracts on a local development network
- [TypeChain](https://github.com/ethereum-ts/TypeChain): generate TypeScript types for smart contracts
- [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library and wallet implementation
- [Waffle](https://github.com/EthWorks/Waffle): tooling for writing comprehensive smart contract tests
- [Solhint](https://github.com/protofire/solhint): linter
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity): code formatter

This is a GitHub template, which means you can reuse it as many times as you want. You can do that by clicking the "Use this
template" button at the top of the page.


## Setup
### 1. Environment variables
* Create a `.env` file with its values:
```
DEPLOYER_PRIVATE_KEY=<private_key_without_0x>
INFURA_API_KEY=<SECRET_KEY>
REPORT_GAS=<true_or_false>
```

### 2. Install the dependencies
* Command:
  - M-1: `$ npm install` (install all the packages listed inside `package.json`)
  - M-2:`$ npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers hardhat-gas-reporter @openzeppelin/contracts typechain @typechain/ethers-v5 dotenv` 

### 3. Start writing contracts
* Contracts in the "contracts/" folder.
* Deployment scripts in the "deployment/" folder.
* Testing (locally) scripts in the "scripts/" folder.

## Usage

### Pre Requisites

Before running any command, make sure to install dependencies:

```sh
$ npm install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ npx hardhat compile
```

### Test

Run the Mocha tests:

```sh
$ npx hardhat test
```

### Deploy contract to netowrk (requires Mnemonic/deployer_private_key and Infura API key)

```
npx hardhat run --network rinkeby ./deployment/deploy.ts
```

### Validate a contract with etherscan (requires API ke)

```
npx hardhat verify --network <network> <DEPLOYED_CONTRACT_ADDRESS> "Constructor argument 1"
```

### Added plugins

- Gas reporter [hardhat-gas-reporter](https://hardhat.org/plugins/hardhat-gas-reporter.html)
- Etherscan [hardhat-etherscan](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)

## References
* [My notes on Hardhat](https://github.com/abhi3700/ethio_playground/blob/main/libs/hardhat/README.md)

## Thanks

If you like it, then you can put a star ⭐ on the repo.
