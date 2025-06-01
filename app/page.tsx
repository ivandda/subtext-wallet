'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, CreditCard, LineChart, Lock, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Poppins } from 'next/font/google'

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
function Navbar() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 h-20 border-b border-white/10 bg-black/60 backdrop-blur-xl'>
      <Container className='flex h-full items-center justify-between'>
        <Link href='/' className='flex items-center space-x-3 font-bold'>
          {/* Brand logo */}
          <img src='/logo.png' alt='SubText Wallet' className='h-12 w-12' />
          <span className='text-2xl'>SubText Wallet</span>
        </Link>

        <nav className='flex items-center space-x-4'>
          {/* <Link href='/login' className='hidden text-sm hover:text-[var(--brand-pink)] sm:block' style={{ '--brand-pink': brandPink } as React.CSSProperties}>
            Iniciar Sesión
          </Link> */}
          <Button className='bg-gradient-to-r text-black hover:opacity-90' style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}>
            Comenzar
          </Button>
        </nav>
      </Container>
    </header>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
//  Hero                                                                         
// ──────────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id='hero' className='relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden pt-20'>
      <AnimatedBackdrop />

      <Container className='relative z-10 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='mx-auto max-w-3xl space-y-8'
        >
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
            Polkadot, Sin Complicaciones. Solo Conversa.
          </h1>
          <p className='mx-auto max-w-2xl text-gray-400 sm:text-xl'>
            Olvídate de la jerga técnica. Con SubText Wallet, gestiona tus activos, haz staking y swaps cross-chain usando lenguaje natural.
          </p>

          <div className='flex justify-center gap-4'>
            <Button className='text-lg text-black hover:opacity-90' style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}>
              Comenzar Ahora
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            {/* <Button variant='outline' className='border-white/10 text-lg text-white hover:bg-white/10'>
              Saber Más
            </Button> */}
          </div>
        </motion.div>
      </Container>
    </section>
  )
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
      title: 'Q1: Lanzamiento MVP',
      description: 'MVP en Discord: Creación de wallet, consulta de saldo y transferencias on-chain mediante chat.',
      color: brandWhite,
    },
    {
      title: 'Q2: Funcionalidades Avanzadas',
      description: 'Integración de Staking y Swaps XCM. Primeros pasos para la expansión a Telegram.',
      color: brandWhite,
    },
    {
      title: 'Q3: IA Mejorada y Expansión',
      description: 'Mejoras avanzadas en IA para comprensión del lenguaje natural. Optimización de fees. Beta en WhatsApp.',
      color: brandWhite,
    },
    {
      title: 'Q4: Consolidación y Crecimiento',
      description: 'Consolidación de la plataforma, soporte para más parachains y crecimiento de la comunidad de usuarios.',
      color: brandWhite,
    },
  ];

  return (
    <section id='roadmap' className='border-t border-white/10 bg-black py-24'>
      <Container>
        <header className='mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>Nuestra Hoja de Ruta</h2>
          <p className='mt-4 text-gray-400'>Los próximos pasos para SubText Wallet.</p>
        </header>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {roadmapItems.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors'
              style={{ ['--tw-border-opacity' as any]: 0.5, borderColor: item.color }}
            >
              <h3 className='mb-2 text-xl font-bold'>{item.title}</h3>
              <p className='text-gray-400'>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
//  Call‑To‑Action                                                               
// ──────────────────────────────────────────────────────────────────────────────
function CallToAction() {
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

          <Button className='mt-8 text-lg text-black hover:opacity-90' style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}>
            Únete a Nuestro Discord
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
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
          <Wallet className='h-6 w-6' style={{ color: brandPink }} />
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
  return (
    <div className={`${poppins.className} min-h-screen bg-black text-white`}>
      <Navbar />

      <main className='flex flex-col'>
        <Hero />
        <Features />
        <Roadmap />
        <CallToAction />
      </main>

      <Footer />
    </div>
  )
}
