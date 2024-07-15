// Menu Toggle for Mobile View
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('header nav').classList.toggle('active');
});

// Wallet Connectivity
const connectWalletButton = document.getElementById('connectWallet');

connectWalletButton.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            connectWalletButton.textContent = 'Wallet Connected';
            console.log('Connected account:', accounts[0]);
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    } else {
        alert('Please install MetaMask!');
    }
});
