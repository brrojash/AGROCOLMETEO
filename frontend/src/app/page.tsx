'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Droplets, Thermometer, Wind, Leaf, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

console.log('ENV CHECK:', process.env.NEXT_PUBLIC_STRAPI_URL)

export default function Home() {
  const [stations, setStations] = useState([])
  const [hydroponics, setHydroponics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch data from Strapi APIs
    const fetchData = async () => {
      try {
        console.log('🚀 Haciendo fetch a las APIs...')
        const [stationsRes, hydroponicsRes] = await Promise.all([
          fetch('http://localhost:1337/api/stations'),
          fetch('http://localhost:1337/api/hydroponic-systems')
        ])
        
        console.log('📡 Respuesta Stations:', stationsRes.status)
        console.log('📡 Respuesta Hydroponics:', hydroponicsRes.status)
        
        const stationsData = await stationsRes.json()
        const hydroponicsData = await hydroponicsRes.json()
        
        console.log('📊 Datos Stations:', stationsData.data?.length, 'registros')
        console.log('📊 Datos Hydroponics:', hydroponicsData.data?.length, 'registros')
        
        setStations(stationsData.data.slice(0, 2)) // Mostrar solo 2
        setHydroponics(hydroponicsData.data.slice(0, 2)) // Mostrar solo 2
        setLoading(false)
        
        console.log('✅ Datos cargados exitosamente!')
      } catch (error) {
        console.error('❌ Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">AGROCOLMETEO</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/estaciones" className="text-gray-700 hover:text-green-600 transition-colors">Estaciones</Link>
              <Link href="/hidroponia" className="text-gray-700 hover:text-green-600 transition-colors">Hidroponía</Link>
              <Link href="/aplicaciones" className="text-gray-700 hover:text-green-600 transition-colors">Aplicaciones IA</Link>
              <Link href="/contacto" className="text-gray-700 hover:text-green-600 transition-colors">Contacto</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Tecnología Agrícola
            <span className="text-green-600"> Inteligente</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Estaciones meteorológicas con IA, sistemas hidropónicos automatizados y aplicaciones predictivas 
            para maximizar el rendimiento de tus cultivos en Colombia.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/estaciones" className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center">
              Ver Estaciones <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/hidroponia" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Sistemas Hidropónicos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">300%</div>
              <div className="text-gray-600">ROI Promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">40%</div>
              <div className="text-gray-600">Ahorro Agua</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">94.5%</div>
              <div className="text-gray-600">Precisión IA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-gray-600">Monitoreo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Productos</h2>
            <p className="text-xl text-gray-600">Tecnología colombiana para la agricultura del futuro</p>
          </div>

          {/* Estaciones Meteorológicas */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Cloud className="h-8 w-8 text-blue-600 mr-3" />
              Estaciones Meteorológicas
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {loading ? (
                <>
                  <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </>
              ) : stations.length > 0 ? (
                stations.map((station: any) => (
                  <motion.div 
                    key={station.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
                  >
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{station.name}</h4>
                    <p className="text-gray-600 mb-4">{station.short_description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        ${station.price?.toLocaleString()} COP
                      </span>
                      <Link href={`/estaciones/${station.slug}`} className="text-blue-600 hover:text-blue-700 font-medium">
                        Ver más →
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-gray-500">No se pudieron cargar las estaciones meteorológicas.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sistemas Hidropónicos */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Droplets className="h-8 w-8 text-green-600 mr-3" />
              Sistemas Hidropónicos
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {loading ? (
                <>
                  <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </>
              ) : hydroponics.length > 0 ? (
                hydroponics.map((system: any) => (
                  <motion.div 
                    key={system.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
                  >
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{system.name}</h4>
                    <p className="text-gray-600 mb-4">{system.short_description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        ${system.price?.toLocaleString()} COP
                      </span>
                      <Link href={`/hidroponia/${system.slug}`} className="text-blue-600 hover:text-blue-700 font-medium">
                        Ver más →
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-gray-500">No se pudieron cargar los sistemas hidropónicos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Listo para revolucionar tu cultivo?</h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a más de 100 agricultores que ya están usando tecnología AGROCOLMETEO
          </p>
          <Link href="/contacto" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
            Solicitar Cotización <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold">AGROCOLMETEO</span>
              </div>
              <p className="text-gray-400">
                Tecnología agrícola inteligente para el campo colombiano.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Productos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/estaciones" className="hover:text-white">Estaciones Meteorológicas</Link></li>
                <li><Link href="/hidroponia" className="hover:text-white">Sistemas Hidropónicos</Link></li>
                <li><Link href="/aplicaciones" className="hover:text-white">Aplicaciones IA</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
                <li><Link href="/soporte" className="hover:text-white">Soporte Técnico</Link></li>
                <li><Link href="/documentacion" className="hover:text-white">Documentación</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-400">
                <p>agrocolmeteo@gmail.com</p>
                <p>+57 311 446 8793</p>
                <p>Bogotá, Colombia</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AGROCOLMETEO. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}