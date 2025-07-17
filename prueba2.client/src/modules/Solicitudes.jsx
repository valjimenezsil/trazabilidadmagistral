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
import { sampleSolicitudes } from '../data/sampleSolicitudes';
import { sampleMedicamentos } from '../data/sampleMedicamentos';

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
    const servicioRef = useRef(null);
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

    //Medicamentos del sample
    const medicamentosOptions = sampleMedicamentos.map(m => ({
        label: m.nombre,
        value: m.codigo
    }));

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
                    <Column field="medicamento"
                        header="Medicamento"
                        style={{ width: '550px' }}
                        body={row => {
                            const found = sampleMedicamentos.find(m => m.codigo === row.medicamento);
                            return found ? found.nombre : row.medicamento;
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
                                            placeholder="Seleccione "
                                            value={entryType}
                                            onChange={e => {
                                                setEntryType(e.value);
                                                setTimeout(() => {
                                                    if (medicamentoRef.current && medicamentoRef.current.focus) {
                                                        medicamentoRef.current.focus();
                                                    }
                                                }, 100); 
                                            }}
                                            filter
                                        />
                                        <label>Servicio</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field soldiv2">
                                    <Dropdown
                                        ref={medicamentoRef}
                                        id="medicamento"
                                        options={medicamentosOptions}
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Seleccione medicamento"
                                        value={form.medicamento}
                                        onChange={e => {
                                            setForm(f => ({ ...f, medicamento: e.value }));
                                            setTimeout(() => {
                                                if (cantidadRef.current) cantidadRef.current.focus();
                                            }, 100);
                                        }}
                                        filter
                                    />
                                </div>

                                <div className="p-field soldiv3">
                                    <FloatLabel>
                                        <InputNumber
                                            inputRef={cantidadRef}
                                            id="cantidad"
                                            value={form.cantidad}
                                            onChange={e => {
                                                setForm(f => ({ ...f, cantidad: e.value }));
                                                // Limpiar error al escribir algo válido
                                                if (e.value) setErrors(err => ({ ...err, cantidad: false }));
                                            }}
                                            className={errors.cantidad ? 'p-invalid' : ''}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    if (!form.cantidad || form.cantidad <= 0) {
                                                        e.preventDefault();
                                                        setErrors(err => ({ ...err, cantidad: true }));
                                                    } else {
                                                        setErrors(err => ({ ...err, cantidad: false }));
                                                        e.preventDefault();
                                                        volumenRef.current.focus();
                                                    }
                                                }
                                            }}
                                            onBlur={() => {
                                                if (!form.cantidad || form.cantidad <= 0) {
                                                    setErrors(err => ({ ...err, cantidad: true }));
                                                } else {
                                                    setErrors(err => ({ ...err, cantidad: false }));
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
                                            className={errors.volumen ? 'p-invalid' : ''}
                                            onChange={e => {
                                                setForm(f => ({ ...f, volumen: e.value }));
                                                if (e.value) setErrors(err => ({ ...err, volumen: false }));
                                            }}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    if (!form.volumen || form.volumen <= 0) {
                                                        e.preventDefault();
                                                        setErrors(err => ({ ...err, volumen: true }));
                                                    } else {
                                                        setErrors(err => ({ ...err, volumen: false }));
                                                        e.preventDefault();
                                                        vehiculoRef.current.focus();
                                                    }
                                                }
                                            }}
                                            onBlur={() => {
                                                if (!form.volumen || form.volumen <= 0) {
                                                    setErrors(err => ({ ...err, volumen: true }));
                                                } else {
                                                    setErrors(err => ({ ...err, volumen: false }));
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
                                            onChange={e => {
                                                setForm(f => ({ ...f, vehiculo: e.value }));
                                                setTimeout(() => {
                                                    if (concentracionRef.current) {
                                                        concentracionRef.current.focus();
                                                    }
                                                }, 100);
                                            }}
                                            filter
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
                                            suffix=" mg /mL"
                                            value={form.concentracion}
                                            className={errors.concentracion ? 'p-invalid' : ''}
                                            onChange={e => {
                                                setForm(f => ({ ...f, concentracion: e.value }));
                                                if (e.value) setErrors(err => ({ ...err, concentracion: false }));
                                            }}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    if (!form.concentracion || form.concentracion <= 0) {
                                                        e.preventDefault();
                                                        setErrors(err => ({ ...err, concentracion: true }));
                                                    } else {
                                                        setErrors(err => ({ ...err, concentracion: false }));
                                                        e.preventDefault();
                                                        observacionRef.current.focus();
                                                    }
                                                }
                                            }}
                                            onBlur={() => {
                                                if (!form.concentracion || form.concentracion <= 0) {
                                                    setErrors(err => ({ ...err, concentracion: true }));
                                                } else {
                                                    setErrors(err => ({ ...err, concentracion: false }));
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