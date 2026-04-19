import { useState, useEffect } from 'react';

interface Worker {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  vehiculoId: string;
}

export default function WorkersView() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setIsLoading(true);
      // TODO: Conectar con tRPC backend
      setWorkers([]);
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = (workerId: string) => {
    // TODO: Implementar reset de contraseña
    alert(`Reseteando contraseña para trabajador ${workerId}`);
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando trabajadores...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Gestión de Trabajadores</h2>
      </div>

      {workers.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No hay trabajadores registrados
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Teléfono</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Vehículo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {workers.map((worker) => (
              <tr key={worker.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{worker.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{worker.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{worker.telefono}</td>
                <td className="px-6 py-4 text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleResetPassword(worker.id)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Resetear Contraseña
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
