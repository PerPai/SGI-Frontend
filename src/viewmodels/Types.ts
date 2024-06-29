export interface IncidenciaAsignada {
  CT_ID_INCIDENCIA: string;
  CF_FECHA_HORA_ASIGNACION: string;
  CT_TITULO: string;
  CT_DESCRIPCION_INCIDENCIA: string;
  CT_LUGAR: string;
  CN_PRIORIDAD: number;
}

export interface Reporte {
  tecnico: string;
  categoria: string;
  pendiente: string;
  terminado: string;
}

export interface IncidenciaCompleta {
  CN_CATEGORIA: number;
  CD_COSTO: string;
  CF_FECHA_HORA_REGISTRO: string;
  CN_AFECTACION: number;
  CN_DURACION_GESTION: string;
  CN_ID: string;
  CN_ID_ESTADO: string;
  CN_PRIORIDAD: number;
  CN_RIESGO: number;
  CT_CEDULA: string;
  CT_DESCRIPCION_INCIDENCIA: string;
  CT_ID_INCIDENCIA: string;
  CT_JUSTIFICACION_CIERRE: string;
  CT_LUGAR: string;
  CT_TITULO: string;
}

export interface DiagnosticosCreados {
  CF_FECHA_HORA_DIAGNOSTICO: string;
  CT_DIAGNOSTICO: string;
  CN_TIEMPO_ESTIMADO: string;
  CT_OBSERVACIONES: string;
  CB_REQUIERE_COMPRA: string;
  CT_ID_INCIDENCIA: string;
  CT_CEDULA: string;
}

export interface Usuarios {
  CT_NOMBRE: string;
  CT_APELLIDO_UNO: string;
  CT_APELLIDO_DOS: string;
  CN_TELEFONO: string;
  CT_CEDULA: string;
  CT_CORREO: string;
  CT_PUESTO: string;
  CN_DEPARTAMENTO: string;
  CB_ESTADO: string;
  CT_CONTRASENA: string;
  CN_ID_TRXU: string;
  CN_ID_ROL: string;
}
