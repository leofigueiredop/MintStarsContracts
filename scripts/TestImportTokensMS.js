const hre = require('hardhat');
async function main() {
  const { Wallet } = require('ethers');
  const wallet = new Wallet(
    '1a96c7a9a1bbd3aadd82d1c1952923fd3fe9b35c852da22d8a9f34176adece83',
  );
  const types = [
    'address',// = userAddress
    'string',// = '/'
    'string',// = userId
    'string',// = '/'
    'int256',// = tokenId
    'string',// = '/'
    'string',// = msNftId
    'string',// = '/'
    'uint256',// = timestamp
    'string',// = '/'
    'string'// = 'IMPORT'
   
  ];
  let values = [
    wallet.address,
    '/',
    'USER_ID',
    '/',
    '-1',
    '/',
    'ITEM_ID',
    '/',
    Math.floor(Date.now() / 1000),
    '/',
    'IMPORT'
  ];

  let solidityHash = ethers.utils.solidityKeccak256(types, values);

  let sign = await wallet.signMessage(ethers.utils.arrayify(solidityHash));

  const { v,r,s } = ethers.utils.splitSignature(sign)

  console.log("wallet",wallet.address);
  console.log("solidityHash",solidityHash);
  console.log("r",r);
  console.log("s",s);
  console.log("v",v);

  // const admin = await hre.ethers.getContractFactory('MetakitAdminProxy');
  // const adm = admin.attach('0x8b47c1b56c5DF4178fB33D15464D26fE7E98Fb25');
  // const result = await adm.exportTokens(
  //   '0x98e5392bd6c1cF0330241F67CD99EfA4cDd22765',
  //   hre.ethers.utils.parseUnits('100'),
  //   'PLAYERID1',
  //   'SESSIONID1',
  //   v,
  //   r,
  //   s,
  // );

 // console.log('Return', result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
