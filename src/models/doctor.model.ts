import { v4 } from 'uuid';
import { Schema, model } from 'mongoose';
import { Doctor as DoctorType } from '../types/Doctor';

const doctorSchema = new Schema<DoctorType>( {
  _id: {
    type: String,
    default: v4
  },
  name: {
    type: String,
    required: true
  },
  spec: {
    type: String,
    required: true
  },
  slots: {
    type: [ Date ],
  }
}, {
  versionKey: false
} );

const Doctor = model<DoctorType>( 'Doctor', doctorSchema );

export {
  Doctor
}
