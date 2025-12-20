// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract AfCoin {
    string public name = "AfCoin";
    string public symbol = "AFC";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    uint256 public constant MAX_SUPPLY = 70_000_000 * 10 ** 18; // Max supply set to 70 million AFC tokens

    address public owner;
    bool public paused; // New state variable to track contract pause status

    // Mappings for balances, allowances, and frozen accounts
    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allowances;
    mapping(address => bool) private frozenAccounts;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event AccountFrozen(address indexed account);
    event AccountUnfrozen(address indexed account);
    event Paused(address indexed account); // New event for pause
    event Unpaused(address indexed account); // New event for unpause

    // Modifier to restrict functions to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    // Modifier to ensure the caller's account is not frozen
    modifier notFrozen(address account) {
        require(!frozenAccounts[account], "Account is frozen");
        _;
    }

    // Modifier to ensure the contract is not paused
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    // Modifier to ensure the contract is paused
    modifier whenPaused() {
        require(paused, "Contract is not paused");
        _;
    }

    // Constructor to initialize the contract with an initial supply
    constructor(uint256 initialSupply) {
        require(initialSupply <= MAX_SUPPLY, "Initial supply exceeds max supply");
        owner = msg.sender; // The address deploying the contract becomes the owner
        _mint(owner, initialSupply); // Mint the initial supply to the deployer's address
    }

    // Function to pause the contract
    function pause() public onlyOwner whenNotPaused {
        paused = true;
        emit Paused(msg.sender);
    }

    // Function to unpause the contract
    function unpause() public onlyOwner whenPaused {
        paused = false;
        emit Unpaused(msg.sender);
    }

    // Function to freeze the caller's own account
    function freeze() public whenNotPaused {
        require(!frozenAccounts[msg.sender], "Account is already frozen");
        frozenAccounts[msg.sender] = true;
        emit AccountFrozen(msg.sender);
    }

    // Function to unfreeze the caller's own account
    function unfreeze() public whenNotPaused {
        require(frozenAccounts[msg.sender], "Account is not frozen");
        frozenAccounts[msg.sender] = false;
        emit AccountUnfrozen(msg.sender);
    }

    // Function to get the balance of an account
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    // Function to check if an account is frozen
    function isFrozen(address account) public view returns (bool) {
        return frozenAccounts[account];
    }

    // Function to transfer tokens to another address
    function transfer(address recipient, uint256 amount) public whenNotPaused notFrozen(msg.sender) notFrozen(recipient) returns (bool) {
        require(recipient != address(0), "Transfer to the zero address");
        require(balances[msg.sender] >= amount, "Transfer amount exceeds balance");

        balances[msg.sender] -= amount; // Subtract from sender's balance
        balances[recipient] += amount; // Add to recipient's balance

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    // Function to approve a spender to spend a specified amount
    function approve(address spender, uint256 amount) public whenNotPaused notFrozen(msg.sender) returns (bool) {
        require(spender != address(0), "Approve to the zero address");

        allowances[msg.sender][spender] = amount; // Set allowance for spender
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // Function to check the remaining allowance for a spender
    function allowance(address _owner, address spender) public view returns (uint256) {
        return allowances[_owner][spender];
    }

    // Function to transfer tokens from one address to another (requires allowance)
    function transferFrom(address sender, address recipient, uint256 amount) public whenNotPaused notFrozen(sender) notFrozen(msg.sender) notFrozen(recipient) returns (bool) {
        require(sender != address(0), "Transfer from the zero address");
        require(recipient != address(0), "Transfer to the zero address");
        require(balances[sender] >= amount, "Transfer amount exceeds balance");
        require(allowances[sender][msg.sender] >= amount, "Transfer amount exceeds allowance");

        balances[sender] -= amount;  // Subtract from sender's balance
        balances[recipient] += amount; // Add to recipient's balance
        allowances[sender][msg.sender] -= amount; // Decrease allowance

        emit Transfer(sender, recipient, amount);
        return true;
    }

    // Function to mint new tokens
    function mint(address to, uint256 amount) public whenNotPaused notFrozen(msg.sender) notFrozen(to) {
        require(totalSupply + amount <= MAX_SUPPLY, "Minting exceeds max supply");
        _mint(to, amount);
    }

    // Function to burn tokens
    function burn(uint256 amount) public onlyOwner whenNotPaused notFrozen(msg.sender) {
        require(balances[msg.sender] >= amount, "Burn amount exceeds balance");
        _burn(msg.sender, amount);
    }

    // Internal function to mint tokens
    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "Mint to the zero address");

        totalSupply += amount; // Increase total supply
        balances[to] += amount; // Increase recipient's balance

        emit Transfer(address(0), to, amount); // Emit a transfer event for minting
    }

    // Internal function to burn tokens
    function _burn(address from, uint256 amount) internal {
        require(from != address(0), "Burn from the zero address");
        require(balances[from] >= amount, "Burn amount exceeds balance");

        balances[from] -= amount; // Decrease sender's balance
        totalSupply -= amount; // Decrease total supply

        emit Transfer(from, address(0), amount); // Emit a transfer event for burning
    }

    // Function to transfer ownership of the contract
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");

        emit OwnershipTransferred(owner, newOwner); // Emit event before transferring ownership
        owner = newOwner; // Transfer ownership
    }
}