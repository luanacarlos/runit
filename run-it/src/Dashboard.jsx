import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import PaymentBrick from "./components/PaymentBrick";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/races"
  : "/api/races";

export default function Dashboard() {
  const [corridas, setCorridas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRace, setSelectedRace] = useState(null);
  const [formInscricao, setFormInscricao] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    nascimento: "",
    kitOption: "pickup",
    address: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inscricaoTemporaria, setInscricaoTemporaria] = useState(null);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      const usuario = JSON.parse(usuarioLogado);
      setFormInscricao({
        nome: usuario.nome || "",
        email: usuario.email || "",
        telefone: usuario.telefone || "",
        cpf: usuario.cpf || "",
        nascimento: usuario.nascimento || "",
        kitOption: "pickup",
        address: ""
      });
    }
    fetchCorridas();
  }, []);

  const fetchCorridas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      const corridasOrdenadas = response.data.sort(
        (a, b) => new Date(a.data) - new Date(b.data)
      );
      setCorridas(corridasOrdenadas);
    } catch (error) {
      console.error("Erro ao buscar corridas:", error);
      alert("Erro ao carregar corridas");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (corrida) => {
    setSelectedRace(corrida);
    setShowModal(true);
    setFormInscricao((prev) => ({
      ...prev,
      kitOption: "pickup",
      address: ""
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRace(null);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setInscricaoTemporaria(null);
  };

  const handleSubmitInscricao = async (e) => {
    e.preventDefault();

    if (
      !formInscricao.nome ||
      !formInscricao.email ||
      !formInscricao.telefone ||
      !formInscricao.cpf ||
      !formInscricao.nascimento
    ) {
      alert("Preencha todos os campos");
      return;
    }

    if (formInscricao.kitOption === "delivery" && !formInscricao.address) {
      alert("Informe o endereço para entrega");
      return;
    }

    if (formInscricao.cpf.replace(/\D/g, "").length !== 11) {
      alert("CPF inválido");
      return;
    }

    // Salvar dados temporários e abrir modal de pagamento
    setInscricaoTemporaria({
      nome: formInscricao.nome,
      email: formInscricao.email,
      telefone: formInscricao.telefone,
      cpf: formInscricao.cpf,
      nascimento: formInscricao.nascimento,
      kitOption: formInscricao.kitOption,
      address: formInscricao.address,
      raceId: selectedRace._id
    });
    
    setShowModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      setIsSubmitting(true);
      
      // Enviar inscrição com dados de pagamento
      await axios.post(
        `${API_URL}/${inscricaoTemporaria.raceId}/inscriptions`,
        {
          nome: inscricaoTemporaria.nome,
          email: inscricaoTemporaria.email,
          telefone: inscricaoTemporaria.telefone,
          cpf: inscricaoTemporaria.cpf,
          nascimento: new Date(inscricaoTemporaria.nascimento),
          kitOption: inscricaoTemporaria.kitOption,
          address: inscricaoTemporaria.address,
          paymentId: paymentData?.id || "pending",
          paymentStatus: "pending"
        }
      );

      alert("✅ Inscrição realizada! Aguarde confirmação do pagamento.");
      handleClosePaymentModal();
      handleCloseModal();
      fetchCorridas();
    } catch (error) {
      console.error("Erro ao finalizar inscrição:", error);
      alert("Erro ao finalizar inscrição: " + error.response?.data?.msg || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentError = (error) => {
    console.error("Erro no pagamento:", error);
    alert("Erro ao processar pagamento. Tente novamente.");
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando corridas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-2 text-center text-gray-900">
            Catálogo de Corridas
          </h1>
          <p className="text-center text-gray-600">
            Encontre e inscreva-se nas melhores corridas
          </p>
        </div>

        {/* Lista de Corridas */}
        {corridas.length === 0 ? (
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">
              Nenhuma corrida disponível no momento
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {corridas.map((corrida) => (
              <div
                key={corrida._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Imagem */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {corrida.imagem ? (
                    <img
                      src={corrida.imagem}
                      alt={corrida.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                      <span className="text-white text-4xl">🏃</span>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-4 space-y-3">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {corrida.nome}
                  </h2>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Organização:</span>{" "}
                    {corrida.organizacao}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span>📅</span> {formatarData(corrida.data)}
                    </p>
                    <p className="flex items-center gap-2">
                      <span>📍</span> {corrida.local}
                    </p>
                  </div>

                  {corrida.descricao && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {corrida.descricao}
                    </p>
                  )}

                  {/* Preço do Kit */}
                  <div className="bg-blue-50 p-2 rounded text-center">
                    <p className="text-sm text-gray-600">Kit de Corrida</p>
                    <p className="text-xl font-bold text-blue-600">R$ 29,90</p>
                  </div>

                  {/* Botão de Inscrição */}
                  <button
                    onClick={() => handleOpenModal(corrida)}
                    className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    🎯 Inscrever-se
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Inscrição */}
        {showModal && selectedRace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                Inscrição - {selectedRace.nome}
              </h2>
              <p className="text-gray-600 mb-6">
                Preencha os dados para se inscrever
              </p>

              <form onSubmit={handleSubmitInscricao} className="space-y-4">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formInscricao.nome}
                    onChange={(e) =>
                      setFormInscricao({
                        ...formInscricao,
                        nome: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formInscricao.email}
                    onChange={(e) =>
                      setFormInscricao({
                        ...formInscricao,
                        email: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    value={formInscricao.telefone}
                    onChange={(e) =>
                      setFormInscricao({
                        ...formInscricao,
                        telefone: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                {/* CPF */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    CPF *
                  </label>
                  <input
                    type="text"
                    value={formInscricao.cpf}
                    onChange={(e) =>
                      setFormInscricao({ ...formInscricao, cpf: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="000.000.000-00"
                    required
                  />
                </div>

                {/* Data de Nascimento */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    value={formInscricao.nascimento}
                    onChange={(e) =>
                      setFormInscricao({
                        ...formInscricao,
                        nascimento: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>

                {/* Opção do kit */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Entrega do kit
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="kitOption"
                        value="pickup"
                        checked={formInscricao.kitOption === "pickup"}
                        onChange={(e) =>
                          setFormInscricao({
                            ...formInscricao,
                            kitOption: e.target.value
                          })
                        }
                      />
                      <span>Retirar no dia</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="kitOption"
                        value="delivery"
                        checked={formInscricao.kitOption === "delivery"}
                        onChange={(e) =>
                          setFormInscricao({
                            ...formInscricao,
                            kitOption: e.target.value
                          })
                        }
                      />
                      <span>Entregar em casa</span>
                    </label>
                  </div>
                </div>

                {formInscricao.kitOption === "delivery" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Endereço para entrega *
                    </label>
                    <input
                      type="text"
                      value={formInscricao.address}
                      onChange={(e) =>
                        setFormInscricao({
                          ...formInscricao,
                          address: e.target.value
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Rua, número, bairro, cidade"
                      required
                    />
                  </div>
                )}

                {/* Botões */}
                <div className="flex gap-3 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
                  >
                    {isSubmitting ? "Processando..." : "Continuar para Pagamento"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Pagamento */}
        {showPaymentModal && inscricaoTemporaria && selectedRace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                💳 Pagamento do Kit
              </h2>
              <p className="text-gray-600 mb-6">
                Inscrição em: <strong>{selectedRace.nome}</strong>
              </p>

              {/* Resumo da Inscrição */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">📋 Resumo da Inscrição</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Nome:</strong> {inscricaoTemporaria.nome}
                  </p>
                  <p>
                    <strong>Email:</strong> {inscricaoTemporaria.email}
                  </p>
                  <p>
                    <strong>CPF:</strong> {inscricaoTemporaria.cpf}
                  </p>
                  <p>
                    <strong>Kit:</strong>{" "}
                    {inscricaoTemporaria.kitOption === "delivery"
                      ? "Entrega em casa"
                      : "Retirar no dia"}
                  </p>
                  {inscricaoTemporaria.kitOption === "delivery" && (
                    <p>
                      <strong>Endereço:</strong> {inscricaoTemporaria.address}
                    </p>
                  )}
                  <div className="border-t pt-2 mt-3">
                    <p className="text-lg font-bold text-blue-600">
                      💰 Valor Total: R$ 29,90
                    </p>
                  </div>
                </div>
              </div>

              {/* Brick de Pagamento */}
              <div className="mb-6">
                <PaymentBrick
                  raceId={inscricaoTemporaria.raceId}
                  inscricaoData={inscricaoTemporaria}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  precoKit={29.90}
                />
              </div>

              <button
                onClick={handleClosePaymentModal}
                className="w-full bg-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                ← Voltar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}