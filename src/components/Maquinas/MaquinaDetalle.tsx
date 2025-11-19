import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../supabaseClient';

interface Maquina {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  estado: string;
  combustible: string;
  pm_seleccionado: string;
  horometro: number;
  imagen?: string;
  fecha_ingreso: string;
}

const MaquinaDetalle: React.FC = () => {
  const { id } = useParams();
  const [maquina, setMaquina] = useState<Maquina | null>(null);

  useEffect(() => {
    const fetchMaquina = async () => {
      const { data, error } = await supabase.from('maquinas').select('*').eq('id', id).single();
      if (error) console.error(error);
      else setMaquina(data as Maquina);
    };
    fetchMaquina();
  }, [id]);

  if (!maquina) return <div className="p-4">Cargando...</div>;

  return (
    <div className="p-4 max-w-lg mx-auto border rounded shadow">
      {maquina.imagen && <img src={maquina.imagen} alt={maquina.nombre} className="h-64 w-full object-cover rounded mb-4" />}
      <h1 className="text-3xl font-bold mb-2">{maquina.nombre}</h1>
      <p><strong>Tipo:</strong> {maquina.tipo}</p>
      <p><strong>Estado:</strong> {maquina.estado}</p>
      <p><strong>Combustible:</strong> {maquina.combustible}</p>
      <p><strong>PM Seleccionado:</strong> {maquina.pm_seleccionado}</p>
      <p><strong>Horómetro:</strong> {maquina.horometro}</p>
      <p><strong>Fecha de ingreso:</strong> {new Date(maquina.fecha_ingreso).toLocaleDateString()}</p>
      <p className="mt-2"><strong>Descripción:</strong> {maquina.descripcion}</p>

      <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Volver
      </Link>
    </div>
  );
};

export default MaquinaDetalle;
