"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useContent } from "@/context/content-context"

interface TermsDialogProps {
  isOpen: boolean
  onClose: () => void
}

const ADMIN_PASSWORD = "Sianai4life@123"

export function TermsDialog({ isOpen, onClose }: TermsDialogProps) {
  const router = useRouter()
  const { content } = useContent()
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAdminLogin = async () => {
    setError("")
    setIsLoading(true)
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-authenticated", "true")
      router.push("/admin")
    } else {
      setError("Invalid password")
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setShowAdminLogin(false)
    setPassword("")
    setError("")
    onClose()
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
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 z-50 m-auto flex h-[calc(100vh-2rem)] max-h-[600px] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-6 md:py-4">
              <h2 className="text-base font-semibold md:text-lg">Terms & Conditions</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
              <div className="space-y-4 text-sm text-muted-foreground">
                {content.terms?.sections?.map((section, index) => (
                  <section key={index}>
                    <h3 className="mb-2 font-semibold text-foreground">{section.title}</h3>
                    <p>{section.content}</p>
                  </section>
                ))}

                <p className="pt-2 text-xs text-muted-foreground/60">
                  Last updated: {content.terms?.lastUpdated || "January 2024"}
                </p>
              </div>
            </div>
            
            {/* Footer with Hidden Admin Access */}
            <div className="border-t border-border px-4 py-3 md:px-6 md:py-4">
              <AnimatePresence mode="wait">
                {!showAdminLogin ? (
                  <motion.div
                    key="footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between"
                  >
                    <p className="text-xs text-muted-foreground">
                      By using this website, you agree to these terms.
                    </p>
                    <button
                      onClick={() => setShowAdminLogin(true)}
                      className="rounded-full p-1.5 text-muted-foreground/30 transition-colors hover:bg-secondary hover:text-muted-foreground"
                      aria-label="Admin access"
                    >
                      <User className="h-4 w-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="admin-login"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Admin Access</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                            setError("")
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAdminLogin()
                            }
                          }}
                          className="h-9 pr-9 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <Button
                        size="sm"
                        onClick={handleAdminLogin}
                        disabled={isLoading || !password}
                        className="h-9"
                      >
                        {isLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        ) : (
                          "Login"
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowAdminLogin(false)
                          setPassword("")
                          setError("")
                        }}
                        className="h-9"
                      >
                        Cancel
                      </Button>
                    </div>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-destructive"
                      >
                        {error}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
