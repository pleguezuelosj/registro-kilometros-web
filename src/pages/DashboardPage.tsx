import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TripsView from '../components/TripsView';
import WorkersView from '../components/WorkersView';
import ReportsView from '../components/ReportsView';

type Tab = 'trips' | 'workers' | 'reports';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('trips');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Registro de Kilómetros</h1>
            <p className="text-sm text-gray-600">Panel de Supervisión</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Supervisor: <strong>{user?.name || user?.username}</strong>
            </span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8" aria-label="Tabs">
            {[
              { id: 'trips', label: 'Viajes', icon: '🚗' },
              { id: 'workers', label: 'Trabajadores', icon: '👥' },
              { id: 'reports', label: 'Reportes', icon: '📊' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'trips' && <TripsView />}
        {activeTab === 'workers' && <WorkersView />}
        {activeTab === 'reports' && <ReportsView />}
      </main>
    </div>
  );
}
