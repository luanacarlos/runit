import { theme } from "../theme";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: theme.colors.secondary,
        color: "white",
        marginTop: "4rem",
      }}
      className="py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="font-bold mb-3">Chegada em Casa</h3>
            <p className="text-sm opacity-90">
              Leveza na entrega, velocidade na prova.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="font-bold mb-3">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#" className="opacity-90 hover:opacity-100 transition">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="/#" className="opacity-90 hover:opacity-100 transition">
                  Contato
                </a>
              </li>
              <li>
                <a href="/#" className="opacity-90 hover:opacity-100 transition">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold mb-3">Contato</h3>
            <p className="text-sm opacity-90">
              📧 contato@chegadaemcasa.com
            </p>
            <p className="text-sm opacity-90">
              📱 +55 (11) 99999-9999
            </p>
          </div>
        </div>

        <div
          style={{ borderTop: `1px solid rgba(255,255,255,0.2)` }}
          className="pt-8 text-center text-sm opacity-90"
        >
          <p>
            &copy; {currentYear} Chegada em Casa. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
