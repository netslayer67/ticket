
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const AdminBuses = () => {
  const buses = [
    { id: 'BUS01', name: 'Pahala Kencana', type: 'Executive', seats: 32, status: 'Active' },
    { id: 'BUS02', name: 'Rosalia Indah', type: 'Super Executive', seats: 24, status: 'Active' },
    { id: 'BUS03', name: 'Sinar Jaya', type: 'Sleeper', seats: 18, status: 'Maintenance' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Maintenance': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Armada Bus</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Bus
        </Button>
      </div>
       <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">ID Bus</th>
              <th scope="col" className="px-6 py-3">Nama</th>
              <th scope="col" className="px-6 py-3">Tipe</th>
              <th scope="col" className="px-6 py-3">Kursi</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-white">{bus.id}</td>
                <td className="px-6 py-4">{bus.name}</td>
                <td className="px-6 py-4">{bus.type}</td>
                <td className="px-6 py-4">{bus.seats}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(bus.status)}`}>
                        {bus.status}
                    </span>
                </td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBuses;
