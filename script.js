const apiKey = 'YOUR_API_KEY'; // Thay thế bằng API key của bạn từ Fixer.io
const apiUrl = http://data.fixer.io/api/latest?access_key=${apiKey};

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const resultDiv = document.getElementById('result');

// Gọi API để lấy danh sách các loại tiền tệ
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const rates = data.rates;
        const currencies = Object.keys(rates);

        // Thêm các loại tiền vào các thẻ select
        currencies.forEach(currency => {
            let optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrency.appendChild(optionFrom);

            let optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrency.appendChild(optionTo);
        });
    })
    .catch(error => console.error('Error fetching currency data:', error));

// Hàm chuyển đổi tiền tệ
function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = amount.value;

    if (from === to) {
        resultDiv.textContent = 'Please select different currencies';
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rateFrom = data.rates[from];
            const rateTo = data.rates[to];
            const convertedAmount = (amountValue / rateFrom) * rateTo;

            resultDiv.textContent = ${amountValue} ${from} = ${convertedAmount.toFixed(2)} ${to};
        })
        .catch(error => console.error('Error fetching conversion data:', error));
}
