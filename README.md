1. Instalar Node.js e VS Code
Node.js:

Vá em nodejs.org e baixe a versão LTS (mais estável).

Instale normalmente (Next → Next → Finish).

Depois, abra o terminal e confirme:

bash
node -v
npm -v
Isso deve mostrar as versões instaladas.

VS Code:

Baixe em code.visualstudio.com.

Instale e abra.

Instale extensões úteis: ESLint, Prettier, Tailwind CSS IntelliSense.

2. Criar projeto com Vite (mais leve que Next.js)
No terminal:

bash
npm create vite@latest meu-projeto
Escolha o nome do projeto (ex: meu-projeto).

Selecione React ou Vanilla JS (React é melhor para escalar).

Entre na pasta:

bash
cd meu-projeto
npm install
npm run dev
Isso já abre um servidor local (geralmente em http://localhost:5173).

3. Instalar TailwindCSS
Dentro da pasta do projeto:

bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
No arquivo tailwind.config.js, ajuste:

js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
No arquivo src/index.css (ou main.css), adicione:

css
@tailwind base;
@tailwind components;
@tailwind utilities;
Agora você pode usar classes do Tailwind direto nos componentes, por exemplo:

jsx
<h1 className="text-3xl font-bold text-center text-blue-500">Olá Mundo!</h1>
4. Fazer build para produção
Quando terminar seu site:

bash
npm run build
Isso gera uma pasta dist/ com os arquivos prontos para deploy.

5. Deploy na Hostinger
Acesse o painel da Hostinger.

Crie um site e vá em Gerenciador de Arquivos.

Faça upload da pasta dist/ (ou use FTP).

Se quiser automatizar, pode configurar GitHub Actions para enviar direto ao servidor.