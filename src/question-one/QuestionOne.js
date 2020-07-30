import React, {useState, useEffect, useCallback} from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import Loader from "../components/loader/Loader"
import Error from "../components/error/Error"

import './QuestionOne.css'

import {
  getHour,
  formatDate,
} from "../helpers/date"

export const QuestionOne = ({service}) => {
  const [query, setQuery] = useState("")
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getJobs = useCallback(() => {
    setJobs(() => [])
    setIsLoading(true)
    service.getJobsWithSearchTerm(query)
      .then((data) => {
        setJobs(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
  }, [service, query])

  useEffect(() => {
    if(query.length >= 3) {
      getJobs()
    } else {
      setJobs(() => [])
    }
  }, [getJobs, query])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <SectionGroup>
      <SectionPanel>
        <label htmlFor="jobInput" className="label-group">
          Search for a job:
          <input id="jobInput" className="input-field" type="text" onChange={handleQueryChange} />
        </label>
        {isLoading && !error && (
          <Loader />
        )}
        {!isLoading && error && (
          <Error errorMessage={error.message} />
        )}
        {!isLoading && !error && jobs.length > 0 && jobs.map((job) => (
          <div className="job" key={`${job.name}-${job.id}`}>
              <p className="job-title">
                {job.name}
              </p>
              <p className="job-text">
                {job.contact.name}
              </p>
              <p className="job-text">
                {formatDate(job.start)}
              </p>
              <p className="job-text">
                {`${getHour(job.start)}-${getHour(job.end)}`}
              </p>
          </div>
        ))}
      </SectionPanel>
    </SectionGroup>
  )
}