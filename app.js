// 1. import dependencies
import {Account, Vault, VAULT_IDS, getOpenVaults} from "@xbacked-dao/xbacked-sdk";

// 2. set seed
const seed = // PUT SEED HERE

// 3. set account
const acc = new Account({network: "TestNet", mnemonic: seed});

// 4. set vault (Algo/xUSD)
const vault = new Vault({id: VAULT_IDS.TestNet.algo});

// 5. create vault
/*await acc.createVault({
  collateral: 200,
  mintAmount: 110,
  vault
});*/

// 6. fetch global vault state
// const vaultState = await acc.getVaultState({vault});
// console.log(vaultState);

// 7. fetch data from your vault
//const myVault = await vault.getUserInfo({account: acc, address: await acc.getAddress()});
// console.log(myVault);

// 8. deposit more collateral into your vault
// const succ = await acc.depositCollateral({vault: vault, amount: 10});
// console.log("deposit of 10 ALGO was: " + succ);

// 9. get all open vaults
const vals = await getOpenVaults({account: acc, vault});
console.log(vals);

// 10. iterate through vaults, get users vault info, liquidate a vault

for (let i = 0; i < vals.length; i++) {
  const openVault = await vault.getUserInfo({account: acc, address: vals[i]});
  if(openVault.collateralRatio < vaultState.liquidationCollateralRatio && openVault.liquidating) {
    const succ = await acc.liquidateVault({address: vals[i], debtAmount: 2, vault});
  }
}
