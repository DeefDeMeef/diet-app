const address = "0x447D966Fc780b6f4698dD16d77886630A77E2d9A";

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "makePayment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int8",
        name: "_ownerWeight",
        type: "int8",
      },
      {
        internalType: "int8",
        name: "_futureWeight",
        type: "int8",
      },
    ],
    name: "setWeight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int8",
        name: "_weight",
        type: "int8",
      },
    ],
    name: "pushWeight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastWeight",
    outputs: [
      {
        internalType: "int8",
        name: "",
        type: "int8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFutureWeight",
    outputs: [
      {
        internalType: "int8",
        name: "",
        type: "int8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastWritedWeight",
    outputs: [
      {
        internalType: "int8",
        name: "",
        type: "int8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "payableAddress",
        type: "address",
      },
    ],
    name: "checkWeight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const connectWalletBtn = document.querySelector("#connectWallet")
const addressText = document.querySelector("#ethereumAddress")
const nextButtonConnect = document.querySelectorAll(".next")

const connectMeta = (e) => {
  if (window.ethereum) {
    ethereum.request({
        method: "eth_requestAccounts"
      })
      .then(() => {
        connectWalletBtn.innerHTML = "Disconnect wallet";
        addressText.value = window.ethereum.selectedAddress;
        nextButtonConnect[0].disabled = false;
        console.log(window.ethereum)
        app()
      })
      .catch((err) => console.error(err.message))
  } else {
    throw new Error("No wallet extension downloaded")
  }
}

const app = async () => {
  this.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545/"));

  if (this.web3 == null) {
    console.error("Geen web3 gevonden")
    return
  } else {
    console.log("provider found")
  }

  this.contract = await new this.web3.eth.Contract(abi, address);

  if (this.contract == null) {
    console.error("No contract found")
    return
  } else {
    console.log("contract found")
  }

  this.accounts = await web3.eth.getAccounts();

  if (this.accounts == null) {
    console.error("No accounts found")
    return
  } else {
    console.log("accounts found")
  }

  if (this.accounts.length == 0) {
    console.error("No eth acc found")
    return
  } else {
    console.log("Ethereum acc found!")
  }

  this.account = accounts[0]

  getCurrentBalance();
  getWeights();

  const depositBtn = document.querySelector("#depositBtn");
  const setWeightsBtn = document.querySelector("#setWeightsBtn");
  const newWeight = document.querySelector("#newWeightBtn");
  // const check = document.querySelector("#check");
  // const getLastW = document.querySelector("#getLast")

  depositBtn.addEventListener("click", depositFunds);
  setWeightsBtn.addEventListener("click", setWeights);
  newWeight.addEventListener("click", addWeight);
  // check.addEventListener("click", getPaid);
  // getLastW.addEventListener("click", getLastWritedWeight);
}

connectWalletBtn.addEventListener("click", connectMeta)

const getCurrentBalance = async () => {
  const balance = await this.web3.eth.getBalance(address)
  const ether = this.web3.utils.fromWei(balance, "ether");

  if (ether != 0) {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.add("hidden")
    }
    dashboard.classList.remove("hidden");
  }

  console.log("Balance: ", ether)
}

const depositFunds = async () => {
  let amount = document.querySelector("#depositAmount").value;

  if (!amount) {
    return
  }

  console.log("This is amount: ", amount)

  let weiValue = await this.web3.utils.toWei(amount, "ether")

  let sendit = await this.contract.methods.makePayment().send({
    from: this.account,
    value: weiValue,
  });

  getCurrentBalance();
}

const setWeights = async () => {
  let currentWeight = document.querySelector("#weightAmountCurrent").value;
  let targetWeight = document.querySelector("#weightAmount").value;

  if (!currentWeight || !targetWeight) {
    return
  }

  const sendit = await this.contract.methods.setWeight(currentWeight, targetWeight).send({
    from: this.account,
  });

  console.log(sendit)
}

const getWeights = async () => {
  const currentWeight = await this.contract.methods.getLastWeight().call();
  const targetWeight = await this.contract.methods.getFutureWeight().call();

  const targetWeightText = document.querySelector("#targetWeightText")
  const currentWeightText = document.querySelector("#currentWeightText");

  targetWeightText.innerHTML = targetWeight;
  currentWeightText.innerHTML = currentWeight;

  console.log("This is current weight", currentWeight, targetWeight)
}

const addWeight = async () => {
  let newWeight = document.querySelector("#newWeight").value;

  if (!newWeight) {
    return
  }

  const sendit = await this.contract.methods.pushWeight(newWeight).send({
    from: this.account,
  });

  document.querySelector("#newWeight").value = "";
  getLastWritedWeight();
  getPaid();
  console.log(sendit);
}

const getLastWritedWeight = async () => {
  const lastWeight = await this.contract.methods.getLastWritedWeight().call();

  const currentWeight = document.querySelector("#currentWeightText")

  currentWeight.innerHTML = lastWeight

  console.log(lastWeight);
};

const getPaid = async () => {
  let ethAddress = document.querySelector("#ethereumAddress").value;

  if (!ethAddress) {
    return
  }

     const sendit = await this.contract.methods.checkWeight(ethAddress).send({
       from: this.account,
     });
  
  console.log("Check: ", sendit)
}