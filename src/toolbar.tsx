import React, { useEffect } from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
} from "@ionic/react";
import "./toolbar.css";
import { useLoginViewModel } from "../src/viewmodels/LoginViewModel";

const GlobalToolbar: React.FC = () => {
   const { handleRoles, cambiopestaña, roles } = useLoginViewModel();


  useEffect(() => {
    handleRoles();
  }, []);

  

  return (
    <>
      <IonMenu side="start" menuId="main-menu" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Pestañas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" onClick={(e) => e.stopPropagation()}>
          {roles.map((datos, index) => (
            <IonButton
              key={index}
              onClick={() => cambiopestaña(datos.CN_ID_ROL)}
              className="button-tool-user"
              
            >
              {datos.CT_ROL}
            </IonButton>
          ))}
          <IonButton color={"danger"} onClick={() => cambiopestaña(5)} className="button-tool-user">
            Salir
          </IonButton>
        </IonContent>
      </IonMenu>

      <IonButtons slot="start">
        <IonMenuButton color={"medium"} menu="main-menu"></IonMenuButton>
      </IonButtons>
    </>
  );
};

export default GlobalToolbar;