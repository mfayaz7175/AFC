// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./MyToken.sol"; // This file contains `contract AfCoin`

/// @notice Minimal reentrancy guard
contract ReentrancyGuard {
    uint256 private _status;
    constructor() { _status = 1; }
    modifier nonReentrant() {
        require(_status == 1, "Reentrant");
        _status = 2;
        _;
        _status = 1; 
    }
}

/// @title AfCoinICO – Gas-optimized, 5-month sale window
contract AfCoinICO is ReentrancyGuard {
    AfCoin        public immutable token;       // The AfCoin token contract
    uint256       public immutable rate;        // tokens per ETH
    uint64        public immutable startTime;   // sale start (packed)
    uint64        public immutable endTime;     // sale end (packed)
    address payable public immutable wallet;    // where ETH goes

    event TokensPurchased(address indexed buyer, uint256 ethValue, uint256 tokenAmount);

    constructor(
        AfCoin        _token,
        uint256       _rate,
        uint64        _startTime,
        uint64        _endTime,
        address payable _wallet
    ) {
        require(address(_token) != address(0), "token=0");
        require(_rate > 0,                "rate=0");
        require(_startTime < _endTime,   "start>=end");
        require(_wallet != address(0),   "wallet=0");

        token     = _token;
        rate      = _rate;
        startTime = _startTime;
        endTime   = _endTime;
        wallet    = _wallet;
    }

    /// @notice Accept ETH and mint tokens
    receive() external payable {
        buyTokens();
    }

    /// @notice Buy `rate` × ETH sent of tokens
    function buyTokens() public payable nonReentrant {
        uint256 ts = block.timestamp;
        require(ts >= startTime && ts <= endTime, "ICO not active");
        uint256 eth = msg.value;
        require(eth > 0, "No ETH");

        uint256 amount = rate * eth;
        token.mint(msg.sender, amount);

        (bool success, ) = wallet.call{value: eth}("");
        require(success, "ETH transfer failed");

        emit TokensPurchased(msg.sender, eth, amount);
    }
}
