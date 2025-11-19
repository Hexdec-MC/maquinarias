import React, { useState } from 'react';
import supabase from '../supabaseClient';

interface MaquinaFormProps {
  onSubmit: () => void;
  initialData?: any;
}

const MaquinaForm: React.FC<MaquinaFormProps> = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    nombre: initialData?.nombre || '',
    descripcion: initialData?.descripcion || '',
    tipo: initialData?.tipo || '',
    estado: initialData?.estado || '',
    combustible: initialData?.combustible || '',
    pm_seleccionado: initialData?.pm_seleccionado || 'pm1',
    horometro: initialData?.horometro || 0,
    imagen: initialData?.imagen || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage.from('maquinas').upload(fileName, file);
    if (error) {
      console.error(error);
      return;
    }

    const url = supabase.storage.from('maquinas').getPublicUrl(fileName).data.publicUrl;
    setForm({ ...form, imagen: url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData?.id) {
      await supabase.from('maquinas').update(form).eq('id', initialData.id);
    } else {
      await supabase.from('maquinas').insert(form);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2"/>
      <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo" className="border p-2"/>
      <input name="estado" value={form.estado} onChange={handleChange} placeholder="Estado" className="border p-2"/>
      <input name="combustible" value={form.combustible} onChange={handleChange} placeholder="Combustible" className="border p-2"/>
      
      <select name="pm_seleccionado" value={form.pm_seleccionado} onChange={handleChange} className="border p-2">
        <option value="pm1">PM1</option>
        <option value="pm2">PM2</option>
        <option value="pm3">PM3</option>
        <option value="pm4">PM4</option>
      </select>

      <input type="number" name="horometro" value={form.horometro} onChange={handleChange} placeholder="Horómetro" className="border p-2"/>
      
      <input type="file" accept="image/*" onChange={handleImageUpload}/>
      {form.imagen && <img src={form.imagen} alt="Maquina" className="h-32 mt-2"/>}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        {initialData ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default MaquinaForm;
