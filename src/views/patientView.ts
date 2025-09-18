import express, { Request, Response } from 'express';
import { PatientViewModel } from '../viewmodels/patientViewModel';
import { Patient } from '../models/patientModel';

const patientView = express.Router();
export default patientView;

// Create new patient
patientView.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const patient: Patient = await PatientViewModel.create(data);
    res.status(201).json(patient);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get patient by id
patientView.get('/:id', async (req: Request, res: Response) => {
  try {
    const patient = await PatientViewModel.getById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Update patient
patientView.put('/:id', async (req: Request, res: Response) => {
  try {
    await PatientViewModel.update(req.params.id, req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Add a note
patientView.post('/:id/notes', async (req: Request, res: Response) => {
  try {
    await PatientViewModel.addNote(req.params.id, req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Add a medication
patientView.post('/:id/meds', async (req: Request, res: Response) => {
  try {
    await PatientViewModel.addMedication(req.params.id, req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Update vitals
patientView.post('/:id/vitals', async (req: Request, res: Response) => {
  try {
    await PatientViewModel.updateVitals(req.params.id, req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});
