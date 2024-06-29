// src/viewmodels/LoginViewModel.ts

import { useState } from "react";
import { AuthServiceU } from "../services/AuthServices";
import { UserModel } from "../models/login.model";
import { useHistory } from "react-router-dom";
import { useIonToast } from '@ionic/react';
import { RolModel } from "../models/roles.model";
import { AuthServiceReportes } from "../services/AuthServices.Reportes";
import { Reporte } from "./Types";

export function useReporteViewModel() {
  const [_emailAddress, setEmail] = useState("");
  const [reportes, setReportes] = useState<Reporte[]>([]);

  const [present] = useIonToast(); // Destructura la función `present` del hook `useIonToast`

  const handleEmailChange = (e: any) => {
    setEmail((e.target as HTMLInputElement).value);
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

  const handleVerReportes = async () => {
    try {
      const vacio: any = [];

      const response = await AuthServiceReportes.GetReportes();
      console.log(response);
  
      if (!response || response.length === 0 || response[0].message === "No hay Diagnosticos") {
        setReportes(vacio);
      } else {
        setReportes(response); // Guardar los datos en el estado
      }
    } catch (error) {
      console.error("Error creando incidencia:", error);
    }
  }

  return {
    _emailAddress,
    handleEmailChange,
    handleVerReportes,
    reportes
    
  };
}
