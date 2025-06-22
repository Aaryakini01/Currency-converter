const API_KEY = 'db42e7b254c02c06bcbed98f';

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('fromCurrency').value.toUpperCase();
  const to = document.getElementById('toCurrency').value.toUpperCase();
  const resultDiv = document.getElementById('result');

  if (isNaN(amount) || !from || !to) {
    resultDiv.innerHTML = '<p style="color:red;">Please enter valid amount and currency codes.</p>';
    return;
  }

  try {
    const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("API request failed. Check currency codes.");
    }

    const rate = data.conversion_rates[to];
    if (!rate) {
      resultDiv.innerHTML = `<p style="color:red;">Currency code "${to}" not found.</p>`;
      return;
    }

    const converted = (amount * rate).toFixed(2);
    resultDiv.innerHTML = `<p>${amount} ${from} = <strong>${converted} ${to}</strong></p>`;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}
