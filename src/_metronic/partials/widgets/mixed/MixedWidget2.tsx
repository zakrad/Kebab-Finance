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
  const [mbd, setMbd] = useState<Array<any>>([])
  const chartRef = useRef<HTMLDivElement | null>(null)

  let monthlyBalance: any[] = []

  let quote = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]

  let timestamp: string[] = []

  useEffect(() => {
    async function AddressHistoricalValue(address: string) {
      try {
        const value = await appService.getHistoricalValue(address)
        setMbd(value.data.items)
        return value.data.items
      } catch (e) {
        console.log(e)
      }
    }
    AddressHistoricalValue('0x2f877d11c8A7dccdd78F408106D126b065A4BDcF')
  }, [])

  mbd.forEach((token: any) => {
    monthlyBalance = token.holdings
    for (let i = 0; i < 30; i++) {
      quote[i] += Math.round(monthlyBalance[i].close.quote)
      timestamp[i] = new Date(monthlyBalance[i].timestamp).toLocaleString('default', {
        month: 'short',
        day: 'numeric',
      })
    }
  })

  console.log(mbd)
  console.log(quote)
  console.log(timestamp)

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartHeight, chartColor, strokeColor, quote, timestamp)
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
        <h3 className='card-title fw-bolder text-white'>Last Month Value</h3>
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
  quote: number[],
  timestamp: string[]
): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const color = getCSSVariableValue('--bs-' + chartColor)

  return {
    series: [
      {
        name: 'Balance',
        data: quote.reverse(),
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
      categories: timestamp.reverse(),
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
          return '$' + val
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
