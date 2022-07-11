import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { AppointmentRoutes } from './routes/appointment.routes';
import { DoctorRoutes } from './routes/doctor.routes';
import { errorHandler } from './utils/errorHandler';
import { UserRoutes } from './routes/user.routes';
import { Routes } from './types/Router'

dotenv.config();

class App {
  private app: express.Application

  constructor ( routes: Routes[] ) {
    this.app = express();

    this.initMiddlewares();
    this.initRoutes( routes );
    this.initErrorHandler();
  }

  public listen (): void {
    this.app.listen( process.env.PORT, () => {
      console.log( 'App is listening on port', process.env.PORT )
    } );
  }

  private initMiddlewares (): void {
    this.app.disable( 'x-powered-by' );
    this.app.use( cors() );
    this.app.use( express.urlencoded( { extended: true } ) );
    this.app.use( bodyParser.json() );
  }

  private initRoutes ( routes: Routes[] ): void {
    routes.forEach( ( route ) => {
      this.app.use( '/', route.router );
    } )
  }

  private initErrorHandler (): void {
    this.app.use( errorHandler );
  }
};

const start = async (): Promise<void> => {
  try {
    await mongoose.connect( `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}` );
    const app = new App( [
      new UserRoutes(),
      new DoctorRoutes(),
      new AppointmentRoutes()
    ] );
    app.listen();
  } catch ( error ) {
    console.log( error );
  }
}

start();