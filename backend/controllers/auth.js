// importing encryption package
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// user model imported
import User from '../models/User.js';
// jwt deconstructed
const { sign, verify } = jwt;
/**
 * Register controller
 * the registration endpoint
 * handles the users information
 * the password is encrypted using the bcrypt library
 * try catch block used to wrap the database connection
 * the user details is used with the user model .create function to send the user to the database
 * success, message logged (user is also notified of the success)
 * error, caught,
 * failure message is sent to the user ( if the the email is already in use)
 * error is logged to the console.
 * @param {*} req contains user information
 * @param {*} res status of the request ok/ or error with message
 * @returns status messages
 */
export const register = async (req, res) => {
  const { name, email, roles, permissions } = req.body;
  let {password} = req.body;
  password = await bcrypt.hash(password, 10);
  try {
   const response = await User.create({
      name,
      email,
      password,
      roles,
      permissions
    });
    console.log('user created successfully: ', response);
    return res.status(200).json({status: 'ok'});
  } catch (error) {
    if(error.code === 11000){
      return res.json({status: 'error', message: 'Email is already in use'});
    } 
    console.log(error.message);
    throw error;
  }
};
/**
 * login controller
 * login endpoint when the user enters the application
 * user details is extracted from the request body
 * findOne query used to locate the user
 * conditional checks if user exists, returns invalid credentials if not
 * conditional checks if the database password and entered password are matched
 * if successful,
 * sign function is used from the JWT package
 * where user details are extracted and stored in the token variable
 * token is sent to the client
 * if unsuccessful
 * invalid credentials message is sent to the user
 * login attempt logged to the console
 * @param {*} req contains the user login credentials
 * @param {*} res status for ok or error
 * @returns status messages
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email});
  if(!user) {
    return res.json({status: 'error', message: 'Invalid Credentials'});
  }

  if(await bcrypt.compare(password, user.password)) {
    const token = sign(
      {
        // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      roles: user.roles,
      permissions: user.permissions
      }, 
      process.env.JWT_SECRET,
      {algorithm: 'HS256'});
      
    return res.json({status: 'ok', data: token});
  }
  console.log('Incorrect login attempt for user:', email);
  return res.json({status: 'error', message: 'Invalid Credentials'});
};
/**
 * authCheck controller
 * used to check if the token provided is valid (from the client)
 * token retrieved from headers
 * conditional checks if the token exists if not invalid token message sent
 * try catch wraps the verify method for error handling
 * verify used on the token with the JWT secret
 * if successful,
 * token is sent to the client
 * if unsuccessful
 * invalid token message sent
 * @param {*} req JWT token in the header
 * @param {*} res invalid token messages or valid with token decrypted
 * @returns various status messages depending on success or failure
 */
export const authCheck = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if(!token){
    return res.status(401).json({status: 'error', message: 'Invalid Token'});
  }
  try {
    const validatedToken = verify(token, process.env.JWT_SECRET);
    if(validatedToken) { 
      return res.status(200).json({status: 'ok', message: 'Token is valid', data: validatedToken});
    };
    return res.status(401).json({status: 'error', message: 'Invalid Token'});
  } catch (err) {
    console.log(err);
    return res.status(401).json({status: 'error', message: 'Invalid Token'});
  }
}
// controller functions exported
const authController = {
  register,
  login,
  authCheck
};
// controller exported
export default authController;
