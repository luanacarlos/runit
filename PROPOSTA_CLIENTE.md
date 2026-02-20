# 🏃 RUNIT - Plataforma de Gestão de Corridas
## Proposta Comercial

---

## 📋 Resumo Executivo

O **RunIt** é uma plataforma completa para gerenciar inscrições e participações em corridas. O sistema já possui a maioria das funcionalidades implementadas e está pronto para ser finalizado e colocado em produção.

A plataforma foi desenvolvida com as tecnologias mais modernas e escaláveis do mercado, garantindo segurança, performance e facilidade de manutenção.

---

## ✅ O QUE JÁ ESTÁ PRONTO

### **Frontend (Aplicação Web)**
- ✔️ **Tela de Login**: Autenticação segura com email/senha
- ✔️ **Registro de Usuários**: Cadastro com validação de dados
- ✔️ **Recuperação de Senha**: Sistema completo com envio de email e token único
- ✔️ **Dashboard do Participante**: 
  - Visualiza todas as corridas disponíveis
  - Inscreve-se em corridas com um clique
  - Validação automática de CPF
  - Histórico de inscrições
  
- ✔️ **Painel Administrativo**: 
  - Criar novas corridas (nome, data, local, descrição, imagem)
  - Editar corridas existentes
  - Deletar corridas
  - Visualizar lista completa de inscritos em cada corrida
  - **Exportar inscritos para Excel** (com dados formatados)
  - Gerenciar participantes

- ✔️ **Design Responsivo**: Funciona perfeitamente em celular, tablet e desktop
- ✔️ **Interface Limpa**: Usando Tailwind CSS para uma experiência moderna

### **Backend (Servidor)**
- ✔️ **API REST Completa**: 
  - Autenticação de usuários
  - Gerenciamento de corridas
  - Gerenciamento de inscrições
  - Recuperação de senha com email

- ✔️ **Banco de Dados MongoDB**: 
  - Armazenamento seguro de usuários, corridas e inscrições
  - Validações automáticas (email único, CPF válido)
  - Relacionamentos de dados

- ✔️ **Envio de Emails**: 
  - Links de recuperação de senha
  - Pronto para integrar notificações de inscrição

- ✔️ **Autenticação Básica**: Login/Logout funcional

### **Infraestrutura**
- ✔️ **Docker**: Aplicação containerizada e pronta para deploy
- ✔️ **Docker-Compose**: Orquestração automática de todos os serviços
- ✔️ **Nginx**: Servidor web configurado como proxy reverso
- ✔️ **MongoDB**: Banco de dados em container

---

## ⚠️ O QUE AINDA PRECISA SER FEITO

Para colocar a aplicação em **produção profissional**, é necessário:

### **1. Segurança Avançada (CRÍTICO)**
- Implementar **JWT (JSON Web Tokens)** com expiração
- Adicionar **middleware de autenticação** no backend
- Validação de emails confirmados
- Rate limiting (proteção contra força bruta)

### **2. Funcionalidades Adicionais**
- Sistema de **busca e filtros** de corridas
- **Paginação** para grandes volumes de dados
- Confirmação de inscrição por email
- Notificação de novo participante por email

### **3. Produção & Deployment**
- **Certificado SSL/TLS** (HTTPS)
- Configurar variáveis de ambiente seguras
- **Backup automático** do banco de dados
- Domínio próprio e hospedagem

### **4. Qualidade & Confiabilidade**
- **Testes automatizados** (unitários e integração)
- **Monitoramento** de performance e erros
- **Logging** centralizados
- CI/CD Pipeline (deploy automático)

### **5. Documentação**
- Documentação técnica da API
- Manual do administrador
- Guia de uso para participantes

---

## 💰 OPÇÕES DE INVESTIMENTO

Apresentamos três pacotes pensados em diferentes necessidades:

---

### 🎯 **OPÇÃO 1: MVP (Mínimo Viável)**
**Ideal para: Teste inicial com usuários reais**

**Inclui:**
- Implementação de **JWT** com expiração (30 dias)
- Validação de **email confirmado** antes de usar a conta
- Middleware de autenticação no backend
- Deploy em servidor básico (com HTTP)
- Manual de uso básico

**NÃO inclui:**
- SSL/HTTPS
- Backup automático
- Monitoramento
- Testes
- Suporte pós-venda

**Investimento: R$ 2.500 a R$ 3.500**  
**Tempo de entrega: 7 dias úteis**

---

### ⭐ **OPÇÃO 2: STANDARD (Recomendado)**
**Ideal para: Lançamento profissional com garantia**

**Inclui tudo da Opção 1, MAIS:**
- Sistema de **busca e filtros** avançados de corridas
- **Paginação** para otimizar carregamento
- Notificações por email (nova inscrição, confirmação)
- Documentação completa da API (Swagger)
- Deploy profissional com **HTTPS/SSL**
- Configuração segura de variáveis de ambiente
- **Manual do administrador** e guia de uso
- **1 mês de suporte técnico** incluído

**NÃO inclui:**
- Backup automático
- Monitoramento em tempo real
- Testes automatizados
- CI/CD Pipeline

**Investimento: R$ 4.500 a R$ 6.500**  
**Tempo de entrega: 15 dias úteis**

---

### 🚀 **OPÇÃO 3: PREMIUM (Production-Ready)**
**Ideal para: Operação em larga escala com máxima confiabilidade**

**Inclui tudo da Opção 2, MAIS:**
- **Testes automatizados** (testes de unidade, integração e E2E)
- **Backup automático** do MongoDB (diário)
- **Monitoramento 24/7** (alertas de erros e performance)
- **CI/CD Pipeline** (deploy automático ao fazer push)
- Rate limiting e proteção contra ataques
- **Painel de analytics** (visualizar inscrições por período)
- **Suporte técnico por 3 meses** (email + whatsapp)
- Treinamento de 2h com sua equipe

**Investimento: R$ 8.000 a R$ 12.000**  
**Tempo de entrega: 35 dias úteis**

---

## 📊 Comparativo das Opções

| Feature | MVP | Standard | Premium |
|---------|------|----------|---------|
| JWT com expiração | ✅ | ✅ | ✅ |
| Validação de email | ✅ | ✅ | ✅ |
| Middleware Auth | ✅ | ✅ | ✅ |
| Busca e filtros | ❌ | ✅ | ✅ |
| Notificações por email | ❌ | ✅ | ✅ |
| HTTPS/SSL | ❌ | ✅ | ✅ |
| Documentação API | ❌ | ✅ | ✅ |
| Backup automático | ❌ | ❌ | ✅ |
| Monitoramento 24/7 | ❌ | ❌ | ✅ |
| CI/CD Pipeline | ❌ | ❌ | ✅ |
| Testes automatizados | ❌ | ❌ | ✅ |
| Analytics | ❌ | ❌ | ✅ |
| Suporte técnico | ❌ | 1 mês | 3 meses |
| **Investimento** | **R$ 2.500-3.500** | **R$ 4.500-6.500** | **R$ 8.000-12.000** |

---

## 🎯 Recomendação

**Para a maioria dos clientes, recomendamos a Opção 2 (Standard)** por ser o melhor custo-benefício:

✅ Seu sistema fica 100% seguro e profissional  
✅ Pronto para receber centenas de inscrições  
✅ Com suporte incluído nos primeiros 30 dias  
✅ Documentação para facilitar futuras manutenções  

A diferença entre MVP e Standard é pequena no investimento, mas o impacto na segurança e confiabilidade é enorme.

---

## 📈 Casos de Uso

O RunIt é perfeito para:

- 🏃 **Federações de Atletismo**: Gerenciar múltiplas corridas e milhares de inscrições
- 🏢 **Empresas**: Organizar corridas corporativas internas
- 🏙️ **Prefeituras**: Eventos públicos de corrida e caminhada
- 🤝 **Organizadores Independentes**: Maratonas, meias-maratonas, 5k
- 🎯 **Eventos Esportivos**: Qualquer evento que necessite gestão de participantes

---

## 🔒 Segurança de Dados

Temos total preocupação com a proteção dos dados:

- ✅ Senhas criptografadas com **bcrypt**
- ✅ Tokens únicos e expiráveis para recuperação de senha
- ✅ Validação de todos os dados de entrada
- ✅ Proteção contra ataques CSRF e SQL Injection
- ✅ Se escolher Premium: Backup automático e criptografia em trânsito (HTTPS)

---

## ⏱️ Timeline

### Opção 1 (MVP)
- Semana 1: Implementação (7 dias)
- Semana 2: Deploy e testes finais (3 dias)
- **Total: ~10 dias**

### Opção 2 (Standard)
- Semana 1-2: Implementação das features (10 dias)
- Semana 2: Documentação e testes (5 dias)
- **Total: ~15 dias**

### Opção 3 (Premium)
- Semana 1-3: Implementação completa (15 dias)
- Semana 3-4: Testes, monitoramento, CI/CD (15 dias)
- Semana 5: Ajustes e treinamento (5 dias)
- **Total: ~35 dias**

---

## 💡 Próximos Passos

1. **Você escolhe qual opção faz mais sentido** para seu caso
2. **Pagamento**: 50% para iniciar, 50% na entrega (ou outra forma que preferir)
3. **Entramos em contato** para detalhar específicas do seu evento/organização
4. **Iniciamos o desenvolvimento** no prazo acordado
5. **Você recebe** a aplicação pronta, segura e documentada
6. **Suporte** contínuo conforme o plano escolhido

---

## 📞 Dúvidas Frequentes

**P: Posso fazer customizações no design?**  
R: Sim! Você pode adaptar cores, logo, textos etc. Fale conosco sobre suas preferências.

**P: E se precisar de mais funcionalidades no futuro?**  
R: Todas as opções incluem suporte e você pode contratar novas features quando precisar (por projeto).

**P: Vocês fazem manutenção contínua?**  
R: Sim! Oferecemos pacotes de suporte mensal ou anual. Converse conosco.

**P: Quanto custa se quisermos um domínio próprio?**  
R: O domínio você compra separado (custa entre R$ 30-100/ano). Nós configuramos para funcionar com o sistema sem cobrar extra.

**P: Qual a diferença entre Standard e Premium?**  
R: Premium é para quem quer máxima confiabilidade, backup automático e monitoramento 24/7. Standard é para quem quer algo profissional sem overhead.

---

## 🎯 Conclusão

O **RunIt** é uma solução completa, moderna e escalável para gerenciar corridas. Escolha a opção que melhor se adequa ao seu caso e vamos colocar seu evento no ar!

---

**Desenvolvido com foco em qualidade, segurança e experiência do usuário.**

*Data da Proposta: 18 de fevereiro de 2026*
