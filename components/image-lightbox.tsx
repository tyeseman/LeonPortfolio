'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ImageLightboxProps {
  imageUrl: string | null
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({ imageUrl, isOpen, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !imageUrl) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image view"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close image enlargement"
      >
        <X size={24} />
      </button>
      <div
        className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Enlarged project image"
          className="w-full h-full object-contain"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  )
}
