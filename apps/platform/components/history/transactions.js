import React from 'react';
import { Fn } from '@abule-common/components';

const {
  getRelativeTime,
} = Fn;

class TransactionHistory extends React.Component {
  render() {
    const { props } = this;
    const { settings } = props;
    const { screen } = settings;

    const { history } = props;

    if (history.length === 0) {
      return (
        <div className="credits-history preview empty-log">
          <p>You do not have any transaction history yet.</p>
        </div>
      );
    }

    return (
      <div className="transactions-history preview">
        {screen.width <= process.env.MOBILE_BREAKPOINT
          ? history.map((log) => (
            <div className="mobile-log">
              <div className="details">
                <div className="double-data">
                  <div className="data">
                    <span>STATUS</span>
                    <span>{log.status}</span>
                  </div>
                  <div className="data">
                    <span>AMOUNT</span>
                    <span>${Number(log.amount).toFixed(2)}</span>
                  </div>
                </div>
                <div className="data">
                  <span>TYPE</span>
                  <span>{log.subscriptionId ? 'Subscription' : 'Credits'} {log.subscription && <i style={{ fontWeight: '200' }}>({log.subscription.plan.subscriptionTier.name})</i>}</span>
                </div>
              </div>
              <div className="date">
                <span>{getRelativeTime(log.createdAt, false, 'number-with-time')}</span>
              </div>
            </div>
          ))
          : (
            <table className="">
              <tbody className="">
                <tr
                  // key={ind}
                  className=""
                >
                  <th className="">
                    <p>ID</p>
                  </th>
                  <th className="">
                    <p>DATE</p>
                  </th>
                  <th className="">
                    <p>TYPE</p>
                  </th>
                  <th className="">
                    <p>AMOUNT</p>
                  </th>
                  <th className="">
                    <p>STATUS</p>
                  </th>
                  <th className="">
                    <span className="fa fa-question-circle-o" />
                  </th>
                </tr>

                {history.map((log) => (
                  <tr
                    // key={ind}
                    className="custom-table-body-row"
                  >
                    <td className="">
                      <p>{log.id}</p>
                    </td>
                    <td className="">
                      <p>{getRelativeTime(log.createdAt, false, 'number-with-time')}</p>
                    </td>
                    <td className="">
                      <p>{log.subscriptionId ? 'Subscription' : 'Credits'}</p>
                      {log.subscription && <i style={{ fontWeight: '200' }}>({log.subscription.plan.subscriptionTier.name})</i>}
                    </td>
                    <td className="">
                      <p>${Number(log.amount).toFixed(2)}</p>
                    </td>
                    <td className="">
                      <p>{log.status}</p>
                      {/* <p>{['active'].includes(log.status) ? 'successded' : log.status}</p> */}
                    </td>
                    <td className="" />
                  </tr>

                ))}
              </tbody>
            </table>
          )}
      </div>
    );
  }
}

TransactionHistory.defaultProps = {

};
export default TransactionHistory;
