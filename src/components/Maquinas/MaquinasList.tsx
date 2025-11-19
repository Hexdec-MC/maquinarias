import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

interface Maquina {
  id: string;
  nombre: string;
  tipo: string;
  estado: string;
  combustible: string;
  pm_seleccionado: string;
  horometro: number;
  imagen?: string;
}

const MaquinasList: React.FC = () => {
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const navigate = useNavigate();

  const fetchMaquinas = async () => {
    const { data, error } = await supabase.from('maquinas').select('*');
    if (error) console.error(error);
    else setMaquinas(data as Maquina[]);
  };

  const deleteMaquina = async (id: string) => {
    const { error } = await supabase.from('maquinas').delete().eq('id', id);
    if (error) console.error(error);
    else fetchMaquinas();
  };

  useEffect(() => {
    fetchMaquinas();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Máquinas</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate('/crear')}
      >
        Crear Máquina
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {maquinas.map(m => (
          <div key={m.id} className="border rounded p-4 shadow">
            {m.imagen && <img src={m.imagen} alt={m.nombre} className="h-40 w-full object-cover mb-2 rounded" />}
            <h2 className="text-xl font-bold">{m.nombre}</h2>
            <p><strong>Tipo:</strong> {m.tipo}</p>
            <p><strong>Estado:</strong> {m.estado}</p>
            <p><strong>Combustible:</strong> {m.combustible}</p>
            <p><strong>PM:</strong> {m.pm_seleccionado}</p>
            <p><strong>Horómetro:</strong> {m.horometro}</p>

            <div className="mt-2 flex gap-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded"
                onClick={() => navigate(`/editar/${m.id}`)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteMaquina(m.id)}
              >
                Eliminar
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => navigate(`/maquinas/${m.id}`)}
              >
                Detalle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaquinasList;
