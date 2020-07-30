/**
 * Pretty flexible, can either get the total length for the resources or just the resources array
 * @param {*} jobs 
 * @param {*} jobAllocations 
 * @param {*} resources 
 */

export const buildJobEvents = (jobs, jobAllocations, resources) => {
  return jobs.map((job) => {
    const resourceList = getResourcesForJob(job.id, jobAllocations, resources)
    if(resourceList && resourceList.length > 0) {
      return {
        ...job,
        numberOfResources: resourceList.length
      }
    }
    return {
      ...job,
      numberOfResources: null
    }
  })
}

export const getResourcesForJob = (jobId, allocations, resources) => {
  const resourceList = []
  resources.forEach((resource) => {
    const list = allocations.filter((allocation) => `${jobId}` === `${allocation.jobId}` && `${resource.id}` === `${allocation.resourceId}`)
    resourceList.push(...list)
  })
  return resourceList
}