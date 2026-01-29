'use client';

import { useCurrency } from '@/context/CurrencyContext';

type DisplayPriceProps = {
  price: number;
};

const DisplayPrice = ({ price }: DisplayPriceProps) => {
  const { formatPrice } = useCurrency();

  return <>{formatPrice(price)}</>;
};

export default DisplayPrice;
