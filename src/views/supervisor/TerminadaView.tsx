import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonInput,
  IonTextarea,
  IonCard,
  IonCardContent,
  IonLabel,
  IonList,
} from "@ionic/react";
import "./Terminada.css";
import { useAsignarIncidenciaViewModel } from "../../viewmodels/AsignarIncidenciaViewModel";
import TecnicoSelect from "../../views/Asignacion/TecnicoSelec.component";
import GlobalToolbar from "../../toolbar";

const GenerarIncidenciaView: React.FC = () => {
  const {
    CT_TECNICOS,
    diagnosticos,
    DataCompleteIncidencia,
    DataCompleteUsuario,
    selectedDiagnostico,
    modal,
    handleImageChange,
    getCategoriaLabel,
    handleOpenModal,
    handleCloseModal,
    handleVerDatosSupervision,
    handleCambioEstado,
    handleTecnicos,
    handleTecnicoChange,
    handleDescripcionChange,
    handleVerDiagnosticosCreados,
    handleLugarChange,
    handleCostoChange,
    formatDateTime,
    getPriorityLabel,
    handleDuracionChange,
    handleCrear,
  } = useAsignarIncidenciaViewModel();

  const [tecnicoFields, setTecnicoFields] = useState<number[]>([0]);

  useEffect(() => {
    handleTecnicos();
    handleVerDiagnosticosCreados();
    handleVerDatosSupervision();
  }, []);

  const handleCambioEstadoClick = async (estado: string) => {
    await handleCambioEstado(estado);
        window.location.reload();
  };

  return (
    <IonPage className="fondo">
         <GlobalToolbar />
      <IonContent fullscreen id="main-content">
        <h1 className="center-title">Asignar incidencia</h1>
        <div className="center-card-incidencia">
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div
              style={{
                display: "flex",
                maxWidth: "70%",
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            >
              <h6 style={{ margin: 0 }}>
                Incidencia{" "}
                <strong>
                  #
                  {DataCompleteIncidencia.length > 0
                    ? DataCompleteIncidencia[0].CT_ID_INCIDENCIA
                    : "No Data"}
                </strong>
              </h6>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleCambioEstadoClick("8"); }}>
              <IonItem>
                <IonLabel className="ion-label">Categoría</IonLabel>
                <IonInput
                  readonly
                  className="right-align"
                  value={
                    DataCompleteIncidencia.length > 0
                      ? getCategoriaLabel(
                          DataCompleteIncidencia[0].CN_CATEGORIA
                        )
                      : "No Data"
                  }
                  onIonInput={handleCostoChange}
                ></IonInput>
              </IonItem>
              <div>
                {DataCompleteUsuario.map((data, index) => (
                  <IonItem className="modal-item" key={index}>
                    <IonLabel className="ion-label">Técnico</IonLabel>
                    <span>
                      {"#"+data.CT_CEDULA} {data.CT_NOMBRE} {data.CT_APELLIDO_UNO}
                    </span>
                  </IonItem>
                ))}
              </div>
              <IonItem className="modal-item">
                <IonLabel className="ion-label">Fecha y Hora</IonLabel>
                <span>
                  {DataCompleteIncidencia.length > 0
                    ? formatDateTime(
                        DataCompleteIncidencia[0].CF_FECHA_HORA_REGISTRO
                       )
                    : "No fecha"}
                </span>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-label">Lugar</IonLabel>
                <IonInput
                  readonly
                  className="right-align"
                  value={
                    DataCompleteIncidencia.length > 0
                      ? DataCompleteIncidencia[0].CT_LUGAR
                      : "No Data"
                  }
                  onIonInput={handleLugarChange}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-label">Descripción</IonLabel>
                <IonTextarea
                  readonly
                  className="right-align"
                  value={
                    DataCompleteIncidencia.length > 0
                      ? DataCompleteIncidencia[0].CT_DESCRIPCION_INCIDENCIA
                      : "No Data"
                  }
                  onIonInput={handleDescripcionChange}
                ></IonTextarea>
              </IonItem>

              <IonItem>
                <IonLabel className="ion-label">Tiempo Asignado</IonLabel>
                <IonInput
                  readonly
                  className="right-align"
                  value={
                    DataCompleteIncidencia.length > 0
                      ?"Hrs: "+ DataCompleteIncidencia[0].CN_DURACION_GESTION
                      : "No Data"
                  }
                  onIonInput={handleDuracionChange}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-label">Costo</IonLabel>
                <IonInput
                  readonly
                  className="right-align"
                  value={
                    DataCompleteIncidencia.length > 0
                      ? "$ "+ DataCompleteIncidencia[0].CD_COSTO
                      : "No Data"
                  }
                  onIonInput={handleCostoChange}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-label">Prioridad</IonLabel>
                <IonInput
                  readonly
                  className="right-align"
                  value={
                    DataCompleteIncidencia.length > 0
                      ? getPriorityLabel(DataCompleteIncidencia[0].CN_PRIORIDAD)
                      : "No Data"
                  }
                  onIonInput={handleCostoChange}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-label">Riesgo</IonLabel>
                <IonInput
                  readonly
                  className="right-align"
                  value={
                    DataCompleteIncidencia.length > 0
                      ? getPriorityLabel(DataCompleteIncidencia[0].CN_RIESGO)
                      : "No Data"
                  }
                  onIonInput={handleCostoChange}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className="ion-label">Afectación</IonLabel>
                <IonInput
                  readonly
                  className="right-align"
                  value={
                    DataCompleteIncidencia.length > 0
                      ? getPriorityLabel(
                          DataCompleteIncidencia[0].CN_AFECTACION
                        )
                      : "No Data"
                  }
                  onIonInput={handleCostoChange}
                ></IonInput>
              </IonItem>

              <IonCol size="12">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h4 style={{ color: "black" }}>Imágenes Reporte</h4>
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
                    <IonCol size="3" sizeMd="3" style={{ marginTop: "10px" }}>
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

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <IonButton
                  onClick={() => handleCambioEstadoClick("9")}
                  color="danger"
                  style={{ marginRight: "40%" }}
                >
                  Rechazar
                </IonButton>
                <IonButton type="submit" color="success">
                  Aceptar
                </IonButton>
              </div>
            </form>
          </div>
        </div>
        <div className="center-card-incidencia" style={{ minHeight: "50%" }}>
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <h4
              style={{
                color: "black",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Diagnósticos
            </h4>
            {diagnosticos.length === 0 ? (
              <p>No hay Diagnósticos</p>
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
                      <IonLabel className="ion-label">Fecha y Hora</IonLabel>
                      <span>
                        {formatDateTime(
                          selectedDiagnostico.CF_FECHA_HORA_DIAGNOSTICO
                        )}
                      </span>
                    </IonItem>
                    <IonItem className="modal-item">
                      <IonLabel className="ion-label">Diagnóstico</IonLabel>
                      <span>{selectedDiagnostico.CT_DIAGNOSTICO}</span>
                    </IonItem>
                    <IonItem className="modal-item">
                      <IonLabel className="ion-label">Tiempo Estimado</IonLabel>
                      <span>{selectedDiagnostico.CN_TIEMPO_ESTIMADO}</span>
                    </IonItem>
                    <IonItem className="modal-item">
                      <IonLabel className="ion-label">Observaciones</IonLabel>
                      <span>{selectedDiagnostico.CT_OBSERVACIONES}</span>
                    </IonItem>
                    <IonItem className="modal-item">
                      <IonLabel className="ion-label">Requiere Compra</IonLabel>
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

export default GenerarIncidenciaView;
