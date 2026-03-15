import { useState } from "react"
import { Upload, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ImageUploadProps {
  onImageUpload: (path: string) => void
  currentImage?: string
  category: string
  label?: string
}

export function ImageUpload({ onImageUpload, currentImage, category, label = "Upload Image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError("")
    setSuccess(false)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("category", category)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Upload failed")
      }

      const data = await response.json()
      onImageUpload(data.path)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
      setTimeout(() => setError(""), 3000)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium">{label}</label>
        {currentImage && !currentImage.includes("http") && (
          <span className="text-[10px] text-emerald-500">Local upload</span>
        )}
      </div>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
          id={`upload-${category}`}
        />
        <label htmlFor={`upload-${category}`} className="block">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full h-9 text-xs gap-1.5 cursor-pointer"
            disabled={isUploading}
            asChild
          >
            <div>
              {isUploading ? (
                <>
                  <div className="h-3 w-3 animate-spin rounded-full border border-primary border-t-transparent" />
                  Uploading...
                </>
              ) : success ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Uploaded!
                </>
              ) : error ? (
                <>
                  <X className="h-3.5 w-3.5 text-destructive" />
                  Error
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  Choose Image
                </>
              )}
            </div>
          </Button>
        </label>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive"
        >
          {error}
        </motion.p>
      )}
      {currentImage && (
        <div className="relative inline-block rounded-lg overflow-hidden border border-border">
          <img
            src={currentImage}
            alt="Preview"
            className="h-20 w-20 object-cover"
          />
        </div>
      )}
    </div>
  )
}
