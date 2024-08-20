const connectButton = document.getElementById("connectButton");
const getBalanceButton = document.getElementById("getBalanceButton");

const userAddress = document.getElementById("userAddress");

async function connectMetaMask() {
  if (window.ethereum) {
    try {
      // Solicitar acceso a la cuenta del usuario
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      // Mostrar la direccion del Usuario
      userAddress.innerHTML = `Tu Dirección: ${account}`;
      getBalance();
    } catch (error) {
      console.error("Se le negó al usuario el acceso a la cuenta", error);
    }
  } else {
    alert(
      "MetaMask no está instalado. Instálalo para poder usar esta aplicación"
    );
  }
}

async function getBalance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const balance = await signer.getBalance();

  console.log("Balance:", ethers.utils.formatEther(balance));
  document.getElementById(
    "balance"
  ).innerText = `Balance: ${ethers.utils.formatEther(balance)} ETH`;
}

connectButton.addEventListener("click", connectMetaMask);
