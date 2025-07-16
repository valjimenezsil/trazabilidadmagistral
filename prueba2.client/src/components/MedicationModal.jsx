import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { sampleMedicamentos } from '../data/sampleMedicamentos';

export default function MedicationModal({ visible, onHide, onSelect }) {
  const handleChange = (e) => {
    // e.value es el código seleccionado
    const codigo = e.value;
    // Busca el objeto completo para recuperar el nombre
    const med = sampleMedicamentos.find(m => m.codigo === codigo);
    if (med) {
      onSelect({ codigo: med.codigo, nombre: med.nombre });
      onHide();
    }
  };

  return (
    <Dialog
      header="Seleccione medicamento"
      visible={visible}
      style={{ width: '80vw' }}
      modal
      onHide={onHide}
    >
      <Dropdown
        options={sampleMedicamentos}
        optionLabel="nombre"
        optionValue="codigo"
        placeholder="Seleccione..."
        onChange={handleChange}
        style={{ width: '100%' }}
      />
    </Dialog>
  );
}
