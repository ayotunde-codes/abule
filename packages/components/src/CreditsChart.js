import React from 'react';
class CreditsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reveal: true,
      showLoader: false,
      showCancelLoader: false,
    };

    this.inputTime = null;
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    // document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  hide() {
    document.body.style.overflow = '';
  }

  render() {
    const { props } = this;
    const { state } = this;

    const { popAlert } = props;
    console.log('the props in here is : ', props);

    const strokeWidthPx = '0.8';
    const strokeWidth = `${strokeWidthPx}em`;
    const circumference = 300; // <== somehow 300 makes a full circumference
    const offset = 62;
    let radius = '15.91549430918952';
    // radius = `calc(50% - calc(${strokeWidth} / 2))`; // <== in percentage but cant use 50% which more accurate cos of the stroke (it would be cut off )
    radius = '50%'; // <== in percentage but cant use 50% which more accurate cos of the stroke (it would be cut off )
    let sharesLog = 0;
    return (
      <>

        <div className="credits-chart" style={{ padding: strokeWidth }}>
          <svg
            className="credits-chart-drawing"
            preserveAspectRatio="xMidYMid meet"
            x="0"
            y="0"
            viewBox="0 0 100 100"
            role="img"
          >
            <circle
              className="donut-ring"
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              strokeWidth={strokeWidth}
              role="presentation"
            />

            {/* Data drawing */}
            {
              props.data.map((data) => {
                const dataOffset = offset - ((sharesLog / 100) * circumference);

                const degree = (data.share / 100) * circumference;
                sharesLog += data.share;
                return (
                  <circle
                    className={`donut-segment ${data.className || ''}`}
                    cx="50%"
                    cy="50%"
                    r={radius}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${degree} ${circumference - degree}`}
                    strokeDashoffset={`${dataOffset}`}
                  >
                    <title id="donut-segment-title">{data.title}</title>
                    {/* <desc id="donut-segment-1-desc">Pink chart segment spanning 40% of the whole, which is 4 Belgian Quadrupels out of 10 total.</desc> */}
                  </circle>
                );
              })
            }
            {/* Data drawing */}
            <circle
              className="donut-hole-shadow"
              cx="50%"
              cy="50%"
              r={radius}
              role="presentation"
            />
          </svg>
          <div
            className="credits-chart-donut-hole"
            style={{
              width: `calc(100% - ${strokeWidthPx * 4}em)`,
              height: `calc(100% - ${strokeWidthPx * 4}em)`,
            }}
          >
            <div className="content">
              <span>{props.centerLabel}</span>
              <span>{props.total}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

CreditsChart.defaultProps = {
  className: '',
  globalClassName: '',
  value: undefined,
  data: [],
  centerLabel: 'Credits Used'
};

export default CreditsChart
