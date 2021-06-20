export interface Sympton {
  id: number;
  name: string;
  image: string;
}

export interface SymptonDetail {
  id: number;
  name: string;
}

export interface MedicalHistoryDetail {
  id: string;
  userId: string;
  weight: number;
  height: number;
  symptoms: Array<Sympton>;
}

export interface MedicalHistoryParam {
  weight: number;
  height: number;
  symptomIds: Array<number>;
}

export interface ResponseSympton {
  id: number;
  patientId: number;
  note: string;
  symptoms: Sympton[];
  symptomDetails: SymptonDetail[];
  createdAt: string;
  updatedAt: string;
}
