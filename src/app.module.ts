import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';
import { AppHindiService } from './app.hindiservice';
import { AppDummy } from './app.dummy';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';

@Module({
  imports: [
    // Config Module required to set the environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      // Setting this to true we can use one env variable in other variable -- For more info check env file
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    // ------ Below code is for using config directly
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   entities: [Event],
    //   synchronize: true,
    // }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppHindiService,
    },
    {
      provide: 'APP_NAME',
      useValue: 'Nest Event Backend',
    },
    {
      provide: 'MESSAGE',
      inject: [AppDummy],
      useFactory: (app) => `${app.dummy()} Factory !`,
    },
    AppDummy,
  ],
})
export class AppModule {}
