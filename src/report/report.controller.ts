import { Controller, Delete, Get, Post, Put, Param, Body, HttpCode, ParseEnumPipe, ParseUUIDPipe } from "@nestjs/common";
import { ReportType } from "src/data";
import { ReportService } from "./report.service";
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "src/dtos/report.dto";



@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto[] {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.getAllReports(reportType)
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: String,
    @Param('id', ParseUUIDPipe) id: String
  ): ReportResponseDto {
    console.log(id, typeof id)
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: String,
    @Body() { amount, source }: CreateReportDto
  ): ReportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.createReport(reportType, { amount, source })
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: String,
    @Param('id', ParseUUIDPipe) id: String,
    @Body() body: UpdateReportDto
  ): ReportResponseDto {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deletedReport(
    @Param('id', ParseUUIDPipe) id: String,
  ) {
    return this.reportService.deleteReport(id)
  }
}