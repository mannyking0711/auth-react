import { useNavigate, useParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext, AppContextType } from '../../contexts/AppContextProvider'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem
} from '@material-tailwind/react'
import { ChartView } from './Track/ChartView'
import { VulnerabilityItem } from './Track/VulnerabilityItem'
import axiosInstance from 'axiosApi'
import { useToastr } from 'hooks/useToastr'

export const TrackView = () => {
  const navigate = useNavigate()
  const { setCurrentPage } = useContext(AppContext) as AppContextType
  const { notifyError } = useToastr()
  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(-1)

  const handleOpen = (value: number) => {
    if (open === value) setOpen(-1)
    else setOpen(open === value ? 0 : value)
  }

  const [selectedSub, setSelectedSub] = useState('')
  const [hosts, setHosts] = useState<any[]>([])
  const [vulnerability, setVulnerability] = useState<any[]>([])
  const [ports, setPorts] = useState<any>({})
  const { track_id } = useParams()

  useEffect(() => {
    setCurrentPage('domains')
    axiosInstance
      .get(`track/${track_id}`)
      .then((res) => {
        setHosts(res.data.hosts)

        const openPorts: any = {}
        res.data.hosts.map((subdomain: any) => {
          subdomain.ports.map((p: any) => {
            if (p.state['@state'] === 'open') {
              const port = p['@portid']
              if (openPorts[port]) openPorts[port]++
              else openPorts[port] = 1
            }
          })
        })
        setPorts(openPorts)
      })
      .catch((err) => {
        if (err.response.status === 500) {
          notifyError(err.response.data.message)
          navigate('/domains')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [track_id])

  const onSelectHost = (host: string) => {
    setOpen(-1)
    setSelectedSub(host)
    setVulnerability(hosts.find((item) => item.name === host).vulnerabilities)
  }

  return (
    <div className="relative h-full rounded-sm shadow-md">
      {loading ? (
        <p className="flex justify-between bg-teal-500 px-5 py-2 text-white">
          <span className="font-[monospace] text-base">- Loading</span>
          <span className="italic underline drop-shadow-md">
            Track number: {track_id}
          </span>
        </p>
      ) : (
        <>
          <p className="flex justify-between bg-teal-500 px-5 py-2 text-white">
            <span className="font-[monospace] text-base">
              {hosts.length === 0 ? (
                <>
                  <span className="mr-1 mt-1 inline-block h-2 w-2 rounded-full bg-red-600"></span>
                  Pending
                </>
              ) : (
                <>
                  <span className="mr-1 mt-1 inline-block h-2 w-2 rounded-full bg-green-200"></span>
                  Finished
                </>
              )}
            </span>
            <span className="italic underline drop-shadow-md">
              Track number: {track_id}
            </span>
          </p>
          {hosts.length === 0 ? (
            <div
              className="pt-60 text-center text-4xl"
              style={{
                fontFamily: 'Secular One'
              }}
            >
              Scan not started yet
            </div>
          ) : (
            <div className="absolute h-[-webkit-fill-available] w-full">
              <Allotment snap defaultSizes={[100, 300]}>
                <Allotment.Pane className="!overflow-auto">
                  <div className="sticky top-0 z-40 w-full bg-gray-300 px-2 py-1 text-xs text-gray-600">
                    Subdomains
                  </div>
                  <List className="min-w-0 gap-0">
                    {hosts.map((host, index) => (
                      <ListItem
                        selected={host.name === selectedSub}
                        className="!overflow-hidden py-2 pl-2 pr-1"
                        onClick={() => onSelectHost(host.name)}
                        key={index}
                      >
                        {host.name}
                      </ListItem>
                    ))}
                  </List>
                </Allotment.Pane>
                <Allotment.Pane>
                  <Allotment vertical defaultSizes={[300, 100]}>
                    <Allotment.Pane className="!overflow-auto">
                      <div className="sticky top-0 z-40 w-full bg-gray-300 px-2 py-1 text-xs text-gray-600">
                        Statistics
                      </div>
                      <ChartView value={ports} name="Opened ports" />
                    </Allotment.Pane>
                    <Allotment.Pane className="!overflow-auto">
                      <div className="sticky top-0 z-40 w-full bg-gray-300 px-2 py-1 text-xs text-gray-600">
                        Vulnerabilities
                      </div>
                      {vulnerability.map((i, index) => (
                        <Accordion key={index} open={open === index}>
                          <AccordionHeader
                            className="px-4 text-lg"
                            onClick={() => handleOpen(index)}
                          >
                            {i.name}
                          </AccordionHeader>
                          <AccordionBody>
                            <div className="border-b px-5 pb-2">
                              <VulnerabilityItem value={i} />
                            </div>
                          </AccordionBody>
                        </Accordion>
                      ))}
                    </Allotment.Pane>
                  </Allotment>
                </Allotment.Pane>
              </Allotment>
            </div>
          )}
        </>
      )}
    </div>
  )
}
