# SubText Wallet

SubText Wallet es una wallet conversacional basada en Discord que permite a cualquier persona interactuar con el ecosistema Polkadot usando lenguaje natural, sin necesidad de conocimientos técnicos sobre blockchain.
El espíritu de este proyecto es hacer que la tecnología de Polkadot sea accesible a TODO el mundo.

## Problema

Aunque Polkadot ofrece capacidades avanzadas como interoperabilidad, seguridad compartida, escalabilidad y gobernanza on-chain, su adopción se ve limitada por su complejidad técnica:

*   Construcción, firma y envío de extrinsics.
*   Cálculo correcto de transaction fees.
*   Confusión entre formatos de direcciones (SS58 vs. Ethereum-style).
*   Swaps cross-chain (XCM) complejos y fragmentados.
*   Wallets técnicas o con interfaces intimidadoras para el usuario promedio.

## Solución

SubText es la primera Wallet inteligente de Polkadot, que resuelve estas fricciones usando multiples agentes de IA vía un simple chat. Permite realizar operaciones clave del ecosistema Polkadot con comandos naturales como:

*   `crear mi wallet`
*   `¿cuánta plata tengo?`
*   `mandá 2 DOT a 0xABC...`
*   `cambiá 10 GLMR a ACA`
*   `exportar mi clave`

Detrás de escena, el bot interpreta el comando, usa la API correspondiente (polkadot.js, XCM) y ejecuta las operaciones de forma segura y transparente.

## Funcionalidades (V1.0 en Discord)

1.  **Crear Wallet**
    *   Generación segura de seed phrase y dirección.
    *   Address se comparte al usuario de Discord y cifrado local de la seed.
2.  **Consultar Balance**
    *   Lectura on-chain usando todas las parachains soportadas para dar una respuesta concisa al usuario.
    *   Muestra saldo disponible, bloqueado, reservado de cada token en cada chain.
3.  **Transferencia on-chain**
    *   Interpreta montos, tokens y direcciones.
    *   Construye y firma la transacción.
    *   Estima gas fees y devuelve el hash de confirmación.
4.  **Bridge Cross-Chain (XCM)**
    *   Detecta red de origen/destino.
    *   Usa pallets como `xcmPallet.reserveTransferAssets` o bridges disponibles.
    *   Calcula fees totales y realiza el bridge con confirmación.
    *   Tokens soportados actualmente: PAS (DOT en testnet) y HDX.
5.  **Exportar Clave Privada**
    *   Solicita confirmación y muestra advertencias de seguridad.

## Tech Stack

*   **Frontend**: Discord Bot (Next.js + AI/NLP Layer)
*   **Backend**: polkadot.js API + Key Management en un postgres DB hosteado en Supabase
*   **Infraestructura**: Railway (hosting), almacenamiento seguro de seeds en base de datos (Supabase)
*   **AI**: API de OpenAI para interpretación de lenguaje natural, LangChain, LangGraph

## Roadmap Futuro

*   Soporte para otros canales: Telegram, WhatsApp, WebApp, WeChat
*   Funcionalidades avanzadas: staking, nominación de validadores, governance voting.
*   Integración con parachains específicas para DEX o DeFi.
*   Mejora continua del agente conversacional con feedback del usuario.
*   Escalar la arquitectura para múltiples usuarios concurrentes.
*   Implementar sistema de rate limiting y prevención de spam.

## Estado Actual

*   ✅ En funcionamiento sobre testnet con PAS y HDX
*   ⚙️ Arquitectura lista para escalar y recibir mejoras
*   Bot de Discord activo para cualquier server

## Enlace al Proyecto

[SubText Wallet (Live)](https://discord.gg/UTj2Av32)