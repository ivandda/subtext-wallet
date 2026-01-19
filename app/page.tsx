'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, LineChart, Lock, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { RequestAccessModal } from '@/components/request-access-modal'

// ──────────────────────────────────────────────────────────────────────────────
//  Brand settings
// ──────────────────────────────────────────────────────────────────────────────
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] })
const brandPink = '#E6007A'   // Polkadot pink
const brandPurple = '#A100FF' // Complementary purple
const brandWhite = '#FFFFFF'

const Container = ({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) => (
  <div className={`mx-auto w-full max-w-7xl px-4 ${className}`}>{children}</div>
)

// ──────────────────────────────────────────────────────────────────────────────
//  Navbar                                                                       
// ──────────────────────────────────────────────────────────────────────────────
function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <header className='fixed inset-x-0 top-0 z-50 h-20 border-b border-white/10 bg-black/60 backdrop-blur-xl'>
      <Container className='flex h-full items-center justify-between'>
        <Link href='/' className='flex items-center space-x-3 font-bold'>
          {/* Brand logo */}
          <img src='/logo.png' alt='SubText Wallet' className='h-12 w-12' />
          <span className='text-2xl'>SubText Wallet</span>
        </Link>

        <nav className='flex items-center space-x-4'>
          <div className='flex justify-center gap-4'>
            <button
              onClick={onOpenModal}
              className='text-lg text-black hover:opacity-90 p-2 px-4 rounded-full flex items-center transition-opacity'
              style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}
            >
              Comenzar
              <ArrowRight className='ml-2 h-5 w-5' />
            </button>
          </div>
        </nav>
      </Container>
    </header>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
//  Hero                                                                         
// ──────────────────────────────────────────────────────────────────────────────
function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id='hero' className='relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden pt-30'>
      <AnimatedBackdrop />

      <Container className='relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='grid lg:grid-cols-3 gap-12 items-center min-h-[60vh]'
        >
          {/* Left side - Logo and Product Name */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex flex-col items-center space-y-6 lg:col-span-1'
          >
            <div className='relative'>
              <div
                className='absolute inset-0 rounded-full blur-2xl opacity-30'
                style={{ backgroundColor: brandPink }}
              />
              <img
                src='/logo.png'
                alt='SubText Wallet'
                className='relative h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48'
              />
            </div>

            <div className='space-y-3 text-center'>
              <h1 className='text-4xl font-bold md:text-5xl lg:text-6xl' style={{ color: brandWhite }}>
                SubText
                <br />
                <span
                  className='bg-gradient-to-r bg-clip-text text-transparent'
                  style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}
                >
                  Wallet
                </span>
              </h1>
              <div
                className='h-1 w-24 rounded-full mx-auto'
                style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}
              />
            </div>
          </motion.div>

          {/* Right side - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='space-y-8 text-center lg:col-span-2'
          >
            {/* Main Headline */}
            <div className='space-y-6'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl leading-tight'>
                Polkadot, sin Complicaciones.
                <br />
                <span
                  className='bg-gradient-to-r bg-clip-text text-transparent'
                  style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}
                >
                  Solo Conversa.
                </span>
              </h2>

              <p className='max-w-xl text-lg text-gray-300 leading-relaxed mx-auto'>
                Olvídate de la jerga técnica. Gestiona tus activos,
                haz transferencias y swaps cross-chain usando lenguaje natural.
              </p>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='flex justify-center'
            >
              <button
                onClick={onOpenModal}
                className='group relative overflow-hidden rounded-full px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3'
                style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}
              >
                <span className='relative z-10'>Comenzar Ahora</span>
                <ArrowRight className='relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1' />

                {/* Hover effect overlay */}
                <div
                  className='absolute inset-0 opacity-0 transition-opacity group-hover:opacity-20'
                  style={{ backgroundColor: brandWhite }}
                />
              </button>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className='flex flex-wrap justify-center gap-3 pt-4'
            >
              {[
                'Lenguaje Natural',
                'Cross-Chain',
                'Seguro & Simple'
              ].map((feature, i) => (
                <span
                  key={feature}
                  className='rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm font-medium text-gray-300 backdrop-blur-sm'
                >
                  {feature}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
//  Pitch and Demo
// ──────────────────────────────────────────────────────────────────────────────
function PitchAndDemo() {
  return (
    <section id='pitch-demo' className='border-t border-white/10 bg-black py-24'>
      <Container>
        <header className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>Pitch y Demo</h2>
          <p className='mt-4 text-gray-400'>Descubre cómo SubText Wallet revoluciona tu interacción con Polkadot.</p>
        </header>

        <div className='mx-auto max-w-4xl'>
          <div className='aspect-video overflow-hidden rounded-xl shadow-2xl'>
            <iframe
              className='h-full w-full'
              src='https://www.loom.com/embed/de37f48669634bb0b2832571439d8324?sid=b97de916-6c8a-4c44-91af-ccf44d1fa36d'
              title='SubText Wallet Pitch and Demo Video'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
//  Features                                                                     
// ──────────────────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section id='features' className='border-t border-white/10 bg-black py-24'>
      <Container>
        <header className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>Descomplica Polkadot con SubText Wallet</h2>
          <p className='mt-4 text-gray-400'>Interactúa con la blockchain de forma intuitiva, como si chatearas con un experto.</p>
        </header>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {[
            {
              icon: <Wallet className='h-12 w-12' style={{ color: brandPink }} />,
              title: 'Comandos Simples, Poder Real',
              desc: 'Dile adiós a las interfaces técnicas. Crea tu wallet, consulta saldos o transfiere tokens con frases cotidianas.',
              border: brandPink,
            },
            {
              icon: <Lock className='h-12 w-12' style={{ color: brandPurple }} />,
              title: 'Seguridad sin Sacrificar Sencillez',
              desc: 'Gestionamos tus claves de forma segura para que te concentres en tus operaciones, no en la complejidad técnica.',
              border: brandPurple,
            },
            {
              icon: <LineChart className='h-12 w-12' style={{ color: brandPink }} />,
              title: 'Todo el Ecosistema Polkadot en tus Manos',
              desc: 'Realiza staking, swaps cross-chain (XCM) y más, todo guiado por nuestro agente IA de forma transparente.',
              border: brandPink,
            },
          ].map(({ icon, title, desc, border }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors'
              style={{ ['--tw-border-opacity' as any]: 0.5, borderColor: border }}
            >
              {icon}
              <h3 className='mb-2 text-xl font-bold'>{title}</h3>
              <p className='text-gray-400'>{desc}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
//  Roadmap
// ──────────────────────────────────────────────────────────────────────────────
function Roadmap() {
  const roadmapItems = [
    {
      phase: 'Disponible Ahora',
      title: 'Funciones Principales',
      features: [
        'Creación de wallet mediante chat',
        'Consulta de saldo de tokens',
        'Link a faucet para obtener tokens de prueba',
        'Transferencias on-chain',
        'Bridges cross-chain (XCM)',
        'Swaps con provedor externo',
        'Integración completa con Discord'
      ],
      status: 'current',
      color: brandPink,
      gradient: `linear-gradient(135deg, ${brandPink}, ${brandPurple})`,
    },
    {
      phase: 'En Desarrollo',
      title: 'Funcionalidades Avanzadas',
      features: [
        'Staking automático de DOT',
        'Swaps cross-chain (XCM) en el chat',
        'Gestión de nominaciones',
        'Expansión inicial a Telegram',
        'Optimización de fees'
      ],
      status: 'next',
      color: brandPurple,
      gradient: `linear-gradient(135deg, ${brandPurple}90, ${brandPink}90)`,
    },
    {
      phase: 'Próximamente',
      title: 'IA Mejorada y Expansión',
      features: [
        'Comprensión avanzada de lenguaje natural',
        'Predicción inteligente de intenciones',
        'Beta en WhatsApp',
        'Soporte para más parachains',
        'Análisis de rendimiento de portfolios',
        'Integracion con On-Ramp y Off-Ramp'
      ],
      status: 'next',
      color: `${brandPink}80`,
      gradient: `linear-gradient(135deg, ${brandPink}80, ${brandPurple}80)`,
    },
    {
      phase: 'Visión Futura',
      title: 'Consolidación y Crecimiento',
      features: [
        'Plataforma multi-mensajería completa',
        'Soporte para todo el ecosistema Polkadot',
        'Herramientas DeFi avanzadas',
        'Integración con dApps populares',
        'Comunidad global de usuarios'
      ],
      status: 'future',
      color: `${brandPurple}80`,
      gradient: `linear-gradient(135deg, ${brandPurple}70, ${brandPink}70)`,
    },
  ];

  return (
    <section id='roadmap' className='border-t border-white/10 bg-black py-24'>
      <Container>
        <header className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>Nuestra Evolución</h2>
          <p className='mt-4 text-gray-400'>De la version 1.0 a evolución tecnologica: el futuro de SubText Wallet.</p>
        </header>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-white/30 via-white/20 to-transparent hidden lg:block' />

          <div className='space-y-12 lg:space-y-16'>
            {roadmapItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`relative flex flex-col lg:flex-row lg:items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
              >
                {/* Timeline dot */}
                <div className='absolute left-1/2 top-8 -translate-x-1/2 h-6 w-6 rounded-full border-4 border-black hidden lg:block'
                  style={{ background: item.gradient }} />

                {/* Content card */}
                <div className={`flex-1 ${i % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm group hover:border-white/20 transition-all duration-300'>
                    {/* Background gradient */}
                    <div
                      className='absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300'
                      style={{ background: item.gradient }}
                    />

                    <div className='relative'>
                      {/* Phase badge */}
                      <div className='inline-flex items-center gap-2 mb-4'>
                        <span
                          className={`inline-block h-2 w-2 rounded-full ${item.status === 'current' ? 'animate-pulse' : ''
                            }`}
                          style={{ background: item.status === 'current' ? brandPink : 'rgba(255,255,255,0.4)' }}
                        />
                        <span className='text-sm font-medium text-gray-300 uppercase tracking-wider'>
                          {item.phase}
                        </span>
                      </div>

                      <h3 className='text-2xl font-bold mb-6' style={{
                        color: item.status === 'current' ? brandWhite : '#e5e7eb'
                      }}>
                        {item.title}
                      </h3>

                      {/* Features list */}
                      <ul className='space-y-3'>
                        {item.features.map((feature, idx) => (
                          <li key={idx} className='flex items-center text-gray-300'>
                            <CheckCircle2
                              className='mr-3 h-4 w-4 flex-shrink-0'
                              style={{
                                color: item.color
                              }}
                            />
                            <span className='text-sm'>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className='flex-1 hidden lg:block' />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
//  Call‑To‑Action                                                               
// ──────────────────────────────────────────────────────────────────────────────
function CallToAction({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className='border-t border-white/10 bg-black py-24'>
      <Container>
        <div
          className='mx-auto max-w-3xl rounded-2xl border border-white/10 p-8 text-center backdrop-blur-sm md:p-12 lg:p-16'
          style={{ backgroundImage: `linear-gradient(to right, ${brandPink}26, ${brandPurple}26)` }}
        >
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>¿Listo para Chatear con la Blockchain?</h2>
          <p className='mx-auto mt-4 max-w-xl text-gray-400'>
            Únete a la nueva era de la interacción con Polkadot. Simple, seguro y conversacional.
          </p>

          <ul className='mx-auto mt-8 flex max-w-xl flex-col gap-4 text-left'>
            {[
              'Maneja tus criptoactivos en Polkadot usando lenguaje natural.',
              'Olvídate de la complejidad de las seed phrases y las transacciones.',
              'Accede a staking y swaps XCM sin ser un experto.',
            ].map((item) => (
              <li key={item} className='flex items-center space-x-3'>
                <CheckCircle2 className='h-5 w-5' style={{ color: brandPink }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className='mt-8 flex justify-center'>
            <button
              onClick={onOpenModal}
              className='text-lg text-black hover:opacity-90 p-2 px-4 rounded-full flex items-center transition-opacity'
              style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}
            >
              Pedir acceso
              <ArrowRight className='ml-2 h-5 w-5' />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
//  Footer                                                                      
// ──────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className='border-t border-white/10 bg-black py-8'>
      <Container className='flex flex-col items-center justify-between gap-6 md:flex-row md:gap-0'>
        <div className='flex items-center space-x-2'>
          <img src='/logo.png' alt='SubText Wallet Logo' className='h-20 w-20' />
          <span className='font-bold'>SubText Wallet</span>
        </div>

        <p className='text-sm text-gray-400'>© {new Date().getFullYear()} SubText Wallet. Todos los derechos reservados.</p>

        <nav className='flex gap-6'>
          <Link href='#' className='text-sm text-gray-400 hover:text-[var(--brand-pink)]' style={{ '--brand-pink': brandPink } as React.CSSProperties}>
            Privacidad
          </Link>
          <Link href='#' className='text-sm text-gray-400 hover:text-[var(--brand-pink)]' style={{ '--brand-pink': brandPink } as React.CSSProperties}>
            Términos
          </Link>
        </nav>
      </Container>
    </footer>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
//  Decorative backdrop component                                               
// ──────────────────────────────────────────────────────────────────────────────
function AnimatedBackdrop() {
  return (
    <>
      <div className='absolute inset-0 overflow-hidden'>
        <svg className='absolute h-full w-full' xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <linearGradient id='gradPink' x1='1' y1='0' x2='0' y2='0'>
              <stop offset='0%' stopColor={brandPink} stopOpacity='0' />
              <stop offset='50%' stopColor={brandPink} stopOpacity='0.5' />
              <stop offset='100%' stopColor={brandPink} stopOpacity='0' />
            </linearGradient>
            <linearGradient id='gradPurple' x1='1' y1='0' x2='0' y2='0'>
              <stop offset='0%' stopColor={brandPurple} stopOpacity='0' />
              <stop offset='50%' stopColor={brandPurple} stopOpacity='0.5' />
              <stop offset='100%' stopColor={brandPurple} stopOpacity='0' />
            </linearGradient>
          </defs>
          {[
            { d: 'M 100 100 Q 300 0 500 100 T 900 100', grad: 'url(#gradPink)', delay: 0 },
            { d: 'M 0 200 Q 200 100 400 200 T 800 200', grad: 'url(#gradPurple)', delay: 0.5 },
            { d: 'M 100 600 Q 300 500 500 600 T 900 600', grad: 'url(#gradPink)', delay: 1 },
          ].map(({ d, grad, delay }, i) => (
            <motion.path
              key={i}
              d={d}
              fill='none'
              stroke={grad}
              strokeWidth='1'
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                repeatDelay: 1,
                delay,
              }}
            />
          ))}
        </svg>

        {/* Horizontal sweeping lines */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='absolute inset-0'>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: '-100%', opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: 2.5,
                delay: i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                ease: 'linear',
              }}
              className='absolute right-0'
              style={{
                top: `${15 + i * 10}%`,
                height: '1px',
                width: '100%',
                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? brandPink : brandPurple}60, transparent)`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Blurred gradient blobs */}
      <div className='absolute inset-0'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className='absolute -left-1/4 top-1/4 h-96 w-96 rounded-full blur-3xl'
          style={{ backgroundColor: `${brandPink}4D` }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className='absolute -right-1/4 top-1/2 h-96 w-96 rounded-full blur-3xl'
          style={{ backgroundColor: `${brandPurple}4D` }}
        />
      </div>
    </>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
//  Page                                                                         
// ──────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)

  return (
    <div className={`${poppins.className} min-h-screen bg-black text-white`}>
      <Navbar onOpenModal={openModal} />

      <main className='flex flex-col'>
        <Hero onOpenModal={openModal} />
        {/*<PitchAndDemo />*/}
        <Features />
        <Roadmap />
        <CallToAction onOpenModal={openModal} />
      </main>

      <Footer />
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
