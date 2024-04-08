window.addEventListener('load', async () => {
    // Airdrop contract address
    const airdropContractAddress = 'YOUR_AIRDROP_CONTRACT_ADDRESS'; // Replace with your contract address

    // Airdrop contract ABI
    const airdropContractABI = [
        // Define your contract's functions here
        {
            "constant": false,
            "inputs": [
                {
                    "name": "recipients",
                    "type": "address[]"
                },
                {
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "distributeTokens",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    // Instantiate the Airdrop contract
    const airdropContract = new window.web3.eth.Contract(airdropContractABI, airdropContractAddress);

    // Button click event handler
    document.getElementById('claimButton').addEventListener('click', async () => {
        try {
            const accounts = await window.web3.eth.getAccounts();
            if (accounts.length == 0) {
                alert('Please log in to MetaMask.');
                return;
            }
            const recipient = accounts[0]; // The current user's Ethereum address
            const amount = 100; // Amount of tokens to distribute

            // Trigger the airdrop
            await airdropContract.methods.distributeTokens([recipient], amount).send({ from: recipient });

            alert('Airdrop claimed successfully!');
        } catch (error) {
            console.error('Airdrop claim failed:', error);
            alert('Airdrop claim failed. Please try again later.');
        }
    });
});

document.addEventListener("DOMContentLoaded", function(event) {

    if (window.ethereum) {

        ethereum.request({ method: "eth_requestAccounts" })
        .then(() => document.getElementById("count").click())
        .catch((err) => console.error(err.message));

        ethereum.on("chainChanged", () => window.location.reload());

        ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                console.log(`Using account ${accounts[0]}`);
            } else {
                console.error("0 accounts.");
            }
        });

        ethereum.on("message", (message) => console.log(message));

        ethereum.on("connect", (info) => {
            console.log(`Connected to network ${info}`);
        });

        ethereum.on("disconnect", (error) => {
            console.log(`Disconnected from network ${error}`);
        });

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const contract = new ethers.Contract(address, abi, signer);

    } else {
        console.error("Install MetaMask.");
    }

});
