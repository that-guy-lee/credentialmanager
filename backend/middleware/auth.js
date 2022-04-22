import jwt from 'jsonwebtoken';
// verify function from JWT extracted
const { verify } = jwt;
/**
 * token validation middleware
 * used to validate if the users token is valid
 * if so next middleware or controller is run
 * if not user is notified of the invalid token and no further processing is done
 * @param {*} req token in the header of the request
 * @param {*} res if the token is not valid sends invalid token message to the client
 * @param {*} next calls the next middleware
 * @returns next middleware or controller
 */
export const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({error: 'Invalid Token'})
  }
  try {
    const validated = verify(token, process.env.JWT_SECRET);
    if (validated) {
       req.tokenData = validated;
      return next();
    }
    return res.status(401).json({error: 'Invalid Token'})
  } catch (err) {
    console.error(err);
    return res.status(401).json({error: 'Invalid Token'});
  }
}
// auth middleware packaged for export
const auth = {tokenValidation};
// auth exported
export default auth;