import { toAbsoluteUrl } from "src/_metronic/helpers";



const BorrowApyModal = ({ borrowApy, compBorrowApy, ticker, usdValue, balance }) => {
    return (
        <table className="table table-hover table-rounded table-striped border gy-2 gs-7 mt-3">
            <thead>
                <tr className="fw-bold fs-7 text-gray-800 border-bottom-1 border-gray-200 ">
                    <th>Borrow Apy
                        <img
                            className='mx-1'
                            alt='Pic'
                            width='25px'
                            src={toAbsoluteUrl('/media/icons/duotune/compound/' + ticker + '.svg')}
                        />
                    </th>
                    <th>Comp Apy
                        <img
                            className='mx-1'
                            alt='Pic'
                            width='25px'
                            src={toAbsoluteUrl('/media/icons/duotune/compound/COMP.svg')}
                        />
                    </th>
                    <th>Wallet Balance
                    </th>
                </tr>
            </thead>
            <tbody >
                <tr >
                    <td>+ %{borrowApy}</td>
                    <td>+ %{compBorrowApy}</td>
                    <td className='d-flex'>{balance} {ticker}<div className='text-gray-400'>(${usdValue})</div></td>
                </tr>
            </tbody>
        </table>
    )
}

export default BorrowApyModal;
