"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ImageLightboxProps {
  imageUrl: string
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({ imageUrl, isOpen, onClose }: ImageLightboxProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[90vh] max-w-4xl w-full flex items-center justify-center"
          >
            <img
              src={imageUrl}
              alt="Preview"
              className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full bg-background/80 p-2 hover:bg-background transition-colors"
              aria-label="Close preview"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
