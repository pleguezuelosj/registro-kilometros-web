import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Trip {
  id: string;
  trabajadorId: string;
  vehiculoId: string;
  fecha: string;
  kmInicial: number;
  kmFinal: number;
  origen: string;
  destino: string;
  notas: string;
  estado: 'pendiente' | 'validado' | 'rechazado';
}

export default function TripsView() {
  const { } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrips, setSelectedTrips] = useState<Set<string>>(new Set());
  
  // Filtros
  const [filterWorker, setFilterWorker] = useState('');
  const [filterVehicle, setFilterVehicle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      // TODO: Conectar con tRPC backend
      // Por ahora, datos de ejemplo
      setTrips([
        {
          id: '1',
          trabajadorId: 'w1',
          vehiculoId: 'v1',
          fecha: '2026-04-18',
          kmInicial: 10000,
          kmFinal: 10190,
          origen: 'Espejo',
          destino: 'Iznalloz',
          notas: 'Reunión dos',
          estado: 'pendiente',
        },
      ]);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTrip = (tripId: string) => {
    const newSelected = new Set(selectedTrips);
    if (newSelected.has(tripId)) {
      newSelected.delete(tripId);
    } else {
      newSelected.add(tripId);
    }
    setSelectedTrips(newSelected);
  };

  const handleValidateSelected = async () => {
    if (selectedTrips.size === 0) return;
    // TODO: Implementar validación múltiple
    alert(`Validando ${selectedTrips.size} viaje(s)...`);
  };

  const handleRejectSelected = async () => {
    if (selectedTrips.size === 0) return;
    // TODO: Implementar rechazo múltiple
    alert(`Rechazando ${selectedTrips.size} viaje(s)...`);
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando viajes...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Filtrar por trabajador"
            value={filterWorker}
            onChange={(e) => setFilterWorker(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />
          <input
            type="text"
            placeholder="Filtrar por vehículo"
            value={filterVehicle}
            onChange={(e) => setFilterVehicle(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="validado">Validado</option>
            <option value="rechazado">Rechazado</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
      </div>

      {/* Acciones Múltiples */}
      {selectedTrips.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex justify-between items-center">
          <span className="text-blue-900 font-medium">
            {selectedTrips.size} viaje(s) seleccionado(s)
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleValidateSelected}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              ✓ Validar Seleccionados
            </button>
            <button
              onClick={handleRejectSelected}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              ✕ Rechazar Seleccionados
            </button>
          </div>
        </div>
      )}

      {/* Tabla de Viajes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTrips(new Set(trips.map(t => t.id)));
                    } else {
                      setSelectedTrips(new Set());
                    }
                  }}
                  className="rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trabajador</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Vehículo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ruta</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Km</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {trips.map((trip) => (
              <tr key={trip.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedTrips.has(trip.id)}
                    onChange={() => toggleTrip(trip.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {trip.origen} → {trip.destino}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {trip.kmFinal - trip.kmInicial} km
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(trip.fecha).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    trip.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    trip.estado === 'validado' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {trip.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {trip.estado === 'pendiente' && (
                    <div className="flex gap-2">
                      <button className="text-green-600 hover:text-green-700 font-medium">✓</button>
                      <button className="text-red-600 hover:text-red-700 font-medium">✕</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
