import React, { useCallback, useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official'
import highchartsAnnotations from 'highcharts/modules/annotations'

highchartsMore(Highcharts)
highchartsAnnotations(Highcharts)

type IProps = {
  value: any
  name: string
}

export const ChartView = ({ value = {}, name }: IProps) => {
  const [options, setOptions] = useState<any>({
    chart: {
      type: 'pie'
    },
    title: {
      text: null,
      align: 'left'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y} ports</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y} ports'
        }
      }
    },
    series: [
      {
        name: name,
        colorByPoint: true,
        data: [],
        showInLegend: true
      }
    ]
  })

  const [chart, setChart] = useState(null)

  const chartRef = useRef(null)

  const callback = useCallback(
    (HighchartsChart: React.SetStateAction<null>) => {
      setChart(HighchartsChart)
    },
    []
  )

  useEffect(() => {
    setOptions({
      ...options,
      series: [
        {
          name: 'Brands',
          colorByPoint: true,
          data: Object.keys(value).map((key) => {
            return {
              name: key,
              y: value[key]
            }
          })
        }
      ]
    })
  }, [value])

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        callback={callback}
        ref={chartRef}
      />
    </>
  )
}
