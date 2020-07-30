import React, {useState, useEffect} from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import {
  getHour,
  formatDate,
} from "../helpers/date"

import './QuestionThree.css'

import {
  buildJobEvents
} from "./helpers/buildJobs"

export const QuestionThree = ({service}) => {
  const [jobEvents, setJobEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const api = async() => {
      try {
        const resources = await service.getResources()
        const jobs = await service.getJobs()
        const jobAllocations = await service.getJobAllocations()
        const jobEventList = buildJobEvents(jobs, jobAllocations, resources)
        setJobEvents(jobEventList)
        setIsLoading(false)
      } catch(e) {
        // Don't handle error use case, only the loading
        console.warn(`Server failed: ${e.message}`)
        setIsLoading(false)
        setError(e)
      }
    }
    api()
  }, [service])

  return (
    <SectionGroup>
      <SectionPanel>
        <div className="grid">
          <div className="row full-height ">
            <div className="column">
              <nav className="navigation-bar">
                <div className="column">
                  {new Array(4).fill(0).map((_, id) => (
                    <div key={`navigation-bar-button-${id}`} className="navigator-bar-button" />
                  ))}
                </div>
                <div className="column column-justify-flex-end">
                  <div className="navigator-bar-button" />
                </div>
              </nav>
            </div>
            <section className="column section full-height">
              <div className="row">
                <header className="header">
                  {
                    /* 
                    * The header is fully dynamic, 
                    * if it grows in size to have extra content, the page will accomodate itself due to this without having to scroll down the page
                    */
                  }
                  <h4>
                    Header
                  </h4>
                </header>
              </div>
              <div className="row full-height overflow-hidden">
                <div className="left-column">
                  <div className="box-overflow full-height">
                    {jobEvents.map((jobEvent) => (
                      <div className="job-card" key={jobEvent.id}>
                        <div className="column">
                          <div className="row">
                            <h4 className="job-card-header">
                              {jobEvent.name}
                              <span>
                                {`(Job #${jobEvent.id})`}
                              </span>
                            </h4>
                          </div>
                          <div className="row">
                            <h5 className="job-card-header-tagline">
                              {jobEvent.location}
                            </h5>
                          </div>
                          <div className="row full-height">
                            <div className="job-card-column">
                              <p className="job-card-column-main-date">
                                {formatDate(jobEvent.start)}
                              </p>
                              <p className="job-card-column-secondary-date">
                                {`${getHour(jobEvent.start)}-${getHour(jobEvent.end)}`}
                              </p>
                            </div>
                            {jobEvent.numberOfResources > 0 && (
                              <div className="job-card-resource-column">
                                  <div className="job-card-resource-number">
                                    {jobEvent.numberOfResources}
                                  </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="right-column full-height overflow-hidden">
                  <div className="box-overflow full-height">
                    {new Array(20).fill(0).map((_, id) => (
                      <div key={`content-card-${id}`} className="content-card">
                        {id}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </SectionPanel>
    </SectionGroup>
  )
}