import { useEffect, useState } from "react";
import { KTSVG } from "src/_metronic/helpers";
import SupplyApyModal from "./supplyApyModal";
import { Supply, Withdraw } from './SupplyWithdraw'
import { useAccount } from 'src/app/modules/web3'



let supUsdValue;
let withUsdValue;

const SupplyButton = ({ underlyingPrice, supplyApy, compSupplyApy, supplied, leftToBorrow, usedPower, ticker, balance, cF, cTokenAddress, cToken }) => {
    const { account } = useAccount()
    const [activeTab, setActiveTab] = useState(1)
    const [supplyInput, setSupplyInput] = useState(0)
    const [withdrawInput, setWithdrawInput] = useState(0)
    const [usedSupLiq, setUsedSupLiq] = useState(usedPower)
    const [usedWithLiq, setUsedWithLiq] = useState(usedPower)
    const [supLiq, setSupLiq] = useState(leftToBorrow)
    const [withLiq, setWithLiq] = useState(leftToBorrow)

    let usdValue = Math.round(balance * underlyingPrice * 100) / 100

    useEffect(() => {
        supUsdValue = Math.round(supplyInput * underlyingPrice * 100) / 100

        const change1 = async () => {
            await setSupLiq(Math.round((leftToBorrow + (supUsdValue * cF)) * 100) / 100)
            await setUsedSupLiq(Math.round(((leftToBorrow * 100) / (leftToBorrow - supLiq + (100 * supLiq / usedPower))) * 100) / 100)
        }
        change1()

    }, [supplyInput, supLiq])

    useEffect(() => {
        withUsdValue = Math.round(withdrawInput * underlyingPrice * 100) / 100

        const change2 = async () => {
            await setWithLiq(Math.round((leftToBorrow - (withUsdValue * cF)) * 100) / 100)
            await setUsedWithLiq(Math.round(((leftToBorrow * 100) / (leftToBorrow - withLiq + (100 * withLiq / usedPower))) * 100) / 100)
        }
        change2()

    }, [withdrawInput, withLiq])

    const handleSupplyChange = (e) => {
        setSupplyInput(e.target.value)
    }

    const handleWithdrawChange = (e) => {
        setWithdrawInput(e.target.value)
    }

    return (
        <div className='rounded-bottom modal fade' tabIndex={-1} id={'kt_modal_1' + ticker}>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='d-flex justify-content-center flex-row'>
                        <ul className='nav nav-tabs nav-line-tabs fs-6 border-0 w-100 h-50px'>
                            <li className='nav-item justify-content-center d-flex w-100 btn-group' role='group'>
                                <a
                                    className='nav-link active btn rounded-0 btn-active-primary '
                                    data-bs-toggle='tab'
                                    href={'#kt_tab_pane_1' + ticker}
                                    onClick={() => {
                                        setActiveTab(1)
                                    }}
                                >
                                    Supply Collateral
                                </a>
                                <a
                                    className='nav-link btn rounded-0 btn-active-primary'
                                    data-bs-toggle='tab'
                                    href={'#kt_tab_pane_2' + ticker}
                                    onClick={() => {
                                        setActiveTab(2)
                                    }}
                                >
                                    Redeem Collateral
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='modal-body'>
                        <div className='tab-content ' id='myTabContent'>
                            <div className='tab-pane fade active show' id={'kt_tab_pane_1' + ticker} role='tabpanel'>
                                <div>
                                    <label className='form-label'>Enter Amount to Supply</label>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            <input
                                                type='number'
                                                className='form-control form-control-solid w-25'
                                                placeholder='0'
                                                value={supplyInput}
                                                onChange={handleSupplyChange}
                                            />{' '}
                                            <span className='px-1 fs-3 text-gray-400'>{ticker} </span>
                                        </div>
                                        <div className='text-inverse-secondary bg-light fs-1 px-2 rounded'>
                                            {supUsdValue}
                                        </div>
                                        <div>
                                            <KTSVG
                                                path='/media/icons/duotune/finance/fin010.svg'
                                                className='svg-icon-muted svg-icon-2hx'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <SupplyApyModal
                                        supplyApy={supplyApy}
                                        compSupplyApy={compSupplyApy}
                                        ticker={ticker}
                                        usdValue={usdValue}
                                        balance={balance}
                                    />
                                </div>
                                <div className='d-flex align-items-center w-100 flex-column mt-3'>
                                    <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                                        <span className='fw-bold fs-6 text-gray-400'>Used Liquidity</span>
                                        <span className='fw-bolder fs-6'>{supplyInput ? usedSupLiq : usedPower}%</span>
                                    </div>
                                    <div className='h-5px mx-3 w-100 bg-light mb-3'>
                                        <div
                                            className='bg-success rounded h-5px'
                                            role='progressbar'
                                            style={{ width: `${supplyInput ? usedSupLiq : usedPower}%` }}
                                        ></div>
                                    </div>
                                    <div className='d-flex w-100 row-fluid align-items-center'>
                                        <span className='fw-bold fs-6 text-gray-400 col-6'>Liquidity Change:</span>
                                        <div className='row align-items-center'>
                                            <span className='fw-bolder fs-6 col '>${leftToBorrow}</span>
                                            <KTSVG
                                                path='/media/icons/duotune/arrows/arr001.svg'
                                                className='fw-bolder fs-6 col me-1 svg-icon-muted svg-icon-2hx'
                                            />
                                            <span className='fw-bolder fs-6 col'>${supplyInput ? supLiq : leftToBorrow}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='tab-pane fade' id={'kt_tab_pane_2' + ticker} role='tabpanel'>
                                <div>
                                    <label className='form-label'>Enter Amount to Withdraw</label>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            <input
                                                type='text'
                                                className='form-control form-control-solid w-25'
                                                placeholder='0'
                                                onChange={handleWithdrawChange}

                                            />{' '}
                                            <span className='px-1 fs-3 text-gray-400'>{ticker} </span>
                                        </div>
                                        <div className='text-inverse-secondary bg-light fs-1 px-2 rounded'>
                                            {withUsdValue}
                                        </div>
                                        <div>
                                            <KTSVG
                                                path='/media/icons/duotune/finance/fin010.svg'
                                                className='svg-icon-muted svg-icon-2hx'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <SupplyApyModal
                                        supplyApy={supplyApy}
                                        compSupplyApy={compSupplyApy}
                                        ticker={ticker}
                                        usdValue={usdValue}
                                        balance={balance}
                                    />
                                </div>
                                <div className='d-flex align-items-center w-100 flex-column mt-3'>
                                    <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                                        <span className='fw-bold fs-6 text-gray-400'>Used Liquidity</span>
                                        <span className='fw-bolder fs-6'>{withdrawInput ? usedWithLiq : usedPower}%</span>
                                    </div>
                                    <div className='h-5px mx-3 w-100 bg-light mb-3'>
                                        <div
                                            className='bg-success rounded h-5px'
                                            role='progressbar'
                                            style={{ width: `${withdrawInput ? usedWithLiq : usedPower}%` }}
                                        ></div>
                                    </div>
                                    <div className='d-flex w-100 row-fluid align-items-center'>
                                        <span className='fw-bold fs-6 text-gray-400 col-6'>Liquidity Change:</span>
                                        <div className='row align-items-center'>
                                            <span className='fw-bolder fs-6 col '>${leftToBorrow}</span>
                                            <KTSVG
                                                path='/media/icons/duotune/arrows/arr001.svg'
                                                className='fw-bolder fs-6 col me-1 svg-icon-muted svg-icon-2hx'
                                            />
                                            <span className='fw-bolder fs-6 col'>${withdrawInput ? withLiq : leftToBorrow}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer justify-content-between'>
                        <div className='text-gray-400 fs-5'>Currently Supplying {supplied} {ticker}</div>
                        <div>
                            <button type='button' className='btn btn-light me-2' data-bs-dismiss='modal'>
                                Close
                            </button>
                            <button type='button' className='btn btn-primary' onClick={async () => {
                                if (activeTab === 1) {
                                    await Supply(account, cTokenAddress, ticker, supplyInput, cToken)
                                } else if (activeTab === 2) {
                                    await Withdraw(account, cTokenAddress, ticker, withdrawInput, cToken)
                                }
                            }}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupplyButton;
