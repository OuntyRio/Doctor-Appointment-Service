import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

class UserRoutes {
  private userController: UserController;
  private userService: UserService;
  public router: Router;
  
  constructor() {
    this.router = Router();
    this.userService = new UserService(User);
    this.userController = new UserController(this.userService);

    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get('/users', this.userController.getAllUsers);
    this.router.post('/user', this.userController.createUser);
    this.router.delete('/user', this.userController.deleteUser);
  }
}

export {
  UserRoutes
}