// csv-seeder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as parser from 'csv-parser';
import { Repository } from 'typeorm';
import { Target } from './target.entity';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target)
    private readonly targetRepository: Repository<Target>,
  ) {}

  public async seedFromCSV() {
    // const filePath = __dirname + './../../arquivoTarget2.CSV';
    // const filePath = __dirname + './../../arquivoTest100.csv';
    const filePath = __dirname + './../../arquivoTarget2.CSV';
    console.log(__dirname);

    const stream = fs.createReadStream(filePath, { encoding: 'binary' });
    // stream.setEncoding('UTF8');
    const corretor = (valor) => {
      if (valor) {
        const cleanString = valor.replace(/[^\d,]/g, '').replace(',', '.');
        return isNaN(cleanString) ? cleanString : Number(cleanString);
      } else {
        return null;
      }
    };

    stream
      .pipe(parser({ separator: ';' }))
      .on('data', async (row) => {
        console.log(
          row.Buyer,
          typeof row.NBOLastDatePerDealInSubSector,
          new Date('17/09/2020'),
        );

        const entity = this.targetRepository.create({
          // Mapeie as colunas do CSV para as propriedades da entidade

          Buyer: row.Buyer,
          Client: row.Client,
          ClientSubSector: row.ClientSubSector,
          NDeals: row.NDeals ? Number(row.NDeals) : null,
          // Verifica se existe input e convert de string para number, caso não não existe convert para null
          NumberOfNDAPerBuyerInSubSector: this.treatmentNumbers(
            row.NumberOfNDAPerBuyerInSubSector,
          ),
          NumberOfGosPerBuyerInSubSector: this.treatmentNumbers(
            row.NumberOfNDAPerBuyerInSubSector,
          ),
          NumberOfGosPerSizeInSubSector: this.treatmentNumbers(
            row.NumberOfGosPerSizeInSubSector,
          ),
          NumberOfNBOperDealsInSubSector: this.treatmentNumbers(
            row.NumberOfNBOperDealsInSubSector,
          ),
          AverageSizePerDealInSubSector: this.treatmentNumbers(
            row.AverageSizePerDealInSubSector,
          ),
          MedianSizePerDealInSubSector: this.treatmentNumbers(
            row.MedianSizePerDealInSubSector,
          ),

          DealClosePerClientSector: this.treatmentNumbers(
            row.DealClosePerClientSector,
          ),
          MostRecentContact: row.MostRecentContact
            ? row.MostRecentContact
            : null,
          IsEqual: row.IsEqual ? row.IsEqual : null,
          // LastDateCloseDealPerInSubSector: row.LastDateCloseDealPerInSubSector,
          // NBOLastDatePerDealInSubSector: row.NBOLastDatePerDealInSubSector
          //   ? new Date(row.NBOLastDatePerDealInSubSector).toISOString()
          //   : null,
        });

        await this.targetRepository.save(entity);
      })
      .on('end', () => {
        console.log('Dados do CSV importados com sucesso!');
      });
  }

  private treatmentNumbers(value): null | number {
    return value ? Number(value) : null;
  }

  async findAll() {
    return await this.targetRepository.find();
  }

  async findAllByQuery(ClientSubSector: string) {
    return await this.targetRepository.find({ where: {ClientSubSector}});
  }

}

// // src/targets/targets.service.ts
// import { Inject, Injectable } from '@nestjs/common';
// import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
// import { Repository, getRepository } from 'typeorm';
// import * as XLSX from 'xlsx';
// import { Target } from './target.entity';

// @Injectable()
// export class TargetService {
//   constructor(
//     @Inject(getRepositoryToken(Target)) // Use o getRepositoryToken para obter o token
//     private readonly targetRepository: Repository<Target>,
//   ) {}

//   async importFromExcel(filePath: string): Promise<void> {

//     const workbook = XLSX.readFile(filePath);
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const rows = XLSX.utils.sheet_to_json(worksheet);

//     for (const row of rows) {
//       const target = new Target();
//       target.Buyer = row['Buyer'];
//       target.Client = row['Client'];
//       target.ClientSubSector = row['ClientSubSector'];
//       target.NDeals = row['NDeals'];
//       target.NumberOfNDAPerBuyerInSubSector = row['NumberOfNDAPerBuyerInSubSector'];
//       target.NumberOfGosPerBuyerInSubSector = row['NumberOfGosPerBuyerInSubSector'];
//       target.NumberOfGosPerSizeInSubSector = row['NumberOfGosPerSizeInSubSector'];
//       target.NumberOfNBOperDealsInSubSector = row['NumberOfNBOperDealsInSubSector'];
//       target.AverageSizePerDealInSubSector = row['AverageSizePerDealInSubSector'];
//       target.MedianSizePerDealInSubSector = row['MedianSizePerDealInSubSector'];
//       target.NBOLastDatePerDealInSubSector = new Date(row['NBOLastDatePerDealInSubSector']);
//       target.DealClosePerClientSector = row['DealClosePerClientSector'];
//       target.LastDateCloseDealPerInSubSector = new Date(row['LastDateCloseDealPerInSubSector']);
//       target.MostRecentContact = row['MostRecentContact'];
//       target.IsEqual = row['IsEqual'];

//       await this.targetRepository.save(target);
//     }
//   }
// }

// // csv-seeder.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import * as fs from 'fs';
// import * as csvParser from 'csv-parser';
// import { Repository } from 'typeorm';
// import { Target } from './target.entity';

// @Injectable()
// export class TargetService {
//   constructor(
//     @InjectRepository(Target)
//     private readonly targetRepository: Repository<Target>,
//   ) {}

//   async seedFromCSV() {
//     const filePath = __dirname + './../../arquivoTarget2.CSV';
//     console.log(__dirname);

//     const stream = fs.createReadStream(filePath);

//     stream
//       .pipe(csvParser({ separator: ';' }))
//       .on('data', async (row) => {
//         console.log(row);
//         const entity = this.targetRepository.create({
//           // Mapeie as colunas do CSV para as propriedades da entidade

//           Buyer: row.Buyer,
//           Client: row.Client,
//           ClientSubSector: row.ClientSubSector,
//           NDeals: row.NDeals,
//           NumberOfNDAPerBuyerInSubSector: row.NumberOfNDAPerBuyerInSubSector,
//           NumberOfGosPerBuyerInSubSector: row.NumberOfGosPerBuyerInSubSector,
//           NumberOfGosPerSizeInSubSector: row.NumberOfGosPerSizeInSubSector,
//           NumberOfNBOperDealsInSubSector: row.NumberOfNBOperDealsInSubSector,
//           AverageSizePerDealInSubSector: row.AverageSizePerDealInSubSector,
//           MedianSizePerDealInSubSector: row.MedianSizePerDealInSubSector,
//           DealClosePerClientSector: row.DealClosePerClientSector,
//           MostRecentContact: row.MostRecentContact,
//           IsEqual: row.IsEqual,
//           // LastDateCloseDealPerInSubSector: row.LastDateCloseDealPerInSubSector,
//           // NBOLastDatePerDealInSubSector: row.NBOLastDatePerDealInSubSector,
//         });

//         await this.targetRepository.save(entity);
//       })
//       .on('end', () => {
//         console.log('Dados do CSV importados com sucesso!');
//       });
//   }
// }

// // // src/targets/targets.service.ts
// // import { Inject, Injectable } from '@nestjs/common';
// // import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
// // import { Repository, getRepository } from 'typeorm';
// // import * as XLSX from 'xlsx';
// // import { Target } from './target.entity';

// // @Injectable()
// // export class TargetService {
// //   constructor(
// //     @Inject(getRepositoryToken(Target)) // Use o getRepositoryToken para obter o token
// //     private readonly targetRepository: Repository<Target>,
// //   ) {}

// //   async importFromExcel(filePath: string): Promise<void> {

// //     const workbook = XLSX.readFile(filePath);
// //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
// //     const rows = XLSX.utils.sheet_to_json(worksheet);

// //     for (const row of rows) {
// //       const target = new Target();
// //       target.Buyer = row['Buyer'];
// //       target.Client = row['Client'];
// //       target.ClientSubSector = row['ClientSubSector'];
// //       target.NDeals = row['NDeals'];
// //       target.NumberOfNDAPerBuyerInSubSector = row['NumberOfNDAPerBuyerInSubSector'];
// //       target.NumberOfGosPerBuyerInSubSector = row['NumberOfGosPerBuyerInSubSector'];
// //       target.NumberOfGosPerSizeInSubSector = row['NumberOfGosPerSizeInSubSector'];
// //       target.NumberOfNBOperDealsInSubSector = row['NumberOfNBOperDealsInSubSector'];
// //       target.AverageSizePerDealInSubSector = row['AverageSizePerDealInSubSector'];
// //       target.MedianSizePerDealInSubSector = row['MedianSizePerDealInSubSector'];
// //       target.NBOLastDatePerDealInSubSector = new Date(row['NBOLastDatePerDealInSubSector']);
// //       target.DealClosePerClientSector = row['DealClosePerClientSector'];
// //       target.LastDateCloseDealPerInSubSector = new Date(row['LastDateCloseDealPerInSubSector']);
// //       target.MostRecentContact = row['MostRecentContact'];
// //       target.IsEqual = row['IsEqual'];

// //       await this.targetRepository.save(target);
// //     }
// //   }
// // }
