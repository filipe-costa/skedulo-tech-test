import {
  getResourcesForJob
} from "../buildJobs"

import db from "./mocks/db.json"

const resources = db.resources
const unknowJobId = 100
const jobAllocations = db.jobAllocations

describe("getResourcesForJob", () => {
  it("should return a list with length 1", () => {
    expect(getResourcesForJob(0, jobAllocations, resources))
      .toHaveLength(1)
  })
  it("should return a list with length 2", () => {
    expect(getResourcesForJob(1, jobAllocations, resources))
      .toHaveLength(2)
  })
  it("should return an empty list", () => {
    expect(getResourcesForJob(unknowJobId, jobAllocations, resources))
      .toHaveLength(0)
  })
})