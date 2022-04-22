import mongoose from 'mongoose';
/**
 * Unit schema model
 * due to the nested nature of the model three 'models',
 * were declared for added validation
 */
// credentials schema
const credentialsSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
    lowercase: true,
  },
  loginName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// division schema
const divisionsSchema = mongoose.Schema({
  divisionName: {
    type: String,
    required: true,
    lowercase: true,
  },
  credentials: [credentialsSchema]
});
// upper organisational unit schema
const UnitSchema = mongoose.Schema({
  unitName: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  divisions:[divisionsSchema]
}, {collection: 'organisationUnits'} );

const unit = mongoose.model('UnitSchema', UnitSchema);

export default unit;