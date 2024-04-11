document.addEventListener('DOMContentLoaded', async function() {
    const requestTokensBtn = document.getElementById('requestTokensBtn');
    const message = document.getElementById('message');
  
    // Ethereum wallet connection
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.enable();
        console.log('Connected to wallet:', accounts[0]);
        // Your Ethereum wallet address
        const walletAddress = accounts[0];
        // Your Faucet contract address
        const faucetContractAddress = '0x6E67AFe9FF451bca11D3dDBBCbe25d2747825B7a';
        // Your Faucet contract ABI
        const faucetContractABI = [
            [
                {
                    "inputs": [],
                    "name": "requestTokens",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "TokensDripped",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "DRIP_MAX_AMOUNT",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "DRIP_MIN_AMOUNT",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "faucetBalance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "lastDripTime",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TOKEN_ADDRESS",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
        ];
        const web3 = new Web3(window.ethereum);
        const faucetContract = new web3.eth.Contract(faucetContractABI, faucetContractAddress);
  
        // Request tokens from the faucet contract
        requestTokensBtn.addEventListener('click', async () => {
          try {
            const tx = await faucetContract.requestTokens().send();
            console.log('Transaction hash:', tx.transactionHash);
            message.textContent = 'Tokens distributed successfully';
          } catch (error) {
            console.error('Error requesting tokens:', error);
            message.textContent = 'Error requesting tokens';
          }
        });
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        message.textContent = 'Error connecting to wallet';
      }
    } else {
      console.error('MetaMask is not installed');
      message.textContent = 'Please install MetaMask to interact with this faucet';
    }
  });
  