import { Request, Response } from 'express';
import { UserService } from 'services/user.service';

class UserController {

  private userService: UserService;

  constructor ( userService: UserService ) {
    this.userService = userService;
  }

  public getAllUsers = async ( req: Request, res: Response ): Promise<Response> => {
    try {
      const users = await this.userService.getAllUsers();

      if ( !users?.length ) {
        return res.status( 404 ).json( { success: false, body: 'Results are not found' } );
      }

      return res.status( 200 ).json( { success: true, body: users } );
    } catch ( error ) {
      return res.status( 500 ).json( { success: 'fail', error: error } );
    }
  }

  public createUser = async ( req: Request, res: Response ): Promise<Response> => {
    try {
      const { name, phone } = req.body;

      if ( !name || !phone ) {
        return res.status( 400 ).json( { success: false, error: 'Incorrect body' } );
      }

      const user = await this.userService.createUser( name, phone );

      return res.status( 200 ).json( { success: true, body: user } );
    } catch ( error ) {
      return res.status( 500 ).json( { success: 'fail', error: error } );
    }
  }

  public deleteUser = async ( req: Request, res: Response ): Promise<Response> => {
    try {
      const { id } = req.body;
      const user = await this.userService.deleteUser( id );
      if ( !user ) {
        return res.status( 400 ).json( { success: false, error: 'Incorrect body' } );
      }
      return res.status( 200 ).json( { success: true, body: user } );
    } catch ( error ) {
      return res.status( 500 ).json( { success: 'fail', error: error } );
    }
  }
}

export {
  UserController
}