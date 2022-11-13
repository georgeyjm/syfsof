// Web3
import Web3 from 'web3'
import eaterTokenAbi from '@/assets/json/EaterTokenABI.json'
import cryptoTreesAbi from '@/assets/json/CryptoTreesABI.json'

if (!window.ethereum) alert('no ethereum provider detected')
const web3 = new Web3(window.ethereum)

const eaterTokenAddr = '0x0069F4c4C49b282Fe252f1Ec31885cde5182B365'
const eaterToken = new web3.eth.Contract(eaterTokenAbi, eaterTokenAddr)
const cryptoTreesAddr = '0xa0a97Abbb6D545A4C691d9f16349C92b2eC6e643'
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

async function getInventory(sellerAccount) {
  const timeNow = Date.now() / 1000
  const rawInventory = await eaterToken.methods.getInventory(sellerAccount).call({from: userAccountAddr})
  const inventory = await Promise.all(rawInventory.map(async (food, foodId) => {
    const cannotSell = food.bestBefore < timeNow || food.currentWeight === '0'

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

    return { foodId, ...food, foodInfo, cannotSell, projectedWaste, seller: sellerAccount }
  }))
  return inventory
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

export async function getFood(sellerAccount, foodId) {
  const inventory = await getInventory(sellerAccount)
  return inventory[foodId]
}

export async function recommendFoodFromSeller(
    keywords, // list of keywords user is searching/interested in
    sellerAccount, // this should be the address of the supermarket
) {
  keywords = keywords.map(k => k.toLowerCase()).filter(k => k !== '')

  const inventory = await getInventory(sellerAccount)

  const rankFood = ({ foodInfo, projectedWaste }) => {
    const numTagsMatched = foodInfo.tags
      .map(tag => tag.toLowerCase())
      .filter(tag => keywords.includes(tag))
      .length
    const rankScore = numTagsMatched * 10000000 + projectedWaste
    return rankScore
  }

  const rankedFood = inventory
    .filter(food => !food.cannotSell)
    .sort((f1, f2) => rankFood(f2) - rankFood(f1))

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
  return food
}

export async function calculateSavedWeight(sellerAccount, foodId, weight) {
  const saved = await eaterToken.methods.calculateSavedWeight(sellerAccount, foodId, weight).call({from: userAccountAddr})
  return Number.parseInt(saved)
}

export async function getTrees() {
  const numTrees = await cryptoTrees.methods.numTreesContributed(userAccountAddr).call({from: userAccountAddr})
  const trees = []
  for (let i = 0; i < numTrees; i++) {
    const treeId = await cryptoTrees.methods.treesContributed(userAccountAddr, i).call({from: userAccountAddr})
    const tree = await cryptoTrees.methods.trees(treeId).call({from: userAccountAddr})
    trees.push(tree)
  }
  console.log(trees)
  return trees
}

export async function numTokens() {
  return await eaterToken.methods.balanceOf(userAccountAddr).call({from: userAccountAddr})
}

export async function numTrees() {
  return await cryptoTrees.methods.balanceOf(userAccountAddr).call({from: userAccountAddr})
}

export async function recordPurchase(foodId, weight) {
  await eaterToken.methods.recordPurchase(userAccountAddr, foodId, weight).send({from: userAccountAddr})
}

export async function treePrice() {
  return await cryptoTrees.methods.treePrice().call({from: userAccountAddr})
}

export async function plantTree(name) {
  const price = await treePrice()
  await eaterToken.methods.approve(cryptoTreesAddr, price).send({from: userAccountAddr})
  return await cryptoTrees.methods.contributeTree(name).send({from: userAccountAddr})
}
