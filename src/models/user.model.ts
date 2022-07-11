import { v4 } from 'uuid';
import { Schema, model } from 'mongoose';
import { User } from '../types/User'


const userSchema = new Schema<User>( {
  _id: {
    type: String,
    default: v4
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  appointments: [
    {
      _id: {
        type: String,
        default: v4
      },
      doctor_id: {
        type: String,
        required: true
      },
      doctor_spec: {
        type: String,
        required: true
      },
      slot: {
        type: Date,
        required: true
      }
    }
  ]
}, {
  versionKey: false
} );

const User = model<User>( 'User', userSchema );

export {
  User
}