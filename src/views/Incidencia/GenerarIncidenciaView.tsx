import React, { useEffect, useCallback } from 'react';
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
    IonTextarea,
    IonInput
} from '@ionic/react';
import { cameraOutline } from 'ionicons/icons';
import './Incidencia.css';
import { useIncidenciaViewModel } from "../../viewmodels/IncidenciaViewModel";
import GlobalToolbar from '../../toolbar';

const GenerarIncidenciaView: React.FC = () => {
    const {
        CT_DESCRIPCION_INCIDENCIA,
        CT_LUGAR,
        images,
        CT_TITULO,
        setFechaHora,
        asignadas,
        handleImageChange,
        handleTituloChange,
        handleVerAsignado,
        handleIncidenciaChange,
        handleDiagnosticoChange,
        handleFechaHoraChange,
        handleDescripcionChange,
        handleLugarChange,
        handleCrear,
    } = useIncidenciaViewModel();


    const handleFileInputClick = useCallback(() => {
        document.getElementById('file-input')?.click();
    }, []);


    return (
        <IonPage className="fondo">
   <GlobalToolbar />
   
            <IonContent fullscreen id="main-content">
         
                <h1 className="center-title">Generar incidencia</h1>
                <div className="center-card-incidencia">

                    <div className="content-wrapper" style={{ marginTop: "50px" }}>
                        <h1 style={{ alignContent: "center", marginBottom: "15%" }}>Incidencia</h1>
                        <form onSubmit={handleCrear}>
                            <h4 style={{ color: 'black' }}>Titulo</h4>
                            <IonItem style={{ borderRadius: '8px' }}>
                                <IonTextarea
                                    id='descripcion'
                                    style={{ height: 'auto' }}
                                    autoGrow={true}
                                    placeholder="Enter text"
                                    value={CT_TITULO}
                                    onIonInput={handleTituloChange}
                                ></IonTextarea>
                            </IonItem>
                            <h4 style={{ color: 'black' }}>Lugar</h4>
                            <IonItem style={{ width: '75%', borderRadius: '8px' }}>
                                <IonInput
                                    aria-label="Lugar"
                                    id='lugar'
                                    value={CT_LUGAR}
                                    onIonInput={handleLugarChange}
                                ></IonInput>
                            </IonItem>
                            <h4 style={{ color: 'black' }}>Descripción</h4>
                            <IonItem style={{ borderRadius: '8px' }}>
                                <IonTextarea
                                    id='descripcion'
                                    style={{ height: 'auto' }}
                                    autoGrow={true}
                                    placeholder="Enter text"
                                    value={CT_DESCRIPCION_INCIDENCIA}
                                    onIonInput={handleDescripcionChange}
                                ></IonTextarea>
                            </IonItem>
                            <IonCol size="12">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h4 style={{ color: 'black' }}>Imagenes</h4>
                                    <IonButton
                                        className="upload-button"
                                        color="primary"
                                        onClick={handleFileInputClick}
                                    >
                                        <IonIcon slot="icon-only" icon={cameraOutline} />
                                    </IonButton>
                                    <input
                                        type="file"
                                        id="file-input"
                                        onChange={handleImageChange}
                                        className="file-input"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </IonCol>
                            <IonItem style={{ borderRadius: "10px" }}>
                                <IonGrid>
                                    <IonRow>
                                        {images.map((image, index) => (
                                            <IonCol key={index} size="3" sizeMd="3" style={{ marginTop: '10px' }}>
                                                <div className="image-preview-wrapper" style={{ maxHeight: '201px', maxWidth: '255px' }}>
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        className="image-preview"
                                                        style={{ maxHeight: '200px', maxWidth: '60px' }}
                                                    />
                                                </div>
                                            </IonCol>
                                        ))}
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <IonButton type="submit">Enviar</IonButton>
                            </div>
                        </form>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default GenerarIncidenciaView;
