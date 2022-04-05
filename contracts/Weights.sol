// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1 <0.9.0;

contract Weights {
  address owner;
  int8[] weights;
  int8 ownerWeight;
  int8 futureWeight;

  constructor() {
    owner = msg.sender;
  }

  function makePayment() payable public {}

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function setWeight(int8 _ownerWeight, int8 _futureWeight) public {
    ownerWeight = _ownerWeight;
    futureWeight = _futureWeight;
  }

  function pushWeight(int8 _weight) public {
    weights.push(_weight);
  }

  function getLastWeight() view public returns (int8) {
    return ownerWeight;
  }

  function getFutureWeight() view public returns (int8) {
    return futureWeight;
  }

  function getLastWritedWeight() view public returns (int8) {
    return weights[weights.length - 1];
  }

  function checkWeight(address payable payableAddress) public {
    bool success = false;
    for (uint i = 0; i < weights.length; i++) {
      if (weights[i] == futureWeight) {
        success = true;
      }
    }

    if (success) {
      payableAddress.transfer(address(this).balance);
    }
  }
}