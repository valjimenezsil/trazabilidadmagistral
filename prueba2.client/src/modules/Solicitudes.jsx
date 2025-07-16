import React, { useState, useRef } from 'react';
import '../styles/Solicitudes.css'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { sampleSolicitudes } from '../data/sampleSolicitudes';


const Solicitudes = () => {

    // Campos a llenar en el formulario
    const formSolicitudes = {
        servicio: '',
        medicamento: '',
        cantidad: null,
        volumen: null,
        vehiculo: '',
        concentracion: null,
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
    const [errors, setErrors] = useState({});

    //Refs
    const medicamentoRef = useRef(null);
    const cantidadRef = useRef(null);
    const volumenRef = useRef(null);
    const vehiculoRef = useRef(null);
    const concentracionRef = useRef(null);
    const observacionRef = useRef(null);
    const toast = useRef(null);

    //Validación de campos
    const fieldLabels = {
        medicamento: 'Medicamento',
        cantidad: 'Cantidad',
        volumen: 'Volumen',
        vehiculo: 'Veh\u00EDculo',
        concentracion: 'Concentraci\u00F3n'
    };

    //Funciones de botones
    const handleNew = () => { }
    const handleClear = () => setForm(formSolicitudes);
    const handleSave = () => { }
    const handleAdd = () => {

        const faltantes = Object.keys(fieldLabels).filter(key => {
            const val = form[key];
            return val === null || val === '' || val === undefined;
        });

        if (faltantes.length) {
            const detalle = faltantes.map(f => fieldLabels[f]).join(', ');
            const newErrors = faltantes.reduce((acc, f) => ({ ...acc, [f]: true }), {});
            setErrors(newErrors);

            toast.current.show({
                severity: 'error',
                detail: `No ha completado:  ${detalle}`,
                life: 4000
            });
            return;
        }
        setErrors({});
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

        toast.current.show({
            severity: 'success',
            summary: 'Agregado',
            detail: 'Solicitud a\u00F1adida correctamente',
            life: 2000
        });
    };

    // Funciones tabla
    const numberEditor = options => (
        <InputNumber
            value={options.value}
            onValueChange={e => options.editorCallback(e.value)}
            mode="decimal"
            showButtons
            min={0}
            style={{ minWidth: '100px' }}
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
    const handleDeleteRow = (rowData) => {
        setSolicitudes(prev =>
            prev.filter(solicitud => solicitud.id !== rowData.id)
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
                            width: '180px'
                        }}
                    />
                    <Column
                        field="volumen"
                        header="Volumen"
                        sortable
                        body={rowData =>
                            rowData.volumen != null
                                ? `${rowData.volumen} mL`
                                : ''
                        }
                        editor={numberEditor}
                        style={{
                            width: '180px'
                        }}
                    />
                    <Column field="vehiculo"
                        header="Veh&iacute;culo"
                        sortable
                        style={{ width: '180px' }}
                        body={row => {
                            const found = vehiculos.find(v => v.value === row.vehiculo);
                            return found ? found.label : row.vehiculo;
                        }} />
                    <Column field="concentracion"
                        header="Concentraci&oacute;n"
                        sortable
                        body={rowData =>
                            rowData.concentracion != null
                                ? `${rowData.concentracion} mg/mL`
                                : ''
                        }
                        editor={numberEditor}
                        style={{
                            width: '210px'
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
            <Toast ref={toast} />
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
                                        <InputNumber
                                            inputRef={cantidadRef}
                                            id="cantidad"
                                            value={form.cantidad}
                                            onChange={e => setForm(f => ({ ...f, cantidad: e.value }))}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    volumenRef.current.focus();
                                                }
                                            }}
                                        />
                                        <label>Cantidad</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field soldiv4">
                                    <FloatLabel>
                                        <InputNumber
                                            inputRef={volumenRef}
                                            id="volumen"
                                            placeholder="0 mL"
                                            suffix=" mL"
                                            value={form.volumen}
                                            onChange={e => setForm(f => ({ ...f, volumen: e.value }))}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    vehiculoRef.current.focus();
                                                }
                                            }}
                                        />
                                        <label>Volumen</label>
                                    </FloatLabel>
                                </div>
                                <div className="p-field soldiv5">
                                    <FloatLabel>
                                        <Dropdown
                                            ref={vehiculoRef}
                                            id="vehiculo"
                                            options={vehiculos}
                                            optionLabel="label"
                                            optionValue="value"
                                            placeholder="Seleccione..."
                                            value={form.vehiculo}
                                            onChange={e => setForm(f => ({ ...f, vehiculo: e.target.value }))}
                                            filter
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    concentracionRef.current.focus();
                                                }
                                            }}
                                        />

                                        <label>Veh&iacute;culo</label>
                                    </FloatLabel>
                                </div>
                                <div className="p-field soldiv6">
                                    <FloatLabel>
                                        <InputNumber
                                            inputRef={concentracionRef}
                                            id="concentracion"
                                            placeholder="0 mg /mL"
                                            value={form.concentracion}
                                            onChange={e => setForm(f => ({
                                                ...f, concentracion: e.value
                                            }))}
                                            suffix=" mg /mL"
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    observacionRef.current.focus();
                                                }
                                            }}
                                        />
                                        <label>Concentraci&oacute;n</label>
                                    </FloatLabel>
                                </div>
                                <div className="p-field soldiv7">
                                    <FloatLabel>
                                        <InputText
                                            ref={observacionRef}
                                            id="observacion"
                                            value={form.observacion}
                                            onChange={e => setForm(f => ({ ...f, observacion: e.target.value }))}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAdd();
                                                }
                                            }}
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