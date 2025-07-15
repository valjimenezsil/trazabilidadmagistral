import React, { useState } from 'react';
import '../styles/Solicitudes.css'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FloatLabel } from 'primereact/floatlabel';
import { useNavigate } from 'react-router-dom';
import {sampleSolicitudes} from '../data/sampleSolicitudes'; 


const Solicitudes = () => {

    // Campos a llenar en el formulario
    const formSolicitudes = {
        servicio: '',
        medicamento: '',
        cantidad: '',
        volumen: '',
        vehiculo: '',
        concentracion: '',
        observacion: '',
    }

    //Servicios
    const servicios = [
        { label: 'Urgencia', value: 'urgencia' },
        { label: 'Maternidad', value: 'maternidad' },
        { label: 'Cirug\u00EDa', value: 'cirugia' },
    ];

    //Vehiculos
    const vehiculos = [
        { label: 'Soluci\u00F3n salina 0.9%', value: 'solucion_salina' },
        { label: 'Dextrosa 5%', value: 'dextrosa_5' },
        { label: 'Agua para inyecci\u00F3n', value: 'agua_inyeccion' },
    ];

    //Hooks
    const [entryType, setEntryType] = useState('urgencia');
    const [form, setForm] = useState(formSolicitudes);
    const [solicitudes, setSolicitudes] = useState(sampleSolicitudes)
    const maxId = sampleSolicitudes.length > 0
        ? Math.max(...sampleSolicitudes.map(s => s.id))
        : 0;
    const [nextId, setNextId] = useState(maxId + 1);


    //Funciones de botones
    const handleNew = () => { }
    const handleClear = () => setForm(formSolicitudes);
    const handleSave = () => { }
    const handleAdd = () => {
        const nueva = {
            id: nextId,
            servicio: entryType,
            medicamento: form.medicamento,
            cantidad: form.cantidad,
            volumen: form.volumen,
            vehiculo: form.vehiculo,
            concentracion: form.concentracion,
            observacion: form.observacion,
        };
        setSolicitudes(prev => [...prev, nueva]);
        setNextId(prev => prev + 1);
        setForm(formSolicitudes);
}

    // Funciones tabla
    const numberEditor = options => (
        <InputNumber
            value={options.value}
            onValueChange={e => options.editorCallback(e.value)}
            mode="decimal"
            showButtons
            min={0}
            style={{ width: '4rem' }}
            inputStyle={{ width: '3rem' }}
        />
    );

    const onRowEditInit = () => { };
    const onRowEditCancel = () => { };
    const onRowEditComplete = e => {
        const updated = e.newData;
        setSolicitudes(prev =>
            prev.map(s => s.id === updated.id ? updated : s)
        );
    };

    const rendertabla = () => {
        const data = solicitudes.filter(s => s.servicio === entryType);
        return (
            <div className="tabla-container">
                <DataTable
                    value={data}
                    editMode="row"
                    dataKey="id"
                    scrollable
                    scrollHeight="350px"
                    removableSort
                    showGridlines
                    onRowEditInit={onRowEditInit}
                    onRowEditCancel={onRowEditCancel}
                    onRowEditComplete={onRowEditComplete}
                    tableStyle={{ minWidth: '800px', tableLayout: 'fixed' }}
                >
                    <Column
                        headerClassName="no-border-right btn-col"
                        bodyClassName="no-border-right btn-col"
                        body={row => (
                            <Button
                                icon="pi pi-times"
                                rounded text severity="danger"
                                size="small"
                                aria-label="Eliminar"
                                onClick={() => handleDeleteRow(row)}
                            />
                        )}
                        style={{ width: '30px', textAlign: 'center' }}
                    />
                    <Column rowEditor headerClassName="no-border-left btn-col"
                        bodyClassName="no-border-left btn-col"
                        style={{ width: '110px', textAlign: 'center' }}
                    />
                    <Column field="medicamento" header="Medicamento" style={{
                        width: '550px'
                    }} />
                    <Column
                        field="cantidad"
                        header="Cantidad"
                        sortable
                        editor={numberEditor}
                        style={{
                            width: '120px'
                        }}
                    />
                    <Column
                        field="volumen"
                        header="Volumen"
                        sortable
                        style={{
                            width: '140px'
                        }}
                    />
                    <Column field="vehiculo"
                        header="Veh&iacute;culo"
                        sortable
                        style={{ width: '140px' }}
                    body={row => {
                        const found = vehiculos.find(v => v.value === row.vehiculo);
                        return found ? found.label : row.vehiculo;
                    }}                    />
                    <Column field="concentracion" header="Concentraci&oacute;n" sortable style={{
                        width: '180px'
                    }} />
                    <Column field="observacion" header="Observaci&oacute;n" style={{
                        width: '180px'
                    }} />
                </DataTable>
            </div>
        );
    };

    return (
        <div className="page">
            <div className="btn-group flex-wrap">
                <Button label="Consulta" icon="pi pi-search" className="btn-lg btn-success" onClick={handleNew} />
                <Button label="Limpiar" icon="pi pi-trash" className="btn-lg btn-success" onClick={handleClear} />
                <Button label="Agregar" icon="pi pi-file-plus" className="btn-lg btn-success" onClick={handleAdd} />
                <Button label="Guardar" icon="pi pi-save" className="btn-lg btn-success" onClick={handleSave} />
                <Button label="Exportar" icon="pi pi-save" className="btn-lg btn-success" onClick={handleSave} />

            </div>

            <div className="content">
                <div style={{ marginBottom: '1rem ' }}>
                    <div className="filter-container">
                        <Card>
                            <div className=" p-fluid form-grid-solicitudes">

                                <div className="p-field soldiv1">
                                    <FloatLabel>
                                        <Dropdown
                                            options={servicios}
                                            optionLabel="label"
                                            optionValue="value"
                                            placeholder="Seleccione..."
                                            value={entryType}
                                            onChange={e => setEntryType(e.value)}
                                            filter
                                        />
                                        <label>Servicio</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field  p-inputgroup soldiv2">
                                    <InputText
                                        id="medicamento"
                                        value={form.medicamento}
                                        onChange={e => setForm(f => ({ ...f, medicamento: e.target.value }))}
                                        placeholder="Buscar medicamento"
                                    />
                                    <Button icon="pi pi-search" className="p-button btn-success" />
                                </div>

                                <div className="p-field soldiv3">
                                    <FloatLabel>
                                        <InputText
                                            id="cantidad"
                                            value={form.cantidad}
                                            onChange={e => setForm(f => ({ ...f, cantidad: e.target.value }))}
                                        />
                                        <label>Cantidad</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field soldiv4">
                                    <FloatLabel>
                                        <InputText
                                            id="volumen"
                                            value={form.volumen}
                                            onChange={e => setForm(f => ({ ...f, volumen: e.target.value }))}
                                        />
                                        <label>Volumen</label>
                                    </FloatLabel>
                                </div>
                                <div className="p-field soldiv5">
                                    <FloatLabel>
                                        <InputText
                                            id="vehiculo"
                                            value={form.vehiculo}
                                            onChange={e => setForm(f => ({ ...f, vehiculo: e.target.value }))}
                                        />
                                        <label>Veh&iacute;culo</label>
                                    </FloatLabel>
                                </div>
                                <div className="p-field soldiv6">
                                    <FloatLabel>
                                        <InputText
                                            id="concentracion"
                                            value={form.concentracion}
                                            onChange={e => setForm(f => ({ ...f, concentracion: e.target.value }))}
                                        />
                                        <label>Concentraci&oacute;n</label>
                                    </FloatLabel>
                                </div>
                                <div className="p-field soldiv7">
                                    <FloatLabel>
                                        <InputText
                                            id="observacion"
                                            value={form.observacion}
                                            onChange={e => setForm(f => ({ ...f, observacion: e.target.value }))}
                                        />
                                        <label>Observaci&oacute;n</label>
                                    </FloatLabel>
                                </div>
                                <div className="p-field soldiv8">
                                    <Button label="Agregar" icon="pi pi-file-plus" className="btn-lg btn-success" onClick={handleAdd} />
                                </div>                               
                    </div>
                
                </Card>

                    </div>
                </div>
                {rendertabla()}
            </div>
        </div>
    );
};

export default Solicitudes;