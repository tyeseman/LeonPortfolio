"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TermsDialogProps {
  isOpen: boolean
  onClose: () => void
}

const ADMIN_PASSWORD = "Sianai4life@123"

export function TermsDialog({ isOpen, onClose }: TermsDialogProps) {
  const router = useRouter()
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
                <section>
                  <h3 className="mb-2 font-semibold text-foreground">1. Introduction</h3>
                  <p>
                    Welcome to Leon C. Tyes Portfolio. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 font-semibold text-foreground">2. Intellectual Property Rights</h3>
                  <p>
                    All content displayed on this portfolio, including but not limited to designs, graphics, text, logos, images, and audio clips, is the property of Leon C. Tyes unless otherwise stated. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 font-semibold text-foreground">3. Use License</h3>
                  <p>
                    Permission is granted to temporarily view the materials (information or software) on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 font-semibold text-foreground">4. Portfolio Content</h3>
                  <p>
                    The projects showcased in this portfolio represent work completed for various clients. Some projects may be displayed with client permission, while others may be personal or conceptual work. The level of detail shared about each project respects confidentiality agreements.
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 font-semibold text-foreground">5. Contact and Communication</h3>
                  <p>
                    When you contact through the provided email or social media links, you agree that any information shared will be used solely for the purpose of professional communication and potential collaboration.
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 font-semibold text-foreground">6. Disclaimer</h3>
                  <p>
                    The materials on this website are provided on an 'as is' basis. Leon C. Tyes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 font-semibold text-foreground">7. Limitations</h3>
                  <p>
                    In no event shall Leon C. Tyes or suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 font-semibold text-foreground">8. Revisions and Updates</h3>
                  <p>
                    The materials appearing on this website could include technical, typographical, or photographic errors. Leon C. Tyes does not warrant that any of the materials are accurate, complete or current. Changes may be made to the materials contained on the website at any time without notice.
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 font-semibold text-foreground">9. Links</h3>
                  <p>
                    This website may contain links to external sites that are not operated by Leon C. Tyes. Please be aware that there is no control over the content and practices of these sites, and cannot accept responsibility for their respective privacy policies.
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 font-semibold text-foreground">10. Governing Law</h3>
                  <p>
                    These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                  </p>
                </section>

                <p className="pt-2 text-xs text-muted-foreground/60">
                  Last updated: January 2024
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
