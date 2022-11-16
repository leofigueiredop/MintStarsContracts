const { ethers, upgrades } = require("hardhat");

const UPGRADEABLE_PROXY = "0x3661eFc3491170b975ab4631F91943Ab625e287F";

async function main() {
   const gas = await ethers.provider.getGasPrice()
   const V2Contract = await ethers.getContractFactory("MintstarsNFT");
   console.log("Upgrading V1Contract...");
   let upgrade = await upgrades.upgradeProxy(UPGRADEABLE_PROXY, V2Contract, {
      gasPrice: gas
   });
   console.log("V1 Upgraded to V2");
   console.log("V2 Contract Deployed To:", upgrade.address)
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });