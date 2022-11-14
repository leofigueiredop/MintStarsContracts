
const hre = require("hardhat");

async function main() {


  const MS_SplitPayment = await hre.ethers.getContractAt("MS_SplitPayment","0x4cccfa116f185974cbc30ad330f22514be7a16fc");

  const spender = "0x4cccfa116f185974cbc30ad330f22514be7a16fc";
  const tokenCreatorMsSellerUser_addr = [
    '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
    '0x0250e537f808bac23af1470728f9ca466d72899d',
    '0x06903b08082743ffb95f8aae556797e35663fb79',
    '0xb7cdca11bc6bfa0de8b7e3381372d47ef9fa6f5f',
    '0x9105d9e959bf67092613bbec367327b201efa2c8',
    '0x4cccfa116f185974cbc30ad330f22514be7a16fc'
    
  ];
  const creatorMsSeller_value = [
    50000,
    100000,
    250000
  ];
  const v = 28
  const r = "0x3ded732b7da7a15310b401d1edd2faec22c2e60abd583f6b21d883f9ebefe6ba"
  const s = "0x3a519f8abaa41c15cf1a54c2c2bc67fe73977a5bef10163464cd2682e59f0072"

  
  const result = await MS_SplitPayment.SplitPayment(
    tokenCreatorMsSellerUser_addr,
    creatorMsSeller_value,
    v, r, s
   );
   console.log("Return", result);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
