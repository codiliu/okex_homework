//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Bank {
    mapping(address =>  uint256) deposits;
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    receive() external payable {
      deposits[msg.sender] += msg.value;
    }

    function withdraw() public payable{
        require(msg.sender == owner);
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    } 
   
}
