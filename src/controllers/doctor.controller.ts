import { Request, Response } from 'express';
import { DoctorService } from 'services/doctor.service';

class DoctorController {

  private doctorService: DoctorService;

  constructor ( doctorService: DoctorService ) {
    this.doctorService = doctorService;
  }

  public getAllDoctors = async ( req: Request, res: Response ): Promise<Response> => {
    try {
      const doctors = await this.doctorService.getAllDoctors();

      if ( !doctors?.length ) {
        return res.status( 404 ).json( { success: false, body: 'Results are not found' } );
      }

      return res.status( 200 ).json( { success: true, body: doctors } );
    } catch ( error ) {
      return res.status( 500 ).json( { success: 'fail', error: error } );
    }
  }

  public createDoctor = async ( req: Request, res: Response ): Promise<Response> => {
    try {
      const { name, spec, slots } = req.body;

      if ( !name || !spec ) {
        return res.status( 400 ).json( { success: false, error: 'Incorrect body' } );
      }

      const slotsDateFormat = slots.map( ( el: string ) => new Date( el ) )
      const doctor = await this.doctorService.createDoctor( name, spec, slotsDateFormat );

      return res.status( 200 ).json( { success: true, body: doctor } );
    } catch ( error ) {
      return res.status( 500 ).json( { success: 'fail', error: error } );
    }
  }

  public addTimeSlot = async ( req: Request, res: Response ): Promise<Response> => {
    try {
      const { id, slot } = req.body;

      if ( !id || !slot ) {
        return res.status( 400 ).json( { success: false, error: 'Incorrect body' } );
      }

      const isEmptySlot = await this.doctorService.isEmptySlot( id, slot );

      if ( isEmptySlot ) {
        return res.status( 400 ).json( { success: false, body: 'Slot is already existed' } );
      }

      const doctor = await this.doctorService.addDoctorSlot( id, slot );

      return res.status( 200 ).json( { success: true, body: doctor } );
    } catch ( error ) {
      return res.status( 500 ).json( { success: 'fail', error: error } );
    }
  }

  public deleteDoctor = async ( req: Request, res: Response ): Promise<Response> => {
    try {
      const { id } = req.body;
      const doctor = await this.doctorService.deleteDoctor( id );
      if ( !doctor ) {
        return res.status( 400 ).json( { success: true, error: 'Incorrect body' } );
      }
      return res.status( 200 ).json( { success: true, body: doctor } );
    } catch ( error ) {
      return res.status( 500 ).json( { success: 'fail', error: error } );
    }
  }

}

export {
  DoctorController
}