export interface IVitals {
  recordedAt: string;
  tempC: number;
  bpSys: number;
  bpDia: number;
  pulse: number;
  spo2: number;
}

export interface INote {
  at: string;
  by: string;
  text: string;
}

export interface ICarePlan {
  status: "active" | "completed";
  reason: string;
  doctor: string;
  nurse: string;
}

export interface IMedication {
  name: string;
  dose: string;
  route: string;
  schedule: string;
  active: boolean;
}

export interface IPatient {
  id?: string;
  fullName: string;
  nationalId?: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  diagnoses: string[];
  allergies: string[];
  carePlan: ICarePlan;
  currentMeds: IMedication[];
  latestVitals?: IVitals | null;
  notes: INote[];
  consentGiven: boolean;
}

export class Patient implements IPatient {
  constructor(
    public fullName: string,
    public dateOfBirth: string,
    public phone: string,
    public address: string,
    public nationalId?: string,
    public diagnoses: string[] = [],
    public allergies: string[] = [],
    public carePlan: ICarePlan = { status: "active", reason: "", doctor: "", nurse: "" },
    public currentMeds: IMedication[] = [],
    public latestVitals: IVitals | null = null,
    public notes: INote[] = [],
    public consentGiven: boolean = false,
    public id?: string
  ) {}
}
