import { Router } from 'express';
import { DoctorController } from '../controllers/doctor.controller';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor.model';

class DoctorRoutes {
  private doctorController: DoctorController;
  private doctorService: DoctorService;
  public router: Router;
  
  constructor() {
    this.router = Router();
    this.doctorService = new DoctorService(Doctor);
    this.doctorController = new DoctorController(this.doctorService);

    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get('/doctors', this.doctorController.getAllDoctors);
    this.router.post('/doctor', this.doctorController.createDoctor);
    this.router.put('/doctor', this.doctorController.addTimeSlot);
    this.router.delete('/doctor', this.doctorController.deleteDoctor);
  }
}

export {
  DoctorRoutes
}