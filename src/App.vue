<template>
  <NavBar />
  <CustomerProductPage />

  <!-- <button @click.native="testabc">FUCKKK</button> -->
</template>


<script>
import NavBar from '@/components/navbar/NavBar.vue'
import CustomerShopPage from '@/pages/CustomerShopPage/index.vue'
import CustomerProductPage from '@/pages/CustomerProductPage/index.vue'

// Web3
import Web3 from 'web3'
import eaterTokenAbi from '@/assets/json/EaterTokenABI.json'
import cryptoTreesAbi from '@/assets/json/CryptoTreesABI.json'

if (!window.ethereum) {alert('fuck you')}
const web3 = new Web3(window.ethereum)

const eaterTokenAddr = '0x7De5d3EF42f7e4368aFe29fe10AB0bA3004bE36e'
const eaterToken = new web3.eth.Contract(eaterTokenAbi, eaterTokenAddr)
const cryptoTreesAddr = '0xcd128f347381Fd66dA0216076ceb68c0F615b614'
const cryptoTrees = new web3.eth.Contract(cryptoTreesAbi, cryptoTreesAddr)

const userAccountAddr = web3.currentProvider.selectedAddress
if (userAccountAddr === null) {
  web3.eth.requestAccounts(() => {
    window.location.reload()
  });
} else {
  console.log(userAccountAddr)
  console.log(cryptoTrees.methods)
}

export default {
  name: 'App', 
  components: {
    NavBar,
    CustomerShopPage,
    CustomerProductPage,
  },
  methods: {
    testabc: async function() {
      const bestBefore = BigInt(Math.floor(Date.now() / 1000 + 10000))
      const params = {from: userAccountAddr}
      const request = eaterToken.methods.addInventory('Rabbit Blood', 20000n, bestBefore)

      const batchId = await request.call(params)


      eaterToken.methods.addInventory('Rabbit Blood', 20000n, bestBefore).send(params).then(data => {
        const hash = data.transactionHash
        console.log(hash)
        web3.eth.getTransactionReceipt().then(console.log)
      });
    }
  }
}
</script>


<style scoped>
</style>
