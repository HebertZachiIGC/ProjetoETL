// src/app.module.ts

import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TargetModule } from './target/target.module';
import { TargetService } from './target/target.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'AmbienteDev',
      database: 'projetoetl',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    TargetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // providers: [AppService, TargetService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly targetService: TargetService) {}

  async onModuleInit() {
    // Chame o seeder aqui quando o módulo for inicializado
    await this.targetService.seedFromCSV();
  }
}





// export class AppModule {
//   constructor(private readonly targetService: TargetService) {
//     this.checkAndImportExcel();
//   }

//   async checkAndImportExcel() {
//     const filePath = './arquivoTarget.xlsx'; // Substitua pelo caminho real do seu arquivo Excel
//     try {
//       await this.targetService.importFromExcel(filePath);
//       console.log('Excel data imported successfully.');
//     } catch (error) {
//       console.error('Error importing Excel data:', error.message);
//     }
//   }
// }
