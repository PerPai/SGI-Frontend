import React, { useEffect } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonButton,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonDatetime,
    IonModal,
    IonDatetimeButton,
    IonInput,
    IonTextarea,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
} from '@ionic/react';
import { eyeOutline } from 'ionicons/icons';
import './UsuariosAsignacion.css';
import { useAsignarIncidenciaViewModel } from "../../viewmodels/AsignarIncidenciaViewModel";
import GlobalToolbar from '../../toolbar';

const IncidenciaView: React.FC = () => {
    const {
        incidencias,
        handleIncidencias,
        handleAsignacionChange
    } = useAsignarIncidenciaViewModel();

    useEffect(() => {
        handleIncidencias();
    }, []);

    return (
        <IonPage className="fondo" >
               <GlobalToolbar />
            <IonContent fullscreen id="main-content">
                <h1 className="center-title">Incidencias</h1>

                <div className="center-card-incidencia">
                    <div className="content-wrapper" style={{ marginTop: "50px" }}>
                        <h4 style={{ color: 'black', display: 'flex', justifyContent: 'center' }}>Incidencias</h4>
                        {incidencias.length === 0 ? (
                            <p>No hay Incidencias</p>
                        ) : (
                            incidencias.map((datos, index) => (
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
                                                onClick={() => handleAsignacionChange(datos)}
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
