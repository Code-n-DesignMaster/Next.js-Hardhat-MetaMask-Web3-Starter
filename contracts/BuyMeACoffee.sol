// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyMeACoffee {
    address payable public owner;

    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message,
        uint256 amount
    );

    event TipsWithdrawn(
        address indexed owner,
        uint256 amount
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
        uint256 amount;
    }

    Memo[] private memos;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory name, string memory message) public payable {
        require(msg.value > 0, "Can't buy coffee with 0 ETH");

        memos.push(Memo(
            msg.sender,
            block.timestamp,
            name,
            message,
            msg.value
        ));

        emit NewMemo(
            msg.sender,
            block.timestamp,
            name,
            message,
            msg.value
        );
    }

    function withdrawTips() public onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "No tips to withdraw");
        owner.transfer(amount);
        emit TipsWithdrawn(owner, amount);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}