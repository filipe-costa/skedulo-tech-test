import {
  getJobsForResource,
  getActivitiesForResource,
  getAllocationForResource
} from "../buildSwimLaneFromEvents"

import db from "./mocks/db.json"

const resourceId = db.resources[0].id
const jobs = db.jobs
const activities = db.activities
const jobAllocations = db.jobAllocations
const activityAllocations = db.activityAllocations


describe("getAllocationForResource", () => {
  it("it should get a job allocation", () => {
    const jobAllocation = {
      id: 0,
      resourceId: 1,
      jobId: 1
    }
    expect(getAllocationForResource(jobAllocations, resourceId))
      .toEqual(jobAllocation)
  })

  it("it should get an activity", () => {
    const activityAllocation = {
      id: 0,
      resourceId: 1,
      activityId: 1
    }
    expect(getAllocationForResource(activityAllocations, resourceId))
      .toEqual(activityAllocation)
  })

  it("it should be undefined", () => {
    expect(getAllocationForResource(activityAllocations, 0))
      .toBeUndefined()
  })
})

describe("getJobsForResource", () => {
  it("should return a list with 1 item", () => {
    const jobList = [{
      description: "Build a shed",
      start: new Date(jobs[0].start),
      end: new Date(jobs[0].end)
    }]
    expect(getJobsForResource(jobs, jobAllocations, resourceId))
      .toEqual(jobList)
  })

  it("should return an empty list", () => {
    expect(getJobsForResource(jobs, jobAllocations, 10))
      .toEqual([])
  })
})

describe("getActivitiesForResource", () => {
  it("should return a list with 1 item", () => {
    const activityList = [{
      description: "Meal Break",
      start: new Date(activities[0].start),
      end: new Date(activities[0].end)
    }]
    expect(getActivitiesForResource(activities, activityAllocations, resourceId))
      .toEqual(activityList)
  })

  it("should return an empty list", () => {
    expect(getActivitiesForResource(activities, activityAllocations, 10))
      .toEqual([])
  })
  
})