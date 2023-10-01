import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ReportType } from "src/data";



export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: String;
}

export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: String;
}

export class ReportResponseDto {
  id: String;
  source: String;
  amount: number;

  @Exclude()
  create_at: Date;

  @Exclude()
  update_at: Date;

  type: ReportType;

  @Expose({ name: "createdAt" })
  transformCreatedAt() {
    return this.create_at
  }

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial)
  }
}

