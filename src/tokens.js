// Web3
import Web3 from 'web3'
import eaterTokenAbi from '@/assets/json/EaterTokenABI.json'
import cryptoTreesAbi from '@/assets/json/CryptoTreesABI.json'

if (!window.ethereum) alert('no ethereum provider detected')
const web3 = new Web3(window.ethereum)

const eaterTokenAddr = '0x8C2Dedf774C115d891535b81FB2E801e633d3BcC'
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

export async function addFood(name, tags, info, weight, bestBefore) {
  const sellerInfo = await eaterToken.methods.sellers(userAccountAddr).call({from: userAccountAddr})
  if (!sellerInfo.isSeller) {
    console.error('you are not seller')
    return
  }
  const packedFoodInfo = JSON.stringify({ name, tags, info })
  const foodId = await eaterToken.methods.addInventory(packedFoodInfo, weight, bestBefore).send({from: userAccountAddr})
  return foodId
}

export async function recommendFoodFromSeller(
    keywords, // list of keywords user is searching/interested in
    sellerAccount, // this should be the address of the supermarket
) {
  const timeNow = Date.now() / 1000
  keywords = keywords.map(k => k.toLowerCase()).filter(k => k !== '')

  const rawInventory = await eaterToken.methods.getInventory(sellerAccount).call({from: userAccountAddr})
  const inventory = (await Promise.all(rawInventory.map(async (food, foodId) => {
    if (food.bestBefore < timeNow || food.currentWeight === '0')
      return null

    const projectedWaste = Number.parseInt(
      await eaterToken.methods.calculateProjectedWaste(sellerAccount, foodId).call({from: userAccountAddr}))
    
    let foodInfo
    try {
      foodInfo = JSON.parse(food.info)
    } catch {
      foodInfo = {}
    }

    if (!foodInfo.tags)
      foodInfo.tags = []

    const numTagsMatched = foodInfo.tags
      .map(tag => tag.toLowerCase())
      .filter(tag => keywords.includes(tag))
      .length
    const rankScore = numTagsMatched * 10000000 + projectedWaste

    return { foodId, foodInfo, rankScore }
  }))).filter(food => food != null)

  const rankedFood = inventory.sort((f1, f2) => f2.rankScore - f1.rankScore)

  return rankedFood
}

export async function recommendFood(
  keywords,
  sellerAccounts
) {
  const food = []
  for (const sellerAccount of sellerAccounts) {
    const foods = await recommendFoodFromSeller(keywords, sellerAccount)
    food.push(...foods)
  }
  food.sort((f1, f2) => f2.rankScore - f1.rankScore)
  console.log(food)
  return food
}

