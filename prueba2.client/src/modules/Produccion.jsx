import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { sampleProduccionData } from '../data/sampleProduccionData';

import '../styles/Produccion.css';

const Produccion = () => {
    // Campos a llenar en el formulario
    const formProduccion = {
        servicio: '',
        empresa: '',
        ordenar: '',
        habitacion: '',
        ordenProduccion: '',
    }

    //Servicios
    const servicios = [
        { label: 'Urgencia', value: 'urgencia' },
        { label: 'Maternidad', value: 'maternidad' },
        { label: 'Cirug\u00EDa', value: 'cirugia' },
    ];

    //Ordenar por
    const ordenarPor = [
        { label: 'Fecha', value: 'fecha' },
        { label: 'Hora', value: 'hora' },
        { label: 'Habitaci\u00F3n', value: 'habitacion' },]

    //Empresa
    const empresas = [
        { label: 'Empresa A', value: 'empresaA' },
        { label: 'Empresa B', value: 'empresaB' },
        { label: 'Empresa C', value: 'empresaC' },
    ];

    const [entryType, setEntryType] = useState('');
    const [form, setForm] = useState(formProduccion);

    const handleNew = () => {
        console.log("New button clicked");
        // Logic for new action
    }
    const handleClear = () => {
        console.log("Clear button clicked");
        // Logic for clear action
    }
    const handleAdd = () => {
        console.log("Add button clicked");
        // Logic for add action
    }
    const handleSave = () => {
        console.log("Save button clicked");
        // Logic for save action
    }


    return (
        <div className="page">
            <div className="btn-group flex-wrap">
                <Button label="Consulta" icon="pi pi-search" className="btn-lg btn-success" onClick={handleNew} />
                <Button label="Limpiar" icon="pi pi-trash" className="btn-lg btn-success" onClick={handleClear} />
                <Button label="Agregar" icon="pi pi-file-plus" className="btn-lg btn-success" onClick={handleAdd} />
                <Button label="Guardar" icon="pi pi-save" className="btn-lg btn-success" onClick={handleSave} />
                <Button label="Imprimir " icon="pi pi-print" className="btn-lg btn-success" onClick={handleSave} />
            </div>

            <div className="content">
                <div style={{ marginBottom: '1rem ' }}>
                    <div className="filter-container">
                        <Card>
                            <div className=" p-fluid form-grid-produccion">
                                <div className="p-field proddiv1">
                                    <FloatLabel>
                                        <Dropdown
                                            options={servicios}
                                            optionLabel="label"
                                            optionValue="value"
                                            placeholder="Seleccione "
                                            value={entryType}
                                            onChange={e => setEntryType(e.value)}
                                            filter
                                        />
                                        <label>Servicio</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field proddiv2">
                                    <FloatLabel>
                                        <Dropdown
                                            id="empresa"
                                            options={empresas}
                                            value={form.empresa}
                                            onChange={e => setForm({ ...form, empresa: e.target.value })}
                                        />
                                        <label>Empresa</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field proddiv3">
                                    <FloatLabel>
                                        <Dropdown
                                            id="ordenar"
                                            options={ordenarPor}
                                            value={form.ordenar}
                                            onChange={e => setForm({ ...form, ordenar: e.target.value })}
                                        />
                                        <label>Ordenar</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field proddiv4">
                                    <FloatLabel>
                                        <InputText
                                            id="habitacion"
                                            value={form.habitacion}
                                            onChange={e => setForm({ ...form, habitacion: e.target.value })}
                                        />
                                        <label>Habitaci&oacute;n</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field proddiv5">
                                    <FloatLabel>
                                        <InputText
                                            id="ordenProduccion"
                                            value={form.ordenProduccion}
                                            onChange={e => setForm({ ...form, ordenProduccion: e.target.value })}
                                        />
                                        <label>Orden de Producci&oacute;n</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field proddiv6">
                                    <Button icon="pi pi-search" className="btn-lg btn-success" onClick={handleNew} />
                                </div>

                            </div>
                        </Card>
                    </div>
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                    <div className="tabla-container">
                        <DataTable
                            value={sampleProduccionData}
                            scrollable
                            scrollHeight="350px" 
                            showGridlines
                            tableStyle={{ minWidth: '2000px', tableLayout: 'fixed' }}
                        >
                            <Column field="Estado" header="Estado" style={{ width: '100px' }} />
                            <Column field="Habitacion" header="Habitaci&oacute;n" style={{ width: '120px' }} />
                            <Column field="Cedula" header="C&eacute;dula" style={{ width: '130px' }} />
                            <Column field="Nombre" header="Nombre" style={{ width: '180px' }} />
                            <Column field="Actividad" header="Actividad" style={{ width: '120px' }} />
                            <Column field="Medicamento" header="Medicamento" style={{ width: '200px' }} />
                            <Column field="frecuencia" header="Frecuencia" style={{ width: '110px' }} />
                            <Column field="Dosis24H" header="Dosis 24H" style={{ width: '100px' }} />
                            <Column field="DosisMinPresentacion" header="Dosis Min Presentación" style={{ width: '150px' }} />
                            <Column field="Dosisminsol" header="Dosis Min Sol" style={{ width: '120px' }} />
                            <Column field="DosisTotal24H" header="Dosis Total 24H" style={{ width: '120px' }} />
                            <Column field="Edad" header="Edad" style={{ width: '90px' }} />
                            <Column field="Hora" header="Hora" style={{ width: '90px' }} />
                            <Column field="historia" header="Historia" style={{ width: '90px' }} />
                            <Column field="Fecha" header="Fecha" style={{ width: '120px' }} />
                            <Column field="Ingreso" header="Ingreso" style={{ width: '100px' }} />
                            <Column field="itemorden" header="Item Orden" style={{ width: '110px' }} />
                            <Column field="Produccion" header="Producci&oacute;n" style={{ width: '120px' }} />
                            <Column field="NoOrden" header="No Orden" style={{ width: '100px' }} />
                                                        <Column field="Ingreso" header="Ingreso" style={{ width: '100px' }} />

                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Produccion;