import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api'
  : '/api';

export default function PaymentBrick({ 
  raceId, 
  inscricaoData, 
  onPaymentSuccess, 
  onPaymentError,
  precoKit = 29.90 
}) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mercadopagoReady, setMercadopagoReady] = useState(false);

  useEffect(() => {
    // Verificar se a biblioteca do MP carregou
    if (window.MercadoPago) {
      setMercadopagoReady(true);
    } else {
      const checkInterval = setInterval(() => {
        if (window.MercadoPago) {
          setMercadopagoReady(true);
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
  }, []);

  useEffect(() => {
    if (!mercadopagoReady) return;

    const createPreference = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/payment/preference/split`, {
          raceId,
          inscricaoData,
          preco: precoKit,
          titulo: 'Kit de Corrida',
          descricao: `Kit para inscrição na corrida`,
          sellerAccessToken: 'SEU_ACCESS_TOKEN_DO_VENDEDOR', // coloque aqui o token correto
          marketplaceFee: 10 // valor da comissão do marketplace
        });

        setPreferenceId(response.data.preferenceId);
        setLoading(false);

        // Renderizar o Brick de pagamento
        if (window.MercadoPago) {
          renderPaymentBrick(response.data.preferenceId);
        }
      } catch (err) {
        console.error('Erro ao criar preferência:', err);
        setError('Erro ao carregar pagamento');
        setLoading(false);
        onPaymentError?.(err);
      }
    };

    createPreference();
  }, [mercadopagoReady, raceId, inscricaoData, precoKit]);

  const renderPaymentBrick = async (prefId) => {
    try {
      const bricksBuilder = window.MercadoPago.Bricks;

      await bricksBuilder.create('payment', {
        initialization: {
          amount: precoKit,
          preferenceId: prefId
        },
        customization: {
          visual: {
            hideFormTitle: false
          },
          paymentMethods: {
            maxInstallments: 12,
            excluded_payment_methods: ['atm'],
            excluded_payment_types: ['ticket']
          }
        },
        callbacks: {
          onReady: () => {
            console.log('Payment Brick pronto');
          },
          onSubmit: async (formData) => {
            try {
              console.log('Processando pagamento...', formData);
              onPaymentSuccess?.(formData);
            } catch (err) {
              console.error('Erro no submit:', err);
              onPaymentError?.(err);
            }
          },
          onError: (error) => {
            console.error('Erro no pagamento:', error);
            onPaymentError?.(error);
          }
        }
      });
    } catch (err) {
      console.error('Erro ao renderizar Brick:', err);
      setError('Erro ao carregar formulário de pagamento');
      onPaymentError?.(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Carregando pagamento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div id="payment_bricks_container" className="w-full">
      {/* O Brick será renderizado aqui */}
    </div>
  );
}