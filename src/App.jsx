import React, { useState } from "react";
import MapaAgricola from "./components/MapaAgricola";

function App() {
  const [modoVisualizacion, setModoVisualizacion] = useState("siglea");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de control - ahora en columna lateral */}
          <div className="lg:col-span-1 space-y-4">

          <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                DATOS LÁCTEOS ENTRE RÍOS
              </span>
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Visualización interactiva de la producción láctea provincial
            </p>
          </div>
        </div>
      </header>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                Modo de Visualización
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => setModoVisualizacion("siglea")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors border ${modoVisualizacion === "siglea"
                      ? "bg-blue-100 text-blue-800 border-blue-300"
                      : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    }`}
                >
                  <div className="flex items-center">
                    Producción (SIGLEA)
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Litros
                  </span>
                </button>

                <button
                  onClick={() => setModoVisualizacion("senasa")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors border ${modoVisualizacion === "senasa"
                      ? "bg-purple-100 text-purple-800 border-purple-300"
                      : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                    }`}
                >
                  <div className="flex items-center">
                    Rebaño (SENASA)
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Vacas
                  </span>
                </button>

                <button
                  onClick={() => setModoVisualizacion("industrias")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors border ${modoVisualizacion === "industrias"
                      ? "bg-cyan-100 text-cyan-800 border-cyan-300"
                      : "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100"
                    }`}
                >
                  <div className="flex items-center">
                    Industrias Lácteas
                  </div>
                  <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full">
                    Fábricas
                  </span>
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Leyenda actual:
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-gray-600">Alta producción</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-600">Media producción</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-600">Baja producción</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa - ocupa 3 columnas */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <MapaAgricola
                modoVisualizacion={modoVisualizacion}
                onModoChange={setModoVisualizacion}
              />
            </div>

            {/* Footer informativo */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Fuente: Ministerio de Agroindustria de Entre Ríos |
                <span className="mx-2">•</span>
                Última actualización: {new Date().toLocaleDateString('es-AR')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;