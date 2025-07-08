"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {
    Download,
    Mail,
    Phone,
    Github,
    Linkedin,
    ExternalLink,
    Trophy,
    Briefcase,
    Calendar,
    MapPin,
    ChevronRight,
    Eye,
    X,
    ExternalLinkIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {useEffect, useState} from "react"
import { experiences } from "@/data/experiences";
import { projects } from "@/data/projects";
import { Certificate, certificates } from "@/data/certificates";
import { getTechColor, skillsData } from "@/data/tech-skills"

export default function ResumeLanding() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
  const [aboutTextVisible, setAboutTextVisible] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null)
  const [hoveredCertificate, setHoveredCertificate] = useState<number | null>(null)
  const [zoomedCertificate, setZoomedCertificate] = useState<Certificate | null>(null)

    const aboutTexts = [
        "I'm an impact-driven Software Engineer with over 5 years of experience building scalable digital solutions across finance, e-commerce, and logistics. Specializing in full-stack development, cloud infrastructure, database architecture, and system optimization, I consistently deliver technologies that enhance performance, increase efficiency, and reduce operational costs. \n",
        "I recently completed my Master of Engineering in Software Engineering with a Graduate Certification in Cloud Engineering from the University of Maryland, where I honed my skills in modern web technologies and user experience design. \n",
        "Outside of coding, I enjoy exploring new technologies, contributing to open-source projects, and actively engaging with the developer community through blog posts and speaking engagements. \n",
        "I believe in writing clean, maintainable code and creating applications that not only function effectively but also deliver exceptional user experiences. I am committed to continuous learning and passionate about using technology to solve real-world problems. \n",
    ]

    useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      setScrollY(scrolled)

      // Improved section detection for navigation
      const sections = [
        "hero",
        "about",
        "education",
        "experience",
        "skills",
        "certifications",
        "achievements",
        "projects",
        "contact",
      ]

      // Check which section is currently most visible
      let currentSection = "hero"

      // Special handling for hero and about sections (parallax sections)
      if (scrolled < window.innerHeight * 0.8) {
        currentSection = "hero"
      } else if (scrolled < window.innerHeight * 1.5) {
        currentSection = "about"
      } else {
        // For normal sections, use intersection logic
        for (let i = sections.length - 1; i >= 2; i--) {
          // Start from index 2 (education)
          const element = document.getElementById(sections[i])
          if (element) {
            const rect = element.getBoundingClientRect()
            const elementTop = rect.top
            const elementHeight = rect.height

            // Consider section active if it's in the top half of the viewport
            if (elementTop <= window.innerHeight / 2 && elementTop + elementHeight > window.innerHeight / 2) {
              currentSection = sections[i]
              break
            }
          }
        }
      }

      setActiveSection(currentSection)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Trigger typing effect when about section comes into view
    const aboutElement = document.getElementById("about")
    if (aboutElement && !aboutTextVisible) {
      const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              setAboutTextVisible(true)
              let currentTextIndex = 0
              let currentCharIndex = 0
              let currentText = ""

              const typeText = () => {
                if (currentTextIndex < aboutTexts.length) {
                  if (currentCharIndex < aboutTexts[currentTextIndex].length) {
                    currentText += aboutTexts[currentTextIndex][currentCharIndex]
                    setTypingText(currentText + "|")
                    currentCharIndex++
                    setTimeout(typeText, 20)
                  } else {
                    currentText += " "
                    currentTextIndex++
                    currentCharIndex = 0
                    if (currentTextIndex < aboutTexts.length) {
                      setTimeout(typeText, 500)
                    } else {
                      setTypingText(currentText)
                    }
                  }
                }
              }

              typeText()
              observer.disconnect()
            }
          },
          { threshold: 0.5 },
      )

      observer.observe(aboutElement)
      return () => observer.disconnect()
    }
  }, [aboutTextVisible])

    // Handle escape key to close zoom modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && zoomedCertificate) {
                setZoomedCertificate(null)
            }
        }

        if (zoomedCertificate) {
            document.addEventListener("keydown", handleEscape)
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [zoomedCertificate])

    // Safely get a non-zero viewport height to avoid NaN in style math
    const vh = () => {
        if (typeof window === "undefined") return 1
        return Math.max(window.innerHeight, 1) // never 0
    }

  // Calculate zoom effect for profile image
  const getImageZoom = () => {
        const maxScroll = vh() * 1.5
    const progress = Math.min(scrollY / maxScroll, 1)
    return 1 + progress * 3
  }

  // Calculate opacity for hero content
  const getHeroOpacity = () => {
        const fadeStart = vh() * 0.3
        const fadeEnd = vh() * 0.8
        if (fadeStart === fadeEnd) return 1
    if (scrollY < fadeStart) return 1
    if (scrollY > fadeEnd) return 0
        const opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)
        return Math.max(0, Math.min(1, opacity))
  }

  // About section transition - Fade out when scrolling past
  const getAboutTransition = () => {
        const startPoint = vh() * 0.5
        const duration = vh() * 0.8
        const fadeOutStart = vh() * 1.2 // Start fading out earlier
        const fadeOutEnd = vh() * 1.4 // Complete fade out earlier

        let opacity = 0
        if (duration !== 0 && scrollY > startPoint) {
            opacity = Math.min((scrollY - startPoint) / duration, 1)
        }

        // Apply fade out effect
        if (scrollY > fadeOutStart && fadeOutEnd !== fadeOutStart) {
            const fadeOutProgress = (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart)
            opacity = opacity * (1 - Math.min(fadeOutProgress, 1))
    }

        // Ensure opacity is always a number between 0 and 1
        opacity = Math.max(0, Math.min(1, opacity))

    const translateY = Math.max(50 - (scrollY - startPoint) / 15, 0)
        return {
            opacity: opacity,
            translateY: Math.max(0, translateY),
        }
  }

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "about") {
      // For About section, scroll to a position where it becomes visible
      window.scrollTo({
        top: window.innerHeight * 0.8,
        behavior: "smooth",
      })
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

    const handleZoomCertificate = (certificate: Certificate) => {
        setZoomedCertificate(certificate)
    }

    const closeZoomModal = () => {
        setZoomedCertificate(null)
    }

  return (
      <div className="min-h-screen bg-black text-white relative">
        {/* Unified Animated Background Elements - Alternating Up/Down Movement */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-1">
          <div
              className="absolute top-1/4 -left-4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01) * 50}px) translateX(${scrollY * 0.1}px)`,
                transition: "transform 0.1s ease-out",
              }}
          />
          <div
              className="absolute top-3/4 -right-4 w-[500px] h-[500px] bg-blue-500/35 rounded-full blur-3xl"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01 + Math.PI) * 60}px) translateX(${scrollY * -0.1}px)`,
                transition: "transform 0.1s ease-out",
              }}
          />
          <div
              className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl"
              style={{
                transform: `translate(-50%, -50%) translateY(${Math.sin(scrollY * 0.008) * 40}px) rotate(${scrollY * 0.1}deg)`,
                transition: "transform 0.1s ease-out",
              }}
          />
          <div
              className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-2xl"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.012 + Math.PI) * 45}px) translateX(${scrollY * 0.15}px)`,
                transition: "transform 0.1s ease-out",
              }}
          />
          <div
              className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/28 rounded-full blur-3xl"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.009) * 55}px) translateX(${scrollY * -0.04}px)`,
                transition: "transform 0.1s ease-out",
              }}
          />
          <div
              className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-violet-500/25 rounded-full blur-2xl"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.011 + Math.PI) * 35}px) rotate(${scrollY * -0.03}deg)`,
                transition: "transform 0.1s ease-out",
              }}
          />
          <div
              className="absolute top-10 left-10 w-48 h-48 bg-emerald-500/22 rounded-full blur-2xl"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.013) * 30}px) translateX(${scrollY * 0.08}px)`,
                transition: "transform 0.1s ease-out",
              }}
          />
          <div
              className="absolute bottom-10 right-10 w-56 h-56 bg-rose-500/28 rounded-full blur-2xl"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.007 + Math.PI) * 50}px) translateX(${scrollY * -0.06}px)`,
                transition: "transform 0.1s ease-out",
              }}
          />
        </div>

            {/* Certificate Zoom Modal */}
            {zoomedCertificate && (
                <div
                    className="fixed inset-0 backdrop-blur-md bg-black/50 z-[100] flex items-center justify-center p-4"
                    onClick={closeZoomModal}
                >
                    <div className="relative max-w-4xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="absolute -top-12 right-0 bg-white/10 border-white/20 text-white hover:bg-white/20 z-10"
                            onClick={closeZoomModal}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Close
                        </Button>

                        {/* Certificate Image */}
                        <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
                            <Image
                                src={zoomedCertificate.imageUrl || "/placeholder.svg"}
                                alt={`${zoomedCertificate.title} Certificate`}
                                width={800}
                                height={600}
                                className="w-full h-auto object-contain max-h-[70vh]"
                                priority
                            />
                        </div>

                        {/* Certificate Info */}
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-semibold text-white mb-2">{zoomedCertificate.title}</h3>
                            <p className="text-purple-300 mb-1">{zoomedCertificate.issuer}</p>
                            <p className="text-gray-400 text-sm">
                                Issued: {zoomedCertificate.date} | Valid until: {zoomedCertificate.validUntil}
                            </p>
                        </div>
                    </div>
                </div>
            )}

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 border-b border-white/10 backdrop-blur-md bg-black/30 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Rishabh Goel
            </h1>
            <nav className="hidden md:flex space-x-4">
              <button
                  onClick={() => scrollToSection("hero")}
                  className={`transition-colors text-sm ${
                      activeSection === "hero" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                Home
              </button>
              <button
                  onClick={() => scrollToSection("about")}
                  className={`transition-colors text-sm ${
                      activeSection === "about" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                About
              </button>
              <button
                  onClick={() => scrollToSection("education")}
                  className={`transition-colors text-sm ${
                      activeSection === "education" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                Education
              </button>
              <button
                  onClick={() => scrollToSection("experience")}
                  className={`transition-colors text-sm ${
                      activeSection === "experience" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                Experience
              </button>
              <button
                  onClick={() => scrollToSection("skills")}
                  className={`transition-colors text-sm ${
                      activeSection === "skills" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                Skills
              </button>
              <button
                  onClick={() => scrollToSection("certifications")}
                  className={`transition-colors text-sm ${
                      activeSection === "certifications" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                Certifications
              </button>
              {/*<button
                  onClick={() => scrollToSection("achievements")}
                  className={`transition-colors text-sm ${
                      activeSection === "achievements" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                Achievements
              </button> */}
              <button
                  onClick={() => scrollToSection("projects")}
                  className={`transition-colors text-sm ${
                      activeSection === "projects" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                Projects
              </button>
              <button
                  onClick={() => scrollToSection("contact")}
                  className={`transition-colors text-sm ${
                      activeSection === "contact" ? "text-purple-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                Contact
              </button>
            </nav>
            <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white bg-transparent text-xs"
                onClick={() => {
                    const link = document.createElement("a")
                    link.href = "/Rishabh Goel.pdf"
                    link.download = "Rishabh Goel.pdf"
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                }}
            >
              <Download className="w-3 h-3 mr-1" />
              Resume
            </Button>
          </div>
        </header>

        {/* Hero Section with Zoom Effect */}
        <section id="hero" className="h-[200vh] relative">
          {/* Fixed positioned profile image with zoom effect */}
          <div className="fixed inset-0 flex items-center justify-center z-10" style={{ opacity: getHeroOpacity() }}>
            <div
                className="relative"
                style={{
                  transform: `scale(${getImageZoom()})`,
                  transformOrigin: "center center",
                  opacity: 0.9,
                }}
            >
              <Image
                  src="/images/profile.jpeg"
                  alt="Rishabh Goel - Profile"
                  width={300}
                  height={300}
                  className="rounded-2xl shadow-2xl border-4 border-white/30 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl opacity-100" />
            </div>
          </div>

          {/* Hero Content that fades out */}
          <div
              className="fixed inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
              style={{ opacity: getHeroOpacity() }}
          >
            <div className="container mx-auto px-4 text-center space-y-8">
              {/* Heading at the top */}
              <div className="space-y-4" style={{ marginBottom: "200px" }}>
                <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Full Stack Developer
                </span>
                </h2>
              </div>

              {/* Summary text - Positioned below the profile image */}
              <div className="space-y-6 max-w-2xl mx-auto" style={{ marginTop: "200px" }}>
                <p className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Passionate about creating exceptional digital experiences with modern technologies. 5+ years of
                  experience building scalable web applications.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                  <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                      onClick={() => scrollToSection("contact")}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Button>
                  <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 text-white"
                      onClick={() => scrollToSection("projects")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Portfolio
                  </Button>
                </div>

                {/* Social links */}
                <div className="flex justify-center space-x-4 pt-4 pointer-events-auto">
                  <Link href="https://github.com/rgoel22" className="text-gray-400 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </Link>
                  <Link href="https://www.linkedin.com/in/rishabh-goel22/" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section with Transition Effect - Fades Out */}
        <section id="about" className="fixed inset-0 flex items-center justify-center z-25 pointer-events-none">
          <div
              className="container mx-auto px-4"
              style={{
                opacity: getAboutTransition().opacity,
                transform: `translateY(${getAboutTransition().translateY}px)`,
              }}
          >
            <div className="max-w-4xl mx-auto text-center pointer-events-auto">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                About Me
              </h3>
              <div className="space-y-4 text-white-300 mb-12">
                {aboutTextVisible ? (
                    <p className="whitespace-pre-line leading-relaxed">{typingText}</p>
                ) : (
                    <div className="h-32 flex items-center justify-center">
                      <div className="animate-pulse text-gray-500">Loading...</div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Minimal spacer */}
        <div className="h-[20vh]"></div>

        {/* Normal Sections Start Here - Dark Background with Animated Background Visible */}
          <div className="relative z-30 bg-black/40 backdrop-blur-sm min-h-screen">
              {/* Education Section */}
              <section id="education" className="py-20 relative z-10">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                              Education
                          </h3>
                          <p className="text-gray-300 max-w-2xl mx-auto">
                              Academic foundation and continuous learning journey in computer science and technology.
                          </p>
                      </div>

                      <div className="max-w-6xl mx-auto">
                          <div className="grid lg:grid-cols-2 gap-8">
                              {/* Master's Degree */}
                              <Card
                                  className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                                  <CardContent className="p-8">
                                      <div className="flex items-start space-x-4 mb-6">
                                          <div
                                              className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 p-2">
                                              <Image
                                                  src="/images/umd.png"
                                                  alt="University of Maryland Logo"
                                                  width={48}
                                                  height={48}
                                                  className="object-contain"
                                              />
                                          </div>
                                          <div className="flex-1">
                                              <h4 className="font-bold text-white text-xl mb-2">Master of
                                                  Engineering</h4>
                                              <p className="text-purple-300 font-medium mb-3">Software Engineering</p>
                                              <p className="text-purple-300 font-medium mb-3">Graduate Certification in
                                                  Cloud Engineering</p>
                                              <p className="text-gray-300 mb-2">University of Maryland, College Park</p>
                                              <div
                                                  className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-400">
                                                  <div className="flex items-center">
                                                      <Calendar className="w-4 h-4 mr-1"/>
                                                      Aug 2023 - May 2025
                                                  </div>
                                                  <div className="flex items-center">
                                                      <span className="text-yellow-400 mr-1">⭐</span>
                                                      GPA: 3.89/4.0
                                                  </div>
                                              </div>
                                          </div>
                                      </div>

                                      <div>
                                          <h5 className="font-semibold text-white mb-3">Key Courses:</h5>
                                          <div className="grid grid-cols-2 gap-2">
                                              <Badge
                                                  className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                  Cloud Computing
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                  Reverse Software Engineering
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                  Data Structures & Algorithms
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                  Data Storage & Databases
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                  Software Design & Implementation
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                  Virtualization and Container Technologies
                                              </Badge>
                                          </div>
                                      </div>
                                  </CardContent>
                              </Card>

                              {/* Bachelor's Degree */}
                              <Card
                                  className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                                  <CardContent className="p-8">
                                      <div className="flex items-start space-x-4 mb-6">
                                          <div
                                              className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 p-2">
                                              <Image
                                                  src="/images/bvp.png"
                                                  alt="Bharati Vidyapeeth Logo"
                                                  width={48}
                                                  height={48}
                                                  className="object-contain"
                                              />
                                          </div>
                                          <div className="flex-1">
                                              <h4 className="font-bold text-white text-xl mb-2">Bachelor of
                                                  Technology</h4>
                                              <p className="text-blue-300 font-medium mb-3">Computer Engineering</p>
                                              <p className="text-gray-300 mb-2">Bharati Vidyapeeth University, Pune</p>
                                              <div
                                                  className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-400">
                                                  <div className="flex items-center">
                                                      <Calendar className="w-4 h-4 mr-1"/>
                                                      Jul 2013 - June 2017
                                                  </div>
                                                  <div className="flex items-center">
                                                      <span className="text-yellow-400 mr-1">⭐</span>
                                                      Magna Cum Laude
                                                  </div>
                                              </div>
                                          </div>
                                      </div>

                                      <div>
                                          <h5 className="font-semibold text-white mb-3">Key Courses:</h5>
                                          <div className="grid grid-cols-2 gap-2">
                                              <Badge
                                                  className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                  Distributed Systems
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                  Software Architecture
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                  Operating Systems
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                  Compiler Construction
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                  Microprocessor Based Systems
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                  Software Analysis & Design
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                  Software Development Methodologies
                                              </Badge>
                                              <Badge
                                                  className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                  Advanced Database Management Systems
                                              </Badge>
                                          </div>
                                      </div>
                                  </CardContent>
                              </Card>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Enhanced Experience Section */}
              <section id="experience" className="py-20 relative z-10">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-16">
                          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                              Professional Journey
                          </h3>
                          <p className="text-gray-300 max-w-2xl mx-auto">
                              My career progression through various roles. Hover over each experience to see detailed
                              information.
                          </p>
                      </div>

                      <div className="max-w-6xl mx-auto space-y-8">
                          {experiences.map((exp, index) => (
                              <Card
                                  key={index}
                                  className={`bg-black/20 border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-black/40 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group ${
                                      hoveredExperience === index ? "ring-2 ring-purple-500/50" : ""
                                  }`}
                                  onMouseEnter={() => setHoveredExperience(index)}
                                  onMouseLeave={() => setHoveredExperience(null)}
                              >
                                  <CardContent className="p-8">
                                      <div className="grid lg:grid-cols-3 gap-8">
                                          {/* Left Column - Basic Info */}
                                          <div className="lg:col-span-1">
                                              <div className="flex items-start space-x-4 mb-6">
                                                  <div
                                                      className={`w-16 h-16 bg-gradient-to-r ${exp.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                                                  >
                                                      <Briefcase className={`w-8 h-8 ${exp.textColor}`}/>
                                                  </div>
                                                  <div className="flex-1">
                                                      <h4 className="font-bold text-white text-xl mb-2 group-hover:text-purple-300 transition-colors">
                                                          {exp.title}
                                                      </h4>
                                                      <p className={`${exp.textColor} font-medium text-lg mb-3`}>{exp.company}</p>
                                                      <div className="space-y-2 text-sm text-gray-400">
                                                          <div className="flex items-center">
                                                              <Calendar className="w-4 h-4 mr-2"/>
                                                              {exp.period}
                                                          </div>
                                                          <div className="flex items-center">
                                                              <MapPin className="w-4 h-4 mr-2"/>
                                                              {exp.location}
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>

                                              <p className="text-gray-300 leading-relaxed mb-6">{exp.description}</p>

                                              {/* Technologies - Only render if technologies exist */}
                                              {exp.technologies && exp.technologies.length > 0 && (
                                                  <div>
                                                      <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
                                                          Technologies
                                                      </h5>
                                                      <div className="flex flex-wrap gap-2">
                                                            {(hoveredExperience === index
                                                                    ? exp.technologies
                                                                    : exp.technologies.slice(0, 4)
                                                            ).map((tech, techIndex) => (
                                                                <Badge key={techIndex} className={`${getTechColor(tech)} text-xs`}>
                                                                  {tech}
                                                              </Badge>
                                                          ))}

                                                            {hoveredExperience !== index && exp.technologies.length > 4 && (
                                                              <Badge
                                                                  className="bg-gray-500/20 text-gray-300 border-gray-500/30 text-xs">
                                                                  +{exp.technologies.length - 4} more
                                                              </Badge>
                                                          )}
                                                      </div>
                                                  </div>
                                              )}
                                          </div>

                                          {/* Right Column - Achievements & Responsibilities */}
                                          <div className="lg:col-span-2">
                                              <div
                                                  className={`grid ${exp.achievements && exp.responsibilities ? "md:grid-cols-2" : "md:grid-cols-1"} gap-8`}
                                              >
                                                  {/* Key Achievements - Only render if achievements exist */}
                                                  {exp.achievements && exp.achievements.length > 0 && (
                                                      <div>
                                                          <h5 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide flex items-center">
                                                              <Trophy className="w-4 h-4 mr-2 text-yellow-400"/>
                                                              Key Achievements
                                                          </h5>
                                                          <ul className="space-y-3">
                                                              {exp.achievements
                                                                  .slice(0, hoveredExperience === index ? exp.achievements.length : 3)
                                                                  .map((achievement, achIndex) => (
                                                                      <li key={achIndex}
                                                                          className="text-gray-300 flex items-start group/item">
                                                                          <ChevronRight
                                                                              className={`w-4 h-4 ${exp.textColor} mr-3 mt-0.5 flex-shrink-0 group-hover/item:translate-x-1 transition-transform`}
                                                                          />
                                                                          <span
                                                                              className="text-sm leading-relaxed">{achievement}</span>
                                                                      </li>
                                                                  ))}
                                                              {hoveredExperience !== index && exp.achievements.length > 3 && (
                                                                  <li className="text-gray-500 text-sm italic">
                                                                      Hover to see {exp.achievements.length - 3} more
                                                                      achievements...
                                                                  </li>
                                                              )}
                                                          </ul>
                                                      </div>
                                                  )}

                                                  {/* Key Responsibilities - Only render if responsibilities exist */}
                                                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                                                      <div>
                                                          <h5 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide flex items-center">
                                                              <Briefcase className="w-4 h-4 mr-2 text-blue-400"/>
                                                              Key Responsibilities
                                                          </h5>
                                                          <ul className="space-y-3">
                                                              {exp.responsibilities
                                                                  .slice(0, hoveredExperience === index ? exp.responsibilities.length : 3)
                                                                  .map((responsibility, respIndex) => (
                                                                      <li key={respIndex}
                                                                          className="text-gray-300 flex items-start group/item">
                                                                          <ChevronRight
                                                                              className={`w-4 h-4 ${exp.textColor} mr-3 mt-0.5 flex-shrink-0 group-hover/item:translate-x-1 transition-transform`}
                                                                          />
                                                                          <span
                                                                              className="text-sm leading-relaxed">{responsibility}</span>
                                                                      </li>
                                                                  ))}
                                                              {hoveredExperience !== index && exp.responsibilities.length > 3 && (
                                                                  <li className="text-gray-500 text-sm italic">
                                                                      Hover to
                                                                      see {exp.responsibilities.length - 3} more
                                                                      responsibilities...
                                                                  </li>
                                                              )}
                                                          </ul>
                                                      </div>
                                                  )}
                                                  </div>
                                          </div>
                                      </div>
                                  </CardContent>
                              </Card>
                          ))}
                      </div>
                  </div>
              </section>

              {/* Skills Section */}
              <section id="skills" className="py-20 relative z-10">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                              Technical Skills
                          </h3>
                          <p className="text-gray-300 max-w-2xl mx-auto">
                              Proficient in modern web technologies and frameworks, with a focus on creating performant
                              and
                              user-friendly applications.
                          </p>
                      </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                            {skillsData.map((skillCategory, index) => (
                          <Card
                                    key={index}
                                    className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300"
                                >
                              <CardContent className="p-6">
                                        <h4 className="font-semibold mb-4 text-white">{skillCategory.category}</h4>
                                  <div className="flex flex-wrap gap-2">
                                            {skillCategory.technologies.map((tech, techIndex) => (
                                                <Badge key={techIndex} variant="secondary" className={skillCategory.color}>
                                                    {tech}
                                      </Badge>
                                            ))}
                                  </div>
                              </CardContent>
                          </Card>
                            ))}
                      </div>
                  </div>
              </section>

              {/* Certifications Section */}
              <section id="certifications" className="py-20 relative z-10">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                              Professional Certifications
                          </h3>
                          <p className="text-gray-300 max-w-2xl mx-auto">
                              Industry-recognized certifications that validate my expertise across various technologies
                              and platforms.
                              Hover over each certificate to see details and click zoom to view full size.
                          </p>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                          {certificates.map((cert, index) => (
                              <Card
                                  key={cert.id}
                                  className={`bg-black/20 border-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group relative overflow-hidden ${
                                      hoveredCertificate === index ? "ring-2 ring-purple-500/50" : ""
                                  }`}
                                  onMouseEnter={() => setHoveredCertificate(index)}
                                  onMouseLeave={() => setHoveredCertificate(null)}
                              >
                                  {/* Certificate Image */}
                                  <div className="aspect-[4/3] relative overflow-hidden">
                                      <Image
                                          src={cert.imageUrl || "/placeholder.svg"}
                                          alt={`${cert.title} Certificate`}
                                          width={400}
                                          height={300}
                                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                      />

                                      {/* Hover Overlay */}
                                      <div
                                          className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-between p-4 transition-all duration-300 ${
                                              hoveredCertificate === index ? "opacity-100" : "opacity-0 pointer-events-none"
                                          }`}
                                      >
                                          {/* Certificate Info */}
                                          <div>
                                              <h4 className="font-semibold text-white mb-2 text-lg">{cert.title}</h4>
                                              <p className="text-purple-300 font-medium mb-2">{cert.issuer}</p>
                                              <div className="text-xs text-gray-400 space-y-1">
                                                  <p>
                                                      <strong>Issued:</strong> {cert.date}
                                                  </p>
                                                  <p>
                                                      <strong>Valid Until:</strong> {cert.validUntil}
                                                  </p>
                                              </div>
                                          </div>

                                          {/* Action Buttons */}
                                          <div className="flex gap-2">
                                              <Button
                                                  size="sm"
                                                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 flex-1"
                                                  onClick={(e) => {
                                                      e.stopPropagation()
                                                      handleZoomCertificate(cert)
                                                  }}
                                              >
                                                  <Eye className="w-3 h-3 mr-1"/>
                                                  View Certificate
                                              </Button>
                                              {cert.verificationUrl && (
                                                  <Button
                                                      size="sm"
                                                      variant="outline"
                                                      className="border-white/20 text-white hover:bg-white/10 bg-transparent flex-1"
                                                      asChild
                                                  >
                                                      <Link href={cert.verificationUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
                                                          <ExternalLinkIcon className="w-3 h-3 mr-1" />
                                                          Verify
                                                      </Link>
                                                  </Button>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                              </Card>
                          ))}
                      </div>

                      {/* Additional Info */}
                      <div className="text-center mt-12">
                          <p className="text-gray-400 text-sm">
                              All certifications are industry-verified and can be validated through their respective
                              platforms.
                          </p>
                      </div>
                  </div>
              </section>

              {/* Achievements Section */}
              {/*
          <section id="achievements" className="py-20 relative z-10">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Achievements
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Recognition and milestones that highlight my contributions to the development community and professional
                  growth.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2">Hackathon Winner</h4>
                        <p className="text-sm text-gray-300 mb-2">
                          First place at TechCrunch Disrupt 2023 for developing an AI-powered code review tool
                        </p>
                        <p className="text-xs text-gray-400">September 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2">Open Source Contributor</h4>
                        <p className="text-sm text-gray-300 mb-2">
                          500+ contributions to popular open source projects including React, Next.js, and TypeScript
                        </p>
                        <p className="text-xs text-gray-400">2020 - Present</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2">Tech Speaker</h4>
                        <p className="text-sm text-gray-300 mb-2">
                          Delivered 15+ technical talks at conferences including React Conf, JSConf, and local meetups
                        </p>
                        <p className="text-xs text-gray-400">2021 - Present</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2">Team Leadership</h4>
                        <p className="text-sm text-gray-300 mb-2">
                          Successfully led a team of 8 developers to deliver 3 major products, increasing company revenue
                          by 40%
                        </p>
                        <p className="text-xs text-gray-400">2022 - 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          */}
              {/* Projects Section */}
              <section id="projects" className="py-20 relative z-10">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                              Featured Projects
                          </h3>
                          <p className="text-gray-300 max-w-2xl mx-auto">
                                Here are some of my recent projects that showcase my skills and experience in web development. Each
                                project demonstrates different aspects of modern software development.
                          </p>
                      </div>

                        {/* All Projects in Single Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {projects.map((project) => (
                          <Card
                                        key={project.id}
                              className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 group">
                              <div className="aspect-video relative overflow-hidden">
                                  <Image
                                                src={project.imageUrl || "/placeholder.svg?height=200&width=350"}
                                                alt={project.title}
                                      width={350}
                                      height={200}
                                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-purple-500/80 text-white border-0 text-xs">{project.category}</Badge>
                                            </div>
                              </div>
                              <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-lg text-white">{project.title}</h4>
                                            </div>

                                            <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                                        {/* Flexible Technology Display */}
                                  <div className="flex flex-wrap gap-2 mb-4">
                                            {/* Show main technologies if no repositories, otherwise show combined unique technologies */}
                                            {(() => {
                                                let techsToShow = []

                                                if (project.repositories) {
                                                    // Combine all technologies from repositories and main project, remove duplicates
                                                    const frontendTechs = project.repositories.frontend?.technologies || []
                                                    const backendTechs = project.repositories.backend?.technologies || []
                                                    const mainTechs = project.technologies || []

                                                    techsToShow = [...new Set([...mainTechs, ...frontendTechs, ...backendTechs])]
                                                } else {
                                                    // Use main technologies for single repository projects
                                                    techsToShow = project.technologies || []
                                                }

                                                return techsToShow.map((tech, index) => (
                                                    <Badge key={index} variant="outline" className={`text-xs ${getTechColor(tech)}`}>
                                                        {tech}
                                      </Badge>
                                                ))
                                            })()}
                                  </div>

                                        {/* Flexible Button Rendering */}
                                  <div className="flex gap-2">
                                            {project.repositories ? (
                                                // Multi-repository project
                                                <>
                                                    {project.repositories.frontend && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-white/20 text-white bg-transparent flex-1"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={project.repositories.frontend.url || "#"}
                                                                target="_blank"
                                                                className="flex items-center justify-center"
                                                            >
                                                                <Github className="w-3 h-3 mr-1" />
                                                                Frontend
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    {project.repositories.backend && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-white/20 text-white bg-transparent flex-1"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={project.repositories.backend.url || "#"}
                                                                target="_blank"
                                                                className="flex items-center justify-center"
                                                            >
                                                                <Github className="w-3 h-3 mr-1" />
                                                                Backend
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </>
                                            ) : (
                                                // Single repository project
                                      <Button
                                          size="sm"
                                          variant="outline"
                                                    className="border-white/20 text-white bg-transparent w-full"
                                          asChild
                                      >
                                                    <Link
                                                        href={project.githubUrl || "#"}
                                                        target="_blank"
                                                        className="flex items-center justify-center"
                                                    >
                                              <Github className="w-4 h-4 mr-2"/>
                                                        View Code
                                          </Link>
                                      </Button>
                                            )}
                                  </div>
                              </CardContent>
                          </Card>
                                ))}
                        </div>

                        {/* View All Projects Link */}
                        <div className="text-center mt-12">
                                      <Button
                                          variant="outline"
                                size="lg"
                                          className="border-white/20 text-white bg-transparent"
                                          asChild
                                      >
                                <Link href="https://github.com/rgoel22?tab=repositories" target="_blank" className="flex items-center">
                                              <Github className="w-4 h-4 mr-2"/>
                                    View All Projects on GitHub
                                          </Link>
                                      </Button>
                                  </div>
                  </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-20 relative z-10">
                  <div className="container mx-auto px-4 text-center">
                      <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          Let&apos;s Work Together
                      </h3>
                      <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                          I&apos;m always interested in new opportunities and exciting projects. Let&apos;s discuss how we can
                          bring your
                          ideas to life.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                          <Button
                              size="lg"
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                              asChild
                          >
                              <Link href="mailto:rishgoel08@gmail.com">
                                  <Mail className="w-4 h-4 mr-2"/>
                                  rishgoel08@gmail.com
                              </Link>
                          </Button>
                          <Button
                              variant="outline"
                              size="lg"
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                              asChild
                          >
                              <Link href="tel:+12404678423">
                                  <Phone className="w-4 h-4 mr-2"/>
                                  +1 (240) 467-8423
                              </Link>
                          </Button>
                      </div>

                      <Button
                          variant="outline"
                          size="lg"
                          className="border-white/20 text-white bg-transparent"
                          onClick={() => {
                              const link = document.createElement("a")
                              link.href = "/Rishabh Goel.pdf"
                              link.download = "Rishabh Goel.pdf"
                              document.body.appendChild(link)
                              link.click()
                              document.body.removeChild(link)
                          }}
                      >
                          <Download className="w-4 h-4 mr-2"/>
                          Download Full Resume
                      </Button>
                  </div>
              </section>

              {/* Footer */}
              <footer className="border-t border-white/10 py-8 backdrop-blur-sm bg-black/20 relative z-10">
                  <div className="container mx-auto px-4">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Rishabh Goel. All rights
                              reserved.</p>
                          <div className="flex space-x-4 mt-4 md:mt-0">
                              <Link href="https://github.com/rgoel22"
                                    className="text-gray-400 hover:text-white transition-colors">
                                  <Github className="w-5 h-5"/>
                              </Link>
                              <Link href="https://www.linkedin.com/in/rishabh-goel22/"
                                    className="text-gray-400 hover:text-white transition-colors">
                                  <Linkedin className="w-5 h-5"/>
                              </Link>
                          </div>
                      </div>
                  </div>
              </footer>
          </div>
      </div>
  )
}
