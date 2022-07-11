import { User } from '../models/user.model'
import { DeletedResult } from '../types/DeletedResult';
import { User as UserType } from '../types/User';

class UserService {

  private user: typeof User;

  constructor ( model: typeof User ) {
    this.user = model;
  }

  public async getUserById ( id: string ): Promise<UserType | null> {
    return await this.user.findById( id );
  }

  public async getAllUsers (): Promise<UserType[] | null> {
    return await this.user.find();
  }

  public async createUser ( name: string, phone: string ): Promise<UserType> {
    const user = await this.user.create( { name, phone } );
    return user;
  }

  public async isUserAlreadyOccupy ( id: string, slot: string ): Promise<boolean> {
    const user = await this.user.findOne( { _id: id, appointments: { slot: slot } } );
    const isOccupy = user ? true : false;
    return isOccupy;
  }

  public async addUserAppointment ( user_id: string, doctor_id: string, doctor_spec: string, slot: Date ): Promise<UserType | null> {
    return await this.user.findOneAndUpdate( { _id: user_id }, { $push: { appointments: { doctor_id, doctor_spec, slot } } } );
  }

  public async deleteUser ( id: string ): Promise<DeletedResult> {
    const user = await this.user.deleteOne( { _id: id } );
    return user;
  }
}

export {
  UserService
}