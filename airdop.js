window.addEventListener('load', async () => {
    // Connect to Web3 provider
     if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
         alert('Please install MetaMask to interact with this dApp.');
    }
    
    // Airdrop contract address
    const airdropContractAddress = '0x6175D95B225E3Aa3A5E7EC17E25Ac2C6B56241D9'; // Replace with your contract address

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

