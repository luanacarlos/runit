import { useState, useEffect } from "react";
import axios from "axios";
import ExcelJS from "exceljs";

const API_URL = import.meta.env.DEV ? "http://localhost:5000/api/races" : "/api/races";

export default function AdminDashboard() {
  const [corridas, setCorridas] = useState([]);
  const [inscrições, setInscrições] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [expandedRaceId, setExpandedRaceId] = useState(null);
  
  // Form para criar corrida
  const [formCorrida, setFormCorrida] = useState({
    nome: "",
    organizacao: "",
    data: "",
    local: "",
    imagem: "",
    descricao: ""
  });

  // Carregar corridas
  useEffect(() => {
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
      
      // Carregar inscrições para cada corrida
      corridasOrdenadas.forEach(corrida => {
        fetchInscrições(corrida._id);
      });
    } catch (error) {
      console.error("Erro ao buscar corridas:", error);
      alert("Erro ao carregar corridas");
    } finally {
      setLoading(false);
    }
  };

  const fetchInscrições = async (raceId) => {
    try {
      const response = await axios.get(`${API_URL}/${raceId}/inscriptions`);
      setInscrições(prev => ({
        ...prev,
        [raceId]: response.data
      }));
    } catch (error) {
      console.error("Erro ao buscar inscrições:", error);
    }
  };

  const handleCreateCorrida = async (e) => {
    e.preventDefault();
    
    if (!formCorrida.nome || !formCorrida.data || !formCorrida.local) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const response = await axios.post(API_URL, formCorrida);
      setCorridas([...corridas, response.data.race].sort(
        (a, b) => new Date(a.data) - new Date(b.data)
      ));
      setFormCorrida({
        nome: "",
        organizacao: "",
        data: "",
        local: "",
        imagem: "",
        descricao: ""
      });
      setShowModal(false);
      alert("Corrida criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar corrida:", error);
      alert("Erro ao criar corrida");
    }
  };

  const handleDeleteCorrida = async (raceId) => {
    if (!window.confirm("Tem certeza que deseja deletar esta corrida?")) return;

    try {
      await axios.delete(`${API_URL}/${raceId}`);
      setCorridas(corridas.filter(c => c._id !== raceId));
      alert("Corrida deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar corrida:", error);
      alert("Erro ao deletar corrida");
    }
  };

    const exportToExcel = async (raceId, raceName) => {
    const inscritos = inscrições[raceId] || [];
    
    if (inscritos.length === 0) {
        alert("Nenhuma inscrição para exportar");
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Inscrições");

    // Headers
    worksheet.columns = [
        { header: "Nome", key: "nome", width: 25 },
        { header: "Email", key: "email", width: 30 },
        { header: "Telefone", key: "telefone", width: 15 },
        { header: "CPF", key: "cpf", width: 15 },
        { header: "Data de Nascimento", key: "nascimento", width: 18 },
        { header: "Inscrito em", key: "inscrito_em", width: 15 }
    ];

    // Estilizar headers
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2E5090" }
    };

    // Adicionar dados
    inscritos.forEach(inscrito => {
        worksheet.addRow({
        nome: inscrito.nome,
        email: inscrito.email,
        telefone: inscrito.telefone,
        cpf: inscrito.cpf,
        nascimento: new Date(inscrito.nascimento).toLocaleDateString("pt-BR"),
        inscrito_em: new Date(inscrito.inscrito_em).toLocaleDateString("pt-BR")
        });
    });

    // Gerar arquivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${raceName}_inscrições.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
    };

  const toggleExpandeRace = (raceId) => {
    setExpandedRaceId(expandedRaceId === raceId ? null : raceId);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard de Admin</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            + Nova Corrida
          </button>
        </div>
        <p className="text-gray-600 mt-2">Gerencie corridas e veja as inscrições</p>
      </div>

      {/* Modal Criar Corrida */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Criar Nova Corrida</h2>
            
            <form onSubmit={handleCreateCorrida} className="space-y-4">
              <input
                type="text"
                placeholder="Nome da Corrida"
                value={formCorrida.nome}
                onChange={(e) => setFormCorrida({...formCorrida, nome: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
              
              <input
                type="text"
                placeholder="Organização"
                value={formCorrida.organizacao}
                onChange={(e) => setFormCorrida({...formCorrida, organizacao: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              
              <input
                type="datetime-local"
                value={formCorrida.data}
                onChange={(e) => setFormCorrida({...formCorrida, data: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
              
              <input
                type="text"
                placeholder="Local"
                value={formCorrida.local}
                onChange={(e) => setFormCorrida({...formCorrida, local: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
              
              <input
                type="url"
                placeholder="URL da Imagem (opcional)"
                value={formCorrida.imagem}
                onChange={(e) => setFormCorrida({...formCorrida, imagem: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              
              <textarea
                placeholder="Descrição (opcional)"
                value={formCorrida.descricao}
                onChange={(e) => setFormCorrida({...formCorrida, descricao: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                rows="3"
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Criar Corrida
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de Corridas */}
      <div className="max-w-6xl mx-auto space-y-4">
        {corridas.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
            <p className="text-lg">Nenhuma corrida criada ainda. Crie uma para começar!</p>
          </div>
        ) : (
          corridas.map(corrida => (
            <div key={corrida._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header da Corrida */}
              <div
                onClick={() => toggleExpandeRace(corrida._id)}
                className="p-6 cursor-pointer hover:bg-gray-50 transition border-b border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{corrida.nome}</h3>
                    <p className="text-gray-600 mt-1">{corrida.organizacao}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>📅 {new Date(corrida.data).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}</span>
                      <span>📍 {corrida.local}</span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {inscrições[corrida._id]?.length || 0} inscritos
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCorrida(corrida._id);
                    }}
                    className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Deletar
                  </button>
                </div>
              </div>

              {/* Content Expandido - Inscrições */}
              {expandedRaceId === corrida._id && (
                <div className="p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold text-gray-900">Inscrições</h4>
                    <button
                      onClick={() => exportToExcel(corrida._id, corrida.nome)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                      📥 Exportar Excel
                    </button>
                  </div>

                  {inscrições[corrida._id]?.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">Nenhuma inscrição nesta corrida</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="text-left p-3">Nome</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Telefone</th>
                            <th className="text-left p-3">CPF</th>
                            <th className="text-left p-3">Nascimento</th>
                            <th className="text-left p-3">Inscrito em</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inscrições[corrida._id].map((inscrito, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                              <td className="p-3">{inscrito.nome}</td>
                              <td className="p-3">{inscrito.email}</td>
                              <td className="p-3">{inscrito.telefone}</td>
                              <td className="p-3">{inscrito.cpf}</td>
                              <td className="p-3">{new Date(inscrito.nascimento).toLocaleDateString("pt-BR")}</td>
                              <td className="p-3">{new Date(inscrito.inscrito_em).toLocaleDateString("pt-BR")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}