<template>
  <NavBar />
  <CustomerShopPage />

  <!-- <button @click.native="testabc">FUCKKK</button> -->
</template>


<script>
import NavBar from '@/components/navbar/NavBar.vue'
import CustomerShopPage from '@/pages/CustomerShopPage/index.vue'
import CustomerProductPage from '@/pages/CustomerProductPage/index.vue'

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
