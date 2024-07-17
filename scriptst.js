// JavaScript for connecting to Web3 wallets

async function connectWallet() {
    try {
        const Web3Modal = window.Web3Modal.default;
        const WalletConnectProvider = window.WalletConnectProvider.default;
        const Web3 = window.Web3;

        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    infuraId: "YOUR_INFURA_ID" // required
                }
            }
        };

        const web3Modal = new Web3Modal({
            cacheProvider: false, // optional
            providerOptions, // required
            disableInjectedProvider: false // optional
        });

        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        console.log('Connected account:', accounts[0]);

        // Show the connected account in the UI
        document.getElementById('connectWallet').textContent = `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
    } catch (e) {
        console.error("Could not connect to wallet", e);
    }
}

document.getElementById('connectWallet').addEventListener('click', connectWallet);

// JavaScript for toggling the mobile menu
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
});
