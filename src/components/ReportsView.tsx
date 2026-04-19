import { useState, useEffect } from 'react';

interface Report {
  trabajador: string;
  kmTotal: number;
  vehiculo: string;
  mes: string;
  año: string;
  validados: number;
  rechazados: number;
}

export default function ReportsView() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7));
  const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    fetchReports();
  }, [filterMonth, filterYear]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      // TODO: Conectar con tRPC backend
      setReports([]);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando reportes...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Filtros de Reportes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
            <input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
            <input
              type="number"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium">Total KM</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">0</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium">Viajes Validados</div>
          <div className="text-3xl font-bold text-green-600 mt-2">0</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium">Viajes Rechazados</div>
          <div className="text-3xl font-bold text-red-600 mt-2">0</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-medium">Viajes Pendientes</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">0</div>
        </div>
      </div>

      {/* Tabla de Reportes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Reportes por Trabajador</h2>
        </div>

        {reports.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay datos disponibles para el período seleccionado
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trabajador</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Vehículo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">KM Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Validados</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rechazados</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {reports.map((report, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{report.trabajador}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{report.vehiculo}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{report.kmTotal} km</td>
                  <td className="px-6 py-4 text-sm text-green-600">{report.validados}</td>
                  <td className="px-6 py-4 text-sm text-red-600">{report.rechazados}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
