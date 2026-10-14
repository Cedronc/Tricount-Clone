using System;
using System.Threading.Tasks;

namespace TricountBackend.Services
{
    public class CurrencyService
    {
        public async Task<decimal> GetExchangeRate(string fromCurrency, string toCurrency)
        {
            // Mock implementation - replace with actual API call
            if (fromCurrency == toCurrency)
                return 1m;

            // Example: 1 EUR = 1.07 USD
            if (fromCurrency == "EUR" && toCurrency == "USD")
                return 1.07m;
            if (fromCurrency == "USD" && toCurrency == "EUR")
                return 0.93m;

            return 1m; // Default to 1:1 if unknown
        }
    }
}