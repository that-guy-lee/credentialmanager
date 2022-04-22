// user model is imported
import User from '../models/User.js';
/**
 * getUsers controller
 * returns all users to the client when requested
 * token data extracted specifically user roles
 * conditional check if the user is an admin or not
 * if so,
 * try catch block wraps the database connection
 * all users are assigned to the response variable
 * and sent to the client
 * if not,
 * request logged to console and forbidden message sent to the client
 * @param {*} req token data from the middleware
 * @param {*} res all user data to the client or error message
 */
export const getUsers = async (req, res) => {
  const {tokenData} = req;
  const {admin}  = tokenData.roles;
  if (admin) {
    try {
      const response = await User.find({});
      res.status(200).json({status: 'ok', message: 'returning all users', data: response});
    } catch (error) {
      console.error(error);
      res.status(500).json({status: 'error', message: error.message})
      throw error;
    }
  } else {
    const {id} = req.body;
    res.status(403).json({status: 'error', message:'you are not allowed to access this endpoint'});
    console.log(`user with the id ${id}, attempted to retrieve all the users information`)
  }
  
}
/**
 * assignDivision controller
 * assigns division to a user
 * this logic is duplicated in the assign OrgUnit controller so will be explained here in-depth
 * token data used to check if the request came from an admin
 * if so,
 * request data is extracted behind conditional
 * try catch block wraps the database connection for error handling
 * response is assigned the target user
 * permissions is extracted from the user
 * for loop used to iterate over the permissions array
 * if the orgUnit matches the target OrgUnit
 * the new divisions is pushed to the divisions array
 * the user is then assigned the new permissions
 * result is assigned the result of the .save() function
 * if successful,
 * success status and message is sent to the client & logged
 * if unsuccessful,
 * error is logged and sent to the client
 * if not admin,
 * request attempt is logged and warning sent to the client
 * @param {*} req token data
 * @param {*} res success or failure message
 */
export const assignDivision = async (req, res) => {
  const {tokenData} = req;
  const {admin} = tokenData.roles;
  if(admin){
    const  {id, orgUnit, division } = req.body;
    try {
      const response  = await User.findById(id);
      const {permissions} = response;
      for(let i = 0; i < permissions.length; i+=1) {
        if(permissions[i].orgUnit === orgUnit) {
          // eslint-disable-next-line object-shorthand
          permissions[i].divisions.push({division: division});
        }
      }
      response.permissions = permissions;
      const result = await response.save();
      res.status(201).json({'status': 'ok', 'message': `${division} has been added as permission for user: ${id}`, 'result': result })
      console.log(`${division} add as permission for user: ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({status: 'error', message: error.message})
      throw error;
    }
  } else {
    const {id} = req.body;
    res.status(403).json({status: 'error', message:'you are not allowed to access this endpoint'});
    console.log(`user with the id ${id}, attempted to assign a users division`)
  }
}
/**
 * Remove division controller
 * removes the division from a user 
 * this logic is duplicated in the removeOrgUnit controller, and such is explained in-depth here
 * tokenData from middleware extracted
 * conditional checks if the user is an admin,
 * if so,
 * try catch block wraps the database connection for error handling
 * user is found by id and assigned to the response variable
 * permission array is iterated over
 * conditional checks if the orgUnit matches the target orgUnit
 * the filter method is then used to return an array without the target division in the divisions array
 * the permissions array iterated point array is then assigned the updatedDivisions array
 * the updated user response is then saved to the database
 * if successful message & status sent to the client
 * if not,
 * error logged and failure status sent ot the frontend
 * if the user was not an admin the request is logged and warning sent to the frontend
 * @param {*} req token data & body data
 * @param {*} res success message or failure message
 */
export const removeDivision = async (req, res) => {
  const {tokenData} = req;
  const {admin} = tokenData.roles;
  if (admin) {
    const {id, orgUnit, division} = req.body;
    try {
      const response = await User.findById(id);
      const {permissions} = response;
      let updatedDivisions;
      for(let i = 0; i < permissions.length; i+=1) {
        if(permissions[i].orgUnit === orgUnit) {
          updatedDivisions = permissions[i].divisions.filter((target) => target.division !== division)
          permissions[i].divisions = updatedDivisions
        }
      }
      response.permissions = permissions;
      const result = await response.save();
      res.status(200).json({status: 'ok', message: `${division} successfully removed. For user: ${id}`, data: result});
      console.log(`${division} removed as permission for user: ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({status: 'error', message: error.message});
      throw error;
    }
  } else {
    const {id} = req.body;
    res.status(403).json({status: 'error', message:'you are not allowed to access this endpoint'});
    console.log(`user with the id ${id}, attempted to remove a users division`)
  }
  
}
/**
 * assignOrgUnit controller
 * see assignDivision for in-depth logic, differing logic explained here
 * payload is constructed after the admin check using body data and the new convention (used in error handling)
 * the payload is then saved to the target user
 * @param {*} req token and body data
 * @param {*} res success or failure message & status
 */
export const assignOrgUnit = async (req, res) => {
  const {tokenData} = req;
  const {admin} = tokenData.roles;
  if (admin) {
    const {id, orgUnit} = req.body;
    const payload = {
      orgUnit,
      divisions: [
        {
          division: "new",
        },
      ],
    };
    try {
      const response = await User.findById(id);
      response.permissions.push(payload);
      const result = await response.save();
      res.status(200).json({status: 'ok', message: `${orgUnit} has been assigned to user: ${id}`, data: result})
      console.log(`${orgUnit} added as permission for user: ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({status: 'error', message: error.message})
      throw error
    }
  } else {
    const {id} = req.body;
    res.status(403).json({status: 'error', message:'you are not allowed to access this endpoint'});
    console.log(`user with the id ${id}, attempted to assign a user an orgUnit`)
  }
}
/**
 * removeOrgUnit
 * removes an orgUnit from the users permissions
 * duplicating logic is explained in the removeDivision controller
 * updatePermissions array is returned using the filter function
 * user saved and updated on the database
 * @param {*} req token & body data
 * @param {*} res success or failure status & message
 */
export const removeOrgUnit = async (req, res) => {
  const {tokenData} = req;
  const {admin} = tokenData.roles;
  if (admin) {
    const {id, orgUnit} =req.body;
    try {
      const response = await User.findById(id);
      const {permissions} = response;
      const updatedPermissions =  permissions.filter((org)=>org.orgUnit !== orgUnit);
      response.permissions = updatedPermissions;
      response.save();
      console.log(`${orgUnit} has been removed as permission for user: ${id}`);
      res.status(200).json({status: 'ok', message: `${orgUnit} has been removed as permission for user: ${id}`})
    } catch (error) {
      console.error(error);
      res.status(500).json({status: 'error', message: error.message});
      throw error
    }
  } else {
    const {id} = req.body;
    res.status(403).json({status: 'error', message:'you are not allowed to access this endpoint'});
    console.log(`user with the id ${id}, attempted to remove a users OrgUnit`)
  }
}
/**
 * editRoles controller
 * token data extracted
 * admin conditional check
 * if successful,
 * user found by id
 * user is assigned the new roles
 * and saved
 * success status is sent
 * if failure,
 * error is logged and error status is sent to the client
 * if admin check fails,
 * request is logged and the client is warned
 * @param {*} req token data & body data
 * @param {*} res success status & message as well as failure equivalent
 */
export const editRoles = async (req, res) => {
  const {tokenData} = req;
  const {admin} = tokenData.roles;
  if (admin) {
    const {id, newRoles} = req.body;
    try {
      const response = await User.findById(id);
      response.roles = newRoles;
      const result = await response.save();
      res.status(200).json({status: 'ok', message: 'successfully updated user', data: result})
    } catch (error) {
      console.error(error);
      res.status(500).json({status: 'error', message: error.message})
      throw error;
    }
  } else {
    const {id} = req.body;
    res.status(403).json({status: 'error', message:'you are not allowed to access this endpoint'});
    console.log(`user with the id ${id}, attempted to change a users roles`)
  }
}
// user controller creation
const userController = {
  getUsers,
  assignDivision,
  removeDivision,
  assignOrgUnit,
  removeOrgUnit,
  editRoles,
}
// controller exported
export default userController;
