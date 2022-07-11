import { Appointment } from './Appointment';

type User = {
  _id: string,
  name: string,
  phone: string,
  appointments: [ Appointment ]
}

export {
  User
}