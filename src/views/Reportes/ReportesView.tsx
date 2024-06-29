import React, { useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonHeader,
} from "@ionic/react";
import "./Reporte.css";
import { useReporteViewModel } from "../../viewmodels/ReportesViewModel";
import GlobalToolbar from "../../toolbar";

const ReportesView: React.FC = () => {
  const { handleVerReportes, reportes } = useReporteViewModel();

  useEffect(() => {
    handleVerReportes();
  }, []);

  return (
    <IonPage className="fondo">
      <GlobalToolbar />
      <IonContent fullscreen id="main-content">
        <div className="center-card-incidencia">
          <h4
            style={{
              color: "black",
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "2%",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Cargas de Trabajo
          </h4>
          {reportes.length === 0 ? (
            <p>No hay Reportes</p>
          ) : (
            reportes.map((datos, index) => (
              <IonCard key={index} className="reporte-card">
                <IonCardHeader>
                  <div className="reporte-header">
                    <span className="reporte-numero">Reporte #{index + 1}</span>
                  </div>
                </IonCardHeader>
                <IonCardContent className="encolumnado">
                  <div className="reporte-categoria">
                    <span>Categoría</span>
                    <div className="dato-span">
                      <span>{datos.categoria}</span>
                    </div>
                  </div>
                  <div className="reporte-tecnicos">
                    <span>Técnicos</span>
                    <div className="dato-span">
                      <span>{datos.tecnico}</span>
                    </div>
                  </div>
                  <div className="reporte-horas">
                    <span>Horas H.</span>
                    <div className="dato-span">
                      <span>{datos.pendiente} hrs</span>
                    </div>
                  </div>
                  <div className="reporte-horas">
                    <span>Horas A.</span>
                    <div className="dato-span">
                      <span>{datos.terminado} hrs</span>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ReportesView;
