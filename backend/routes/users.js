import Router from 'express';
// auth middleware imported
import { tokenValidation } from '../middleware/auth.js';
// route controllers imported
import {
  getUsers,
  assignDivision,
  removeDivision,
  assignOrgUnit,
  removeOrgUnit,
  editRoles} from '../controllers/users.js'
// router declared
const router = Router();
// returns all the users
router.get('/all', tokenValidation, getUsers);
// assigns a user a new division
router.put('/assign/division',tokenValidation, assignDivision);
// removes division from a user
router.put('/remove/division', tokenValidation, removeDivision);
// assigns a user a new org unit
router.put('/assign/org-unit', tokenValidation, assignOrgUnit);
// removes org unit from a user
router.put('/remove/org-unit', tokenValidation, removeOrgUnit);
// edits the roles of a user
router.put('/edit/roles', tokenValidation, editRoles);

export default router;
