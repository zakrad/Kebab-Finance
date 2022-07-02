/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTSVG} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {AppService} from '../../../../app/modules/services/covalent.service'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}
const appService = new AppService()

const MixedWidget9: React.FC<Props> = ({className, chartColor, chartHeight}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [mbd, setMbd] = useState<Array<any>>([])

  let monthlyBalance: any[] = []
  let etherBalance: number = 0
  let USDValue: number = 0

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
    AddressHistoricalValue('0x8f6E540d5475743ED27783769DfbC2080aD85C7b')
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
    if (token.contract_address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      etherBalance = Math.round((monthlyBalance[0].close.balance / 1e18) * 1e3) / 1e3
      USDValue = Math.round(monthlyBalance[0].close.quote * 10) / 10
    }
  })

  console.log(mbd)
  console.log(etherBalance)
  // console.log(quote)
  // console.log(timestamp)

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartColor, chartHeight, quote, timestamp)
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
      {/* begin::Beader */}
      <div className='card-header border-0 py-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Last Month</span>

          <span className='text-muted fw-bold fs-7'>Your Address Value Over Last Month</span>
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body p-0 d-flex flex-column'>
        {/* begin::Stats */}
        <div className='card-px pt-5 pb-10 flex-grow-1'>
          {/* begin::Row */}
          <div className='row g-0 mt-5 mb-10'>
            {/* begin::Col */}
            <div className='col'>
              <div className='d-flex align-items-center me-2'>
                {/* begin::Symbol */}
                <div className='symbol symbol-50px me-3'>
                  <div className='symbol-label bg-light-info'>
                    <i className='lab la-ethereum fs-3x text-gray-700'></i>
                  </div>
                </div>
                {/* end::Symbol */}

                {/* begin::Title */}
                <div>
                  <div className='fs-4 text-dark fw-bolder'>{etherBalance}</div>
                  <div className='fs-7 text-muted fw-bold'>Ether Balance</div>
                </div>
                {/* end::Title */}
              </div>
            </div>
            {/* end::Col */}

            {/* begin::Col */}
            <div className='col'>
              <div className='d-flex align-items-center me-2'>
                {/* begin::Symbol */}
                <div className='symbol symbol-50px me-3'>
                  <div className='symbol-label bg-light-success'>
                    <KTSVG
                      path='/media/icons/duotune/finance/fin010.svg'
                      className='svg-icon-3x svg-icon-success'
                    />
                  </div>
                </div>
                {/* end::Symbol */}

                {/* begin::Title */}
                <div>
                  <div className='fs-4 text-dark fw-bolder'>${USDValue}</div>
                  <div className='fs-7 text-muted fw-bold'>USD Value</div>
                </div>
                {/* end::Title */}
              </div>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}

          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col'>
              <div className='d-flex align-items-center me-2'>
                {/* begin::Symbol */}
                <div className='symbol symbol-50px me-3'>
                  <div className='symbol-label bg-light-success'>
                    <KTSVG
                      path='/media/icons/duotune/ecommerce/ecm002.svg'
                      className='svg-icon-1 svg-icon-success'
                    />
                  </div>
                </div>
                {/* end::Symbol */}

                {/* begin::Title */}
                <div>
                  <div className='fs-4 text-dark fw-bolder'>$49</div>
                  <div className='fs-7 text-muted fw-bold'>Average Bid</div>
                </div>
                {/* end::Title */}
              </div>
            </div>
            {/* end::Col */}

            {/* begin::Col */}
            <div className='col'>
              <div className='d-flex align-items-center me-2'>
                {/* begin::Symbol */}
                <div className='symbol symbol-50px me-3'>
                  <div className='symbol-label bg-light-primary'>
                    <KTSVG
                      path='/media/icons/duotune/ecommerce/ecm010.svg'
                      className='svg-icon-1 svg-icon-primary'
                    />
                  </div>
                </div>
                {/* end::Symbol */}

                {/* begin::Title */}
                <div>
                  <div className='fs-4 text-dark fw-bolder'>$5.8M</div>
                  <div className='fs-7 text-muted fw-bold'>All Time Sales</div>
                </div>
                {/* end::Title */}
              </div>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
        {/* end::Stats */}

        {/* begin::Chart */}
        <div ref={chartRef} className='mixed-widget-6-chart card-rounded-bottom'></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

const chartOptions = (
  chartColor: string,
  chartHeight: string,
  quote: number[],
  timestamp: string[]
): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-800')
  const strokeColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-' + chartColor)
  const lightColor = getCSSVariableValue('--bs-light-' + chartColor)

  return {
    series: [
      {
        name: 'Net Profit',
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
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
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
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: Math.round(Math.min(...quote) - Math.min(...quote) * 0.1),
      max: Math.round(Math.max(...quote) + Math.max(...quote) * 0.1),
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
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  }
}

export {MixedWidget9}
