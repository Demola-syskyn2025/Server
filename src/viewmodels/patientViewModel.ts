import { db } from '../index';
import { Patient, IPatient, IVitals, INote, IMedication } from '../models/patientModel';
import { serverTimestamp } from 'firebase/firestore';
import { FieldValue } from 'firebase-admin/firestore';

export class PatientViewModel {
  static async create(data: Omit<IPatient, "id">): Promise<Patient> {
    const patientRef = await db.collection('Patients').add({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });
    return new Patient(
      data.fullName,
      data.dateOfBirth,
      data.phone,
      data.address,
      data.nationalId,
      data.diagnoses,
      data.allergies,
      data.carePlan,
      data.currentMeds,
      data.latestVitals ?? null,
      data.notes,
      data.consentGiven,
      patientRef.id
    );
  }

  static async getById(id: string): Promise<Patient | null> {
    const doc = await db.collection('Patients').doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data() as IPatient;
    return new Patient(
      data.fullName,
      data.dateOfBirth,
      data.phone,
      data.address,
      data.nationalId,
      data.diagnoses,
      data.allergies,
      data.carePlan,
      data.currentMeds,
      data.latestVitals ?? null,
      data.notes,
      data.consentGiven,
      doc.id
    );
  }

  static async update(id: string, partial: Partial<IPatient>): Promise<void> {
    const docRef = db.collection('Patients').doc(id);
    const updatePayload = {
      ...partial,
      updatedAt: FieldValue.serverTimestamp()
    };
    await docRef.update(updatePayload);
  }

  static async addNote(id: string, note: INote): Promise<void> {
    await this.update(id, { notes: FieldValue.arrayUnion(note) });
  }

  static async addMedication(id: string, med: IMedication): Promise<void> {
    const patient = await this.getById(id);
    if (!patient) throw new Error('Patient not found');
    const meds = [...patient.currentMeds, med];
    await this.update(id, { currentMeds: meds });
  }

  static async updateVitals(id: string, vitals: IVitals): Promise<void> {
    await this.update(id, { latestVitals: vitals });
  }
}
