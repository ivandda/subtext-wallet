'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, CheckCircle2 } from 'lucide-react'

interface RequestAccessModalProps {
  isOpen: boolean
  onClose: () => void
}

const brandPink = '#E6007A'
const brandPurple = '#A100FF'

export function RequestAccessModal({ isOpen, onClose }: RequestAccessModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: ''
  })

  // Reset state when closing
  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep('form')
      setFormData({ name: '', email: '', interest: '' })
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Form submitted:', formData)
    setIsLoading(false)
    setStep('success')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl"
            >
              {/* Gradient Border Trick */}
              <div
                className="absolute inset-x-0 top-0 h-1 w-full"
                style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}
              />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8">
                {step === 'form' ? (
                  <>
                    <h2 className="mb-2 text-2xl font-bold text-white">Solicitar Acceso</h2>
                    <p className="mb-6 text-gray-400">
                      Déjanos tus datos y te contactaremos para darte acceso a la beta cerrada de SubText Wallet.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#E6007A]"
                          placeholder="Tu nombre"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#E6007A]"
                          placeholder="tu@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-gray-300">
                          ¿Qué te interesa de Polkadot? <span className="text-gray-500">(Opcional)</span>
                        </label>
                        <textarea
                          id="interest"
                          rows={3}
                          value={formData.interest}
                          onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#E6007A]"
                          placeholder="Me interesa el staking, DeFi, NFTs..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-6 flex w-full items-center justify-center rounded-xl py-3 text-base font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        style={{ backgroundImage: `linear-gradient(to right, ${brandPink}, ${brandPurple})` }}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          'Solicitar Acceso'
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div
                      className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/5"
                    >
                      <CheckCircle2 className="h-10 w-10 text-[#E6007A]" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-white">¡Solicitud Recibida!</h3>
                    <p className="mb-8 max-w-sm text-gray-400">
                      Hemos recibido tus datos correctamente. Te contactaremos pronto con las instrucciones de acceso.
                    </p>
                    <button
                      onClick={handleClose}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Entendido
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
