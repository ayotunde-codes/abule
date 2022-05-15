import React from 'react';
import PropTypes from 'prop-types';

class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: 0, // which group is focused

      iconsTop: false,
      slideShow: null,
    };

    this.controllerLeft = null;
    this.controllerRight = null;
    this.moveSlide = this.moveSlide.bind(this);
  }

  moveSlide(dir) {
    const { state } = this;
    if (state.slideShow) {
      const { state, props } = this;
      let next = 0;
      if (dir === 'left') {
        next = state.focused === 0 ? 0 : state.focused - 1;
      } else if (dir === 'right') {
        let groupItemLength = $(state.slideShow).children('.item-length').css('content');
        groupItemLength = parseInt(groupItemLength[1], 10);
        const groupLen = Math.ceil(props.items.length / groupItemLength);
        console.log({
          itemsTotal: props.items.length, groupItemLength, groupLen, focused: state.focused,
        });
        next = state.focused === groupLen - 1 ? groupLen - 1 : state.focused + 1;
      }

      this.setState(() => ({ focused: next }));
    }
  }

  render() {
    const { state, props } = this;
    const items = [];
    const indicators = [];
    let counter = 1;
    let hideCntrlLeft = false;
    let hideCntrlRight = false;
    let cntrlTop = false;

    if (state.slideShow) {
      let groupItemLength = $(state.slideShow).children('.item-length').css('content');
      groupItemLength = parseInt(groupItemLength[1], 10);
      props.items.forEach((item, i) => {
        if (counter === 1) {
          items.push([]);
        }
        items[items.length - 1].push(
          <div className="item" key={`${i}_item`}>
            {item.content}
            <p className="item-label">{item.label}</p>
          </div>,
        );
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        /*  indicators.push(<li
        className={`${state.focused === i ? 'active' : ''}`}
        key={`${i}_indicator`}
        onClick={() => {
          this.setState(() => ({ focused: i }));
        }}
        />); */
        counter = counter === groupItemLength ? 1 : counter + 1;
      });

      const groupLen = Math.ceil(props.items.length / groupItemLength);
      console.log({ focused: state.focused, groupLen });
      if (state.focused === 0) {
        hideCntrlLeft = true;
      }
      if (state.focused === groupLen - 1) {
        hideCntrlRight = true;
      }

      if (this.controllerLeft && props.setControllerTop) {
        cntrlTop = props.setControllerTop(this.controllerLeft, this.controllerRight);
      }
      console.log('the controller top', { cntrlTop });
    }

    return (
      <div
        id={props.id}
        ref={(e) => { if (this.state.slideShow === null) this.setState({ slideShow: e }); }}
        data-slideshow
        className={`slide-show-container ${props.className}`}
      >
        <span className="item-length" />
        <div className="slide-show-content">
          <div className="screen">
            <div className={`items ${props.itemsClassName}`} style={{ transform: `translate(-${state.focused}00%, 0)` }}>
              {/* {items.map((itemGroup) => <div className="item-group">{itemGroup}</div>)} */}
              {props.items.map((item, i) => (
                <div className="item" key={`${i}_item`}>
                  {item.content}
                  <p className="item-label">{item.label}</p>
                </div>
              ))}
            </div>
            {/* <ul className="indicators">{indicators} </ul> */}

            {/* <p className="label">{props.items[state.focused].label}</p> */}
          </div>
          <span
            className={`controller left${hideCntrlLeft ? ' hide' : ''}`}
            ref={(e) => { this.controllerLeft = e; }}
            style={{ top: cntrlTop !== false ? cntrlTop : null }}
            onClick={() => {
              this.moveSlide('left');
            }}
          >
            {props.controllerLeft ? props.controllerLeft : <span className="icon-arrow-left-2" />}
          </span>
          <span
            className={`controller right${hideCntrlRight ? ' hide' : ''}`}
            ref={(e) => { this.controllerRight = e; }}
            style={{ top: cntrlTop !== false ? cntrlTop : null }}
            onClick={() => {
              this.moveSlide('right');
            }}
          >
            {props.controllerRight ? props.controllerRight : <span className="icon-arrow-right-3" />}
          </span>
        </div>
      </div>

    );
  }
}
SlideShow.defaultProps = {
  className: '',
  id: '',
  itemsClassName: '',
};

SlideShow.propTypes = {
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  itemsClassName: PropTypes.string,
};

export default SlideShow;
