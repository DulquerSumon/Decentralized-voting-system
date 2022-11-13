const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const account1 = "0x4Aa1fb94Cc512d2839d281F4765D1A2B263c906b";
  const account2 = "0xF2D436aF71c57B2eDA53395258508B172fC51cB6";
  const arr = [account1, account2];
  //   deployer = (await getNamedAccounts()).deployer
  const arguments = [arr, "2"];

  const voting = await deploy("Voting", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await verify(voting.address, []);
  }
  console.log(`Contract deployed at : ${voting.address}`);
};
