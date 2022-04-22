import { Router } from 'express';
// auth middleware imported
import { tokenValidation } from '../middleware/auth.js';
// route controllers imported
import {
  createOrgUnit,
  getCredentials,
  addCredentials,
  editCredentials,
} from '../controllers/units.js'
// router declared
const router = Router();
// creating a new org unit
router.post('/divisions',tokenValidation, createOrgUnit)
// retrieve units + divisions
router.get('/divisions',tokenValidation, getCredentials);
// adds credentials 
router.post('/add/credentials', tokenValidation, addCredentials);
// edits credentials
router.put('/edit/credentials/', tokenValidation, editCredentials);

export default router;