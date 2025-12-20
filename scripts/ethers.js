async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request MetaMask account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            const senderAccount = accounts[0];
            document.getElementById('senderAccount').value = senderAccount;
        } catch (error) {
            console.error("Error connecting to MetaMask", error);
            alert("Please connect MetaMask.");
        }
    } else {
        alert("MetaMask not found. Please install MetaMask.");
    }
}
