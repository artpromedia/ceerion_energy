import { useCurrency } from "../context/CurrencyContext.jsx";

export default function Price({ amount, className = "", large = false, showCurrency = true }) {
  const { formatPrice, currency } = useCurrency();

  const decimals = ["NGN", "KES", "TZS", "UGX"].includes(currency) ? 0 : 0;

  return (
    <span className={`price ${large ? "price-large" : ""} ${className}`}>
      {formatPrice(amount, { showCurrency, decimals })}
    </span>
  );
}
