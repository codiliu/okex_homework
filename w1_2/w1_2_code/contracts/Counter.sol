// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {

    uint public counter;

    constructor() {
        counter = 0;
        console.log("init");
    }
    
    function count() public {
        counter = counter + 1;
        console.log("current counter: ", counter);
    }

    function set(uint x) public {
        counter = counter + x;
    }
}