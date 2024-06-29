// src/viewmodels/LoginViewModel.ts

import { useState } from "react";
import { AuthServiceU } from "../services/AuthServices";
import { UserModel } from "../models/login.model";
import { useHistory } from "react-router-dom";
import { useIonToast } from '@ionic/react';
import { RolModel } from "../models/roles.model";

export function useLoginViewModel() {
  const [_emailAddress, setEmail] = useState("");
  const [_password, setPassword] = useState("");
  const [roles, setRoles] = useState<RolModel[]>([]);
  const history = useHistory();
  const [present] = useIonToast(); // Destructura la función `present` del hook `useIonToast`

  const handleEmailChange = (e: any) => {
    setEmail((e.target as HTMLInputElement).value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const presentToast = (position: 'top' | 'middle' | 'bottom', name: string) => {
    if (name === 'error') {
      present({
        message: 'Usuario o Contraseña incorrectos',
        duration: 1500,
        position: position,
        color: 'danger'
      });
      return false;
    }
    present({
      message: 'Bienvenido, ' + name,
      duration: 1500,
      position: position,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Agrega esto para prevenir el comportamiento por defecto del formulario
    try {
      const user: UserModel = { _emailAddress, _password };
      console.log('user: ', user);
      await AuthServiceU.login(user);
      const userInfo = localStorage.getItem('User');
      const userName = userInfo ? JSON.parse(userInfo).CT_NOMBRE : "";
      history.push("/incidencia");
      presentToast("top", userName);
    } catch (error) {
      presentToast("top", "error");
      console.error("Error logging in:", error);
    }
  };

  //estructura de prueba
  const handleRoles = async () => {
    const CT_CEDULA = JSON.parse(
      localStorage.getItem("User") || "{}"
    ).CT_CEDULA;
    try {
      const vacio: any = [];
      const response = await AuthServiceU.GetRoles(
        CT_CEDULA
      );
      console.log(response);

      if (
        !response ||
        response.length === 0 ||
        response[0].message === "No hay Diagnosticos"
      ) {
        setRoles(vacio);
      } else {
        setRoles(response); // Guardar los datos en el estado
      }
    } catch (error) {
      console.error("Error creando incidencia:", error);
    }
  };

  const cambiopestaña = async (dato: number) => {
    
   if (dato == 1) {
    history.push("/incidencia")
   }else if (dato == 2) {
    history.push("/incidencias")
   }else if (dato == 3) {
    history.push("/asignar")
   }else if (dato == 4) {
    history.push("/supervision/incidencias")
   }else if (dato == 5) {
    history.push("/")
   }
    window.location.reload();
  };

  return {
    _emailAddress,
    _password,
    roles,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    handleRoles,
    cambiopestaña
    
  };
}
