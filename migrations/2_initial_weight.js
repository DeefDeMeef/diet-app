const Weights = artifacts.require("Weights.sol");

module.exports = function (deployer) {
  deployer.deploy(Weights).then(() => {
    return deployer.deploy(Weights);
  });
};
