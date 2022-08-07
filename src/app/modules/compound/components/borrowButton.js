import { useEffect, useState } from "react";
import { KTSVG } from "src/_metronic/helpers";
import SupplyApyModal from "./supplyApyModal";
import { useAccount } from 'src/app/modules/web3'
import BorrowApyModal from "./borrowApyModal";
import { Borrow, Repay } from "./BorrowRepay";
import { Approve } from "./Approve";




let borUsdValue;
let repayUsdValue;

const BorrowButton = ({ underlyingPrice, borrowApy, compBorrowApy, borrowed, leftToBorrow, usedPower, ticker, balance, cF, cTokenAddress, cToken, allowance }) => {
    const { account } = useAccount()
    const [activeTab, setActiveTab] = useState(3)
    const [borrowInput, setBorrowInput] = useState(0)
    const [repayInput, setRepayInput] = useState(0)
    const [usedBorLiq, setUsedBorLiq] = useState(usedPower)
    const [usedRepayLiq, setUsedRepayLiq] = useState(usedPower)
    const [borLiq, setBorLiq] = useState(leftToBorrow)
    const [repayLiq, setRepayLiq] = useState(leftToBorrow)


    let usdValue = Math.round(balance * underlyingPrice * 100) / 100

    useEffect(() => {
        borUsdValue = Math.round(borrowInput * underlyingPrice * 100) / 100

        const change1 = async () => {
            await setBorLiq(Math.round((leftToBorrow - borUsdValue) * 100) / 100)
            await setUsedBorLiq(Math.round(((leftToBorrow * 100) / (leftToBorrow - borLiq + (100 * borLiq / usedPower))) * 100) / 100)
        }
        change1()

    }, [borrowInput, borLiq])

    useEffect(() => {
        repayUsdValue = Math.round(repayInput * underlyingPrice * 100) / 100

        const change2 = async () => {
            await setRepayLiq(Math.round((leftToBorrow + repayUsdValue) * 100) / 100)
            await setUsedRepayLiq(Math.round(((leftToBorrow * 100) / (leftToBorrow - repayLiq + (100 * repayLiq / usedPower))) * 100) / 100)
        }
        change2()

    }, [repayInput, repayLiq])

    const handleBorrowChange = (e) => {
        setBorrowInput(e.target.value)
    }

    const handleRepayChange = (e) => {
        setRepayInput(e.target.value)
    }

    return (
        <div className='rounded-bottom modal fade' tabIndex={-1} id={'kt_modal_2' + ticker}>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='d-flex justify-content-center flex-row'>
                        <ul className='nav nav-tabs nav-line-tabs fs-6 border-0 w-100 h-50px'>
                            <li className='nav-item justify-content-center d-flex w-100 btn-group' role='group'>
                                <a
                                    className='nav-link active btn rounded-0 btn-active-primary '
                                    data-bs-toggle='tab'
                                    href={'#kt_tab_pane_3' + ticker}
                                    onClick={() => {
                                        setActiveTab(3)
                                    }}
                                >
                                    Borrow
                                </a>
                                <a
                                    className='nav-link btn rounded-0 btn-active-primary'
                                    data-bs-toggle='tab'
                                    href={'#kt_tab_pane_4' + ticker}
                                    onClick={() => {
                                        setActiveTab(4)
                                    }}
                                >
                                    Repay Debt
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='modal-body'>
                        <div className='tab-content ' id='myTabContent'>
                            <div className='tab-pane fade active show' id={'kt_tab_pane_3' + ticker} role='tabpanel'>
                                <div>
                                    <label className='form-label'>Enter Amount to Borrow</label>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            <input
                                                type='text'
                                                className='form-control form-control-solid w-25'
                                                placeholder='0'
                                                value={borrowInput}
                                                onChange={handleBorrowChange}
                                            />{' '}
                                            <span className='px-1 fs-3 text-gray-400'>{ticker} </span>
                                        </div>
                                        <div className='text-inverse-secondary bg-light fs-1 px-2 rounded'>
                                            {borUsdValue}
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
                                    <BorrowApyModal
                                        borrowApy={borrowApy}
                                        compBorrowApy={compBorrowApy}
                                        ticker={ticker}
                                        usdValue={usdValue}
                                        balance={balance}
                                    />
                                </div>
                                <div className='d-flex align-items-center w-100 flex-column mt-3'>
                                    <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                                        <span className='fw-bold fs-6 text-gray-400'>Used Liquidity</span>
                                        <span className='fw-bolder fs-6'>{borrowInput ? usedBorLiq : usedPower}%</span>
                                    </div>
                                    <div className='h-5px mx-3 w-100 bg-light mb-3'>
                                        <div
                                            className='bg-success rounded h-5px'
                                            role='progressbar'
                                            style={{ width: `${borrowInput ? usedBorLiq : usedPower}%` }}
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
                                            <span className='fw-bolder fs-6 col'>${borrowInput ? borLiq : leftToBorrow}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='tab-pane fade' id={'kt_tab_pane_4' + ticker} role='tabpanel'>
                                <div>
                                    <label className='form-label'>Enter Amount to Repay</label>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            <input
                                                type='text'
                                                className='form-control form-control-solid w-25'
                                                placeholder='0'
                                                onChange={handleRepayChange}

                                            />{' '}
                                            <span className='px-1 fs-3 text-gray-400'>{ticker} </span>
                                        </div>
                                        <div className='text-inverse-secondary bg-light fs-1 px-2 rounded'>
                                            {repayUsdValue}
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
                                        supplyApy={borrowApy}
                                        compSupplyApy={compBorrowApy}
                                        ticker={ticker}
                                        usdValue={usdValue}
                                        balance={balance}
                                    />
                                </div>
                                <div className='d-flex align-items-center w-100 flex-column mt-3'>
                                    <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                                        <span className='fw-bold fs-6 text-gray-400'>Used Liquidity</span>
                                        <span className='fw-bolder fs-6'>{repayInput ? usedRepayLiq : usedPower}%</span>
                                    </div>
                                    <div className='h-5px mx-3 w-100 bg-light mb-3'>
                                        <div
                                            className='bg-success rounded h-5px'
                                            role='progressbar'
                                            style={{ width: `${repayInput ? usedRepayLiq : usedPower}%` }}
                                        ></div>
                                    </div>
                                    <div className='d-flex w-100 row-fluid align-items-center'>
                                        <span className='fw-bold fs-6 text-gray-400 col-6'>Liquidity Change:</span>
                                        <div className='row align-items-center'>
                                            <span className='fw-bolder fs-6 col'>${leftToBorrow}</span>
                                            <KTSVG
                                                path='/media/icons/duotune/arrows/arr001.svg'
                                                className='fw-bolder fs-6 col me-1 svg-icon-muted svg-icon-2hx'
                                            />
                                            <span className='fw-bolder fs-6 col'>${repayInput ? repayLiq : leftToBorrow}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer justify-content-between'>
                        <div className='text-gray-400 fs-5'>Currently Borrowed {borrowed}$</div>
                        <div>
                            <button type='button' className='btn btn-light me-2' data-bs-dismiss='modal'>
                                Close
                            </button>
                            <button type='button' className='btn btn-primary' onClick={async () => {
                                if (activeTab === 3) {
                                    try {
                                        await Borrow(ticker, borrowInput, cToken)
                                    } catch (error) {
                                        console.error(error)
                                    }
                                } else if (activeTab === 4) {
                                    if (ticker !== "ETH" && allowance === 0) {
                                        try {
                                            await Approve(cTokenAddress, ticker)
                                        } catch (error) {
                                            console.error(error)
                                        }
                                    } else {
                                        try {
                                            await Repay(ticker, repayInput, cToken)
                                        } catch (error) {
                                            console.error(error)

                                        }
                                    }
                                }
                            }}>
                                {allowance !== 0 || activeTab === 3 ? 'Confirm' : 'Approve'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorrowButton;
