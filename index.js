const ethers = require('ethers');
const provider = ethers.getDefaultProvider('ropsten');
const UniswapV2Router02 = require('./UniswapRouterV2.json');
let compiled = require('./erc20.json');
const wallet = new ethers.Wallet('', provider);

async function deployErc20() {
  let contract = new ethers.ContractFactory(compiled.abi, compiled.bytecode, wallet);
  let erc20 = await contract.deploy();
  console.log(`deployed at ${erc20.address}`);
  await erc20.deployed();
  console.log('Contract deployed');
}

async function addLiquidity(token) {
  let router = new ethers.Contract(
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    UniswapV2Router02,
    wallet
  );
  let erc20 = new ethers.Contract(token, compiled.abi, wallet);
  console.log(wallet.address);

  var overrideOptions = {
    value: ethers.utils.parseEther('1')
  };
  let deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  await erc20.approve('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', '1000000000000000000000');
  await router.addLiquidityETH(
    token,
    '1000000000000000000000',
    '1000000000000000000000',
    '1000000000000000000',
    wallet.address,
    deadline,
    overrideOptions
  );
}

(async () => {
  //   await deployErc20();
  //   await addLiquiditys('0x671562693F873cF1bCC48dc5434482c951302dB9');
})();
