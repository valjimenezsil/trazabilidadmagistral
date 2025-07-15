import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import '../styles/Layout.css';



const Layout = ({ children }) => {
    const [visibleSidebar, setVisibleSidebar] = useState(false);

    const home = {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => window.location.href = '/'
    };

    const menuItems = [
        {
            label: 'Ayuda',
            icon: <HelpOutlineOutlinedIcon fontSize='small' />,
            items: [{
                label: 'Gu\u00edas qu\u00edmicas',
                command: () => window.location.href = '/guia-usuario'
            },
            {
                label: 'Maestros',
                items: [
                    {
                        label: 'Maestro 1',
                        command: () => window.location.href = '/maestro-productos'
                    },
                    {
                        label: 'Maestro 2',
                        command: () => window.location.href = '/maestro-productos'
                    }
                ]
            }
            ]
        },
        {
            label: 'Alistamiento', icon: <Inventory2OutlinedIcon fontSize='small' />,
            command: () => window.location.href = '/entrada',
            className: location.pathname === '/entrada'
                ? 'p-menuitem-active'
                : ''
        },
        { label: 'Solicitudes', icon: <InboxOutlinedIcon fontSize='small' />, command: () => window.location.href = '/solicitudes' },
        {
            label: 'Producci\u00f3n',
            icon: <SettingsOutlinedIcon fontSize="small" />,
            items: [
                {
                    label: 'Producci\u00f3n',
                    command: () => (window.location.href = '/produccion'),
                },
                {
                    label: 'Revisi\u00f3n',
                    command: () => (window.location.href = '/revision'),
                }]
        },
        {
            label: 'Adecuaci\u00f3n',
            icon: <CleaningServicesOutlinedIcon fontSize='small' />,
            items: [
                {
                    label: 'Preparaci\u00f3n',
                    command: () => (window.location.href = '/preparacion'),
                },
                {
                    label: 'Acondicionamiento',
                    command: () => (window.location.href = '/acondicionamiento'),
                },
                {
                    label: 'Calidad',
                    command: () => (window.location.href = '/calidad'),
                }
            ]
        },
        { label: 'Preparaci\u00f3n', icon: <ScienceOutlinedIcon fontSize='small' />, command: () => window.location.href = '/reportes' },
        {
            label: 'Control',
            icon: <DoneAllOutlinedIcon fontSize='small' />,
            items: [
                {
                    label: 'Control de calidad',
                    command: () => (window.location.href = '/control-calidad'),
                },
                {
                    label: 'Control de proceso',
                    command: () => (window.location.href = '/control-proceso'),
                },
                {
                    label: 'Liberaci\u00f3n',
                    command: () => (window.location.href = '/liberacion'),
                }
            ]
        },
        { label: 'Reportes', icon: <DownloadOutlinedIcon fontSize='small' />, command: () => window.location.href = '/reportes' },
    ];


    return (
        <div className="layout" >
            {/* Barra de navegación superior */}
            < Menubar start={< Button label={home.label} icon={home.icon} onClick={home.command} className="btn-succes-letter p-button-text" />}
                model={menuItems} />

            {/* Contenedor principal de contenido */}
            < div className="layout-content" >
                {children}
            </div >

            {/* Pie de página opcional */}
            < footer className="layout-footer" >
                {new Date().getFullYear()} Trazabilidad Magistral
            </footer >
        </div >

    );
};

export default Layout;