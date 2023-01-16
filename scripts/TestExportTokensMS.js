const hre = require('hardhat');
async function main() {
  const { Wallet } = require('ethers');
  const wallet = new Wallet(
    '626fb9aac56344729dd199a32c612e57bc2e09661fc187bd1716134b8eb268ee'
  );

  const time = Math.floor(Date.now() / 100);
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
    '0x9eC9b187CB10c71c1e87d3D319C341C1850893c2',
    '/',
    'USER_ID',
    '/',
    '-1',
    '/',
    'ITEM_ID',
    '/',
    time.toString(),
    '/',
    'EXPORT'
  ];

  let solidityHash = ethers.utils.solidityKeccak256(types, values);

  let sign = await wallet.signMessage(ethers.utils.arrayify(solidityHash));

  const { v,r,s } = ethers.utils.splitSignature(sign)

  console.log("wallet",wallet.address);
  //console.log("solidityHash",solidityHash);
  console.log("r",r);
  console.log("s",s);
  console.log("v",v); 
  console.log("time",time.toString()); 
  //console.log("arrayify",ethers.utils.arrayify(solidityHash)); 
  //console.log("solidityHash",solidityHash); 

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
