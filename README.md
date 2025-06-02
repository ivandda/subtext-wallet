# SubText Wallet

_SubText Wallet_ es una wallet conversacional basada en Discord que permite a cualquier persona interactuar con el ecosistema Polkadot usando lenguaje natural, sin necesidad de conocimientos técnicos sobre blockchain.  
El espíritu de este proyecto es hacer que la tecnología de Polkadot sea accesible a TODO el mundo.

---

## 📺 Demo Video

https://github.com/user-attachments/assets/fe67c057-ab83-4ded-ad6c-40bee5bc5439

---

## 🛠️ Problema

Aunque Polkadot ofrece capacidades avanzadas como interoperabilidad, seguridad compartida, escalabilidad y gobernanza on-chain, su adopción se ve limitada por su complejidad técnica:

- Construcción, firma y envío de extrinsics.
- Cálculo correcto de transaction fees.
- Confusión entre formatos de direcciones (SS58 vs. Ethereum-style).
- Swaps cross-chain (XCM) complejos y fragmentados.
- Wallets técnicas o con interfaces intimidatorias para el usuario promedio.

---

## 💡 Solución

_SubText Wallet_ es la primera wallet inteligente de Polkadot, que resuelve estas fricciones usando múltiples agentes de IA vía un simple chat en Discord. Permite realizar operaciones clave del ecosistema Polkadot con comandos naturales, por ejemplo:

- `crear mi wallet`
- `¿cuánto tengo?`
- `mandá 2 DOT a 0xABC...`
- `cambiá 10 GLMR a ACA`
- `exportar mi clave`

Detrás de escena, el bot interpreta el comando, usa la API correspondiente (polkadot.js, XCM) y ejecuta las operaciones de forma segura y transparente.

---

## 🚀 Funcionalidades (V1.0 en Discord)

1. **Crear Wallet**  
   - Generación segura de seed phrase y dirección.  
   - La dirección (address) se comparte al usuario de Discord y la seed queda cifrada localmente.  

2. **Consultar Balance**  
   - Lectura on-chain usando todas las parachains soportadas para dar una respuesta concisa al usuario.  
   - Muestra saldo disponible, bloqueado y reservado de cada token en cada chain.  

3. **Transferencia on-chain**  
   - Interpreta montos, tokens y direcciones.  
   - Construye y firma la transacción.  
   - Estima gas fees y devuelve el hash de confirmación.  

4. **Bridge Cross-Chain (XCM)**  
   - Detecta red de origen y destino automáticamente.  
   - Utiliza pallets como `xcmPallet.limitedReserveTransferAssets` o bridges disponibles.  
   - Calcula fees totales y realiza el bridge con confirmación al usuario.  
   - Tokens soportados actualmente:  
     - **PAS** (DOT en testnet)  
     - **HDX**  

5. **Exportar Clave Privada**  
   - Solicita confirmación antes de exponer la clave.  
   - Muestra advertencias de seguridad y elimina riesgos de exposición.

---

## 🧩 Tech Stack

- **Frontend**:  
  - Discord Bot construido con **Next.js**  
- **Backend**:  
  - Agentes de IA/NLP  
  - **polkadot.js API** + Key Management (Next.js)  
- **Infraestructura**:  
  - **Railway** (hosting)  
  - Almacenamiento seguro de seeds en base de datos (**Supabase PostgreSQL**)  
- **AI/NLP**:  
  - API de **OpenAI** para interpretación de lenguaje natural  
  - **LangChain**, **LangGraph**  

---

## 📅 Roadmap Futuro

- **Soporte para otros canales**:  
  - Telegram, WhatsApp, WebApp.  
- **Funcionalidades avanzadas**:  
  - Staking, nominación de validadores, governance voting.  
- **Integración con parachains específicas**:  
  - DEX, DeFi, y otras aplicaciones en Polkadot.  
- **Mejora continua del agente conversacional**:  
  - Incorporar feedback del usuario para un chat cada vez más natural.  
- **Escalar la arquitectura**:  
  - Soportar múltiples usuarios concurrentes sin perder eficiencia.  
- **Seguridad y prevención de spam**:  
  - Implementar rate limiting, verificación adicional y sistemas antispam.

---

## 🔄 Estado Actual

- ✅ **En funcionamiento sobre testnet** con PAS y HDX  
- ⚙️ **Arquitectura lista para escalar** y recibir mejoras  
- 🤖 Bot de Discord **activo para cualquier server**  
- Próximos pasos: Registro de usuarios en producción y migración a tokens reales en Mainnet.

---

## 🔗 Enlace al Proyecto

[SubText Wallet (Live)](https://subtext-wallet-production.up.railway.app)  

