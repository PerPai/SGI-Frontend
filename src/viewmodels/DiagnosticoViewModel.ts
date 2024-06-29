import { useState } from "react";
import { AuthServiceDiagnostico } from "../services/AuthServices.Diagnostico";
import { AuthServiceIncidencia } from "../services/AuthServices.Incidencia";
import { DiagnosticoModel } from "../models/diagnostico.model";
import { IncidenciaTerminadaModel } from "../models/incidencia.model";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { DiagnosticosCreados } from "./Types";
import { useIonToast } from "@ionic/react";


export function useDiagnosticoViewModel() {
  const [CF_FECHA_HORA_DIAGNOSTICO, setFechaHora] = useState("");
  const [CT_DIAGNOSTICO, setDiagnostico] = useState("");
  const [CN_TIEMPO_ESTIMADO, setTiempo] = useState("");
  const [CT_OBSERVACIONES, setObservaciones] = useState("");
  const [CB_REQUIERE_COMPRA, setRequiereCompra] = useState("0");
  const history = useHistory();

  const [date, setDate] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [diagnosticos, setDiagnosticos] = useState<DiagnosticosCreados[]>([]);

  const [isContainerOpen, setIsContainerOpen] = useState(false);
  const [present] = useIonToast(); // Destructura la función `present` del hook `useIonToast`


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      const imageUrl = URL.createObjectURL(selectedImage);
      setImages([...images, selectedImage]);
      setImageUrls([...imageUrls, imageUrl]);
    }
  };

  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: 'Se ha creado el Diagnostico con exito',
      duration: 1500,
      position: position,
    });
  };

  const toggleContainer = () => {
    setIsContainerOpen(!isContainerOpen);
};

  const handleFechaHoraChange = (e: CustomEvent) => {
    setFechaHora(e.detail.value as string);
  };
  const handleDiagnosticoChange = () => {
    history.push("/diagnostico");
    window.location.reload();
  };

  const handleToggleChange = (e: CustomEvent) => {
    setRequiereCompra(e.detail.checked ? "1" : "0");
  };

  const handleDiagnosticosChange = (e: CustomEvent) => {
    setDiagnostico(e.detail.value as string);
  };
  const handleTiempoChange = (e: CustomEvent) => {
    setTiempo(e.detail.value as string);
  };
  const handleObservacionesChange = (e: CustomEvent) => {
    setObservaciones(e.detail.value as string);
  };

  const handleVerDiagnosticosCreados = async () => {
    try {
      const vacio: any = [];
      const CT_ID_INCIDENCIA = JSON.parse(localStorage.getItem('CT_ID_INCIDENCIA_local') || '{}');
      console.log('CT_ID_INCIDENCIA: ', CT_ID_INCIDENCIA.CT_ID_INCIDENCIA);
  
      const response = await AuthServiceDiagnostico.GetDiagnosticos(CT_ID_INCIDENCIA.CT_ID_INCIDENCIA);
      console.log(response);
  
      if (!response || response.length === 0 || response[0].message === "No hay Diagnosticos") {
        setDiagnosticos(vacio);
      } else {
        setDiagnosticos(response); // Guardar los datos en el estado
      }
    } catch (error) {
      console.error("Error creando incidencia:", error);
    }
  }
  

  const handleCrear = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    const CT_CEDULA = JSON.parse(localStorage.getItem('User') || '{}').CT_CEDULA;
    const User = JSON.parse(localStorage.getItem('CT_ID_INCIDENCIA_local') || '{}');
    const CT_ID_INCIDENCIA = User.CT_ID_INCIDENCIA;
    let formattedDate = "";
    if (CF_FECHA_HORA_DIAGNOSTICO !== "") {
      formattedDate = CF_FECHA_HORA_DIAGNOSTICO;
      console.log(formattedDate);
    } else {
      formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log(formattedDate);
    }
    if (!CT_DIAGNOSTICO || !CN_TIEMPO_ESTIMADO || !CT_OBSERVACIONES) {
      present({
        message: 'Todos los campos son obligatorios',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      return;
    }else{
    try {
      const diagnostico: DiagnosticoModel = { CF_FECHA_HORA_DIAGNOSTICO: formattedDate, CT_DIAGNOSTICO, CN_TIEMPO_ESTIMADO, CT_OBSERVACIONES, CB_REQUIERE_COMPRA, CT_ID_INCIDENCIA, CT_CEDULA};
      console.log('diagnostico: ', diagnostico);
      await AuthServiceDiagnostico.crearDiagnostico(diagnostico);
      await AuthServiceIncidencia.bitacora(CT_CEDULA,User.CT_ID_INCIDENCIA, User.CN_AFECTACION, User.CB_REQUIERE_COMPRA, CN_TIEMPO_ESTIMADO,3);
      setDiagnostico("");
      setTiempo("");
      setObservaciones("");
      setRequiereCompra("0");
      await presentToast("top");
      await handleVerDiagnosticosCreados();
    } catch (error) {
      console.error("Error creating incidencia:", error);
    }
  }};

  const handleCambioEstado = async () => {
    const CT_ID_INCIDENCIA = JSON.parse(localStorage.getItem('CT_ID_INCIDENCIA_local') || '{}');
    const CT_CEDULA = JSON.parse(
      localStorage.getItem("User") || "{}"
    );
    try {
      await AuthServiceIncidencia.CambioEstado(CT_ID_INCIDENCIA.CT_ID_INCIDENCIA, "7", CT_CEDULA.CT_CEDULA);
      setDiagnostico("");
      setTiempo("");
      setObservaciones("");
      setRequiereCompra("0");
      await presentToast("top");
      await history.push("/incidencias");
      window.location.reload();
    } catch (error) {
      console.error("Error creating incidencia:", error);
    }
  };

  return {
    CF_FECHA_HORA_DIAGNOSTICO,
    CT_DIAGNOSTICO,
    CN_TIEMPO_ESTIMADO,
    CT_OBSERVACIONES,
    setIsContainerOpen,
    CB_REQUIERE_COMPRA, 
    setRequiereCompra,
    handleToggleChange,
    handleVerDiagnosticosCreados,    
    isContainerOpen,
    images,
    diagnosticos,
    setDiagnosticos,
    handleCambioEstado,
    handleCrear,
    setFechaHora,
    handleImageChange,
    toggleContainer,
    handleFechaHoraChange,
    handleDiagnosticoChange,
    handleDiagnosticosChange,
    handleTiempoChange,
    handleObservacionesChange,
  };
}


