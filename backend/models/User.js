import mongoose from 'mongoose';
 // roles schema
const rolesSchema = new mongoose.Schema({
  user: {
    type: Boolean,
    default: true
  },
  management: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  }
});

// division
const divisionSchema = new mongoose.Schema({
  division: {
    type: String,
    required: true,
  },
});
// permissions
const permissionsSchema = new mongoose.Schema({
  orgUnit: {
    type: String,
    required: true,
  },
  divisions: [divisionSchema],
});

// declare user schema
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: rolesSchema,
    permissions:[permissionsSchema]

}, {collection: 'users'});

const user = mongoose.model('UserSchema', UserSchema);

export default user;
