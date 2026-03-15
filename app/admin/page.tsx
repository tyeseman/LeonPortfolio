"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Save, Plus, Trash2, RotateCcw, 
  User, Briefcase, FolderOpen, MessageSquare, Wrench, Code, ChevronDown, ChevronUp, FileText
} from "lucide-react"
import { 
  useContent, 
  type Project, 
  type Experience, 
  type Review, 
  type Software,
  type PortfolioContent,
  type TermsSection
} from "@/context/content-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ImageUpload } from "@/components/image-upload"

// Admin authentication check
const ADMIN_PASSWORD = "Sianai4life@123"

export default function AdminDashboard() {
  const router = useRouter()
  const { content, updateContent, resetContent } = useContent()
  const [editedContent, setEditedContent] = useState<PortfolioContent>(content)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("admin-authenticated")
    if (auth !== "true") {
      router.push("/")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  // Update edited content when content changes
  useEffect(() => {
    setEditedContent(content)
  }, [content])

  // Track changes
  useEffect(() => {
    setHasChanges(JSON.stringify(editedContent) !== JSON.stringify(content))
  }, [editedContent, content])

  const handleSave = () => {
    updateContent(editedContent)
    setSaveMessage("Changes saved successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all content to defaults? This cannot be undone.")) {
      resetContent()
      setSaveMessage("Content reset to defaults!")
      setTimeout(() => setSaveMessage(""), 3000)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin-authenticated")
    router.push("/")
  }

  // Hero section handlers
  const updateHero = (field: string, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }))
  }

  // About section handlers
  const updateAbout = (field: string, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      about: { ...prev.about, [field]: value }
    }))
  }

  // Expertise handlers
  const addExpertise = () => {
    setEditedContent(prev => ({
      ...prev,
      expertise: [...prev.expertise, "New Skill"]
    }))
  }

  const updateExpertise = (index: number, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      expertise: prev.expertise.map((e, i) => i === index ? value : e)
    }))
  }

  const removeExpertise = (index: number) => {
    setEditedContent(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }))
  }

  // Software handlers
  const addSoftware = () => {
    setEditedContent(prev => ({
      ...prev,
      software: [...prev.software, { name: "New Software", icon: "" }]
    }))
  }

  const updateSoftware = (index: number, field: keyof Software, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      software: prev.software.map((s, i) => i === index ? { ...s, [field]: value } : s)
    }))
  }

  const removeSoftware = (index: number) => {
    setEditedContent(prev => ({
      ...prev,
      software: prev.software.filter((_, i) => i !== index)
    }))
  }

  // Experience handlers
  const addExperience = () => {
    setEditedContent(prev => ({
      ...prev,
      experience: [...prev.experience, { role: "New Role", company: "Company", period: "20XX — Present" }]
    }))
  }

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      experience: prev.experience.map((e, i) => i === index ? { ...e, [field]: value } : e)
    }))
  }

  const removeExperience = (index: number) => {
    setEditedContent(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }))
  }

  // Project handlers
  const addProject = () => {
    const newProject: Project = {
      title: "New Project",
      category: "Category",
      year: new Date().getFullYear().toString(),
      thumbnailImage: "",
      detailImageOne: "",
      detailImageTwo: "",
      description: "Project description",
      timeline: "X weeks",
      client: "Client Name",
      deliverables: ["Deliverable 1"]
    }
    setEditedContent(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    setEditedContent(prev => ({
      ...prev,
      projects: prev.projects.map((p, i) => i === index ? { ...p, [field]: value } : p)
    }))
  }

  const removeProject = (index: number) => {
    setEditedContent(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  // Review handlers
  const addReview = () => {
    const newReview: Review = {
      name: "Client Name",
      company: "Company",
      rating: 5,
      text: "Review text",
      avatar: "CN"
    }
    setEditedContent(prev => ({
      ...prev,
      reviews: [...prev.reviews, newReview]
    }))
  }

  const updateReview = (index: number, field: keyof Review, value: string | number) => {
    setEditedContent(prev => ({
      ...prev,
      reviews: prev.reviews.map((r, i) => i === index ? { ...r, [field]: value } : r)
    }))
  }

  const removeReview = (index: number) => {
    setEditedContent(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index)
    }))
  }

  // Terms handlers
  const updateTermsLastUpdated = (value: string) => {
    setEditedContent(prev => ({
      ...prev,
      terms: { ...prev.terms, lastUpdated: value }
    }))
  }

  const addTermsSection = () => {
    setEditedContent(prev => ({
      ...prev,
      terms: {
        ...prev.terms,
        sections: [...(prev.terms?.sections || []), { title: "New Section", content: "Section content" }]
      }
    }))
  }

  const updateTermsSection = (index: number, field: keyof TermsSection, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      terms: {
        ...prev.terms,
        sections: prev.terms.sections.map((s, i) => i === index ? { ...s, [field]: value } : s)
      }
    }))
  }

  const removeTermsSection = (index: number) => {
    setEditedContent(prev => ({
      ...prev,
      terms: {
        ...prev.terms,
        sections: prev.terms.sections.filter((_, i) => i !== index)
      }
    }))
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-sm font-semibold md:text-base">Content Dashboard</h1>
            {hasChanges && (
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary md:text-xs">
                Unsaved changes
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {saveMessage && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-emerald-500"
              >
                {saveMessage}
              </motion.span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-8 gap-1.5 text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges}
              className="h-8 gap-1.5 text-xs"
            >
              <Save className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="h-8 text-xs text-muted-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-56px)] w-full overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="p-4 md:p-6">
            <Tabs defaultValue="hero" className="w-full">
          <TabsList className="mb-4 flex h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
            <TabsTrigger value="hero" className="gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="h-3 w-3" />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="h-3 w-3" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="expertise" className="gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Wrench className="h-3 w-3" />
              <span className="hidden sm:inline">Expertise</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Briefcase className="h-3 w-3" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FolderOpen className="h-3 w-3" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="h-3 w-3" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="software" className="gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Code className="h-3 w-3" />
              <span className="hidden sm:inline">Software</span>
            </TabsTrigger>
            <TabsTrigger value="terms" className="gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="h-3 w-3" />
              <span className="hidden sm:inline">Terms</span>
            </TabsTrigger>
          </TabsList>

          {/* Hero Tab */}
          <TabsContent value="hero" className="mt-0">
            <div className="rounded-xl border border-border bg-card p-4 md:p-6">
              <h2 className="mb-4 text-sm font-semibold md:text-base">Hero Section</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs">Name</Label>
                  <Input
                    id="name"
                    value={editedContent.hero.name}
                    onChange={(e) => updateHero("name", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs">Title</Label>
                  <Input
                    id="title"
                    value={editedContent.hero.title}
                    onChange={(e) => updateHero("title", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="tagline" className="text-xs">Tagline</Label>
                  <Textarea
                    id="tagline"
                    value={editedContent.hero.tagline}
                    onChange={(e) => updateHero("tagline", e.target.value)}
                    rows={2}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileImage" className="text-xs">Profile Image</Label>
                  <ImageUpload
                    category="hero"
                    label="Profile Picture"
                    currentImage={editedContent.hero.profileImage}
                    onImageUpload={(path) => updateHero("profileImage", path)}
                  />
                  <Input
                    id="profileImage"
                    value={editedContent.hero.profileImage}
                    onChange={(e) => updateHero("profileImage", e.target.value)}
                    className="h-9 text-sm"
                    placeholder="Or paste URL..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input
                    id="email"
                    value={editedContent.hero.email}
                    onChange={(e) => updateHero("email", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl" className="text-xs">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    value={editedContent.hero.linkedinUrl}
                    onChange={(e) => updateHero("linkedinUrl", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagramUrl" className="text-xs">Instagram URL</Label>
                  <Input
                    id="instagramUrl"
                    value={editedContent.hero.instagramUrl}
                    onChange={(e) => updateHero("instagramUrl", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterUrl" className="text-xs">Twitter URL</Label>
                  <Input
                    id="twitterUrl"
                    value={editedContent.hero.twitterUrl}
                    onChange={(e) => updateHero("twitterUrl", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="mt-0">
            <div className="rounded-xl border border-border bg-card p-4 md:p-6">
              <h2 className="mb-4 text-sm font-semibold md:text-base">About Section</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio" className="text-xs">Bio</Label>
                  <Textarea
                    id="bio"
                    value={editedContent.about.bio}
                    onChange={(e) => updateAbout("bio", e.target.value)}
                    rows={3}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="secondaryBio" className="text-xs">Secondary Bio</Label>
                  <Textarea
                    id="secondaryBio"
                    value={editedContent.about.secondaryBio}
                    onChange={(e) => updateAbout("secondaryBio", e.target.value)}
                    rows={3}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience" className="text-xs">Years Experience</Label>
                  <Input
                    id="yearsExperience"
                    value={editedContent.about.yearsExperience}
                    onChange={(e) => updateAbout("yearsExperience", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectsCompleted" className="text-xs">Projects Completed</Label>
                  <Input
                    id="projectsCompleted"
                    value={editedContent.about.projectsCompleted}
                    onChange={(e) => updateAbout("projectsCompleted", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalClients" className="text-xs">Total Clients</Label>
                  <Input
                    id="totalClients"
                    value={editedContent.about.totalClients}
                    onChange={(e) => updateAbout("totalClients", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Expertise Tab */}
          <TabsContent value="expertise" className="mt-0">
            <div className="rounded-xl border border-border bg-card p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold md:text-base">Expertise</h2>
                <Button size="sm" onClick={addExpertise} className="h-8 gap-1.5 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {editedContent.expertise.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={skill}
                      onChange={(e) => updateExpertise(index, e.target.value)}
                      className="h-9 text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExpertise(index)}
                      className="h-9 w-9 shrink-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="mt-0">
            <div className="rounded-xl border border-border bg-card p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold md:text-base">Career Timeline</h2>
                <Button size="sm" onClick={addExperience} className="h-8 gap-1.5 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </Button>
              </div>
              <Accordion type="multiple" className="space-y-2">
                {editedContent.experience.map((exp, index) => (
                  <AccordionItem key={index} value={`exp-${index}`} className="rounded-lg border border-border bg-secondary/30 px-3">
                    <AccordionTrigger className="py-3 text-sm hover:no-underline">
                      <span className="text-left">{exp.role} at {exp.company}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Role</Label>
                          <Input
                            value={exp.role}
                            onChange={(e) => updateExperience(index, "role", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(index, "company", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Period</Label>
                          <Input
                            value={exp.period}
                            onChange={(e) => updateExperience(index, "period", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(index)}
                        className="mt-3 h-7 gap-1 text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-0">
            <div className="rounded-xl border border-border bg-card p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold md:text-base">Recent Work</h2>
                <Button size="sm" onClick={addProject} className="h-8 gap-1.5 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Add Project
                </Button>
              </div>
              <Accordion type="multiple" className="space-y-2">
                {editedContent.projects.map((project, index) => (
                  <AccordionItem key={index} value={`project-${index}`} className="rounded-lg border border-border bg-secondary/30 px-3">
                    <AccordionTrigger className="py-3 text-sm hover:no-underline">
                      <span className="text-left">{project.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Title</Label>
                          <Input
                            value={project.title}
                            onChange={(e) => updateProject(index, "title", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Category</Label>
                          <Input
                            value={project.category}
                            onChange={(e) => updateProject(index, "category", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Year</Label>
                          <Input
                            value={project.year}
                            onChange={(e) => updateProject(index, "year", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Timeline</Label>
                          <Input
                            value={project.timeline}
                            onChange={(e) => updateProject(index, "timeline", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Client</Label>
                          <Input
                            value={project.client}
                            onChange={(e) => updateProject(index, "client", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold">Thumbnail Image (shown in Recent Work & Selected Work list)</Label>
                          <ImageUpload
                            category="projects"
                            label="Thumbnail Image"
                            currentImage={project.thumbnailImage}
                            onImageUpload={(path) => updateProject(index, "thumbnailImage", path)}
                          />
                          <Input
                            value={project.thumbnailImage}
                            onChange={(e) => updateProject(index, "thumbnailImage", e.target.value)}
                            className="h-8 text-sm"
                            placeholder="Or paste URL..."
                          />
                          {project.thumbnailImage && (
                            <div className="h-16 w-24 overflow-hidden rounded-lg border border-border bg-secondary/50">
                              <img 
                                src={project.thumbnailImage} 
                                alt="Thumbnail preview"
                                className="h-full w-full object-cover"
                                crossOrigin="anonymous"
                              />
                            </div>
                          )}
                          <p className="text-[10px] text-muted-foreground">This is the main preview image shown in project cards.</p>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold">Detail Image One (shown in expanded project view)</Label>
                          <ImageUpload
                            category="projects"
                            label="Detail Image One"
                            currentImage={project.detailImageOne}
                            onImageUpload={(path) => updateProject(index, "detailImageOne", path)}
                          />
                          <Input
                            value={project.detailImageOne}
                            onChange={(e) => updateProject(index, "detailImageOne", e.target.value)}
                            className="h-8 text-sm"
                            placeholder="Or paste URL..."
                          />
                          {project.detailImageOne && (
                            <div className="h-16 w-24 overflow-hidden rounded-lg border border-border bg-secondary/50">
                              <img 
                                src={project.detailImageOne} 
                                alt="Detail image one preview"
                                className="h-full w-full object-cover"
                                crossOrigin="anonymous"
                              />
                            </div>
                          )}
                          <p className="text-[10px] text-muted-foreground">First image shown inside expanded project details.</p>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-semibold">Detail Image Two (shown in expanded project view)</Label>
                          <ImageUpload
                            category="projects"
                            label="Detail Image Two"
                            currentImage={project.detailImageTwo}
                            onImageUpload={(path) => updateProject(index, "detailImageTwo", path)}
                          />
                          <Input
                            value={project.detailImageTwo}
                            onChange={(e) => updateProject(index, "detailImageTwo", e.target.value)}
                            className="h-8 text-sm"
                            placeholder="Or paste URL..."
                          />
                          {project.detailImageTwo && (
                            <div className="h-16 w-24 overflow-hidden rounded-lg border border-border bg-secondary/50">
                              <img 
                                src={project.detailImageTwo} 
                                alt="Detail image two preview"
                                className="h-full w-full object-cover"
                                crossOrigin="anonymous"
                              />
                            </div>
                          )}
                          <p className="text-[10px] text-muted-foreground">Second image shown inside expanded project details.</p>
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <Label className="text-xs">Description</Label>
                          <Textarea
                            value={project.description}
                            onChange={(e) => updateProject(index, "description", e.target.value)}
                            rows={2}
                            className="text-sm"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <Label className="text-xs">Deliverables (comma separated)</Label>
                          <Input
                            value={project.deliverables.join(", ")}
                            onChange={(e) => updateProject(index, "deliverables", e.target.value.split(", ").filter(d => d.trim()))}
                            className="h-8 text-sm"
                          />
                        </div>

                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProject(index)}
                        className="mt-3 h-7 gap-1 text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove Project
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-0">
            <div className="rounded-xl border border-border bg-card p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold md:text-base">Client Reviews</h2>
                <Button size="sm" onClick={addReview} className="h-8 gap-1.5 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Add Review
                </Button>
              </div>
              <Accordion type="multiple" className="space-y-2">
                {editedContent.reviews.map((review, index) => (
                  <AccordionItem key={index} value={`review-${index}`} className="rounded-lg border border-border bg-secondary/30 px-3">
                    <AccordionTrigger className="py-3 text-sm hover:no-underline">
                      <span className="text-left">{review.name} - {review.company}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Name</Label>
                          <Input
                            value={review.name}
                            onChange={(e) => updateReview(index, "name", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Company</Label>
                          <Input
                            value={review.company}
                            onChange={(e) => updateReview(index, "company", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Avatar Initials</Label>
                          <Input
                            value={review.avatar}
                            onChange={(e) => updateReview(index, "avatar", e.target.value)}
                            className="h-8 text-sm"
                            maxLength={2}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Rating (1-5)</Label>
                          <Input
                            type="number"
                            min={1}
                            max={5}
                            value={review.rating}
                            onChange={(e) => updateReview(index, "rating", parseInt(e.target.value) || 5)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <Label className="text-xs">Review Text</Label>
                          <Textarea
                            value={review.text}
                            onChange={(e) => updateReview(index, "text", e.target.value)}
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeReview(index)}
                        className="mt-3 h-7 gap-1 text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove Review
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* Software Tab */}
          <TabsContent value="software" className="mt-0">
            <div className="rounded-xl border border-border bg-card p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold md:text-base">Software & Tools</h2>
                <Button size="sm" onClick={addSoftware} className="h-8 gap-1.5 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </Button>
              </div>
              <div className="space-y-3">
                {editedContent.software.map((tool, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2 md:grid-cols-2">
                      <Input
                        placeholder="Name"
                        value={tool.name}
                        onChange={(e) => updateSoftware(index, "name", e.target.value)}
                        className="h-9 text-sm"
                      />
                      <Input
                        placeholder="Icon URL"
                        value={tool.icon}
                        onChange={(e) => updateSoftware(index, "icon", e.target.value)}
                        className="h-9 text-sm"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSoftware(index)}
                      className="h-9 w-9 shrink-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Terms & Conditions Tab */}
          <TabsContent value="terms" className="mt-0">
            <div className="rounded-xl border border-border bg-card p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold md:text-base">Terms & Conditions</h2>
                <Button size="sm" onClick={addTermsSection} className="h-8 gap-1.5 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Add Section
                </Button>
              </div>
              
              <div className="mb-4 space-y-2">
                <Label htmlFor="lastUpdated" className="text-xs">Last Updated</Label>
                <Input
                  id="lastUpdated"
                  value={editedContent.terms?.lastUpdated || ""}
                  onChange={(e) => updateTermsLastUpdated(e.target.value)}
                  placeholder="e.g., January 2024"
                  className="h-9 text-sm md:w-1/2"
                />
              </div>

              <Accordion type="multiple" className="space-y-2">
                {editedContent.terms?.sections?.map((section, index) => (
                  <AccordionItem key={index} value={`terms-${index}`} className="rounded-lg border border-border bg-secondary/30 px-3">
                    <AccordionTrigger className="py-3 text-sm hover:no-underline">
                      <span className="text-left">{section.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Section Title</Label>
                          <Input
                            value={section.title}
                            onChange={(e) => updateTermsSection(index, "title", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Content</Label>
                          <Textarea
                            value={section.content}
                            onChange={(e) => updateTermsSection(index, "content", e.target.value)}
                            rows={4}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTermsSection(index)}
                        className="mt-3 h-7 gap-1 text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove Section
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
