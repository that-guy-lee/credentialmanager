// units model imported
import Unit from '../models/Unit.js';
/**
 * createOrgUnit controller
 * payload extracted from the body
 * try catch block wraps the database connection
 * the unitName & divisions are sent to the database
 * success logged to the console
 * if unsuccessful,
 * error message is sent to the client and logged
 * @param {*} req org unit name & division in the body
 * @param {*} res success or failure status of operation
 * @returns success or failure status of operation
 */
export const createOrgUnit = async (req, res) => {
  const {unitName, divisions} = req.body;
    try {
      const response = await Unit.create({
        unitName,
        divisions
      });
      console.log('Organisational Unit successfully created', response);
      return res.json({status: 'ok'})
    } catch (error) {
      if (error.code === 11000) {
        return res.json({status: 'error', message: 'Organisational Unit already exists'})
      }
      console.log(error);
      throw error;
    }
};
/**
 * getCredentials controller
 * used to retrieve all the credentials + organisationalUnits + divisions from the database,
 * and send it to the client
 * Due to the size of the controller in-line comments will be used for blocks of code
 * @param {*} req token data is extracted from the req (passed by middleware)
 * @param {*} res error message and status or organisational data
 */
export const getCredentials = async (req, res) => {
  const {tokenData} = req;
  const {permissions} = tokenData;
  // helper arrays declared used in data sorting
  const orgUnits = [];
  const divisions = [];
  const data = [];
  const newsManagement = [];
  const softwareReviews = [];
  const hardwareReviews = [];
  const opinionPublishing = [];
  // helper variables declared used in data sorting
  let targetOrgUnit;
  let orgUnitsQuery;
  /**
   * Nested for loop used to iterate over the users permissions
   * each orgUnit is pushed to the orgUnits array
   * on each loop the targetOrgUnit is set to the orgUnit targetted
   * inner for loop then iterates over the divisions array
   * conditionals check if the targetOrgUnit is one of the four 'news management', 'software reviews'...
   * the specific division is then pushed to the corresponding array (sorts the data by) for later processing
   */
  for (let i = 0; i < permissions.length; i+=1) {
    orgUnits.push(permissions[i].orgUnit);
    targetOrgUnit = permissions[i].orgUnit;
    for (let x = 0; x < permissions[i].divisions.length; x+=1) {
      divisions.push(permissions[i].divisions[x].division);
      if(targetOrgUnit === 'news management'){
        newsManagement.push(permissions[i].divisions[x].division);
      }
      if(targetOrgUnit === 'software reviews') {
        softwareReviews.push(permissions[i].divisions[x].division)
      }
      if(targetOrgUnit === 'hardware reviews') {
        hardwareReviews.push(permissions[i].divisions[x].division)
      }
      if(targetOrgUnit === 'opinion publishing') {
        opinionPublishing.push(permissions[i].divisions[x].division);
      }
    }
  };
  /**
   * OrgUnits collections accessed and transformed for further processing
   * for of loop used to iterate over the orgUnitsQuery iterable
   * the nested for loop then iterates over the orgUnits and array 
   * one each iteration it checks if the user has permissions to the credentials
   * if so,
   * the orgUnit name & divisions is pushed to the data array
   * errors are logged to the console
   */
  try {
    // eslint-disable-next-line no-unused-vars
    for await (const orgUnit of orgUnitsQuery = Unit.find({}).cursor()) {
      for (let i = 0; i < orgUnits.length; i+=1){
        if(orgUnit.unitName === orgUnits[i]) {
          for(let x = 0; x < orgUnit.divisions.length; x+=1) {
            data.push({ unitName: orgUnit.unitName, divisions: orgUnit.divisions[x]})
          } 
        }
      } 
    };
  } catch (err) {
    console.error(err)
  }
  // helper arrays created to store the credentials for the orgUnits
  const newsCredentials = [];
  const softwareCredentials = [];
  const hardwareCredentials = [];
  const opinionCredentials = [];
  /**
   * for loop is used to iterate over the data array
   * conditional permission checks are done which checks if the iterated object is one of the orgUnits and,
   * if the helper orgUnit array has the target division
   * the credential is then pushed to the credential array
   */
  for (let i = 0; i < data.length; i+=1) {
    if(data[i].unitName === 'news management' && newsManagement.includes(data[i].divisions.divisionName)){
      newsCredentials.push(data[i]);
    }
    if(data[i].unitName === 'software reviews' && softwareReviews.includes(data[i].divisions.divisionName)){
      softwareCredentials.push(data[i]);
    }
    if(data[i].unitName === 'hardware reviews' && hardwareReviews.includes(data[i].divisions.divisionName)){
      hardwareCredentials.push(data[i]);
    }
    if(data[i].unitName === 'opinion publishing' && opinionPublishing.includes(data[i].divisions.divisionName)){
      opinionCredentials.push(data[i]);
    }
  }
  // payload object constructed with the credential arrays
  const payload = {
    newsManagement: newsCredentials,
    softwareReviews: softwareCredentials,
    hardwareReviews: hardwareCredentials,
    opinionPublishing: opinionCredentials
  };
  /**
   * conditional checks if data is valid
   * if so,
   * payload is sent to the user
   * else 
   * not found status with message is sent to the user
   * also logged to the console
   */
    if(data.length > 0) {
      res.status(200).json(payload);
      console.log(`Successful request for user ${tokenData.id} data sent to client`)
    } else {
      res.status(404).json({ status:'error', message:'no organisational unit or division(s) were found for this user' });
      console.log(`No resource found for the user with id ${tokenData.id}`);
    }
}
/**
 * addCredentials controller
 * adds a credential to the database
 * try catch wraps the database connection for error handling
 * query returns one entry of the orgUnit
 * the divisions array iterated over and if division matches the target division
 * the credentials is added to credentials array
 * the unit object is updated
 * the save function is called to save the update to the database
 * on success,
 * process details is logged to the console,
 * and success status sent to client with message
 * unsuccessful,
 * error sent to the client and logged
 * @param {*} req payload of orgUnit, division, credentials from body
 * @param {*} res success status & message or failure message & status
 */
export const addCredentials = async (req, res) => {
  const {orgUnit, division, credentials} = req.body;
  try {
    const selectedOrgUnit = await Unit.findOne().where('unitName').equals(orgUnit)
    const divisionsArray = selectedOrgUnit.divisions
    for(let i = 0; i < divisionsArray.length; i+=1){
      if(divisionsArray[i].divisionName === division){
        divisionsArray[i].credentials.push(credentials);
      }
    }
    selectedOrgUnit.divisions = divisionsArray
    await selectedOrgUnit.save();
    console.log(`${credentials.serviceName} has been added successfully to ${division} repository of ${orgUnit}`);
    res.status(201).json({'status': 'ok', 'message': `${credentials.serviceName} has been added successfully`})
  } catch (error) {
    console.log(error);
    res.status(500).json({'status': 'error', 'message':error.message})
  }
}
/**
 * editCredential controller
 * allows for the user to edit the credentials if the user is management or admin
 * data extracted from body & token data from the request
 * conditional checks if the user is management or admin
 * on success,
 * database connection wrapped in try catch block for error handling
 * the selectedOrgUnit is assigned to the its variable
 * the divisions array is iterated over if the division target matches the body division,
 * the credentials array is iterated over and if the service name matches the target on,
 * the credential is assigned to the body credentials
 * the updated divisionsArray is then used to overwrite the old divisions array of the org unit
 * the .save function is then called to save the updated orgUnit to the database
 * success status sent to the client and logged
 * on failure,
 * error is logged and sent to the client
 * if the user lacks permission the client is notified and no data is sent to the client
 * @param {*} req body json from the client and token data from the auth middleware
 * @param {*} res success or failure message and status
 */
export const editCredentials = async (req, res) =>{
  const {orgUnit, division, targetServiceName, credentials} = req.body;
  const {tokenData} = req;
  const {management, admin} = tokenData.roles;
  if (management || admin) {
    try {
      const selectedOrgUnit = await Unit.findOne().where('unitName').equals(orgUnit);
      const divisionsArray = selectedOrgUnit.divisions;
      for(let i = 0; i < divisionsArray.length; i+=1) {
        if(divisionsArray[i].divisionName === division) {
          for(let j = 0; j < divisionsArray[i].credentials.length; j+=1) {
            if(divisionsArray[i].credentials[j].serviceName === targetServiceName) {
              divisionsArray[i].credentials[j] = credentials;
            }
          }
        }
      }
      selectedOrgUnit.divisions = divisionsArray;
      await selectedOrgUnit.save();
      res.status(201).json({'status': 'ok', 'message': `${credentials.serviceName} has updated`})
    } catch (error) {
      console.log(error);
      res.status(500).json({'status': 'error', 'message':error.message})
    }
  } else {
    res.status(403).json({'status': 'error', 'message':'You do not have permission to edit credentials'})
    console.log(`user: ${tokenData.id} attempted to edit credentials & lacked permissions`);
  }
  
}
// unitController created
const unitController = {
  createOrgUnit,
  getCredentials,
  addCredentials,
  editCredentials,
};
// unitController exported
export default unitController;
