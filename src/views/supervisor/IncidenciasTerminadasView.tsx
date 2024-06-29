import React, { useEffect } from 'react';
import {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonIcon,
} from '@ionic/react';
import { eyeOutline } from 'ionicons/icons';
import './IncidenciaTerminada.css';
import { useIncidenciaViewModel } from "../../viewmodels/IncidenciaViewModel";
import GlobalToolbar from '../../toolbar';

const IncidenciaView: React.FC = () => {
    const {
        asignadas,
        handleVerTerminado,
        handleTerminadosChange,
    } = useIncidenciaViewModel();

    useEffect(() => {
        handleVerTerminado();
    }, []);

    return (
        <IonPage className="fondo" >
               <GlobalToolbar />
            <IonContent fullscreen id="main-content">
                <h1 className="center-title">Incidencias Terminadas</h1>

                <div className="center-card-incidencia">
                    <div className="content-wrapper" style={{ marginTop: "50px" }}>
                        <h4 style={{ color: 'black', display: 'flex', justifyContent: 'center' }}>Incidencias</h4>
                        {asignadas.length === 0 ? (
                            <p>No hay Incidencias</p>
                        ) : (
                            asignadas.map((datos, index) => (
                                <IonCard id='uniquecard' key={index} style={{ marginBottom: '10px' }}>
                                    <IonCardHeader>
                                        <h5>Incidente #{datos.CT_ID_INCIDENCIA}</h5>
                                        <h5>{datos.CT_TITULO}</h5>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <div className="incident-meta">
                                            <span className="incident-priority">Prioridad: {datos.CN_PRIORIDAD}</span>
                                            <span className="incident-date">{datos.CF_FECHA_HORA_ASIGNACION}</span>
                                            <button
                                                type='button'
                                                onClick={() => handleTerminadosChange(datos.CT_ID_INCIDENCIA)}
                                                style={{ position: "inherit" }}
                                                className='view-button'
                                            >
                                                <IonIcon icon={eyeOutline} />
                                            </button>
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            ))
                        )}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default IncidenciaView;
