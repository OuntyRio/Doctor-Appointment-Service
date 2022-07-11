import schedule from 'node-schedule';
import logger from './logger';

class Notificator {

  public async sendNotifications ( date: Date, name: string, doctor: string ): Promise<void> {
    const visitTime = date.toLocaleTimeString( 'ru-RU' );
    const dayBefore = this.getDayBefore( date );
    const twoHoursBefore = this.getTwoHoursBefore( date );

    const firstNotification = `Привет ${name}! Напоминаем, что вы записаны к ${doctor}y завтра в ${visitTime}`;
    const secondNotification = `Привет ${name}! Вам через 2 часа к ${doctor}y в ${visitTime}`;

    logger.log( { level: 'info', message: `Проверка текста сообщения: ${firstNotification} - сообщение придет ${dayBefore}` } );
    logger.log( { level: 'info', message: `Проверка текста сообщения: ${secondNotification} - сообщение придет ${twoHoursBefore}` } );

    const dayJob = schedule.scheduleJob( dayBefore, function( message: string ) {
      logger.log( { level: 'info', message: message } );
    }.bind( null, firstNotification ) );

    const hoursJob = schedule.scheduleJob( twoHoursBefore, function( message: string ) {
      logger.log( { level: 'info', message: message } );
    }.bind( null, secondNotification ) );
  }

  private getDayBefore ( date: Date ): Date {
    return new Date( date.setDate( date.getDate() - 1 ) );
  }

  private getTwoHoursBefore ( date: Date ): Date {
    const result = new Date( date.setHours( date.getHours() - 2 ) );
    result.setDate( date.getDate() + 1 );
    return result;
  }
}

export {
  Notificator
}