import React from "react";
import {
  IonPage,
  IonInput,
  IonButton,
  IonContent,
} from "@ionic/react";
import { useLoginViewModel } from "../../viewmodels/LoginViewModel";
import "./Login.css";

const LoginView: React.FC = () => {
  const {
    _emailAddress,
    _password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useLoginViewModel();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "#186693",
          }}
        >
          <img
            style={{ width: "175px", height: "165px", marginBottom: "20px" }}
            src="././public/image.png"
            alt="Logo"
          />
          <div
            style={{
              width: "75%",
              maxWidth: "500px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
                handleLogin(e);
              }}
            >
              <div className="input-label">Usuario</div>
              <IonInput
                type="email"
                id="email"
                className="input-field"
                value={_emailAddress}
                onIonInput={handleEmailChange}
                required
              />
              <div className="input-label">Contraseña</div>
              <IonInput
                type="password"
                id="pass"
                className="input-field"
                value={_password}
                onIonInput={handlePasswordChange}
                required
              />

              <IonButton
                expand="block"
                type="submit"
                style={{ marginTop: "5%" }}
              >
                INICIAR SESIÓN
              </IonButton>

              <h6 style={{ marginTop: "10%", color: "blue" }}>
                Recuperar contraseña
              </h6>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginView;
