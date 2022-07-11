import { Request, Response } from 'express';
import { DoctorService } from 'services/doctor.service';
import { Notificator } from '../utils/notification';
import { UserService } from 'services/user.service';

class AppointmentController {

  private userService: UserService;
  private doctorService: DoctorService;
  private notificator: Notificator;

  constructor ( userService: UserService, doctorService: DoctorService ) {
    this.userService = userService;
    this.doctorService = doctorService;
    this.notificator = new Notificator();
  }

  public createAppointment = async ( req: Request, res: Response ): Promise<Response> => {
    try {
      const { user_id, doctor_id, slot } = req.body;

      const user = await this.userService.getUserById( user_id );

      if ( !user ) {
        return res.status( 404 ).json( { success: false, body: 'User is not found' } );
      }

      const doctor = await this.doctorService.getDoctorById( doctor_id );

      if ( !doctor ) {
        return res.status( 404 ).json( { success: false, body: 'Doctor is not found' } );
      }

      const slotIsEmpty = await this.doctorService.isEmptySlot( doctor_id, slot );

      const userIsOccupy = await this.userService.isUserAlreadyOccupy( user_id, slot );

      if ( !slotIsEmpty ) {
        return res.status( 404 ).json( { success: false, body: 'This slot is already taken or doctor doesn`t work at this time. Choose another time slot please' } );
      }

      if ( userIsOccupy ) {
        return res.status( 404 ).json( { success: false, body: 'User has appointment to another doctor at this time. Choose another time slot please' } );
      }

      const removeDoctorSlot = await this.doctorService.removeDoctorSlot( doctor._id, new Date( slot ) );
      const addUserAppointment = await this.userService.addUserAppointment( user._id, doctor._id, doctor.spec, new Date( slot ) );

      this.notificator.sendNotifications( new Date( slot ), user.name, doctor.spec );

      return res.status( 200 ).json( { success: true, user: addUserAppointment } );
    } catch ( error ) {
      return res.status( 500 ).json( { success: 'fail', error: error } );
    }
  }
}

export {
  AppointmentController
}