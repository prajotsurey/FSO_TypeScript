/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import toNewEntry from '../entryUtils';

router.get('/',(_req,res)=>{
  res.send(patientService.getPatients());
});

router.post('/',(req,res)=>{
  try{
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries',(req,res)=>{
  try{
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id',(req,res)=>{
  const patient = patientService.getPatient((req.params.id));
  if(patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;