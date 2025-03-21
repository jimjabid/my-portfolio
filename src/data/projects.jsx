import mockUpShoe from '/img/mock-up-shoe-cust.png';
import mockUpWave from '/img/mock-up-wave-project.png';
import mockUpPortfolio from '/img/portfolio-project.png';
import mockUpMimiiShop from '/img/mimiishop.png';

export const projectsData = [
  {
    id: 1,
    title: "Shoe Customizer",
    description: "3D shoe customizer created using",
    technologies: ["React Three", "React", "Tailwind", "Framer Motion"],
    additionalText: "This platform allow you to personalize a shoe. Just click any part of the shoe and customize it.",
    links: {
      live: "https://jimjabid.github.io/3DShoeCustomizer/",
      code: "https://github.com/jimjabid/3DShoeCustomizer"
    },
    image: mockUpShoe
  },
  {
    id: 2,
    title: "Waves",
    description: "Explore top surf photographers in this showcase website Merging",
    technologies: ["WebGl", "HTML", "CSS", "Three.js", "GSAP"],
    additionalText: "and shaders for image effects.",
    links: {
      live: "https://jimjabid.github.io/the-wave-project-v1/",
      code: "https://github.com/jimjabid/the-wave-project-v1"
    },
    image: mockUpWave
  },
  {
    id: 3,
    title: "My Portfolio",
    description: "This is the same portfolio website you are reading this from: a fusion of",
    technologies: ["Tailwind", "shaders", "Three.js", "GSAP"],
    additionalText: "I hope you like it so far.",
    links: {
      live: "https://jimjabid.github.io/jabid-portfolio-vite/",
      code: "https://github.com/jimjabid/jabid-portfolio-vite"
    },
    image: mockUpPortfolio
  },
  {
    id: 4,
    title: "Mimii Shop",
    description: "E-commerce Petshop featuring real-time admin chat support via Socket.io and an AI-powered customer service agent for WhatsApp.",
    technologies: ["MERN", "Socket.io", "LangChain","AWS S3", "Anthropic Claude"],
    additionalText: "This production-ready e-commerce solution includes user authentication, product management, shopping cart functionality,and AI-powered customer support through an intelligent agent system.",
    links: {
      live: "https://mimiishop.com",
      code: "https://github.com/jimjabid/mimiishop"
    },
    image: mockUpMimiiShop
  }
]; 