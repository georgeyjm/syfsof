// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./EaterToken.sol";

import "@openzeppelin/contracts@4.8.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.0/utils/Strings.sol";

contract CryptoTrees is ERC721 {
    address public owner;

    uint256 public treePrice;

    uint256 public totalTreesContributed;
    uint256 public totalTreesPlanted;
    struct Tree {
        string name;
        address contributor;
        bool isContributed;
        uint256 timeContributed;
        address planter;
        bool isPlanted;
        uint256 timePlanted;
        int256 longitude;
        int256 latitude;
    }
    mapping(uint256 => Tree) public trees;
    mapping(address => uint256[]) public treesContributed;
    mapping(address => uint256[]) public treesPlanted;
    mapping(address => uint256) public numTreesContributed;
    mapping(address => uint256) public numTreesPlanted;

    string private _treeBaseURI;

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    struct Planter {
        bool isPlanter;
    }
    mapping(address => Planter) public planters;

    modifier onlyPlanter() {
        require(planters[msg.sender].isPlanter, "not planter");
        _;
    }

    EaterToken private _eaterToken;

    constructor(string memory _uri, EaterToken _eaterTokenAddress, uint256 _treePrice)
        ERC721("CryptoTrees", "TRE") {
        owner = msg.sender;
        _treeBaseURI = _uri;
        _eaterToken = _eaterTokenAddress;
        treePrice = _treePrice;
    }

    function contributeTree(string memory _name) external returns (uint256 treeId) {
        treeId = totalTreesContributed;

        totalTreesContributed++;
        trees[treeId].name = _name;
        trees[treeId].contributor = msg.sender;
        trees[treeId].isContributed = true;
        trees[treeId].timeContributed = block.timestamp;
        treesContributed[msg.sender].push(treeId);
        numTreesContributed[msg.sender]++;

        _eaterToken.transferFrom(msg.sender, address(this), treePrice);
        _mint(msg.sender, treeId);
    }

    function addPlanter(address _planter) external onlyOwner {
        planters[_planter].isPlanter = true;
    }

    function plantTree(int256 longitude, int256 latitude) external onlyPlanter returns (uint256 treeId) {
        treeId = totalTreesPlanted;

        totalTreesPlanted++;
        trees[treeId].planter = msg.sender;
        trees[treeId].isPlanted = true;
        trees[treeId].timePlanted = block.timestamp;
        trees[treeId].longitude = longitude;
        trees[treeId].latitude = latitude;
        treesPlanted[msg.sender].push(treeId);
        numTreesPlanted[msg.sender]++;

        _eaterToken.transfer(msg.sender, treePrice);
    }

    function setEaterTokenAddress(EaterToken _eaterTokenAddress) external onlyOwner {
        _eaterToken = _eaterTokenAddress;
    }

    function setTreePrice(uint256 _treePrice) external onlyOwner {
        treePrice = _treePrice;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        _treeBaseURI = _newBaseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _treeBaseURI;
    }
}
