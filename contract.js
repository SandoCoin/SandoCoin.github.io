// Update contract address dynamically
const contractAddressElement = document.getElementById('contract-address');

// Polygon Sando Coin contract address
const contractAddress = '0xf195C62301D648f2A0C5A4B78a05D4877335694B';

// Set contract address text and link to Polygon Scan
contractAddressElement.textContent = contractAddress;
contractAddressElement.innerHTML += ` <a href="https://polygonscan.com/token/${contractAddress}" target="_blank">(View on Polygon Scan)</a>`;