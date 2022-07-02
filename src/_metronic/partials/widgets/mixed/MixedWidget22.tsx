/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTSVG} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {AppService} from '../../../../app/modules/services/covalent.service'

type Props = {
  className: string
  chartColor: string
  strokeColor: string
  chartHeight: string
}

const appService = new AppService()

const MixedWidget2: React.FC<Props> = ({className, chartColor, chartHeight, strokeColor}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [mbd, setMbd] = useState<Array<any>>([])
  const [timestampS, setTimestampS] = useState<string[]>([])
  const [quoteS, setQuoteS] = useState<number[]>([])
  const timestamp = useRef<Array<string> | null>(null)

  let monthlyBalance: any[] = []
  // let timestamp: string[] = []
  let quote = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]

  useEffect(() => {
    async function AddressHistoricalValue(address: string) {
      const value = await appService.getHistoricalValue(address)
      setMbd(value.data.items)
      return value
    }
    AddressHistoricalValue('0x2f877d11c8A7dccdd78F408106D126b065A4BDcF')
  }, [])

  // const AddressHistoricalValue = async (address: string) => {
  //   const value = await appService.getHistoricalValue(address)
  //   setMbd(value.data.items)
  //   return value
  // }

  console.log(mbd)

  mbd.forEach((token) => {
    monthlyBalance = token.holdings
    for (let i = 0; i < 30; i++) {
      quote[i] += Math.round(monthlyBalance[i].close.quote)
    }
  })
  
  console.log(quote)

  useEffect(() => {
    if (mbd[0] !== undefined) {
      for (let i = 0; i < 30; i++) {
        setTimestampS((prev) => [
          ...prev,
          new Date(mbd[0].holdings[i].timestamp).toLocaleString('default', {
            month: 'short',
            day: 'numeric',
          }),
        ])
      }
    }
  }, [mbd])

  timestamp.current = timestampS
  // console.log(timestamp)

  console.log(timestamp.current)

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartHeight, chartColor, strokeColor, quote, timestamp.current!)
    )

    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mbd])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className={`card-header border-0 py-5 bg-${chartColor}`}>
        <h3 className='card-title fw-bolder text-white'>Sales Statistics</h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Chart */}
        <div
          ref={chartRef}
          className={`mixed-widget-2-chart card-rounded-bottom bg-${chartColor}`}
        ></div>
        {/* end::Chart */}
        {/* begin::Stats */}
        <div className='card-p mt-n20 position-relative'>
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7'>
              <KTSVG
                path='/media/icons/duotune/general/gen032.svg'
                className='svg-icon-3x svg-icon-warning d-block my-2'
              />
              <a href='#' className='text-warning fw-bold fs-6'>
                Weekly Sales
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-primary px-6 py-8 rounded-2 mb-7'>
              <KTSVG
                path='/media/icons/duotune/arrows/arr075.svg'
                className='svg-icon-3x svg-icon-primary d-block my-2'
              />
              <a href='#' className='text-primary fw-bold fs-6'>
                New Users
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-danger px-6 py-8 rounded-2 me-7'>
              <KTSVG
                path='/media/icons/duotune/abstract/abs027.svg'
                className='svg-icon-3x svg-icon-danger d-block my-2'
              />
              <a href='#' className='text-danger fw-bold fs-6 mt-2'>
                Item Orders
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-success px-6 py-8 rounded-2'>
              <KTSVG
                path='/media/icons/duotune/communication/com010.svg'
                className='svg-icon-3x svg-icon-success d-block my-2'
              />
              <a href='#' className='text-success fw-bold fs-6 mt-2'>
                Bug Reports
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
        {/* end::Stats */}
      </div>
      {/* end::Body */}
    </div>
  )
}

const chartOptions = (
  chartHeight: string,
  chartColor: string,
  strokeColor: string,
  quote: Array<number>,
  timestamp: Array<any>
): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const color = getCSSVariableValue('--bs-' + chartColor)

  return {
    series: [
      {
        name: 'Net Profit',
        data: [
          488, 482, 514, 545, 522, 524, 526, 511, 453, 457, 467, 463, 1216, 1667, 2217, 2412, 2496,
          2522, 2917, 3482, 3561, 3913, 4075, 4207, 4132, 4024, 7186, 7164, 7253, 7146,
        ],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: strokeColor,
        opacity: 0.5,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [strokeColor],
    },
    xaxis: {
      categories: timestamp,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      min: -4000,
      max: 8000,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousands'
        },
      },
      marker: {
        show: false,
      },
    },
    colors: ['transparent'],
    markers: {
      colors: [color],
      strokeColors: [strokeColor],
      strokeWidth: 3,
    },
  }
}

export {MixedWidget2}
