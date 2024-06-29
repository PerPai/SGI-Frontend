// src/pages/GenerarIncidenciaView.tsx
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
  IonList,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import "./Asignacion.css";
import { useAsignarIncidenciaViewModel } from "../../viewmodels/AsignarIncidenciaViewModel";
import TecnicoSelect from "../../views/Asignacion/TecnicoSelec.component";
import { DiagnosticosCreados } from "../../viewmodels/Types";
import GlobalToolbar from "../../toolbar";

const incidenciaLocalStorage = JSON.parse(
  localStorage.getItem("CT_ID_INCIDENCIA_local") || "{}"
);

const GenerarIncidenciaView: React.FC = () => {
  const {
    CT_ID_INCIDENCIA,
    CF_FECHA_HORA_REGISTRO,
    CT_DESCRIPCION_INCIDENCIA,
    CN_PRIORIDAD,
    CN_RIESGO,
    CN_AFECTACION,
    CN_CATEGORIA,
    CT_LUGAR,
    CD_COSTO,
    CN_DURACION_GESTION,
    images,
    imageUrls,
    CT_TITULO,
    diagnosticos,
    incidencias,
    asignadas,
    CT_TECNICOS,
    setFechaHora,
    handleTituloChange,
    handleImageChange,
    handleIncidenciaChange,
    handleAsignacionChange,
    handleFechaHoraChange,
    handleIncidencias,
    handleTecnicos,
    handleTecnicoChange,
    handleDescripcionChange,
    handleLugarChange,
    handleAfectacionChange,
    handleRiesgoChange,
    handlePrioridadChange,
    handleCategoriaChange,
    handleCostoChange,
    handleVerDiagnosticosCreados,
    handleDuracionChange,
    handleCrear,
  } = useAsignarIncidenciaViewModel();

  const [tecnicoFields, setTecnicoFields] = useState<number[]>([0]);

  useEffect(() => {
    handleTecnicos();
  }, []);

  const addTecnicoField = () => {
    setTecnicoFields([...tecnicoFields, tecnicoFields.length]);
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

  return (
    <IonPage className="fondo">
      <GlobalToolbar />
      <IonContent fullscreen id="main-content">
        <h1 className="center-title">Asignar incidencia </h1>
        <div className="center-card-incidencia">
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                maxWidth: "60%",
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
                marginRight: "7%",
                padding: "5px 10px",
              }}
            >
              <h6 style={{ margin: 0 }}>
                Incidencia{" "}
                <strong>#{incidenciaLocalStorage.CT_ID_INCIDENCIA}</strong>
              </h6>
            </div>
            <form onSubmit={handleCrear}>
              <IonItem>
                <IonLabel>Categoría</IonLabel>
                <IonSelect
                  value={CN_CATEGORIA}
                  onIonChange={handleCategoriaChange}
                >
                  <IonSelectOption value="0">Reparacion </IonSelectOption>
                  <IonSelectOption value="1">
                    Intervencion por causa natural
                  </IonSelectOption>
                  <IonSelectOption value="2">
                    Atencion al mobiliario
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
              <div>
                <button className="boton-mas" onClick={addTecnicoField}>
                  +
                </button>
                {tecnicoFields.map((field, index) => (
                  <TecnicoSelect
                    key={index}
                    tecnicos={CT_TECNICOS}
                    onChange={(value) => handleTecnicoChange(value)}
                  />
                ))}
              </div>
              <IonItem className="modal-item">
                <IonLabel>Fecha y Hora</IonLabel>
                <span>
                  {formatDateTime(
                    incidenciaLocalStorage.CF_FECHA_HORA_REGISTRO
                  )}
                </span>
              </IonItem>
              <IonItem>
                <IonLabel>Lugar</IonLabel>
                <IonInput
                  readonly
                  className="right-align"
                  value={incidenciaLocalStorage.CT_LUGAR || "no hay lugar"}
                  onIonInput={handleLugarChange}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Descripción</IonLabel>
                <IonTextarea
                  readonly
                  className="right-align-w"
                  value={
                    incidenciaLocalStorage.CT_DESCRIPCION_INCIDENCIA || "..."
                  }
                  onIonInput={handleDescripcionChange}
                ></IonTextarea>
              </IonItem>

              <IonItem>
                <IonLabel>Tiempo Asignado</IonLabel>
                <IonInput
                  type="number"
                  placeholder="Hrs"
                  className="right-align"
                  value={CN_DURACION_GESTION}
                  onIonInput={handleDuracionChange}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Costo</IonLabel>
                <IonInput
                  type="number"
                  placeholder="$"
                  className="right-align"
                  value={CD_COSTO}
                  onIonInput={handleCostoChange}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Prioridad</IonLabel>
                <IonSelect
                  className="right-align"
                  value={CN_PRIORIDAD}
                  onIonChange={handlePrioridadChange}
                >
                  <IonSelectOption value="0">Alto</IonSelectOption>
                  <IonSelectOption value="1">Medio</IonSelectOption>
                  <IonSelectOption value="2">Bajo</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Riesgo</IonLabel>
                <IonSelect value={CN_RIESGO} onIonChange={handleRiesgoChange}>
                  <IonSelectOption value="0">Alto</IonSelectOption>
                  <IonSelectOption value="1">Medio</IonSelectOption>
                  <IonSelectOption value="2">Bajo</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Afectación</IonLabel>
                <IonSelect
                  value={CN_AFECTACION}
                  onIonChange={handleAfectacionChange}
                >
                  <IonSelectOption value="0">Alto</IonSelectOption>
                  <IonSelectOption value="1">Medio</IonSelectOption>
                  <IonSelectOption value="2">Bajo</IonSelectOption>
                </IonSelect>
              </IonItem>

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
                <IonButton type="submit">Asignar</IonButton>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GenerarIncidenciaView;
