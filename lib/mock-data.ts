import type { Project, User } from "./types"

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Torre Residencial Madrid Centro",
    category: "Real Estate",
    location: "Madrid, España",
    image: "/modern-residential-tower-madrid.jpg",
    pricePerTokenUSDT: 100,
    totalSupply: 10000,
    availableSupply: 7500,
    minBuy: 10,
    maxBuy: 500,
    apyEstimated: 8.5,
    riskNotes: "Inversión en activo inmobiliario. Riesgo medio. Sujeto a fluctuaciones del mercado inmobiliario.",
    description:
      "Proyecto de tokenización de torre residencial de lujo en el centro de Madrid. Edificio de 20 plantas con 80 unidades residenciales premium.",
    documents: [
      { id: "1", name: "Prospecto de Inversión", type: "PDF", url: "#" },
      { id: "2", name: "Valuación Independiente", type: "PDF", url: "#" },
      { id: "3", name: "Términos y Condiciones", type: "PDF", url: "#" },
    ],
  },
  {
    id: "2",
    name: "Parque Solar Andalucía",
    category: "Energy",
    location: "Sevilla, España",
    image: "/solar-panel-farm-renewable-energy.jpg",
    pricePerTokenUSDT: 50,
    totalSupply: 20000,
    availableSupply: 15000,
    minBuy: 20,
    maxBuy: 1000,
    apyEstimated: 12.3,
    riskNotes: "Inversión en energía renovable. Riesgo medio-bajo. Ingresos garantizados por contratos PPA.",
    description:
      "Parque solar fotovoltaico de 50MW con contratos de compra de energía a largo plazo. Generación estimada de 80 GWh anuales.",
    documents: [
      { id: "1", name: "Análisis Técnico", type: "PDF", url: "#" },
      { id: "2", name: "Contratos PPA", type: "PDF", url: "#" },
      { id: "3", name: "Proyección Financiera", type: "PDF", url: "#" },
    ],
  },
  {
    id: "3",
    name: "Hotel Boutique Barcelona",
    category: "Hospitality",
    location: "Barcelona, España",
    image: "/luxury-boutique-hotel-barcelona.jpg",
    pricePerTokenUSDT: 200,
    totalSupply: 5000,
    availableSupply: 3200,
    minBuy: 5,
    maxBuy: 250,
    apyEstimated: 10.8,
    riskNotes: "Inversión en sector hotelero. Riesgo medio. Sujeto a ocupación y temporada turística.",
    description:
      "Hotel boutique de 5 estrellas con 45 habitaciones en el corazón del Barrio Gótico. Incluye restaurante gourmet y spa.",
    documents: [
      { id: "1", name: "Plan de Negocio", type: "PDF", url: "#" },
      { id: "2", name: "Estudio de Mercado", type: "PDF", url: "#" },
      { id: "3", name: "Licencias y Permisos", type: "PDF", url: "#" },
    ],
  },
  {
    id: "4",
    name: "Centro Logístico Valencia",
    category: "Logistics",
    location: "Valencia, España",
    image: "/modern-logistics-warehouse-center.jpg",
    pricePerTokenUSDT: 75,
    totalSupply: 15000,
    availableSupply: 12000,
    minBuy: 15,
    maxBuy: 750,
    apyEstimated: 9.2,
    riskNotes: "Inversión en infraestructura logística. Riesgo bajo. Contratos de arrendamiento a largo plazo.",
    description:
      "Centro logístico de última generación con 50,000 m² de almacenamiento. Ubicación estratégica cerca del puerto.",
    documents: [
      { id: "1", name: "Contratos de Arrendamiento", type: "PDF", url: "#" },
      { id: "2", name: "Certificaciones", type: "PDF", url: "#" },
      { id: "3", name: "Análisis de Rentabilidad", type: "PDF", url: "#" },
    ],
  },
  {
    id: "5",
    name: "Viñedo Premium Rioja",
    category: "Agriculture",
    location: "La Rioja, España",
    image: "/premium-vineyard-wine-estate.jpg",
    pricePerTokenUSDT: 150,
    totalSupply: 8000,
    availableSupply: 6400,
    minBuy: 10,
    maxBuy: 400,
    apyEstimated: 7.5,
    riskNotes: "Inversión agrícola. Riesgo medio. Sujeto a condiciones climáticas y mercado del vino.",
    description:
      "Viñedo de 100 hectáreas con denominación de origen Rioja. Producción anual de 500,000 botellas de vino premium.",
    documents: [
      { id: "1", name: "Certificación DO", type: "PDF", url: "#" },
      { id: "2", name: "Historial de Producción", type: "PDF", url: "#" },
      { id: "3", name: "Contratos de Distribución", type: "PDF", url: "#" },
    ],
  },
  {
    id: "6",
    name: "Edificio Oficinas Tech Hub",
    category: "Real Estate",
    location: "Málaga, España",
    image: "/modern-tech-office.png",
    pricePerTokenUSDT: 120,
    totalSupply: 12000,
    availableSupply: 9600,
    minBuy: 10,
    maxBuy: 600,
    apyEstimated: 8.9,
    riskNotes: "Inversión inmobiliaria comercial. Riesgo medio. Arrendado a empresas tecnológicas.",
    description:
      "Edificio de oficinas clase A en el Parque Tecnológico de Málaga. 15,000 m² distribuidos en 8 plantas.",
    documents: [
      { id: "1", name: "Contratos de Arrendamiento", type: "PDF", url: "#" },
      { id: "2", name: "Certificación Energética", type: "PDF", url: "#" },
      { id: "3", name: "Valoración Inmobiliaria", type: "PDF", url: "#" },
    ],
  },
]

export const mockUser: User = {
  walletAddress: null,
  kycVerified: false,
  purchases: [],
}

export const categories = ["All", "Real Estate", "Energy", "Hospitality", "Logistics", "Agriculture"]
