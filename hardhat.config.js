require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",  // Ganache GUI RPC URL
      chainId: 1337,
      accounts: [
        // "0xa1911b64a7301a40d44df956db9846f0436d47f17e4ade38248dde0af6acc55f",
        // "0x5631edaac64a6cb8033987a56737bdd54262b79192f965669036ef7c4c735c25",
        // "0xcf1079cfce577b7eb08a56ea4a6eeb1d272e98064c8b69731ca513122fa742c3",
        "cda87955835dcac9a7679fa4926b4b670dd5c80d83c98213c34345e880bcab04",
        // "0xb2b847aa0165d38bb62195803fc75dbd78a1c07c753266f173f6b1a4fa11a0b9",
        // "0x0d899558fe0858d361530061a47b8940804372378c183afccebd4d665df782a9",
        // "0xa48335264eafaede342badc79c43a9eeae043d2371cb3650e764da0af80d70d5",
        // "0x309540c1bf1cacac0d2350452acec0c66abb010c688aceaac35792bb64bb15cf",
        // "0x9e640c0aff8d1cd749608864e2e24ab766bb5a1eb148551787f8fd3f75af80b1",
        // "0xd10595ae8ee2a267c905f6443b3fbd5871b2dbe9ff504fd27d318e2a8a5fdbef",
        // "0x724052aca919c0a0c190728b9400a592a2eb6b6cdfca0a85f6f11d41fd90063a",
        // "0x6db3a2cac5a9676121b937dbcba875af570cd7938020b431758007906e41cb49"
        // Add as many private keys as you need from Ganache
      ],
    },
  },
};



