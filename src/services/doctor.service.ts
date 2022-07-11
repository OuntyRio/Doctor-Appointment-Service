import { Doctor } from '../models/doctor.model';
import { Doctor as DoctorType } from '../types/Doctor';
import { DeletedResult } from 'types/DeletedResult';

class DoctorService {

  private doctor: typeof Doctor;

  constructor ( model: typeof Doctor ) {
    this.doctor = model;
  }

  public async getDoctorById ( id: string ): Promise<DoctorType | null> {
    return await this.doctor.findById( id );
  }

  public async getAllDoctors (): Promise<DoctorType[] | null> {
    return await this.doctor.find();
  }

  public async isEmptySlot ( id: string, slot: Date ): Promise<boolean> {
    const doctor = await this.doctor.findOne( { _id: id, slots: slot } );
    const isEmpty = doctor ? true : false;
    return isEmpty;
  }

  public async createDoctor ( name: string, spec: string, slots: Date[] ): Promise<DoctorType> {
    const doctor = await this.doctor.create( { name, spec, slots } );
    return doctor;
  }

  public async addDoctorSlot ( doctor_id: string, slot: Date ): Promise<DoctorType | null> {
    return await this.doctor.findOneAndUpdate( { _id: doctor_id }, { $push: { slots: slot } } );
  }


  public async removeDoctorSlot ( doctor_id: string, slot: Date ): Promise<DoctorType | null> {
    return await this.doctor.findOneAndUpdate( { _id: doctor_id }, { $pull: { slots: slot } } );
  }

  public async deleteDoctor ( id: string ): Promise<DeletedResult> {
    const doctor = await this.doctor.deleteOne( { _id: id } );
    return doctor;
  }
}

export {
  DoctorService
}