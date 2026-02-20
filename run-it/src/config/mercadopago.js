import { initMercadoPago } from '@mercadopago/sdk-react';

const PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || 'APP_USR-YOUR_PUBLIC_KEY';

initMercadoPago(PUBLIC_KEY);

export const MERCADOPAGO_CONFIG = {
  publicKey: PUBLIC_KEY,
  precoKit: 29.90
};