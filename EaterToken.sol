// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.0/token/ERC20/extensions/ERC20Burnable.sol";

contract EaterToken is ERC20Burnable {
    address public owner;

    struct Food {
        string info;
        uint256 timeAdded;
        uint256 initialWeight;
        uint256 currentWeight;
        // e.g. if bb is dec 12, then this should be timestamp for 12pm of dec 12
        uint256 bestBefore;
    }

    struct Seller {
        string info;
        bool isSeller;
        Food[] inventory;
    }

    mapping(address => Seller) public sellers;

    // total number of tokens a buyer has accumulated
    mapping(address => uint256) public totalGained;

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    modifier onlySeller() {
        require(sellers[msg.sender].isSeller, "not seller");
        _;
    }

    constructor() ERC20("EaterToken", "EAT") {
        owner = msg.sender;
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function addSeller(address _seller, string memory _info) external onlyOwner {
        sellers[_seller].info = _info;
        sellers[_seller].isSeller = true;
    }

    function calculateProjectedWaste(address _seller, uint256 _foodId) external view returns (uint256) {
        require(sellers[_seller].isSeller, "provided address is not seller");
        require(_foodId < sellers[_seller].inventory.length, "food not found");
        Food storage food = sellers[_seller].inventory[_foodId];
        return _calculateProjectedWaste(food);
    }

    function calculateSavedWeight(address _seller, uint256 _foodId, uint256 _weightBought) external view returns (uint256) {
        require(sellers[_seller].isSeller, "provided address is not seller");
        require(_foodId < sellers[_seller].inventory.length, "food not found");
        Food storage food = sellers[_seller].inventory[_foodId];
        return _calculateSavedWeight(food, _weightBought);
    }

    function _calculateProjectedWaste(Food memory _food) internal view returns (uint256) {
        uint256 initialWeight = _food.initialWeight;
        uint256 currentWeight = _food.currentWeight;

        require(currentWeight <= initialWeight, "current weight is less than initial");
        require(block.timestamp >= _food.timeAdded, "time added is in the future");
        if (_food.bestBefore < block.timestamp) {
            return currentWeight;
        }

        uint256 timeSinceAdded = block.timestamp - _food.timeAdded;
        uint256 timeUntilExpiry = _food.bestBefore - block.timestamp;

        uint256 weightSold = initialWeight - currentWeight;
        uint256 projectedWeightToSell = timeUntilExpiry * weightSold / timeSinceAdded;

        if (projectedWeightToSell >= currentWeight) {
            return 0;
        } else {
            return currentWeight - projectedWeightToSell;
        }
    }

    function _calculateSavedWeight(Food memory _food, uint256 _weightBought) internal view returns (uint256) {
        require(_weightBought <= _food.currentWeight, "buying more than inventory");

        if (_food.bestBefore < block.timestamp) {
            // buying expired food
            return _weightBought;
        }

        uint256 projectedWaste = _calculateProjectedWaste(_food);

        if (_weightBought >= projectedWaste) {
            // save everything
            return projectedWaste;
        } else {
            // save what is bought
            return _weightBought;
        }
    }

    function recordPurchase(
        address _buyer, // buyer
        uint256 _foodId, // food id returned from addInventory
        uint256 _weight // grams
    ) external onlySeller returns (uint256 amountGained) {
        require(_foodId < sellers[msg.sender].inventory.length, "food not found");
        Food storage food = sellers[msg.sender].inventory[_foodId];

        amountGained = _calculateSavedWeight(food, _weight);

        food.currentWeight -= amountGained;
        _mint(_buyer, amountGained);
        totalGained[_buyer] += amountGained;
    }

    function addInventory(
        string memory _foodInfo, // mostly for debug
        uint256 _foodWeight, // in grams
        uint256 _foodBestBefore // timestamp
    ) external onlySeller returns (uint256 id) {
        Food[] storage inventory = sellers[msg.sender].inventory;
        id = inventory.length;
        inventory.push(Food(
            _foodInfo, block.timestamp, _foodWeight, _foodWeight, _foodBestBefore
        ));
    }

    function getInventory(address _seller) external view returns (Food[] memory) {
        return sellers[_seller].inventory;
    }
}
