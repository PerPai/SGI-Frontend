// src/components/TecnicoSelect.tsx
import React from 'react';
import { IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { Usuarios } from '../../viewmodels/Types';

interface TecnicoSelectProps {
  tecnicos: Usuarios[];
  onChange: (value: any) => void;
}

const TecnicoSelect: React.FC<TecnicoSelectProps> = ({ tecnicos, onChange }) => {
  return (
    <IonItem>
      <IonSelect placeholder="Técnico" onIonChange={onChange}>
        <div slot="label">Tecnicos</div>
        {tecnicos.map((data, index) => (
          <IonSelectOption key={index} value={data.CT_CEDULA}>
            {"#" + data.CT_CEDULA + " " + data.CT_NOMBRE + " " + data.CT_APELLIDO_UNO}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};

export default TecnicoSelect;
