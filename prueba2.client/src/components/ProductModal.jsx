// ProductModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { fetchProductosData } from '../services/maestrosService';
import {LoadingScreen} from './LoadingScreen';


export default function ProductModal({
    visible,
    onHide,
    onSelect,
    onAfterSelect,
    optionLabel = 'label',
    optionValue = 'value'
}) {
    const [items, setItems] = useState([]);         // aquí guardo label/value
    const [loading, setLoading] = useState(false);  // para spinner
    const dropdownRef = useRef(null);

    // Cada vez que se abra el modal, cargo productos
    useEffect(() => {
        if (!visible) return;

        const load = async () => {
            setLoading(true);
            try {
                const { response } = await fetchProductosData();
                const mapped = (response || []).map(p => ({
                    label: p.MSDesc.trim(),
                    value: p   // así e.value es el objeto completo
                }));
                setItems(mapped);
            } catch (err) {
                console.error('Error cargando productos en modal:', err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [visible]);

    // Auto-despliegue del dropdown
    useEffect(() => {
        if (visible && dropdownRef.current) {
            setTimeout(() => dropdownRef.current.show(), 0);
        }
    }, [visible]);

    const handleChange = e => {
        const product = e.value;
        onSelect(product);
        onHide();
    };

    return (
        <Dialog
            header="Seleccione producto"
            visible={visible}
            style={{ width: '60vw', height: '30vw' }}
            modal
            onHide={() => {
                onHide();
                onAfterSelect?.();
            }}
            draggable={false}
        >
            {loading ? (
                <LoadingScreen message="Cargando productos..." />
            ) : (
                <Dropdown
                    ref={dropdownRef}
                    options={items}
                    optionLabel={optionLabel}
                    optionValue={optionValue}
                    placeholder="Seleccione..."
                    onChange={handleChange}
                    style={{ width: '100%' }}
                    filter
                    appendTo="self"
                    virtualScrollerOptions={{
                        itemSize: 40,               // altura aproximada de cada opción en px
                        delay: 0                    // sin retraso al renderizar
                             }}
                />
            )}
        </Dialog>
    );
}
