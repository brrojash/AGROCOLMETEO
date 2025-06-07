'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Droplets, Star, Clock, CheckCircle, Filter, Search, Cpu, Settings, Leaf, Container } from 'lucide-react'
import Link from 'next/link'

interface HydroponicSystem {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: number
  system_type: string
  capacity: number
  target_crop: string
  ai_embedded: boolean
  autonomous_operation: boolean
  installation_included: boolean
  warranty_months: number
  featured: boolean
  available: boolean
  stock: number
  water_tank_capacity: number
  power_consumption: number
  featured_image: {
    url: string
    formats: {
      large: { url: string }
      medium: { url: string }
      small: { url: string }
      thumbnail: { url: string }
    }
  }
}

export default function HidroponiaPage() {
  const [systems, setSystems] = useState<HydroponicSystem[]>([])
  const [filteredSystems, setFilteredSystems] = useState<HydroponicSystem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [systemTypeFilter, setSystemTypeFilter] = useState('')
  const [priceRange, setPriceRange] = useState('')

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/hydroponic-systems?populate=*')
        const data = await response.json()
        setSystems(data.data)
        setFilteredSystems(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching systems:', error)
        setLoading(false)
      }
    }

    fetchSystems()
  }, [])

  useEffect(() => {
    let filtered = systems

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(system => 
        system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        system.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // System type filter
    if (systemTypeFilter) {
      filtered = filtered.filter(system => system.system_type === systemTypeFilter)
    }

    // Price filter
    if (priceRange) {
      filtered = filtered.filter(system => {
        if (priceRange === 'bajo') return system.price < 1000000
        if (priceRange === 'medio') return system.price >= 1000000 && system.price < 2000000
        if (priceRange === 'alto') return system.price >= 2000000
        return true
      })
    }

    setFilteredSystems(filtered)
  }, [searchTerm, systemTypeFilter, priceRange, systems])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Droplets className="h-16 w-16 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-xl text-gray-600">Cargando sistemas hidropónicos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="h-6 w-6 mr-2" />
                Volver al inicio
              </Link>
              <div className="flex items-center space-x-2">
                <Droplets className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">AGROCOLMETEO</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Sistemas <span className="text-blue-600">Hidropónicos</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Cultiva sin suelo con nuestros sistemas hidropónicos inteligentes. 
              Aumenta tu producción hasta 10x con menos agua y espacio.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                <Droplets className="h-4 w-4 mr-2 text-blue-600" />
                95% menos agua
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                <Leaf className="h-4 w-4 mr-2 text-green-600" />
                Sin pesticidas
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                <Clock className="h-4 w-4 mr-2 text-purple-600" />
                Cosecha continua
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar sistemas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* System Type */}
            <select
              value={systemTypeFilter}
              onChange={(e) => setSystemTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="NFT">NFT</option>
              <option value="DWC">DWC</option>
              <option value="Aeroponia">Aeroponía</option>
              <option value="Goteo">Goteo</option>
            </select>

            {/* Price Range */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los precios</option>
              <option value="bajo">Menos de $1,000,000</option>
              <option value="medio">$1,000,000 - $2,000,000</option>
              <option value="alto">Más de $2,000,000</option>
            </select>
          </div>
        </div>
      </section>

      {/* Systems Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSystems.map((system, index) => (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-blue-100 flex items-center justify-center">
                    {system.featured_image?.url ? (
                      <img 
                        src={`http://localhost:1337${system.featured_image.formats?.thumbnail?.url || system.featured_image.url}`}
                        alt={system.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Droplets className="h-8 w-8 text-blue-600" />
                    )}
                  </div>
                  {system.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Destacado
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {system.system_type}
                    </span>
                    <span className="text-xs text-gray-500">{system.capacity} plantas</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{system.short_description}</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {system.ai_embedded && (
                    <div className="flex items-center text-xs text-gray-600">
                      <Cpu className="h-3 w-3 mr-1 text-blue-500" />
                      IA Integrada
                    </div>
                  )}
                  {system.autonomous_operation && (
                    <div className="flex items-center text-xs text-gray-600">
                      <Settings className="h-3 w-3 mr-1 text-green-500" />
                      Autónomo
                    </div>
                  )}
                  <div className="flex items-center text-xs text-gray-600">
                    <Container className="h-3 w-3 mr-1 text-blue-500" />
                    {system.water_tank_capacity}L
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Leaf className="h-3 w-3 mr-1 text-green-500" />
                    {system.target_crop}
                  </div>
                </div>

                {/* Price and Stock */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ${system.price?.toLocaleString()} COP
                  </span>
                  <span className="text-sm text-gray-500">Stock: {system.stock}</span>
                </div>

                {/* CTA */}
                <div className="space-y-2">
                  <Link 
                    href={`/hidroponia/${system.slug}`}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                  >
                    Ver más →
                  </Link>
                  
                  {system.installation_included && (
                    <div className="flex items-center text-xs text-blue-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Instalación incluida
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSystems.length === 0 && (
          <div className="text-center py-12">
            <Droplets className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron sistemas</h3>
            <p className="text-gray-600">Intenta ajustar los filtros para encontrar lo que buscas.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas asesoría personalizada?</h2>
          <p className="text-xl mb-8 opacity-90">
            Nuestros expertos te ayudan a elegir el sistema hidropónico perfecto para tu proyecto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contactar Especialista
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Solicitar Cotización
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Archivo: C:\Users\Tomoe\AGROCOLMETEO\frontend\src\app\hidroponia\page.tsx