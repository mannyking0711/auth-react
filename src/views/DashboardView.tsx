import { useContext, useEffect, useState } from 'react'
import { AppContext, AppContextType } from '../contexts/AppContextProvider'
import axiosInstance from '../axiosApi'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import testData from '../result.json'
import { ChartView } from './Main/Track/ChartView'

export const DashboardView = () => {
  const { setCurrentPage } = useContext(AppContext) as AppContextType
  const [ports, setPorts] = useState<any>({})
  const [vulnerability, setVulnerability] = useState<any>()

  useEffect(() => {
    setCurrentPage('dashboard')
    axiosInstance.get('/hello/').then(() => { })

    const openPorts: any = {}
    testData.hosts.map((subdomain: any) => {
      subdomain.ports.map((p: any) => {
        if (p.state['@state'] === 'open') {
          const port = p['@portid']
          if (openPorts[port]) openPorts[port]++
          else openPorts[port] = 1
        }
      })
    })
    setPorts(openPorts)

    const vul: any = {}
    testData.hosts.map((subdomain: any) => {
      subdomain.vulnerabilities.map((v: any) => {
        const severity = v.severity;
        if (vul[severity]) vul[severity]++
        else vul[severity] = 1
      })
    })
    setVulnerability(vul)
  }, [])

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Card shadow={false} color='amber'>
          <CardBody>
            Top vulnerable domain
            <Typography variant="h6" color="blue-gray">
              cmsnewui.dubaitrade.ae
            </Typography>
          </CardBody>
        </Card>

        <Card shadow={false} color='amber'>
          <CardBody>
            Top vulnerable subdomain
            <Typography variant="h6" color="blue-gray">
              cmsnewui.dubaitrade.ae
            </Typography>
          </CardBody>
        </Card>

        <Card shadow={false} color='amber'>
          <CardBody>
            Top open port
            <Typography variant="h6" color="blue-gray">
              8080
            </Typography>
          </CardBody>
        </Card>

        <Card shadow={false} color='amber'>
          <CardBody>
            <p className="pt-3">Coming soon</p>
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <Card>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Vulnerabilities
              <ChartView value={vulnerability} name="Vulnerabilities" />
            </Typography>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Opened ports
            </Typography>
            <ChartView value={ports} name="Opened ports" />
          </CardBody>
        </Card>
      </div>
    </>
  )
}
