import React, {useState, useEffect, useCallback} from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import './QuestionOne.css'

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

  const getHour = (value) => {
    return `${formatDateToPlural(new Date(value).getHours())}:${formatDateToPlural(new Date(value).getMinutes())}`
  }

  const formatDateToPlural = (value) => {
    return parseInt(value, 10) >= 10 ? value : `0${value}`
  }

  const formatDate = (value) => {
    const date = new Date(value)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    return `${weekDays[date.getDay()]} ${monthNames[date.getMonth()]} ${formatDateToPlural(date.getDate())} ${date.getFullYear()}`
  }

  return (
    <SectionGroup>
      <SectionPanel>
        <label htmlFor="jobInput" className="label-group">
          Search for a job:
          <input id="jobInput" className="input-field" type="text" onChange={handleQueryChange} />
        </label>
        {isLoading && !error && (
          <div>
            <div className="spinner" />
          </div>
        )}
        {!isLoading && error && (
          <div>
            {error.message}
          </div>
        )}
        {!isLoading && !error && jobs.length > 0 && jobs.map((job) => (
          <div className="job" key={job.id}>
              <p className="job-title">
                Your worker: {job.name}
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