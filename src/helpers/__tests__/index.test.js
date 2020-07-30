import {
  getHour,
  formatDate,
  formatDateToPlural
} from "../date"


describe("getHour", () => {
  it("should get the 13:00 formatted hour", () => {
    expect(getHour("2018-09-01T13:00:00")).toEqual("13:00")
  })
  it("should get the 05:05 formatted hour", () => {
    expect(getHour("2018-09-01T05:05:00")).toEqual("05:05")
  })
})

describe("formatDateToPlural", () => {
  it("should get a formatted value if less than 10", () => {
    expect(formatDateToPlural("5")).toEqual("05")
  })
  it("should get the passed value without formatting it", () => {
    expect(formatDateToPlural("10")).toEqual("10")
  })
})

describe("formatDate", () => {
  it("should get a formatted date given the following value '2018-09-01T13:00:00'", () => {
    expect(formatDate("2018-09-01T13:00:00")).toEqual("Sun Sep 01 2018")
  })
})