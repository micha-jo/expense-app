import { Injectable } from "@nestjs/common";
import { ReportType, data } from "src/data";
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from "src/dtos/report.dto";

interface Report { amount: number, source: String }
interface UpdateReport { amount?: number, source?: String }

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report.filter((report) => report.type === type).map(report => new ReportResponseDto(report))
  }

  getReportById(type: ReportType, id: String): ReportResponseDto {
    const report = data.report.filter((report) => report.type === type).find(report => report.id === id)
    if (!report) return
    return new ReportResponseDto(report)
  }

  createReport(type: ReportType, { amount, source }: Report): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source: source,
      amount: amount,
      create_at: new Date(),
      update_at: new Date(),
      type: type
    }
    data.report.push(newReport)
    return new ReportResponseDto(newReport)
  }

  updateReport(type: ReportType, id: String, body: UpdateReport): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find(report => report.id === id)
    if (!reportToUpdate) return
    const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id)
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      update_at: new Date(),
    }

    return new ReportResponseDto(data.report[reportIndex])
  }

  deleteReport(id: String) {
    const reportIndex = data.report.findIndex((report) => report.id === id)
    if (reportIndex === -1) return 'error'
    data.report.splice(reportIndex, 1)
    return 'done'
  }
}