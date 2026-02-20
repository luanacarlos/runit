import { theme } from "../theme";

export default function Logo({ size = "md", showText = true }) {
  const sizes = {
    sm: { box: 32, line: 2, text: "0.75rem" },
    md: { box: 48, line: 2.5, text: "1rem" },
    lg: { box: 64, line: 3, text: "1.25rem" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      {/* Logo SVG - Casa minimalista com faixa de chegada */}
      <svg
        width={s.box}
        height={s.box}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Casa */}
        <path
          d="M24 8L8 20V40H40V20L24 8Z"
          fill={theme.colors.secondary}
          stroke={theme.colors.primary}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Porta */}
        <rect
          x="20"
          y="28"
          width="8"
          height="12"
          fill={theme.colors.primary}
          stroke={theme.colors.secondary}
          strokeWidth="1"
        />

        {/* Faixa de chegada cruzando a porta */}
        <line
          x1="16"
          y1="32"
          x2="32"
          y2="32"
          stroke={theme.colors.primary}
          strokeWidth="2"
          strokeDasharray="4,2"
        />

        {/* Janela */}
        <rect x="32" y="20" width="6" height="6" fill={theme.colors.primary} />

        {/* Ponto na porta */}
        <circle cx="24" cy="37" r="1.5" fill={theme.colors.secondary} />
      </svg>

      {/* Texto */}
      {showText && (
        <div>
          <div
            style={{ fontSize: s.text }}
            className="font-bold text-secondary leading-tight"
          >
            Chegada
            <br />
            em Casa
          </div>
        </div>
      )}
    </div>
  );
}
