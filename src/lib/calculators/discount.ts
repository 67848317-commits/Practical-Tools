export interface DiscountInput {
  originalPrice: string;
  discountPercent: string;
  salesTaxPercent?: string;
}

export interface DiscountResult {
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
  finalPriceWithTax: number;
  taxAmount: number;
  percentageSaved: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateDiscount(input: DiscountInput): DiscountResult {
  const priceStr = (input.originalPrice ?? '').trim();
  const discStr = (input.discountPercent ?? '').trim();
  const taxStr = (input.salesTaxPercent ?? '').trim();

  if (priceStr === '') {
    return {
      originalPrice: 0,
      discountPercent: 0,
      discountAmount: 0,
      finalPrice: 0,
      finalPriceWithTax: 0,
      taxAmount: 0,
      percentageSaved: 0,
      calculationSteps: [],
      errorMessage: 'Please enter a valid original price.',
    };
  }

  const price = parseFloat(priceStr);
  const discount = discStr === '' ? 0 : parseFloat(discStr);
  const tax = taxStr === '' ? 0 : parseFloat(taxStr);

  if (isNaN(price) || price < 0) {
    return {
      originalPrice: 0,
      discountPercent: 0,
      discountAmount: 0,
      finalPrice: 0,
      finalPriceWithTax: 0,
      taxAmount: 0,
      percentageSaved: 0,
      calculationSteps: [],
      errorMessage: 'Please enter a valid positive original price.',
    };
  }

  if (isNaN(discount) || discount < 0 || discount > 100) {
    return {
      originalPrice: price,
      discountPercent: 0,
      discountAmount: 0,
      finalPrice: price,
      finalPriceWithTax: price,
      taxAmount: 0,
      percentageSaved: 0,
      calculationSteps: [],
      errorMessage: 'Discount percentage must be a valid number between 0% and 100%.',
    };
  }

  if (isNaN(tax) || tax < 0 || tax > 50) {
    return {
      originalPrice: price,
      discountPercent: discount,
      discountAmount: 0,
      finalPrice: price,
      finalPriceWithTax: price,
      taxAmount: 0,
      percentageSaved: 0,
      calculationSteps: [],
      errorMessage: 'Optional sales tax rate must be between 0% and 50%.',
    };
  }

  const discountAmount = (price * discount) / 100;
  const finalPrice = Math.max(0, price - discountAmount);
  const taxAmount = tax > 0 ? (finalPrice * tax) / 100 : 0;
  const finalPriceWithTax = finalPrice + taxAmount;

  const fmt = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const steps = [
    `Calculate discount amount: $${fmt(price)} × ${discount}% ÷ 100 = $${fmt(discountAmount)}`,
    `Calculate final price: $${fmt(price)} - $${fmt(discountAmount)} = $${fmt(finalPrice)}`,
    ...(tax > 0
      ? [`Add sales tax (${tax}%): $${fmt(finalPrice)} + $${fmt(taxAmount)} = $${fmt(finalPriceWithTax)}`]
      : []),
  ];

  return {
    originalPrice: price,
    discountPercent: discount,
    discountAmount,
    finalPrice,
    finalPriceWithTax,
    taxAmount,
    percentageSaved: price > 0 ? (discountAmount / price) * 100 : 0,
    calculationSteps: steps,
  };
}
