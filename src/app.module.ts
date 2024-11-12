import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/modules/users/users.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { AccessTokenGuard } from './app/modules/auth/guards/access-token/access-token.guard';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './app/modules/auth/config/jwt.config';
import { AuthenticationGuard } from './app/modules/auth/guards/authentication/authentication.guard';
import { GeofencesModule } from './app/modules/geofences/geofences.module';
import { AttendancesModule } from './app/modules/attendances/attendances.module';
import { PointsModule } from './app/modules/points/points.module';
import { GroupTypesModule } from './app/modules/group_types/group_types.module';
import { GroupsModule } from './app/modules/groups/groups.module';
import { PackagesModule } from './app/modules/packages/packages.module';
import { MembersModule } from './app/modules/members/members.module';
import { DataResponseInterceptor } from './common/interceptor/data-response.interceptor';
import appConfig from './config/app.config';
import { DatabaseExceptionFilter } from './common/errors/global.errors';
const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV ? `.env.${ENV}` : '.env',
      load: [appConfig,databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        database: configService.get('database.name'),
      }),
    }), // <-- Extra comma here
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    AuthModule,
    GeofencesModule,
    AttendancesModule,
    PointsModule,
    GroupTypesModule,
    GroupsModule,
    PackagesModule,
    MembersModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
