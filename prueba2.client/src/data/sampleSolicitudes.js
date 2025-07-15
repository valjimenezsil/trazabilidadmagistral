// src/data/sampleSolicitudes.js
export const sampleSolicitudes = [
    {
        id: 1,
        servicio: 'urgencia',
        medicamento: 'HIDROCORTISONA SUCCINATO SODICO 100 MG POLVO PARA INYECCI\u00D3N',
        cantidad: 1,
        volumen: 2,                // mL
        vehiculo: 'solucion_salina',
        concentracion: '50 mg/mL',
        observacion: 'Administrar lentamente en 2 mL'
    },
    {
        id: 2,
        servicio: 'urgencia',
        medicamento: 'RANITIDINA CLORHIDRATO 50 MG/2 ML SOLUCI\u00D3N INYECTABLE',
        cantidad: 1,
        volumen: 2,
        vehiculo: 'dextrosa_5',
        concentracion: '25 mg/mL',
        observacion: 'Monitorear signos vitales'
    },
    {
        id: 3,
        servicio: 'urgencia',
        medicamento: 'ALPROSTADIL 500 MCG SOLUCI\u00D3N INYECTABLE',
        cantidad: 1,
        volumen: 1,
        vehiculo: 'agua_inyeccion',
        concentracion: '0.5 mg/mL',
        observacion: 'Administrar en bolo lento'
    },
    {
        id: 4,
        servicio: 'maternidad',
        medicamento: 'FUROSEMIDA 20 MG/2 ML SOLUCI\u00D3N INYECTABLE',
        cantidad: 1,
        volumen: 2,
        vehiculo: 'solucion_salina',
        concentracion: '10 mg/mL',
        observacion: 'Observar diuresis'
    },
    {
        id: 5,
        servicio: 'maternidad',
        medicamento: 'METILPREDNISOLONA 500 MG POLVO PARA INYECCI\u00D3N',
        cantidad: 1,
        volumen: 10,
        vehiculo: 'dextrosa_5',
        concentracion: '50 mg/mL',
        observacion: 'Reconstituci\u00F3n con 10 mL de agua est\u00E9ril'
    },
    {
        id: 6,
        servicio: 'cirugia',
        medicamento: 'TIGECICLINA 50 MG INYECTABLE',
        cantidad: 1,
        volumen: 5,
        vehiculo: 'solucion_salina',
        concentracion: '10 mg/mL',
        observacion: 'Dosis de carga'
    },
    {
        id: 7,
        servicio: 'cirugia',
        medicamento: 'CEFAZOLINA 1 GR POLVO PARA RECONSTITUIR A SOLUCI\u00D3N INYECTABLE',
        cantidad: 1,
        volumen: 10,
        vehiculo: 'agua_inyeccion',
        concentracion: '100 mg/mL',
        observacion: 'Administrar antes de la incisi\u00F3n'
    }
];
