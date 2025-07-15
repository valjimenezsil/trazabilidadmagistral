import React, { useState} from 'react';
import '../styles/Solicitudes.css'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FloatLabel } from 'primereact/floatlabel';
import { useNavigate } from 'react-router-dom';


const Solicitudes = () => {

    /*Hooks*/
    const [entryType, setEntryType] = useState('urgencia');
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
    /*Servicios */
    const servicios = [
        { label: 'Urgencia', value: 'urgencia' },
        { label: 'Maternidad', value: 'maternidad' },
        { label: 'Cirug\u00EDa', value: 'cirugia' },
    ];

    /*Funciones de botones*/
    const handleNew = () => { }
    const handleClear = () => { }
    const handleSave = () => { }
    const handleAdd = () => { }

    return (
        <div className="page">
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
                                        />
                                        <label>Servicio</label>
                                    </FloatLabel>
                                </div>

                                <div className="p-field soldiv2">
                                    <FloatLabel>
                                        <InputText
                                            id="medicamento"
                                            value={formSolicitudes.medicamento}
                                            onChange={(e) => formSolicitudes.medicamento = e.target.value}
                                        />
                                        <label>Medicamento</label>
                                    </FloatLabel>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Solicitudes;