document.addEventListener('DOMContentLoaded', async function() {
    const requestTokensBtn = document.getElementById('requestTokensBtn');
    const message = document.getElementById('message');
    const cooldownTime = document.getElementById('cooldownTime');
    const faucetBalance = document.getElementById('faucetBalance');
    
    // Ethereum wallet connection
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.enable();
        console.log('Connected to wallet:', accounts[0]);
        const walletAddress = accounts[0];
        const faucetContractAddress = '0xf2Dab467f9Bdfa6dBFD3B3a894f878261E7ed1de';
        const faucetContractABI = [
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
            "name": "requestTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];
        const web3 = new Web3(window.ethereum);
        const faucetContract = new web3.eth.Contract(faucetContractABI, faucetContractAddress);

        async function getRemainingCooldownTime() {
            const cooldownTimeInSeconds = 10 * 3600; // 10 hours cooldown time
            const lastDripTimeResponse = await faucetContract.methods.lastDripTime(walletAddress).call();
            const lastDripTime = Number(lastDripTimeResponse);
            const currentTime = Math.floor(Date.now() / 1000);
            const elapsedTime = currentTime - lastDripTime;
            const remainingTime = cooldownTimeInSeconds - elapsedTime;
            return remainingTime;
        }
            
        function formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            return `${hours}h ${minutes}m ${remainingSeconds}s`;
        }

        // Request tokens from the faucet contract
        requestTokensBtn.addEventListener('click', async () => {
          try {
            const tx = await faucetContract.methods.requestTokens().send({ from: walletAddress });
            console.log('Transaction hash:', tx.transactionHash);
            message.textContent = 'Tokens distributed successfully';
          } catch (error) {
            console.error('Error requesting tokens:', error);
            message.textContent = 'Error requesting tokens';
          }
        });

        // Update faucet balance and cooldown time
        setInterval(async () => {
            const balanceResponse = await faucetContract.methods.faucetBalance().call();
            const remainingTime = await getRemainingCooldownTime();
            faucetBalance.textContent = `Faucet Balance: ${web3.utils.fromWei(balanceResponse)} tokens`;
            cooldownTime.textContent = `Cooldown Time: ${formatTime(remainingTime)}`;
        }, 1000);

      } catch (error) {
        console.error('Error connecting to wallet:', error);
        message.textContent = 'Error connecting to wallet';
      }
    } else {
      console.error('MetaMask is not installed');
      message.textContent = 'Please install MetaMask to interact with this faucet';
    }
 });
