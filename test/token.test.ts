import { ethers } from "hardhat";
import chai from "chai";
import { BigNumber, Contract, Signer, Wallet } from "ethers";
import { deployContract, solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  MAX_UINT256,
  TIME,
  ZERO_ADDRESS,
  // asyncForEach,
  // deployContractWithLibraries,
  getCurrentBlockTimestamp,
  // getUserTokenBalance,
  // getUserTokenBalances,
  setNextTimestamp,
  setTimestamp,
} from "./testUtils"

chai.use(solidity);
const { expect } = chai;


describe("Token Contract", () => {
    let owner : SignerWithAddress, 
      owner2 : SignerWithAddress, 
      addr1 : SignerWithAddress, 
      addr2 : SignerWithAddress, 
      addr3 : SignerWithAddress, 
      addr4 : SignerWithAddress;
    let token: Contract;

    beforeEach(async () => {
        // get signers
        [owner, owner2, addr1, addr2, addr3, addr4] = await ethers.getSigners();

        // deploy token contract
        const tokenFactory = await ethers.getContractFactory('TestToken');;
        token = await tokenFactory.deploy("Test Token", "TST");

        expect(await token.totalSupply()).to.eq(0);

        // mint 10,000 tokens to each addr1, addr2, addr3
        await token.mint(addr1.address, BigNumber.from("10000000000000000000000"));
        await token.mint(addr2.address, BigNumber.from("10000000000000000000000"));
        await token.mint(addr3.address, BigNumber.from("10000000000000000000000"));

        // verify 10,000 tokens as balance of addr1, addr2, addr3
        expect(await token.balanceOf(addr1.address)).to.eq(BigNumber.from("10000000000000000000000"));
        expect(await token.balanceOf(addr2.address)).to.eq(BigNumber.from("10000000000000000000000"));
        expect(await token.balanceOf(addr3.address)).to.eq(BigNumber.from("10000000000000000000000"));
    });

    describe("Ownable", async () => {
        it("Should have the correct owner", async () => {
            expect(await token.owner()).to.equal(owner.address);
        });

        it("Owner is able to transfer ownership", async () => {
            await expect(token.transferOwnership(owner2.address))
                .to.emit(token, 'OwnershipTransferred')
                .withArgs(owner.address, owner2.address);
        });
    });

    describe("Pausable", async () => {
        it("Owner is able to pause when NOT paused", async () => {
            await expect(token.pause())
                .to.emit(token, 'Paused')
                .withArgs(owner.address);
        });

        it("Owner is able to unpause when already paused", async () => {
            token.pause();

            await expect(token.unpause())
                .to.emit(token, 'Unpaused')
                .withArgs(owner.address);
        });

        it("Owner is NOT able to pause when already paused", async () => {
            token.pause();

            await expect(token.pause())
                .to.be.revertedWith("Pausable: paused");
        });

        it("Owner is NOT able to unpause when already unpaused", async () => {
            token.pause();

            token.unpause();

            await expect(token.unpause())
                .to.be.revertedWith("Pausable: not paused");
        });
    });

    describe("Mint", async () => {
        it("Should mint some tokens", async () => {
        // get total supply before minting
        const totalSupplyBeforeMint = await token.totalSupply();

        // mint 10 tokens i.e. 1e19
        const toMint = BigNumber.from("10000000000000000000");
        await token.mint(addr1.address, toMint);

        const totalSupplyAfterMint = await token.totalSupply();

        expect(totalSupplyAfterMint.sub(totalSupplyBeforeMint)).to.eq(toMint);
        });
  });

  describe("Transfer", async () => {
    it("Succeeds when sender transfers amount", async () => {
        // addr1 -> addr2 (100 tokens i.e. 1e20)
        // get the balance of addr1, addr2 before transfer
        const balAddr1BeforeTransfer = await token.balanceOf(addr1.address);
        const balAddr2BeforeTransfer = await token.balanceOf(addr2.address);

        const transferAmt = BigNumber.from("100000000000000000000");
        await expect(token.connect(addr1).transfer(addr2.address, transferAmt))
            .to.emit(token, "Transfer")
            .withArgs(addr1.address, addr2.address, transferAmt);


        // get the balance of addr1, addr2 after transfer
        const balAddr1AfterTransfer = await token.balanceOf(addr1.address);
        const balAddr2AfterTransfer = await token.balanceOf(addr2.address);

        expect(balAddr1BeforeTransfer.sub(balAddr1AfterTransfer)).to.eq(transferAmt);
        expect(balAddr2AfterTransfer.sub(balAddr2BeforeTransfer)).to.eq(transferAmt);

    });

    it("Fails when sender has insufficient balance", async () => {
        // addr1 -> addr2 (> 10,000 tokens i.e. 1e20)
        // get the balance of addr1, addr2 before transfer
        const balAddr1BeforeTransfer = await token.balanceOf(addr1.address);

        // const transferAmt = BigNumber.from("100000000000000000000");
        await expect(token.connect(addr1).transfer(addr2.address, balAddr1BeforeTransfer.add(1)))
            .to.be.revertedWith("ERC20: transfer amount exceeds balance");

    });

  });

  // TODO: transferFrom

  // TODO: approve

  // TODO: allowance



  
});
