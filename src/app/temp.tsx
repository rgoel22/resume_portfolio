"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ResumeLanding() {
    const [scrollY, setScrollY] = useState(0)
    const [activeSection, setActiveSection] = useState("hero")
    const [aboutTextVisible, setAboutTextVisible] = useState(false)
    const [typingText, setTypingText] = useState("")
    const [hoveredExperience, setHoveredExperience] = useState<number | null>(null)
    const [hoveredCertificate, setHoveredCertificate] = useState<number | null>(null)
    const [zoomedCertificate, setZoomedCertificate] = useState<any>(null)

    const aboutTexts = [
        "I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that make a difference. I specialize in modern web technologies and have a keen eye for user experience design.",
        "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community through blog posts and speaking engagements.",
        "I believe in writing clean, maintainable code and creating applications that not only function well but also provide exceptional user experiences.",
    ]

    const experiences = [
        {
            title: "Graduate Teaching Assistant",
            company: "University of Maryland",
            period: "Jan 2025 - May 2025",
            location: "College Park, MD",
            technologies: ["JUnit", "Selenium", "Linux", "Spring Boot", "Gradle", "Mockito", "JMockit"],
            responsibilities: [
                "Teaching Assistant for Software Testing & Maintenance under Technology Director of Fraunhofer, mentoring 50+ students in advanced debugging and QA.",
                "Evaluated & Designed assignments and exams, providing detailed and constructive feedback to improve student outcomes.",
                "Assisted the professor in managing and enhancing course materials while streamlining communication, ensuring seamless access and fostering a collaborative learning environment.",
            ],
            color: "from-purple-600/20 to-pink-600/20",
            textColor: "text-purple-400",
            borderColor: "border-purple-500",
            bgColor: "bg-purple-500/10",
        },
        {
            title: "Graduate Teaching Assistant",
            company: "University of Maryland",
            period: "Aug 2024 - Dec 2024",
            location: "College Park, MD",
            technologies: [
                "Java",
                "SpringBoot",
                "Python",
                "AWS",
                "JUnit",
                "Node.js",
                "React.js",
                "REST APIs",
                "Design Patterns",
                "Git",
            ],
            responsibilities: [
                "Teaching Assistant for Software Design & Implementation under Architecture Division Chief at the US Army, mentoring 65 students in system design, design patterns and scalable software practices.",
                "Delivered a specialized lecture on SOLID principles, demonstrating advanced design best practices for creating robust, maintainable software",
                "Managed student software projects end-to-end and designed course examinations, providing targeted technical guidance and accountability to ensure high-quality outcomes.",
            ],
            color: "from-blue-600/20 to-cyan-600/20",
            textColor: "text-blue-400",
            borderColor: "border-blue-500",
            bgColor: "bg-blue-500/10",
        },
        {
            title: "Software-Engineer Full Stack Intern",
            company: "Nix, Inc.",
            period: "Jun 2024 - Aug 2024",
            location: "Wyoming, USA(Remote)",
            description: "Worked as a Lead Full Stack Intern in revamping a cloud based application",
            responsibilities: [
                "Led the architecture, development, and deployment of a cloud-native React-Node-Snowflake application leveraging AWS services, achieving an 84% increase in user adoption and securing the initial customer base.",
                "Architected and optimized the database schema, cutting query response time by 40%, for high traffic demands.",
                "Implemented an end-to-end secure payment portal with Stripe and JWT-based authentication, driving an 80% surge in paid user growth.",
            ],
            technologies: [
                "Node.js",
                "Stripe API",
                "AWS",
                "Snowflake",
                "React.js",
                "Tailwind Css",
                "Git",
                "GitHub actions",
                "HTML/CSS",
            ],
            achievements: [
                "Promoted to Backend Lead Intern at Nix after just one month, recognized for outstanding performance and technical leadership.",
            ],
            color: "from-purple-600/20 to-pink-600/20",
            textColor: "text-purple-400",
            borderColor: "border-purple-500",
            bgColor: "bg-purple-500/10",
        },
        {
            title: "Consultant",
            company: "Intellect Design Arena",
            period: "Oct 2019 - Aug 2023",
            location: "New Delhi, India",
            description:
                "Lead a team of 4 developers in building scalable web applications using Spring Boot, Java, and jQuery.",
            responsibilities: [
                "Spearheaded and developed revenue model transformation for e-marketplace(GeM) using Spring Boot & Java, driving 80% YoY growth, contributing $5 Billion in annual revenue.",
                "Engineered a Payment Status Scheduler with Cron jobs and the JEXL engine, reducing processing times from 60 to 10 minutes for over 30,000 daily transactions, significantly enhancing system efficiency and agility",
                "Led and executed the Uber integration for government cab procurement, reducing monthly operational cost by 40% (∼$15,000) by applying HLD/LLD principles in Agile environment.",
                "Diagnosed and resolved critical garbage collection issues using JProfiler, Heap Analysis, and Dynatrace, reducing server instances by 25% (4 to 3) and lowering memory usage by 30GB, enhancing application performance, and, cutting infrastructure costs.",
            ],
            technologies: [
                "MySQL",
                "JProfiler",
                "Java",
                "Spring Boot",
                "jUnit",
                "Sonar",
                "jQuery",
                "Jira",
                "Git",
                "JEXL",
                "AWS",
                "Microservices",
                "FreeMarker",
            ],
            achievements: [
                "Recipient of the organization's most coveted Intellect Chairman's Team Excellence Award in Delivery Excellence, recognized for driving an 89% YoY GMV increase to $25B on GeM.",
                'Honored with Intellect\'s "Going Extra Mile" (GEM) Award for surpassing performance targets, demonstrating unwavering dedication to project success, and consistently delivering exceptional results.',
                "Fast-tracked from Associate Consultant to Consultant for outstanding performance, strategic innovation, and high-impact contributions.",
                "Two-time SPOT Award recipient for exceptional agility, innovation, and commitment to driving successful project outcomes.",
                "Honored with Intellect's Rising Star Award as a newcomer, recognized for outstanding early contributions, rapid skill acquisition, and impactful performance.",
            ],
            color: "from-blue-600/20 to-cyan-600/20",
            textColor: "text-blue-400",
            borderColor: "border-blue-500",
            bgColor: "bg-blue-500/10",
        },
        {
            title: "Associate Software Engineer",
            company: "Sunrich Technologies Pvt. Ltd.",
            period: "Dec 2018 - Sept 2019",
            location: "Mumbai, India",
            technologies: [
                "Jasper Reports",
                "Spring Boot",
                "Java",
                "AWS",
                "jUnit",
                "Angular",
                "JavaScript",
                "Jira",
                "Git",
                "AWS",
                "Maven",
                "MySQL",
            ],
            responsibilities: [
                "Early member of the core team that architected and developed a shipping logistics web app with microservices and cloud solutions, achieving monthly operational savings of ∼$12,000 and improving scalability.",
                "At just one year of experience as the team's youngest member, engineered a scalable, ACID-compliant database architecture that drove a 40% boost in operational efficiency.",
                "Engineered a reporting functionality using Jasper Reports for multi-format report generation and AWS S3 storage, reducing report generation from 20 mins to 5 mins.",
            ],
            color: "from-purple-600/20 to-pink-600/20",
            textColor: "text-purple-400",
            borderColor: "border-purple-500",
            bgColor: "bg-purple-500/10",
        },
        {
            title: "Project Trainee",
            company: "Systems Plus",
            period: "Nov 2017 - Dec 2018",
            location: "Pune, India",
            responsibilities: [
                "Developed a robust report generation module for RBI's (Reserve Bank of India) securities auctions, handling heavy, sensitive, and complex data, cutting annual operational cost by 30%.",
                "Crafted and seamlessly integrated a performance-optimized stored procedure, resulting in a 40% reduction in data retrieval time from an external ERP system.",
            ],
            technologies: ["Oracle 11g", "Oracle ADF", "Java", "Jasper Reports", "jUnit", "Git"],
            achievements: [
                'Earned "Star of the Month" for consistently exceeding performance targets, driving innovative solutions, and significantly boosting team productivity',
            ],
            color: "from-blue-600/20 to-cyan-600/20",
            textColor: "text-blue-400",
            borderColor: "border-blue-500",
            bgColor: "bg-blue-500/10",
        },
    ]

    // Updated certificates data with proper image URLs
    const certificates = [
        {
            id: 1,
            title: "AWS Solutions Architect Associate",
            issuer: "Amazon Web Services",
            date: "Dec 2024",
            validUntil: "Dec 2027",
            description:
                "Comprehensive certification covering AWS cloud architecture, security, and best practices for designing scalable systems.",
            imageUrl: "/images/certificates/aws-certificate.jpg",
            verificationUrl: "#",
        },
        {
            id: 2,
            title: "Google Cloud Professional Developer",
            issuer: "Google Cloud",
            date: "Nov 2024",
            validUntil: "Nov 2026",
            description:
                "Professional-level certification demonstrating expertise in developing applications on Google Cloud Platform.",
            imageUrl: "/images/certificates/google-cloud-certificate.png",
            verificationUrl: "#",
            verificationUrl: "#",
        },
        {
            id: 3,
            title: "MongoDB Developer Associate",
            issuer: "MongoDB University",
            date: "Oct 2024",
            validUntil: "Oct 2027",
            description: "Certification validating skills in MongoDB database development, optimization, and best practices.",
            imageUrl: "/images/certificates/mongodb-certificate.jpg",
            verificationUrl: "#",
        },
        {
            id: 4,
            title: "React Professional Certificate",
            issuer: "Meta (Facebook)",
            date: "Sep 2024",
            validUntil: "Sep 2026",
            description:
                "Advanced React development certification covering modern patterns, performance optimization, and best practices.",
            imageUrl: "/images/certificates/react-certificate.png",
            verificationUrl: "#",
        },
        {
            id: 5,
            title: "Kubernetes Administrator (CKA)",
            issuer: "Cloud Native Computing Foundation",
            date: "Aug 2024",
            validUntil: "Aug 2027",
            description: "Hands-on certification demonstrating skills in Kubernetes cluster administration and management.",
            imageUrl: "/images/certificates/kubernetes-certificate.jpg",
            verificationUrl: "#",
        },
        {
            id: 6,
            title: "Certified Scrum Master",
            issuer: "Scrum Alliance",
            date: "Jul 2024",
            validUntil: "Jul 2026",
            description: "Certification in Scrum methodology and agile project management practices.",
            imageUrl: "/images/certificates/scrum-master-certificate.png",
            verificationUrl: "#",
        },
    ]

    // Projects data with JSON structure
    const projects = [
        {
            id: 1,
            title: "E-commerce Platform",
            description:
                "A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration for seamless online shopping experience.",
            longDescription:
                "Complete e-commerce platform featuring user authentication, product catalog, shopping cart, payment processing, order management, and admin dashboard. Built with modern web technologies for optimal performance and user experience.",
            imageUrl: "/images/projects/ecommerce-platform.jpg",
            technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS", "Prisma"],
            githubUrl: "https://github.com/yourusername/ecommerce-platform",
            liveUrl: "https://ecommerce-demo.vercel.app",
            featured: true,
            category: "Full Stack",
            completedDate: "Dec 2024",
        },
        {
            id: 2,
            title: "Task Management App",
            description:
                "A collaborative task management application with real-time updates and team collaboration features.",
            longDescription:
                "Real-time collaborative task management system with drag-and-drop functionality, team workspaces, deadline tracking, file attachments, and comprehensive reporting dashboard.",
            imageUrl: "/images/projects/task-management.jpg",
            technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Material-UI"],
            githubUrl: "https://github.com/yourusername/task-manager",
            liveUrl: "https://taskmanager-demo.vercel.app",
            featured: true,
            category: "Full Stack",
            completedDate: "Nov 2024",
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "A responsive weather dashboard with location-based forecasts and interactive charts.",
            longDescription:
                "Comprehensive weather application featuring current conditions, 7-day forecasts, interactive maps, weather alerts, and detailed analytics with beautiful data visualizations.",
            imageUrl: "/images/projects/weather-dashboard.jpg",
            technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Vuetify", "PWA"],
            githubUrl: "https://github.com/yourusername/weather-dashboard",
            liveUrl: "https://weather-dashboard-demo.vercel.app",
            featured: true,
            category: "Frontend",
            completedDate: "Oct 2024",
        },
        {
            id: 4,
            title: "AI Chat Application",
            description:
                "Intelligent chatbot application powered by OpenAI API with conversation history and context awareness.",
            longDescription:
                "Advanced AI-powered chat application with natural language processing, conversation memory, file uploads, code syntax highlighting, and customizable AI personalities.",
            imageUrl: "/images/projects/ai-chat-app.jpg",
            technologies: ["React", "OpenAI API", "Node.js", "WebSocket", "Redis", "Docker"],
            githubUrl: "https://github.com/yourusername/ai-chat-app",
            liveUrl: "https://ai-chat-demo.vercel.app",
            featured: false,
            category: "AI/ML",
            completedDate: "Sep 2024",
        },
        {
            id: 5,
            title: "Portfolio Website",
            description: "Personal portfolio website showcasing projects and skills with modern design and animations.",
            longDescription:
                "Responsive portfolio website built with modern web technologies, featuring smooth animations, dark/light mode, contact forms, and optimized performance.",
            imageUrl: "/images/projects/portfolio-website.jpg",
            technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript", "Vercel"],
            githubUrl: "https://github.com/yourusername/portfolio",
            liveUrl: "https://yourportfolio.vercel.app",
            featured: false,
            category: "Frontend",
            completedDate: "Aug 2024",
        },
        {
            id: 6,
            title: "Expense Tracker",
            description:
                "Personal finance management app with budget tracking, expense categorization, and financial insights.",
            longDescription:
                "Comprehensive expense tracking application with budget planning, category-wise expense analysis, recurring transaction management, and detailed financial reports with charts.",
            imageUrl: "/images/projects/expense-tracker.jpg",
            technologies: ["React Native", "Firebase", "Chart.js", "AsyncStorage", "Expo"],
            githubUrl: "https://github.com/yourusername/expense-tracker",
            liveUrl: null, // Mobile app - no live URL
            featured: false,
            category: "Mobile",
            completedDate: "Jul 2024",
        },
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

    // About section transition - Fixed opacity calculation
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

    const handleZoomCertificate = (certificate: any) => {
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
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent text-xs"
                        onClick={() => {
                            // Create a temporary link element to trigger download
                            const link = document.createElement("a")
                            link.href = "/resume.pdf" // Path to your resume file in the public folder
                            link.download = "Rishabh_Goel_Resume.pdf"
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
                                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <Github className="w-5 h-5" />
                                </Link>
                                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section with Transition Effect - Properly Fades Out */}
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
                        <div className="space-y-4 text-gray-300 mb-12">
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
                                <Card className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                                    <CardContent className="p-8">
                                        <div className="flex items-start space-x-4 mb-6">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 p-2">
                                                <Image
                                                    src="/images/umd.png"
                                                    alt="University of Maryland Logo"
                                                    width={48}
                                                    height={48}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-white text-xl mb-2">Master of Engineering</h4>
                                                <p className="text-purple-300 font-medium mb-3">Software Engineering</p>
                                                <p className="text-purple-300 font-medium mb-3">Graduate Certification in Cloud Engineering</p>
                                                <p className="text-gray-300 mb-2">University of Maryland, College Park</p>
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-400">
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1" />
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
                                                <Badge className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                    Cloud Computing
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                    Reverse Software Engineering
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                    Data Structures & Algorithms
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                    Data Storage & Databases
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                    Software Design & Implementation
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border-purple-500/30 justify-center py-2">
                                                    Virtualization and Container Technologies
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Bachelor's Degree */}
                                <Card className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                                    <CardContent className="p-8">
                                        <div className="flex items-start space-x-4 mb-6">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 p-2">
                                                <Image
                                                    src="/images/bvp.png"
                                                    alt="Bharati Vidyapeeth Logo"
                                                    width={48}
                                                    height={48}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-white text-xl mb-2">Bachelor of Technology</h4>
                                                <p className="text-blue-300 font-medium mb-3">Computer Engineering</p>
                                                <p className="text-gray-300 mb-2">Bharati Vidyapeeth University, Pune</p>
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-400">
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1" />
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
                                                <Badge className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                    Distributed Systems
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                    Software Architecture
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                    Operating Systems
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                    Compiler Construction
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                    Microprocessor Based Systems
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                    Software Analysis & Design
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
                                                    Software Development Methodologies
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-200 border-blue-500/30 justify-center py-2">
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
                                My career progression through various roles. Hover over each experience to see detailed information.
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
                                                        <Briefcase className={`w-8 h-8 ${exp.textColor}`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-white text-xl mb-2 group-hover:text-purple-300 transition-colors">
                                                            {exp.title}
                                                        </h4>
                                                        <p className={`${exp.textColor} font-medium text-lg mb-3`}>{exp.company}</p>
                                                        <div className="space-y-2 text-sm text-gray-400">
                                                            <div className="flex items-center">
                                                                <Calendar className="w-4 h-4 mr-2" />
                                                                {exp.period}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <MapPin className="w-4 h-4 mr-2" />
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
                                                            {exp.technologies.slice(0, 4).map((tech, techIndex) => (
                                                                <Badge
                                                                    key={techIndex}
                                                                    className={`${exp.bgColor} ${exp.textColor.replace("-400", "-200")} border-${exp.textColor.replace("text-", "").replace("-400", "-500/30")} text-xs`}
                                                                >
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                            {exp.technologies.length > 4 && (
                                                                <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30 text-xs">
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
                                                                <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
                                                                Key Achievements
                                                            </h5>
                                                            <ul className="space-y-3">
                                                                {exp.achievements
                                                                    .slice(0, hoveredExperience === index ? exp.achievements.length : 3)
                                                                    .map((achievement, achIndex) => (
                                                                        <li key={achIndex} className="text-gray-300 flex items-start group/item">
                                                                            <ChevronRight
                                                                                className={`w-4 h-4 ${exp.textColor} mr-3 mt-0.5 flex-shrink-0 group-hover/item:translate-x-1 transition-transform`}
                                                                            />
                                                                            <span className="text-sm leading-relaxed">{achievement}</span>
                                                                        </li>
                                                                    ))}
                                                                {hoveredExperience !== index && exp.achievements.length > 3 && (
                                                                    <li className="text-gray-500 text-sm italic">
                                                                        Hover to see {exp.achievements.length - 3} more achievements...
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Key Responsibilities - Only render if responsibilities exist */}
                                                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                                                        <div>
                                                            <h5 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide flex items-center">
                                                                <Briefcase className="w-4 h-4 mr-2 text-blue-400" />
                                                                Key Responsibilities
                                                            </h5>
                                                            <ul className="space-y-3">
                                                                {exp.responsibilities
                                                                    .slice(0, hoveredExperience === index ? exp.responsibilities.length : 3)
                                                                    .map((responsibility, respIndex) => (
                                                                        <li key={respIndex} className="text-gray-300 flex items-start group/item">
                                                                            <ChevronRight
                                                                                className={`w-4 h-4 ${exp.textColor} mr-3 mt-0.5 flex-shrink-0 group-hover/item:translate-x-1 transition-transform`}
                                                                            />
                                                                            <span className="text-sm leading-relaxed">{responsibility}</span>
                                                                        </li>
                                                                    ))}
                                                                {hoveredExperience !== index && exp.responsibilities.length > 3 && (
                                                                    <li className="text-gray-500 text-sm italic">
                                                                        Hover to see {exp.responsibilities.length - 3} more responsibilities...
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* All Technologies (shown on hover) - Only render if technologies exist */}
                                                {hoveredExperience === index && exp.technologies && exp.technologies.length > 0 && (
                                                    <div className="mt-6 pt-6 border-t border-white/10">
                                                        <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
                                                            All Technologies & Tools
                                                        </h5>
                                                        <div className="flex flex-wrap gap-2">
                                                            {exp.technologies.map((tech, techIndex) => (
                                                                <Badge
                                                                    key={techIndex}
                                                                    className={`${exp.bgColor} ${exp.textColor.replace("-400", "-200")} border-${exp.textColor.replace("text-", "").replace("-400", "-500/30")} text-xs hover:scale-105 transition-transform`}
                                                                >
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
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
                                Proficient in modern web technologies and frameworks, with a focus on creating performant and
                                user-friendly applications.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                                <CardContent className="p-6">
                                    <h4 className="font-semibold mb-4 text-white">Frontend</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                            React
                                        </Badge>
                                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                            Next.js
                                        </Badge>
                                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                            TypeScript
                                        </Badge>
                                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                            Tailwind CSS
                                        </Badge>
                                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                            Vue.js
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                                <CardContent className="p-6">
                                    <h4 className="font-semibold mb-4 text-white">Backend</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-pink-500/20 text-pink-200 border-pink-500/30">
                                            Node.js
                                        </Badge>
                                        <Badge variant="secondary" className="bg-pink-500/20 text-pink-200 border-pink-500/30">
                                            Python
                                        </Badge>
                                        <Badge variant="secondary" className="bg-pink-500/20 text-pink-200 border-pink-500/30">
                                            PostgreSQL
                                        </Badge>
                                        <Badge variant="secondary" className="bg-pink-500/20 text-pink-200 border-pink-500/30">
                                            MongoDB
                                        </Badge>
                                        <Badge variant="secondary" className="bg-pink-500/20 text-pink-200 border-pink-500/30">
                                            GraphQL
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                                <CardContent className="p-6">
                                    <h4 className="font-semibold mb-4 text-white">Tools & Others</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-500/30">
                                            Git
                                        </Badge>
                                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-500/30">
                                            Docker
                                        </Badge>
                                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-500/30">
                                            AWS
                                        </Badge>
                                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-500/30">
                                            Vercel
                                        </Badge>
                                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-500/30">
                                            Figma
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Enhanced Certifications Section with Image Cards and Zoom */}
                <section id="certifications" className="py-20 relative z-10">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                Professional Certifications
                            </h3>
                            <p className="text-gray-300 max-w-2xl mx-auto">
                                Industry-recognized certifications that validate my expertise across various technologies and platforms.
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
                                                <p className="text-gray-300 text-sm leading-relaxed mb-3">{cert.description}</p>
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
                                                    className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 ${
                                                        cert.verificationUrl ? "flex-1" : "w-full"
                                                    }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleZoomCertificate(cert)
                                                    }}
                                                >
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    View
                                                </Button>
                                                {cert.verificationUrl && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-white/20 text-white hover:bg-white/10 bg-transparent flex-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            window.open(cert.verificationUrl, "_blank")
                                                        }}
                                                    >
                                                        Verify
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
                                All certifications are industry-verified and can be validated through their respective platforms.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Enhanced Projects Section with JSON Data */}
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
                                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/40 group"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <Image
                                            src={project.imageUrl || "/placeholder.svg?height=200&width=350"}
                                            alt={project.title}
                                            width={350}
                                            height={200}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-purple-500/80 text-white border-0 text-xs">{project.category}</Badge>
                                        </div>
                                    </div>

                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-lg text-white">{project.title}</h4>
                                            <span className="text-xs text-gray-400">{project.completedDate}</span>
                                        </div>

                                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

                                        {/* Show All Technologies */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map((tech, index) => (
                                                <Badge key={index} variant="outline" className="text-xs border-purple-500/30 text-purple-200">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-white/20 text-white hover:bg-white/10 bg-transparent w-full"
                                                asChild
                                            >
                                                <Link
                                                    href={project.githubUrl || "#"}
                                                    target="_blank"
                                                    className="flex items-center justify-center"
                                                >
                                                    <Github className="w-4 h-4 mr-2" />
                                                    View Code
                                                </Link>
                                            </Button>
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
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                asChild
                            >
                                <Link href="https://github.com/rishabhgoel" target="_blank" className="flex items-center">
                                    <Github className="w-4 h-4 mr-2" />
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
                            Let's Work Together
                        </h3>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your
                            ideas to life.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                                asChild
                            >
                                <Link href="mailto:rishgoel08@gmail.com">
                                    <Mail className="w-4 h-4 mr-2" />
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
                                    <Phone className="w-4 h-4 mr-2" />
                                    +1 (240) 467-8423
                                </Link>
                            </Button>
                        </div>

                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                            onClick={() => {
                                // Create a temporary link element to trigger download
                                const link = document.createElement("a")
                                link.href = "/resume.pdf" // Path to your resume file in the public folder
                                link.download = "Rishabh_Goel_Resume.pdf"
                                document.body.appendChild(link)
                                link.click()
                                document.body.removeChild(link)
                            }}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download Full Resume
                        </Button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/10 py-8 backdrop-blur-sm bg-black/20 relative z-10">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Rishabh Goel. All rights reserved.</p>
                            <div className="flex space-x-4 mt-4 md:mt-0">
                                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <Github className="w-5 h-5" />
                                </Link>
                                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
