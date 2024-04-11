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
          // Your faucet contract ABI
        ];
        const web3 = new Web3(window.ethereum);
        const faucetContract = new web3.eth.Contract(faucetContractABI, faucetContractAddress);
  
        // Request tokens from the faucet contract
        requestTokensBtn.addEventListener('click', async () => {
          try {
            const tx = await faucetContract.methods.requestTokens([walletAddress]).send({ from: walletAddress });
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
  