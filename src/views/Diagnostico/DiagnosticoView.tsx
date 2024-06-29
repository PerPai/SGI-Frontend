import React, { useEffect, useRef, useState } from "react";
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
  IonToggle,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonList,
  IonLabel,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import "./Diagnostico.css";
import { useDiagnosticoViewModel } from "../../viewmodels/DiagnosticoViewModel";
import { personCircle } from "ionicons/icons";
import { DiagnosticosCreados } from "../../viewmodels/Types";
import GlobalToolbar from "../../toolbar";

const DiagnosticoView: React.FC = () => {
  const {
    CF_FECHA_HORA_DIAGNOSTICO,
    CT_DIAGNOSTICO,
    CN_TIEMPO_ESTIMADO,
    CT_OBSERVACIONES,
    isContainerOpen,
    CB_REQUIERE_COMPRA,
    setRequiereCompra,
    handleVerDiagnosticosCreados,
    images,
    diagnosticos,
    setDiagnosticos,
    handleCambioEstado,
    handleCrear,
    setFechaHora,
    handleImageChange,
    handleFechaHoraChange,
    handleDiagnosticoChange,
    handleToggleChange,
    handleTiempoChange,
    handleDiagnosticosChange,
    toggleContainer,
    handleObservacionesChange,
  } = useDiagnosticoViewModel();

  useEffect(() => {
    handleVerDiagnosticosCreados();
  }, []);

  const [selectedDiagnostico, setSelectedDiagnostico] =
    useState<DiagnosticosCreados | null>(null);
  const modal = useRef<HTMLIonModalElement>(null);

  const handleOpenModal = (diagnostico: DiagnosticosCreados) => {
    setSelectedDiagnostico(diagnostico);
    modal.current?.present();
  };

  const handleCloseModal = () => {
    setSelectedDiagnostico(null);
    modal.current?.dismiss();
  };

  const formatDateTime = (dateTimeStr: string | number | Date) => {
    const date = new Date(dateTimeStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleString(undefined, options);
  };

  return (
    <IonPage className="fondo">
         <GlobalToolbar />
      <IonHeader></IonHeader>
      <IonContent fullscreen id="main-content">
        <div className="center-card">
          <div
            className="content-wrapper2"
            style={{ marginTop: "50px", marginBottom: "20px" }}
          >
            <h1
              style={{
                color: "black",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Diagnosticar
            </h1>
            <div
              className={`content-wrapper ${
                isContainerOpen ? "open" : "closed"
              }`}
            >
              {isContainerOpen && (
                <form onSubmit={handleCrear}>
                  <h4 style={{ color: "black" }}>Requiere Compra</h4>
                  <IonItem>
                    <IonToggle
                      checked={CB_REQUIERE_COMPRA === "1"}
                      onIonChange={handleToggleChange}
                    >
                      RC
                    </IonToggle>
                  </IonItem>

                  <h4 style={{ color: "black" }}>Diagnostico</h4>
                  <IonItem style={{ borderRadius: "8px" }}>
                    <IonTextarea
                      id="diagnostico"
                      className="textarea-auto-grow"
                      autoGrow={true}
                      value={CT_DIAGNOSTICO}
                      onIonInput={handleDiagnosticosChange}
                      placeholder="Enter text"
                    ></IonTextarea>
                  </IonItem>

                  <h4 style={{ color: "black" }}>Tiempo Estimado</h4>
                  <IonItem style={{ borderRadius: "8px" }}>
                    <IonInput
                      type="number"
                      id="tiempoestimado"
                      className="input-fixed-size"
                      value={CN_TIEMPO_ESTIMADO}
                      onIonInput={handleTiempoChange}
                      placeholder="Enter estimated time"
                    ></IonInput>
                  </IonItem>

                  <h4 style={{ color: "black" }}>Observaciones</h4>
                  <IonItem style={{ borderRadius: "8px" }}>
                    <IonTextarea
                      id="observaciones"
                      className="textarea-auto-grow"
                      autoGrow={true}
                      value={CT_OBSERVACIONES}
                      onIonInput={handleObservacionesChange}
                      placeholder="Enter text"
                    ></IonTextarea>
                  </IonItem>

                  <IonCol size="12">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 style={{ color: "black" }}>Imagenes Reporte</h4>
                      <input
                        type="file"
                        id="file-input"
                        onChange={handleImageChange}
                        className="file-input"
                        style={{ display: "none" }}
                      />
                    </div>
                  </IonCol>
                  <IonItem style={{ borderRadius: "10px" }}>
                    <IonGrid>
                      <IonRow>
                        <IonCol
                          size="3"
                          sizeMd="3"
                          style={{ marginTop: "10px" }}
                        >
                          <div
                            className="image-preview-wrapper"
                            style={{ maxHeight: "201px", maxWidth: "255px" }}
                          >
                            <img
                              src="./public/favicon.png"
                              className="image-preview"
                              style={{ maxHeight: "200px", maxWidth: "60px" }}
                            />
                          </div>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                  <IonCol size="12">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4 style={{ color: "black" }}>Imagenes Diagnostico</h4>
                      <IonButton
                        className="upload-button"
                        color="primary"
                        onClick={() =>
                          document.getElementById("file-input")?.click()
                        }
                      >
                        <IonIcon slot="icon-only" icon={cameraOutline} />
                      </IonButton>
                      <input
                        type="file"
                        id="file-input"
                        onChange={handleImageChange}
                        className="file-input"
                        style={{ display: "none" }}
                      />
                    </div>
                  </IonCol>

                  <IonItem style={{ borderRadius: "10px" }}>
                    <IonGrid>
                      <IonRow>
                        {images.map((image, index) => (
                          <IonCol
                            key={index}
                            size="3"
                            sizeMd="3"
                            style={{ marginTop: "10px" }}
                          >
                            <div
                              className="image-preview-wrapper"
                              style={{ maxHeight: "201px", maxWidth: "255px" }}
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                className="image-preview"
                                style={{ maxHeight: "200px", maxWidth: "60px" }}
                              />
                            </div>
                          </IonCol>
                        ))}
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "20px",
                    }}
                  >
                    <IonButton
                      onClick={handleCambioEstado}
                      color="dark"
                      style={{ marginRight: "25%" }}
                    >
                      Terminar
                    </IonButton>
                    <IonButton type="submit">Diagnosticar</IonButton>
                  </div>
                </form>
              )}
            </div>
            <button
              onClick={toggleContainer}
              color="secondary"
              style={{ height: "8%", width: "100%", borderRadius: "5.5px" }}
            >
              {isContainerOpen ? "▲" : "▼"}
            </button>
          </div>
        </div>

        <div className="center-card" style={{ minHeight: "100%" }}>
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <h4
              style={{
                color: "black",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Diagnosticos
            </h4>
            {diagnosticos.length == 0 ? (
              <p>No hay Diagnosticos</p> // Puedes cambiar esto por un mensaje que quieras mostrar o dejarlo vacío si no quieres mostrar nada
            ) : (
              diagnosticos.map((datos, index) => (
                <IonCard
                  id="uniquecard"
                  key={index}
                  style={{ marginBottom: "10px" }}
                >
                  <IonCardContent>
                    <div className="incident-meta">
                      <span className="incident-label">Fecha y Hora:</span>
                      <span className="incident-value">
                        {formatDateTime(datos.CF_FECHA_HORA_DIAGNOSTICO)}
                      </span>
                      <span className="incident-label">Diagnóstico:</span>
                      <span className="incident-value">
                        {datos.CT_DIAGNOSTICO}
                      </span>
                      <span className="incident-label">Tiempo Estimado:</span>
                      <span className="incident-value">
                        {datos.CN_TIEMPO_ESTIMADO}
                      </span>
                    </div>
                    <IonButton
                      onClick={() => handleOpenModal(datos)}
                      expand="block"
                      className="ion-button"
                      id="botonVer"
                    >
                      Ver Detalles
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ))
            )}

            <IonModal
              ref={modal}
              id="example-modal"
              isOpen={!!selectedDiagnostico}
              onDidDismiss={handleCloseModal}
            >
              <div className="modal-content">
                <h1>Detalles del Diagnóstico</h1>
                {selectedDiagnostico && (
                  <IonList lines="none">
                    <IonItem className="modal-item">
                      <IonLabel>Fecha y Hora</IonLabel>
                      <span>
                        {formatDateTime(
                          selectedDiagnostico.CF_FECHA_HORA_DIAGNOSTICO
                        )}
                      </span>
                    </IonItem>
                    <IonItem className="modal-item">
                      <IonLabel>Diagnóstico</IonLabel>
                      <span>{selectedDiagnostico.CT_DIAGNOSTICO}</span>
                    </IonItem>
                    <IonItem className="modal-item">
                      <IonLabel>Tiempo Estimado</IonLabel>
                      <span>{selectedDiagnostico.CN_TIEMPO_ESTIMADO}</span>
                    </IonItem>
                    <IonItem className="modal-item">
                      <IonLabel>Observaciones</IonLabel>
                      <span>{selectedDiagnostico.CT_OBSERVACIONES}</span>
                    </IonItem>
                    <IonItem className="modal-item">
                      <IonLabel>Requiere Compra</IonLabel>
                      <span>
                        {selectedDiagnostico.CB_REQUIERE_COMPRA === "1"
                          ? "No"
                          : "Sí"}
                      </span>
                    </IonItem>
                    <IonButton onClick={handleCloseModal} id="botonclose">
                      Cerrar
                    </IonButton>
                  </IonList>
                )}
              </div>
            </IonModal>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DiagnosticoView;
