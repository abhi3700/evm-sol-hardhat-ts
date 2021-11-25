// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/utils/Context.sol';
import "hardhat/console.sol";

contract TestToken is ERC20, Ownable, Pausable {

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        // _mint(_msgSender(), 1_000_000 * (10 ** uint256(decimals())));
    }

    // -------------------------------------------------------------
    /**
     * @notice Mints given amount of tokens to recipient
     * @dev only owner can call this mint function
     * @param to address of account to receive the tokens
     * @param amount amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner whenNotPaused returns (bool) {
        require(amount != 0, "amount == 0");
        _mint(to, amount);

        return true;
    }

    // -------------------------------------------------------------
    /// @notice burn function
    /// @param from token holder address
    /// @param amount mint amount
    function burn(address from, uint256 amount) external whenNotPaused returns (bool) {
        _burn(from, amount);

        return true;
    }

    // ------------------------------------------------------------------------------------------
    /// @notice Pause contract 
    function pause() public onlyOwner whenNotPaused {
        _pause();
    }

    /// @notice Unpause contract
    function unpause() public onlyOwner whenPaused {
        _unpause();
    }

}