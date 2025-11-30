const techCategories = {
    frontend: {
        technologies: [
            "React.js",
            "Next.js",
            "JavaScript",
            "Tailwind CSS",
            "jQuery",
            "HTML/CSS",
            "Angular",
            "TypeScript",
            "Material-UI",
        ],
        color: "bg-purple-500/20 text-purple-200 border-purple-500/30",
    },
    backend: {
        technologies: [
            "Java",
            "Spring Boot",
            "Spring",
            "Node.js",
            "Python",
            "Express.js",
            "Hibernate",
            "JWT",
            "JUnit",
            "AES Encryption",
            "PHP"
        ],
        color: "bg-pink-500/20 text-pink-200 border-pink-500/30",
    },
    tools: {
        technologies: [
            "Stripe API",
            "OpenAI API",
            "Selenium",
            "Gradle",
            "Mockito",
            "JMockit",
            "REST APIs",
            "Design Patterns",
            "Jira",
            "JEXL",
            "Microservices",
            "FreeMarker",
            "Jasper Reports",
            "Maven",
            "JProfiler",
            "GitHub Secrets",
            "Helm",
            "Oracle ADF",
            "BitBucket",
            "Postman",
            "Ant",
            "Agile",
            "MVC",
            "Data Structures & Algorithm",
            "Distributed Systems",
            "System Design",
            "keycloak",
        ],
        color: "bg-blue-500/20 text-blue-200 border-blue-500/30",
    },
    cloud: {
        technologies: [
            "AWS",
            "Azure",
            "Kubernetes",
            "Docker",
            "Jenkins",
            "Git",
            "GitHub Actions",
            "Heroku",
            "AWS EKS",
            "AWS ECS",
            "CloudWatch",
            "Apigee",
            "Terraform",
            "Ingress Controller (ALB)",
            "StatefulSets",
            "AWS ECR",
            "Amazon Route 53",
            "AWS Certificate Manager (ACM)",
            "Amazon CloudWatch",
            "Horizontal Pod Autoscaler (HPA)",
            "Prometheus",
            "Cloud Formation",
            "AWS WAF",
            "AWS RDBMS"
        ],
        color: "bg-green-500/20 text-green-200 border-green-500/30",
    },
    database: {
        technologies: [
            "MySQL",
            "SQL",
            "PL/SQL",
            "Oracle 11g",
            "PostgresSQL",
            "NoSQL",
            "Snowflake",
            "MongoDB",
            "GraphQL",
            "Database Design & Architecture",
        ],
        color: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30",
    },
}

// Helper function to get technology color
export const getTechColor = (technology: string) => {
    for (const category of Object.values(techCategories)) {
        if (category.technologies.includes(technology)) {
            return category.color
        }
    }
    return "bg-gray-500/20 text-gray-200 border-gray-500/30"
}

// Skills data structure using the same categorization
export const skillsData = [
    {
        category: "Frontend",
        technologies: techCategories.frontend.technologies,
        color: techCategories.frontend.color,
    },
    {
        category: "Backend",
        technologies: techCategories.backend.technologies,
        color: techCategories.backend.color,
    },
    {
        category: "Database",
        technologies: techCategories.database.technologies,
        color: techCategories.database.color,
    },
    {
        category: "Cloud & CI/CD Technologies",
        technologies: techCategories.cloud.technologies, // Show all mobile techs
        color: techCategories.cloud.color,
    },
    {
        category: "Tools & Others",
        technologies: techCategories.tools.technologies,
        color: techCategories.tools.color,
    },
]