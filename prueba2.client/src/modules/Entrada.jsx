import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import '../styles/Entrada.css';
import { useNavigate } from 'react-router-dom';
import { sampleMagistralEntries } from '../data/sampleMagistralEntries';
import ProductModal from '../components/ProductModal';


const Entrada = () => {

    // Campos a llenar en el formulario
    const formAlistamiento = {
        producto: '',
        codigoProducto: '',
        lote: '',
        registroINVIMA: '',
        fechaVencimiento: null,
        cantidad: '',
    }
    // Lista de tipos
    const tipos = [
        { label: 'Preparaci\u00f3n no oncol\u00f3gica', value: 'magistral' },
        { label: 'Preparaci\u00f3n oncol\u00f3gica', value: 'oncologico' },
        { label: 'Nutrici\u00f3n Parenteral', value: 'nutricion' },
        { label: 'Reenvase', value: 'reenvase' },
    ];

    // Hooks    
    const maxId = sampleMagistralEntries.length > 0
        ? Math.max(...sampleMagistralEntries.map(e => e.id))
        : 0;
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [nextId, setNextId] = useState(maxId + 1);
    const [entryType, setEntryType] = useState('magistral');
    const [form, setForm] = useState(formAlistamiento);

    const [elementosMagistral, setElementosMagistral] = useState(sampleMagistralEntries);
    const [elementosOncologico, setElementosOncologico] = useState([]);
    const [elementosNutricion, setElementosNutricion] = useState([]);
    const [elementosReenvase, setElementosReenvase] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [errors, setErrors] = useState({});

    const onProductSelect = product => {
        setForm(f => ({
            ...f,
            producto: product.nombre,
            codigoProducto: product.codigo,
            lote: product.lote,
            registroINVIMA: product.registroINVIMA,
            fechaVencimiento: product.fechaVencimiento
        }));

    };

    //Refs
    const productoRef = useRef(null);
    const cantidadRef = useRef(null);
    const toast = useRef(null);
    const dataTableRef = useRef(null);


    //Validación de campos
    const fieldLabels = {
        producto: 'Producto',
        cantidad: 'Cantidad',
    };

    // Handlers
    const handleNew = () => {

    };
    const handleClear = () => {
        setForm(formAlistamiento);
    };
    const handleAdd = () => {
        // Validación de campos obligatorios
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
        // 1) Construimos el objeto con los datos actuales + un id
        const nuevoRegistro = {
            ...form,
            id: nextId
        };

        // 2) Lo añadimos al array que toca según entryType
        switch (entryType) {
            case 'magistral':
                setElementosMagistral(prev => [...prev, nuevoRegistro]);
                break;
            case 'oncologico':
                setElementosOncologico(prev => [...prev, nuevoRegistro]);
                break;
            case 'nutricion':
                setElementosNutricion(prev => [...prev, nuevoRegistro]);
                break;
            case 'reenvase':
                setElementosReenvase(prev => [...prev, nuevoRegistro]);
                break;
            default:
                console.warn('Tipo de entrada desconocido:', entryType);
        }
        // 3) Preparamos el siguiente id y reseteamos el formulario
        setNextId(prev => prev + 1);
        setForm(formAlistamiento);

        toast.current.show({
            severity: 'success',
            summary: 'Agregado',
            detail: 'Solicitud a\u00F1adida correctamente',
            life: 2000
        });
    };

    const handleSave = () => {

    };

    const handleAfterSelect = () => {
        setTimeout(() => {
            if (cantidadRef.current) cantidadRef.current.focus();
        }, 100); // Delay para esperar que el modal se cierre
    };

    // Maneja la eliminación de filas
    const handleDeleteRow = (rowData) => {
        switch (entryType) {
            case 'magistral':
                setElementosMagistral(prev => prev.filter(item => item.id !== rowData.id));
                break;
            case 'oncologico':
                setElementosOncologico(prev => prev.filter(item => item.id !== rowData.id));
                break;
            case 'nutricion':
                setElementosNutricion(prev => prev.filter(item => item.id !== rowData.id));
                break;
            case 'reenvase':
                setElementosReenvase(prev => prev.filter(item => item.id !== rowData.id));
                break;
            default:
                console.warn('Tipo de entrada desconocido:', entryType);
        }
    };
    // Maneja la edición de filas
    const onRowEditInit = (event) => {
        // event.data es la fila; si necesitas, puedes guardar un clon
    };
    const onRowEditComplete = (e) => {
        const updatedRow = e.newData;
        switch (entryType) {
            case 'magistral':
                setElementosMagistral(prev =>
                    prev.map(item => item.id === updatedRow.id ? updatedRow : item)
                );
                break;
            case 'oncologico':
                setElementosOncologico(prev =>
                    prev.map(item => item.id === updatedRow.id ? updatedRow : item)
                );
                break;
            case 'nutricion':
                setElementosNutricion(prev =>
                    prev.map(item => item.id === updatedRow.id ? updatedRow : item)
                );
                break;
            case 'reenvase':
                setElementosReenvase(prev =>
                    prev.map(item => item.id === updatedRow.id ? updatedRow : item)
                );
                break;
            default:
                console.warn('Tipo de entrada desconocido en edición:', entryType);

        };
    };


    // Maneja la eliminación de filas
    const dateEditor = (options) => (
        <Calendar
            value={options.value}
            onChange={e => options.editorCallback(e.value)}
            dateFormat="yy/mm/dd"
            showIcon
        />
    );

    const numberEditor = (options) => (
        <InputNumber
            value={options.value}
            onValueChange={e => options.editorCallback(e.value)}
            min={0}
            showButtons

        />
    );

    //Renderiza la tabla de elementos según el tipo de entrada
    const renderTabla = () => {
        const dataTableRef = useRef(null);

        const data =
            entryType === 'magistral'
                ? elementosMagistral
                : entryType === 'oncologico'
                    ? elementosOncologico
                    : entryType === 'nutricion'
                        ? elementosNutricion
                        : elementosReenvase;

        return (
            <div className="tabla-container">
                <DataTable
                    value={data}
                    editMode="row"
                    dataKey="id"
                    scrollable scrollHeight="350px"
                    tableStyle={{
                        minWidth: '800px',
                        tableLayout: 'fixed'
                    }}
                    onRowEditComplete={onRowEditComplete}
                    removableSort
                    showGridlines
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
                    <Column field="id" header="ID" style={{
                        width: '60px'
                    }} />
                    <Column field="producto" header="Producto" sortable style={{
                        width: '550px'
                    }} />
                    <Column field="cantidad" header="Cantidad" sortable
                        editor={numberEditor}
                        style={{
                            width: '200px',
                        }} />
                    <Column field="lote" header="Lote" style={{
                        width: '120px'
                    }} />
                    <Column field="registroINVIMA" header="Registro INVIMA" style={{
                        width: '180px'
                    }} />
                    <Column
                        field="fechaVencimiento"
                        header="Vencimiento"
                        body={r => r.fechaVencimiento?.toLocaleDateString() || ''}
                        style={{
                            width: '140px'
                        }}
                    />

                </DataTable>
            </div>
        );
    };

    return (
        <div className="page">
            <Toast ref={toast} />
            <ProductModal
                visible={showProductModal}
                onHide={() => setShowProductModal(false)}
                onAfterSelect={handleAfterSelect}
                onSelect={onProductSelect}
            />

            {/* Botonera */}
            <div className="btn-group flex-wrap">
                <Button label="Consulta" icon="pi pi-search" className="btn-lg btn-success" onClick={handleNew} />
                <Button label="Limpiar" icon="pi pi-trash" className="btn-lg btn-success" onClick={handleClear} />
                <Button label="Agregar" icon="pi pi-file-plus" className="btn-lg btn-success" onClick={handleAdd} />
                <Button label="Guardar" icon="pi pi-save" className="btn-lg btn-success" onClick={handleSave} />
            </div>

            <div className="content">
                <div style={{ marginBottom: '1rem ' }}>
                    <div className="filter-container">
                        <Card>
                            <div className=" p-fluid form-grid-entrada">
                                <div className="p-field div1 ">
                                    <FloatLabel>
                                        <Dropdown
                                            options={tipos}
                                            optionLabel="label"
                                            optionValue="value"
                                            placeholder="Seleccione..."
                                            value={entryType}
                                            onChange={e => setEntryType(e.value)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    productoRef.current.focus();
                                                }
                                            }}
                                        />
                                        <label>Tipo de Preparacion </label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field p-inputgroup div2" >
                                    <InputText
                                        ref={productoRef}
                                        id="prod"
                                        value={form.producto}
                                        readOnly
                                        placeholder="Buscar nombre del producto"
                                        onClick={() => setShowProductModal(true)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                setShowProductModal(true);
                                            }
                                        }}
                                        style={{ cursor: 'pointer', background: '#f7f7f7' }}
                                    />
                                    <Button icon="pi pi-search" className="p-button btn-success"
                                        onClick={() => setShowProductModal(true)}
                                    />
                                </div>


                                <div className="p-field div3">
                                    <FloatLabel>
                                        <InputText
                                            id="lote"
                                            value={form.lote}
                                            onChange={e => setForm(f => ({ ...f, lote: e.target.value }))}
                                            disabled
                                        />
                                        <label htmlFor="lote">Lote</label>
                                    </FloatLabel>
                                </div>


                                <div className="p-field div4" >
                                    <FloatLabel>
                                        <Calendar
                                            id="fv"
                                            value={form.fechaVencimiento}
                                            onChange={e => setForm(f => ({ ...f, fechaVencimiento: e.value }))}
                                            placeholder="fecha de vencimiento"
                                            dateFormat="yy/mm/dd"
                                            showIcon
                                            disabled

                                        />
                                        <label htmlFor="fv">Fecha de vencimiento</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field div5" >
                                    <FloatLabel>                                <InputText
                                        id="reg"
                                        value={form.registroINVIMA}
                                        onChange={e => setForm(f => ({ ...f, registroINVIMA: e.target.value }))}
                                        disabled
                                    />
                                        <label htmlFor="reg">Registro INVIMA</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field div6" >
                                    <FloatLabel>
                                        <InputNumber
                                            ref={cantidadRef}
                                            id="cant"
                                            value={form.cantidad || null}
                                            onChange={e => setForm(f => ({ ...f, cantidad: e.value }))}
                                            placeholder=" "
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();  // opcional, evita comportamientos extraños
                                                    handleAdd();
                                                }
                                            }}
                                        />
                                        <label htmlFor="cant">Cantidad</label>
                                    </FloatLabel>
                                </div>
                                <div className="p-field div7">
                                    <Button label="Agregar" icon="pi pi-file-plus" className="btn-lg btn-success" onClick={handleAdd} />

                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
                {renderTabla()}
            </div>
        </div>
    );
};

export default Entrada;