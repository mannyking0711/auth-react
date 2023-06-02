import { useContext, useEffect, useState } from 'react'
import { AppContext, AppContextType } from '../contexts/AppContextProvider'
import axiosInstance from '../axiosApi'
import {
  Card,
  CardBody,
  CardHeader,
  Typography
} from '@material-tailwind/react'
import testData from '../result.json'
import { ChartView } from './Main/Track/ChartView'

export const DashboardView = () => {
  const { setCurrentPage } = useContext(AppContext) as AppContextType
  const [ports, setPorts] = useState<any>({})
  const [vulnerability, setVulnerability] = useState<any>()

  const [tops, setTops] = useState<any>({})

  useEffect(() => {
    setCurrentPage('dashboard')

    axiosInstance.get('dashboard').then((res) => {
      setTops(res.data)
      setPorts(res.data.ports)
      setVulnerability(res.data.vulnerabilities)
    })
  }, [])

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Card shadow={false} color="amber">
          <CardBody>
            Top vulnerable domain
            <Typography variant="h6" color="blue-gray">
              {tops.domain}
            </Typography>
          </CardBody>
        </Card>

        <Card shadow={false} color="amber">
          <CardBody>
            Top vulnerable subdomain
            <Typography variant="h6" color="blue-gray">
              {tops.subdomain}
            </Typography>
          </CardBody>
        </Card>

        <Card shadow={false} color="amber">
          <CardBody>
            Top open port
            <Typography variant="h6" color="blue-gray">
              {tops.port}
            </Typography>
          </CardBody>
        </Card>

        <Card shadow={false} color="amber">
          <CardBody>
            <p className="pt-3">Coming soon</p>
          </CardBody>
        </Card>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
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
