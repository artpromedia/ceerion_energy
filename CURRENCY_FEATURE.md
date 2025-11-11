# Currency Converter Feature

## Overview
Dynamic currency converter that allows users in Nigeria and other African countries to view prices in their local currency.

## Supported Currencies

### African Currencies
- 🇳🇬 **NGN** - Nigerian Naira (₦) - Rate: 1,650 per USD
- 🇿🇦 **ZAR** - South African Rand (R) - Rate: 18.5 per USD
- 🇰🇪 **KES** - Kenyan Shilling (KSh) - Rate: 155 per USD
- 🇬🇭 **GHS** - Ghanaian Cedi (GH₵) - Rate: 16.5 per USD
- 🇪🇬 **EGP** - Egyptian Pound (E£) - Rate: 49 per USD
- 🇹🇿 **TZS** - Tanzanian Shilling (TSh) - Rate: 2,650 per USD
- 🇺🇬 **UGX** - Ugandan Shilling (USh) - Rate: 3,750 per USD

### Other Currencies
- 🇺🇸 **USD** - US Dollar ($) - Base currency
- 🇪🇺 **EUR** - Euro (€) - Rate: 0.92 per USD
- 🇬🇧 **GBP** - British Pound (£) - Rate: 0.79 per USD

## Features

### 1. Currency Context
- **Location**: `src/context/CurrencyContext.jsx`
- **Purpose**: Provides global currency state and conversion functions
- **Key Functions**:
  - `convertPrice(usdAmount)` - Converts USD to selected currency
  - `formatPrice(usdAmount, options)` - Formats price with currency symbol
  - `getCurrencyInfo()` - Returns current currency details
  - `setCurrency(code)` - Changes active currency

### 2. Currency Selector Component
- **Location**: `src/components/CurrencySelector.jsx`
- **Features**:
  - Dropdown with grouped currencies (African / Other)
  - Flag emojis for visual identification
  - Saves preference to localStorage
  - Accessible with proper labels

### 3. Price Component
- **Location**: `src/components/Price.jsx`
- **Usage**: `<Price amount={35000} large />`
- **Props**:
  - `amount` - USD amount to convert
  - `large` - Boolean for large display
  - `className` - Additional CSS classes
  - `showCurrency` - Show/hide currency symbol

## Implementation

### Setup
The CurrencyProvider wraps the entire app in `src/main.jsx`:

```jsx
<CurrencyProvider>
  <App />
</CurrencyProvider>
```

### Usage in Components

#### Using the Hook
```jsx
import { useCurrency } from "../context/CurrencyContext.jsx";

function MyComponent() {
  const { formatPrice, currency, setCurrency } = useCurrency();
  
  return (
    <div>
      <p>Price: {formatPrice(35000)}</p>
      <p>Current: {currency}</p>
    </div>
  );
}
```

#### Using the Price Component
```jsx
import Price from "../components/Price.jsx";

function ProductCard() {
  return (
    <div>
      <h3>H1 Home Essentials</h3>
      <p><Price amount={35000} /></p>
    </div>
  );
}
```

## Examples

### Nigerian User Experience
When a user in Nigeria selects NGN:
- **System Cost**: $35,000 → ₦57,750,000
- **Monthly Savings**: $200 → ₦330,000
- **Federal Tax Credit**: $10,500 → ₦17,325,000

### South African User Experience
When a user in South Africa selects ZAR:
- **System Cost**: $35,000 → R647,500
- **Monthly Savings**: $200 → R3,700
- **Federal Tax Credit**: $10,500 → R194,250

## Where Currency Conversion is Applied

### 1. Configurator Page (`/configurator`)
- Total System Cost
- Federal Tax Credit
- Net Cost
- Monthly Savings
- All pricing estimates

### 2. Products Page (`/products`)
- Product starting prices
- Comparison table pricing
- All cost estimates

### 3. Future Integration (Ready)
The system is ready to integrate into:
- PowerShare™ pricing
- Contact form estimates
- Any new pricing displays

## Technical Details

### Exchange Rate Updates
Currently using static rates. To implement live rates:

```jsx
// In CurrencyContext.jsx
useEffect(() => {
  async function fetchRates() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    // Update EXCHANGE_RATES with data.rates
  }
  fetchRates();
}, []);
```

### localStorage Persistence
User's currency preference is saved to localStorage:
- **Key**: `ceerion_currency`
- **Value**: Currency code (e.g., "NGN", "USD")
- **Behavior**: Automatically loads on return visits

### Formatting Options
The `formatPrice()` function supports options:

```jsx
formatPrice(35000, {
  showCurrency: true,  // Show currency symbol
  decimals: 0,         // Number of decimal places
  useShortFormat: false // Use K/M abbreviations
});
```

## Styling

### Currency Selector
- Dark theme matching CEERION design
- Hover and focus states
- Responsive width (180px min)
- Grouped options for organization

### CSS Classes
- `.currency-selector` - Container
- `.currency-select` - Select element
- `.currency-select option` - Option styling
- `.currency-select optgroup` - Group headers

## User Benefits

### For Nigerian Customers
- See prices in familiar ₦ Naira
- Understand affordability instantly
- Compare to local monthly income
- No mental conversion needed

### For All African Markets
- Each country sees their own currency
- Builds trust and transparency
- Improves conversion rates
- Shows commitment to African markets

## Future Enhancements

### Planned Features
1. **Live Exchange Rates** - Integrate with real-time API
2. **Auto-Detection** - Detect user's location and set currency
3. **More Currencies** - Add more African currencies as we expand
4. **Historical Rates** - Show price trends over time
5. **Currency Comparison** - Show prices in multiple currencies side-by-side
6. **Financing Calculator** - Local currency financing estimates

### API Integration (Recommended)
Consider using:
- **ExchangeRate-API** (https://www.exchangerate-api.com/)
- **Open Exchange Rates** (https://openexchangerates.org/)
- **Fixer.io** (https://fixer.io/)

## Testing

### Test Scenarios
1. Switch between different African currencies
2. Verify prices update throughout site
3. Refresh page - currency should persist
4. Check formatting for large numbers (millions)
5. Test on mobile devices
6. Verify accessibility (screen readers)

### Example Test
```jsx
// In your test file
import { render, screen } from '@testing-library/react';
import { CurrencyProvider } from './context/CurrencyContext';
import Price from './components/Price';

test('converts USD to NGN correctly', () => {
  render(
    <CurrencyProvider>
      <Price amount={100} />
    </CurrencyProvider>
  );
  expect(screen.getByText('₦165,000')).toBeInTheDocument();
});
```

## Support

For issues or questions about the currency converter:
- Check exchange rates are up to date
- Verify CurrencyProvider is wrapping your app
- Use browser console to debug localStorage
- Check component is importing useCurrency correctly
