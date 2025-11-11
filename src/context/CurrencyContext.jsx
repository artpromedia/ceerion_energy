import { createContext, useContext, useState, useEffect } from "react";

// Exchange rates (base: USD)
// In production, these would be fetched from an API like exchangerate-api.com
const EXCHANGE_RATES = {
  USD: { rate: 1, symbol: "$", name: "US Dollar" },
  NGN: { rate: 1650, symbol: "₦", name: "Nigerian Naira" },
  ZAR: { rate: 18.5, symbol: "R", name: "South African Rand" },
  KES: { rate: 155, symbol: "KSh", name: "Kenyan Shilling" },
  GHS: { rate: 16.5, symbol: "GH₵", name: "Ghanaian Cedi" },
  EGP: { rate: 49, symbol: "E£", name: "Egyptian Pound" },
  TZS: { rate: 2650, symbol: "TSh", name: "Tanzanian Shilling" },
  UGX: { rate: 3750, symbol: "USh", name: "Ugandan Shilling" },
  EUR: { rate: 0.92, symbol: "€", name: "Euro" },
  GBP: { rate: 0.79, symbol: "£", name: "British Pound" },
};

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    // Try to get saved currency from localStorage
    const saved = localStorage.getItem("ceerion_currency");
    return saved || "USD";
  });

  useEffect(() => {
    // Save currency preference to localStorage
    localStorage.setItem("ceerion_currency", currency);
  }, [currency]);

  const convertPrice = (usdAmount) => {
    const rate = EXCHANGE_RATES[currency].rate;
    return usdAmount * rate;
  };

  const formatPrice = (usdAmount, options = {}) => {
    const { 
      showCurrency = true, 
      decimals = 0,
      useShortFormat = false 
    } = options;

    const converted = convertPrice(usdAmount);
    const currencyInfo = EXCHANGE_RATES[currency];

    let formatted;
    if (useShortFormat && converted >= 1000000) {
      // Format as millions (e.g., "1.5M")
      formatted = (converted / 1000000).toFixed(1) + "M";
    } else if (useShortFormat && converted >= 1000) {
      // Format as thousands (e.g., "1.5K")
      formatted = (converted / 1000).toFixed(1) + "K";
    } else {
      formatted = converted.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }

    return showCurrency 
      ? `${currencyInfo.symbol}${formatted}`
      : formatted;
  };

  const getCurrencyInfo = () => EXCHANGE_RATES[currency];

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    getCurrencyInfo,
    availableCurrencies: EXCHANGE_RATES,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
