export const buildEvents = ({resources, jobs, activities, jobAllocations, activityAllocations}) => {
  return resources.map((resource) => {
    const resourceJobs = getJobsForResource(jobs, jobAllocations, resource.id)
    const resourceActivities = getActivitiesForResource(activities, activityAllocations, resource.id)
    return {
      id: resource.id,
      title: resource.name,
      cards: [...resourceJobs, ...resourceActivities]
    }
  })
}

export const getAllocationForResource = (allocation, resourceId) => {
  return allocation.find((el) => `${el.resourceId}` === `${resourceId}`)
}

export const getJobsForResource = (jobs, allocations, resourceId) => {
  const jobAllocation = getAllocationForResource(allocations, resourceId)
  if(!jobAllocation) {
    return []
  }
  return jobs.filter((job) => `${job.id}` === `${jobAllocation.jobId}`)
    .map((activity) => ({
      description: activity.name,
      start: new Date(activity.start),
      end: new Date(activity.end)
    }))
}

export const getActivitiesForResource = (activities, allocations, resourceId) => {
  const activityAllocation = getAllocationForResource(allocations, resourceId)
  if(!activityAllocation) {
    return []
  }
  return activities.filter((activity) => `${activity.id}` === `${activityAllocation.activityId}`)
    .map((activity) => ({
      description: activity.name,
      start: new Date(activity.start),
      end: new Date(activity.end)
    }))
}