import React, { useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { sampleProductos } from '../data/sampleProductos';

export default function ProductModal({ visible, onHide, onSelect, onAfterSelect }) {
    const dropdownRef = useRef(null);

    // Al abrir el modal, despliega el dropdown automáticamente
    useEffect(() => {
        if (visible && dropdownRef.current) {
            setTimeout(() => dropdownRef.current.show(), 0);
        }
    }, [visible]);

    const handleChange = (e) => {
        const product = sampleProductos.find(p => p.codigo === e.value);
        if (product) {
            onSelect(product);
            onHide();
            if (onAfterSelect) {
                setTimeout(() => {
                    onAfterSelect();
                }, 200); // Espera más larga si el modal tarda en cerrar
            }
        }
    };

    return (
        <Dialog
            header="Seleccione producto"
            visible={visible}
            style={{ width: '60vw' , height: '30vw' }}
            modal
            onHide={onHide}
            draggable={false}
        >
            <Dropdown
                ref={dropdownRef}
                options={sampleProductos}
                optionLabel="nombre"
                optionValue="codigo"
                placeholder="Seleccione..."
                onChange={handleChange}
                style={{ width: '100%' }}
                filter
                appendTo="self"
            />
        </Dialog>
    );
}
