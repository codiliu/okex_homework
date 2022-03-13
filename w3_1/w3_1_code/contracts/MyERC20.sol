//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
    constructor() ERC20("ERC20Token", "T20Test") {
        _mint(msg.sender, 0);
    }
    function mint(address _address, uint256 _amount) public returns(bool) {
        _mint(_address, _amount);
        return true;
    }
}