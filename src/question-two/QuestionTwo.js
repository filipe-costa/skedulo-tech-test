import React, {useState, useEffect} from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import {Swimlane} from "../components/swimlane/Swimlane"
import Loader from "../components/loader/Loader"
import Error from "../components/error/Error"

import './QuestionTwo.css';

import {
  buildEvents
} from "./helpers/buildSwimLaneFromEvents"

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */

const RANGE_START = new Date('2018-09-01T00:00:00Z')
const RANGE_END = new Date('2018-09-01T24:00:00Z')

export const QuestionTwo = ({service}) => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const api = async() => {
      try {
        const resources = await service.getResources()
        const jobs = await service.getJobs()
        const activities = await service.getActivities()
        const jobAllocations = await service.getJobAllocations()
        const activityAllocations = await service.getActivityAllocations()
        const laneEvents = buildEvents({resources, jobs, activities, jobAllocations, activityAllocations})
        setEvents(laneEvents)
        setIsLoading(false)
      } catch(e) {
        setIsLoading(false)
        setError(e)
      }
    }
    api()
  }, [service])

  return (
    <SectionGroup>
      <SectionPanel>
        {isLoading && !error && (
          <Loader />
        )}
        {!isLoading && error && (
          <Error errorMessage={error.errorMessage} />
        )}
        <Swimlane title={`${RANGE_START.getHours()} - ${RANGE_END.getHours()}`} start={RANGE_START} end={RANGE_END} lanes={events} />
      </SectionPanel>
    </SectionGroup>
  )
}