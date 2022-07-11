import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

class AppointmentRoutes {
  private appointmentController: AppointmentController;
  private userService: UserService;
  private doctorService: DoctorService;
  public router: Router;

  constructor () {
    this.router = Router();
    this.userService = new UserService( User );
    this.doctorService = new DoctorService( Doctor );
    this.appointmentController = new AppointmentController( this.userService, this.doctorService );

    this.initRoutes();
  }

  public initRoutes (): void {
    this.router.post( '/appointment', this.appointmentController.createAppointment );
  }
}

export {
  AppointmentRoutes
}