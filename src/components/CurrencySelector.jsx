import { useCurrency } from "../context/CurrencyContext.jsx";

export default function CurrencySelector() {
  const { currency, setCurrency, availableCurrencies } = useCurrency();

  const handleChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="currency-selector">
      <label htmlFor="currency-select" className="sr-only">
        Select Currency
      </label>
      <select
        id="currency-select"
        value={currency}
        onChange={handleChange}
        className="currency-select"
        title="Select your preferred currency"
      >
        <optgroup label="African Currencies">
          <option value="NGN">🇳🇬 {availableCurrencies.NGN.symbol} Nigerian Naira</option>
          <option value="ZAR">🇿🇦 {availableCurrencies.ZAR.symbol} South African Rand</option>
          <option value="KES">🇰🇪 {availableCurrencies.KES.symbol} Kenyan Shilling</option>
          <option value="GHS">🇬🇭 {availableCurrencies.GHS.symbol} Ghanaian Cedi</option>
          <option value="EGP">🇪🇬 {availableCurrencies.EGP.symbol} Egyptian Pound</option>
          <option value="TZS">🇹🇿 {availableCurrencies.TZS.symbol} Tanzanian Shilling</option>
          <option value="UGX">🇺🇬 {availableCurrencies.UGX.symbol} Ugandan Shilling</option>
        </optgroup>
        <optgroup label="Other Currencies">
          <option value="USD">🇺🇸 {availableCurrencies.USD.symbol} US Dollar</option>
          <option value="EUR">🇪🇺 {availableCurrencies.EUR.symbol} Euro</option>
          <option value="GBP">🇬🇧 {availableCurrencies.GBP.symbol} British Pound</option>
        </optgroup>
      </select>
    </div>
  );
}
