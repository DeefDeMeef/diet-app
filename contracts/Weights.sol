// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1 <0.9.0;

contract Weights {
  address owner;
  // int8[] weights;
  // int8 ownerWeight;
  // int8 futureWeight;

  constructor() {
    owner = msg.sender;
  }

  mapping(address => uint256[]) private weights;
  mapping(address => uint256) private ownerWeight;
  mapping(address => uint256) private futureWeight;


  function makePayment() payable public {}

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function setWeight(uint256 _ownerWeight, uint256 _futureWeight) public {
    ownerWeight[msg.sender] = _ownerWeight;
    futureWeight[msg.sender] = _futureWeight;
  }

  function pushWeight(uint256 _weight) public {
    weights[msg.sender].push(_weight);
  }

  function getLastWeight() view public returns (uint256) {
    return ownerWeight[msg.sender];
  }

  function getFutureWeight() view public returns (uint256) {
    return futureWeight[msg.sender];
  }

  function getLastWritedWeight() view public returns (uint256[] memory) {
    // int8 index = weights.length - 1;
    return weights[msg.sender];
  }

  function checkWeight(address payable payableAddress) public {
    bool success = false;
    for (uint i = 0; i < weights[msg.sender].length; i++) {
      if (weights[msg.sender][i] == futureWeight[msg.sender]) {
        success = true;
      }
    }

    if (success) {
      payableAddress.transfer(address(this).balance);
    }
  }
}