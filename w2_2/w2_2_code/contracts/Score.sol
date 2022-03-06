//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Score {
    mapping(address => uint256) scores;
    address public owner;
    
    constructor() {
       owner = msg.sender; 
    }

    function setScore(address _addr, uint256 _score) external onlyTeacher payable {
        require(_score<=100, "Score cannot over 100");
        scores[_addr] = _score;
    }

    modifier onlyTeacher(){
        require(msg.sender == owner, "Not Teacher");
        _;
    }
}

interface IScore {
    function setScore(address addr, uint256 score) external;
}

contract Teacher {
    IScore public score;
    constructor(IScore _addr) {
        score = _addr;
    }

    function SetStudentScore(address _addr, uint256 _score) public {
        score.setScore(_addr, _score);
    }

}
