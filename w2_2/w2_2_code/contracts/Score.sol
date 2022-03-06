//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Score {
    mapping(address => uint256) scores;
    address teacher;
    
    constructor() {
       teacher = address(new Teacher(address(this)));
    }

    function setScore(address _addr, uint256 _score) external onlyTeacher payable {
        require(_score<=100, "Score cannot be over 100");
        scores[_addr] = _score;
    }

    modifier onlyTeacher(){
        console.log(111);
        console.log(msg.sender);
        console.log(teacher);
        require(msg.sender == teacher, "Not Teacher");
        _;
    }
}

interface IScore {
    function setScore(address addr, uint256 score) external;
}

contract Teacher {
    IScore public score;

    constructor(address _addr) {
        score = IScore(_addr);
    }

    function SetStudentScore(address _addr, uint256 _score) public {
        score.setScore(_addr, _score);
    }

}
