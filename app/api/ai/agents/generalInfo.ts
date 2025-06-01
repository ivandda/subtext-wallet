export const allGeneralInfo = `Este chatbot forma parte de **SubText Wallet**, una wallet conversacional creada para el **Polkadot Hackathon organizado por Nerdconf** (más información: https://www.nerdconf.com/). El objetivo de SubText Wallet es facilitar el acceso al ecosistema Polkadot a través de comandos en lenguaje natural, sin requerir conocimientos técnicos de blockchain. Fue concebida para derribar las barreras de entrada que enfrentan usuarios no especializados y fomentar la adopción masiva de Polkadot.

## Motivación y Problema Detectado

Polkadot ofrece grandes ventajas como interoperabilidad, seguridad compartida, escalabilidad y gobernanza on-chain, pero su complejidad técnica limita su adopción:
- **Construcción, firma y envío de transacciones (extrinsics)**: Requiere entender conceptos avanzados de blockchain.
- **Cálculo de tarifas (fees)**: Es fácil equivocarse al estimar el gas y las comisiones.
- **Formatos de direcciones**: Distinguir entre SS58, direcciones tipo Ethereum y otras variantes genera confusión.
- **Operaciones cross-chain (XCM)**: Resultan fragmentadas, técnicas y difíciles para usuarios promedio.
- **Interfaz de las wallets tradicionales**: La mayoría exige conocimientos técnicos y resulta intimidante para quien no maneja términos blockchain.

## Solución: SubText Wallet

SubText Wallet es la **primera wallet inteligente de Polkadot** que convierte cada interacción en una conversación sencilla dentro de Discord. Gracias a múltiples agentes de IA y a una capa de procesamiento de lenguaje natural (OpenAI + LangChain), el usuario simplemente escribe comandos en español como:
- \`crear mi wallet\`
- \`¿cuánta plata tengo?\`
- \`mandá 2 DOT a 0xABC...\`
- \`cambiá 10 GLMR a ACA\`
- \`exportar mi clave\`

El bot interpreta cada instrucción, llama a las APIs de Polkadot (polkadot.js, XCM, etc.) y ejecuta las operaciones de manera segura y transparente, sin exponer al usuario a detalles técnicos.

## Funcionalidades (Versión 1.0 en Discord)

1. **Crear Wallet**  
   - Generación segura de seed phrase y dirección on-chain.  
   - La dirección se comparte por Discord y la seed se cifra localmente en la base de datos.

2. **Consultar Balance**  
   - Lectura on-chain en todas las parachains soportadas para devolver un reporte compacto: saldo disponible, bloqueado y reservado de cada token en cada red.

3. **Transferencia On-chain**  
   - Interpretación automática de montos, tokens y direcciones.  
   - Construcción, firma de la transacción, estimación de fees y envío.  
   - El usuario recibe el hash de confirmación de la operación.

4. **Bridge Cross-Chain (XCM)**  
   - Detección automática de red de origen y destino.  
   - Uso de pallets como \`xcmPallet.reserveTransferAssets\` o bridges disponibles.  
   - Cálculo de comisiones totales y ejecución del transfer cross-chain con confirmación.  
   - Tokens soportados en testnet: PAS (DOT) y HDX.

5. **Exportar Clave Privada**  
   - Solicita confirmación explícita y advierte sobre riesgos de seguridad antes de mostrar la clave.

## Stack Tecnológico

- **Frontend**: Bot de Discord desarrollado en Next.js con una capa de IA/NLP para procesar lenguaje natural.  
- **Backend**: API de polkadot.js para interactuar con nodos, junto a gestión de llaves y seeds en una base de datos PostgreSQL (Supabase).  
- **Infraestructura**: Despliegue en Railway, con almacenamiento seguro de seeds cifradas en Supabase.  
- **IA**: OpenAI (GPT) para interpretación de comandos en lenguaje natural, LangChain y LangGraph para orquestar agentes.

## Estado Actual

- ✅ Funcionando en testnet con PAS y HDX.  
- ⚙️ Arquitectura preparada para escalar y recibir nuevas funcionalidades.  
- El bot de Discord ya está activo y disponible para integrarse en cualquier servidor.

## Roadmap Futuro

1. **Nuevas plataformas**: Soporte para Telegram, WhatsApp, WebApp y WeChat.  
2. **Funciones Avanzadas**:  
   - Staking y nominación de validadores.  
   - Votaciones on-chain de gobernanza.  
   - Integración específica con parachains DeFi y DEX.  
3. **Mejora Continua**: Retroalimentación de usuarios para optimizar el agente conversacional.  
4. **Escalabilidad**:  
   - Soportar múltiples usuarios concurrentes con rate limiting y protección anti-spam.  
   - Añadir cachés y servicios de colas para manejar picos de carga.  

   # Que es Nerdconf?
   Evento nómade y federal que reúne a especialistas en tecnología para inspirar a la comunidad nerd.
   Nordconf organiza hackatones, meetups y conferencias en Argentina y Latinoamérica, promoviendo la innovación y el aprendizaje colaborativo. Más información en [Nerdconf](https://www.nerdconf.com/).
   Este proyecto en particular es parte de la Hackathon de Polkadot "NERDCAMP 2025"
   `
;
