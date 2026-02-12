export default function Dashboard() {
  const corridas = [
    {
      id: 1,
      nome: "Maratona de Manaus",
      organizacao: "Federação Amazonense de Atletismo",
      data: "20/03/2026",
      local: "Manaus - AM",
      imagem: "https://picsum.photos/400/200?random=1"
    },
    {
      id: 2,
      nome: "Corrida da Paz",
      organizacao: "ONG Vida Saudável",
      data: "05/04/2026",
      local: "São Paulo - SP",
      imagem: "https://picsum.photos/400/200?random=2"
    },
    {
      id: 3,
      nome: "Night Run",
      organizacao: "Clube de Corrida",
      data: "12/05/2026",
      local: "Rio de Janeiro - RJ",
      imagem: "https://picsum.photos/400/200?random=3"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Catálogo de Corridas</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {corridas.map(corrida => (
          <div key={corrida.id} className="bg-white rounded shadow hover:shadow-lg transition">
            <img src={corrida.imagem} alt={corrida.nome} className="w-full h-48 object-cover rounded-t" />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{corrida.nome}</h2>
              <p className="text-sm text-gray-600">Organização: {corrida.organizacao}</p>
              <p className="text-sm text-gray-600">Data: {corrida.data}</p>
              <p className="text-sm text-gray-600">Local: {corrida.local}</p>
              <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
