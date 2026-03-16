import { Input } from "@/components/ui/input"

interface ImageUploadProps {
  onImageUpload: (path: string) => void
  currentImage?: string
  category: string
  label?: string
  fieldName?: string
}

export function ImageUpload({ onImageUpload, currentImage, label = "Image Path" }: ImageUploadProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium">{label}</label>
        {currentImage && (
          <span className="text-[10px] text-emerald-500">Linked</span>
        )}
      </div>
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="/projects/image.jpg"
          value={currentImage || ""}
          onChange={(e) => onImageUpload(e.target.value)}
          className="h-8 text-sm"
        />
        <p className="text-[10px] text-muted-foreground">Enter the path to an image file in the public folder (e.g., /projects/image.jpg)</p>
      </div>
      {currentImage && (
        <div className="relative inline-block rounded-lg overflow-hidden border border-border bg-secondary/50">
          <img
            src={currentImage}
            alt="Preview"
            className="h-20 w-20 object-cover"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23333' width='80' height='80'/%3E%3Ctext x='40' y='40' font-size='12' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3EImage not found%3C/text%3E%3C/svg%3E"
            }}
          />
        </div>
      )}
    </div>
  )
}
