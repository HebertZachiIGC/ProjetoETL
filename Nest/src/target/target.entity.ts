import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Target {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  Buyer: string | null;

  @Column({ nullable: true })
  BuyerSubSector: string;

  @Column({ nullable: true })
  Client: string;

  @Column({ nullable: true })
  ClientSubSector: string;

  @Column({ nullable: true })
  NDeals: number;

  @Column({ nullable: true })
  NumberOfNDAPerBuyerInSubSector: number;

  @Column({ nullable: true })
  NumberOfGosPerBuyerInSubSector: number;

  @Column({ nullable: true })
  NumberOfGosPerSizeInSubSector: number;

  @Column({ nullable: true })
  NumberOfNBOperDealsInSubSector: number;

  @Column({ nullable: true, type: 'float' })
  AverageSizePerDealInSubSector: number;

  @Column({ nullable: true, type: 'float' })
  MedianSizePerDealInSubSector: number;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  NBOLastDatePerDealInSubSector: Date;

  @Column({ nullable: true })
  DealClosePerClientSector: number;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  LastDateCloseDealPerInSubSector: Date;

  @Column({ nullable: true })
  MostRecentContact: string;

  @Column({ nullable: true, type: 'boolean' })
  IsEqual: boolean;
}
