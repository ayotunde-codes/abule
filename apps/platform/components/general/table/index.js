import React from 'react';

export default function Table({ headers, data }) {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead className="custom-table-head">
          <tr className="custom-table-head-row">
            {headers.map((head, ind) => (
              <th key={ind} className="custom-table-head-cell">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="custom-table-body">
          {data.map((items, ind) => (
            <tr
              key={ind}
              className="custom-table-body-row"
              onClick={items.onClick}
            >
              {items.data.map((val, index) => (
                <td key={index} className="custom-table-body-cell">
                  <p>{val}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.defaultProps = {
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
