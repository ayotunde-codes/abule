import Router from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import { updateHeader } from '../../redux/settings/action';

class Fragment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
    };
  }

  componentDidMount() {
    const { props } = this;
    window.document.body.style.overflow = 'hidden';
    // alert('we here 1');
    props.updateHeader({
      backButton: {
        show: true,
        extra: 'just nonsense',
        onClick: () => {
          // alert('we here');
          // Router.back();
          props.onClose();
        },
      },
    });
  }

  componentWillUnmount() {
    const { props } = this;
    window.document.body.style.overflow = '';
    props.updateHeader({
      backButton: {
        show: false,
      },
    });
  }

  render() {
    const { props, state } = this;
    const { children } = props;
    const { header, screen } = props.settings;

    if (!state.show) {
      return null;
    }
    return (
      <div
        id="mobileFragmentView"
        style={{
          paddingTop: `${header.height}px`,
        }}
      >
        <div className="content">
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
});
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Fragment);
