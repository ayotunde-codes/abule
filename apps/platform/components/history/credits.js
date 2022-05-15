import React from 'react';
import { Fn } from '@abule-common/components';

const {
  getRelativeTime,
} = Fn;

class CreditHistory extends React.Component {
  render() {
    const { props } = this;
    const { settings } = props;
    const { screen } = settings;
    const { history } = props;
    if (history.length === 0) {
      return (
        <div className="credits-history preview empty-log">
          <p>You do not have any credit history yet.</p>
        </div>
      );
    }

    return (
      <div className="credits-history preview">
        {screen.width <= process.env.MOBILE_BREAKPOINT
          ? history.map((log) => (
            <div className="mobile-log">
              <div className="details">
                <div className="double-data">
                  <div className="data">
                    <span>TITLE</span>
                    <span> {log.activityId ? log.activity.name : 'null'} </span>
                  </div>
                </div>
                <div className="double-data">
                  <div className="data">
                    <span>TYPE</span>
                    <span>{log.activityId ? 'Activity' : 'null'}</span>
                  </div>
                  <div className="data">
                    <span>{log.status}</span>
                    <span>{Number(log.amount).toFixed(2)}</span>
                  </div>
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
                    <p> ID</p>
                  </th>
                  <th className="">
                    <p> DATE</p>
                  </th>
                  <th className="">
                    <p> TYPE</p>
                  </th>
                  <th className="">
                    <p> TITLE</p>
                  </th>
                  <th className="">
                    <p> AMOUNT</p>
                  </th>
                  <th className="">
                    <p> STATUS</p>
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
                      <span>{getRelativeTime(log.createdAt, false, 'number-with-time')}</span>
                    </td>
                    <td className="">
                      <p>{log.activityId ? 'Activity' : 'null'}</p>
                    </td>
                    <td className="">
                      <p>{log.activityId ? log.activity.name : 'null'}</p>
                    </td>
                    <td className="">
                      <p>{Number(log.amount).toFixed(2)}</p>
                    </td>
                    <td className="">
                      <p>{log.status}</p>
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

CreditHistory.defaultProps = {
  headers: ['ID', 'DATE', 'TYPE', 'ROLE', 'EARNED', 'USED', 'LOST', 'STATUS'],
  data: [
    {
      data: [
        '1234567',
        '9/12/2021',
        'Sitting',
        'Requestor',
        '10',
        '4',
        '2',
        'Pending',
        <span className="fa fa-question-circle-o" />,
      ],
      onClick: () => console.log('clicked'),
    },
    {
      data: [
        '1234567',
        '9/12/2021',
        'Sitting',
        'Requestor',
        '10',
        '4',
        '2',
        'Pending',
        <span className="fa fa-question-circle-o" />,
      ],
      onClick: () => console.log('clicked'),
    },
    {
      data: [
        '1234567',
        '9/12/2021',
        'Sitting',
        'Requestor',
        '10',
        '4',
        '2',
        'Pending',
        <a href="mailto:help@abule.io">
          <span className="fa fa-question-circle-o" />
        </a>,
      ],
      onClick: () => console.log('clicked'),
    },
    {
      data: [
        '1234567',
        '9/12/2021',
        'Sitting',
        'Requestor',
        '10',
        '4',
        '2',
        'Pending',
        <span className="fa fa-question-circle-o" />,
      ],
      onClick: () => console.log('clicked'),
    },
    {
      data: [
        '1234567',
        '9/12/2021',
        'Sitting',
        'Requestor',
        '10',
        '4',
        '2',
        'Pending',
        <span className="fa fa-question-circle-o" />,
      ],
      onClick: () => console.log('clicked'),
    },
    {
      data: [
        '1234567',
        '9/12/2021',
        'Sitting',
        'Requestor',
        '10',
        '4',
        '2',
        'Pending',
        <span className="fa fa-question-circle-o" />,
      ],
      onClick: () => console.log('clicked'),
    },
  ],
};
export default CreditHistory;
