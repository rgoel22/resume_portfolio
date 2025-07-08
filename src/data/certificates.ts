export type Certificate = {
    id: number;
    title: string;
    issuer: string;
    date: string;
    validUntil: string;
    imageUrl: string;
    verificationUrl?: string;
}

export const certificates : Certificate[] = [
    {
        id: 1,
        title: "AWS Solutions Architect Associate",
        issuer: "Amazon Web Services",
        date: "Jun 2025",
        validUntil: "Jun 2028",
        imageUrl: "${basePath}/images/certificates/aws-certificate.png",
        verificationUrl: "https://www.credly.com/badges/3ce92f5d-e303-426c-b987-4819e9b97d29",
    },
    {
        id: 2,
        title: "PL/SQL",
        issuer: "Udemy",
        date: "May 2021",
        validUntil: " - ",
        imageUrl: "${basePath}/images/certificates/pl-sql.png",
        verificationUrl: "https://www.udemy.com/certificate/UC-5e1af506-45c7-4e0d-bc22-798ee25f6610/",
    },
    {
        id: 3,
        title: "JavaScript",
        issuer: "Udemy",
        date: "Jul 2020",
        validUntil: " - ",
        imageUrl: "${basePath}/images/certificates/javascript.png",
        verificationUrl: "https://www.udemy.com/certificate/UC-427c3f0f-6d4f-4338-bf9b-7e119548a458/",
    },
    {
        id: 4,
        title: "Spring & Hibernate",
        issuer: "Udemy",
        date: "Sep 2024",
        validUntil: " - ",
        imageUrl: "${basePath}/images/certificates/spring.png",
        verificationUrl: "https://www.udemy.com/certificate/UC-IDNIF94P/",
    },
    {
        id: 5,
        title: "Advance Java",
        issuer: "HCL",
        date: "Apr 2016",
        validUntil: " - ",
        imageUrl: "${basePath}/images/certificates/ad java_1.jpg",
    },
    {
        id: 6,
        title: "C & C++",
        issuer: "HCL",
        date: "Mar 2016",
        validUntil: " - ",
        imageUrl: "${basePath}/images/certificates/c&c++_1.jpg",
    },
    {
        id: 7,
        title: "Core Java",
        issuer: "HCL",
        date: "Jan 2016",
        validUntil: " - ",
        imageUrl: "${basePath}/images/certificates/core java_1.jpg",
    },
]