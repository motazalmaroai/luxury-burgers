// Menu Toggle for Mobile View
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('header nav').classList.toggle('active');
});

// Wallet Connectivity using Web3Modal
const connectWalletButton = document.getElementById('connectWallet');

let web3Modal;
let provider;

function init() {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                rpc: {
                    137: "https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY" // Polygon Mainnet
                },
                chainId: 137 // Polygon Mainnet Chain ID
            }
        }
    };

    web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional
    });
}

async function connectWallet() {
    try {
        provider = await web3Modal.connect();

        provider.on("accountsChanged", (accounts) => {
            console.log(accounts);
        });

        provider.on("chainChanged", (chainId) => {
            console.log(chainId);
        });

        provider.on("connect", (info) => {
            console.log(info);
        });

        provider.on("disconnect", (error) => {
            console.log(error);
        });

        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        updateUIForConnectedWallet(account);
        await checkAndSwitchToPolygon();
    } catch (error) {
        console.error("Could not get a wallet connection", error);
    }
}

async function updateUIForConnectedWallet(account) {
    connectWalletButton.textContent = `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`;
}

async function checkAndSwitchToPolygon() {
    const polygonChainId = '0x89'; // Polygon Mainnet Chain ID
    try {
        // Check the current network
        const currentChainId = await ethereum.request({ method: 'eth_chainId' });
        if (currentChainId !== polygonChainId) {
            // Prompt user to switch to Polygon Mainnet
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: polygonChainId }],
            });
        }
    } catch (error) {
        if (error.code === 4902) {
            // If the network is not added to MetaMask, request to add it
            await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: polygonChainId,
                    chainName: 'Polygon Mainnet',
                    rpcUrls: ['https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY'],
                    nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18,
                    },
                    blockExplorerUrls: ['https://polygonscan.com/'],
                }],
            });
        } else {
            console.error('Error switching to Polygon Mainnet:', error);
        }
    }
}

connectWalletButton.addEventListener('click', async () => {
    if (web3Modal) {
        await connectWallet();
    }
});

init();
