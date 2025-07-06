const searchInput = document.getElementById("search");
const cryptoList = document.getElementById("crypto-list")
let coinsData = [];

//FETCH DATA FROM API

function fetchCryptoData() {
  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
    .then(response => response.json())
    .then(data => {
      coinsData = data;
      displayCryptoList(coinsData);
    })
    .catch(error => console.error("Error fetching data:", error));
}

fetchCryptoData();
const sortSelect = document.getElementById("sort-options")
sortSelect.addEventListener('change', function(){
    const selectedValue = this.value;

    let sortedCoins = [...coinsData];

    if(selectedValue === "low-high"){
        sortedCoins.sort((a,b) => a.current_price - b.current_price);
    }else if(selectedValue === "high-low"){
        sortedCoins.sort((a, b) => b.current_price - a.current_price);
    }

    displayCryptoList(sortedCoins);
});

// FUNCTION TO DISPLAY CRYPTO LIST

function displayCryptoList(coins){
    cryptoList.innerHTML = ""; 

    if (coins.length === 0) {
    cryptoList.innerHTML = `<tr><td colspan="4">No matching coins found.</td></tr>`;
    return;
  }


    coins.forEach(coin =>  {
        const coinItem = document.createElement("tr");
        // coinItem.classList.add("coin-item");

        coinItem.innerHTML =`
         <td><img src="${coin.image}" alt="${coin.name}" width="24"></td>
      <td>${coin.name}</td>
      <td>$${coin.current_price}</td>
      <td style="color: ${coin.price_change_percentage_24h >= 0 ? 'limegreen' : 'red'};">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
        `;
        cryptoList.appendChild(coinItem);
    });
}

 
 //search functionality
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();

  if (query === "") {
    // if input is empty, show full list
    displayCryptoList(coinsData);
    return;
  }


  const filteredCoins = coinsData.filter(coin =>
    coin.name.toLowerCase().includes(query)
  );

  displayCryptoList(filteredCoins);
});
