interface Data {
  report: {
    id: String,
    source: String,
    amount: number,
    create_at: Date,
    update_at: Date,
    type: ReportType,
  }[]
}

export enum ReportType {
  INCOME = "income",
  EXPENSE = "expense"
}

export const data: Data = {
  report: [
    {
      id: "test1",
      source: "source1",
      amount: 100,
      create_at: new Date(),
      update_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: "test2",
      source: "source2",
      amount: 100,
      create_at: new Date(),
      update_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: "test3",
      source: "source3",
      amount: 100,
      create_at: new Date(),
      update_at: new Date(),
      type: ReportType.EXPENSE,
    },
  ]
}

