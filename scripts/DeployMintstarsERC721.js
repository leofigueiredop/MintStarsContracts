// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

async function main() {
  const MintstarsNFT = await hre.ethers.getContractFactory('MintstarsNFT');
  const MintstarsNFTDP = await hre.upgrades.deployProxy(MintstarsNFT,[], {
    initializer: 'initialize',
  });

  await MintstarsNFTDP.deployed();

  console.log('MintstarsNFT deployed to:', MintstarsNFTDP.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//Admin deployed to: 0xdAa43B267ebE4242018C3Ec281Ce04a86Ad749B1
