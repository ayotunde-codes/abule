import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/general/Layout';
import Chat from '../../components/inbox/Chat';
import NavigationBar from '../../components/inbox/NavigationBar';

const InboxMain = (props) => {
  useEffect(() => {
    props.onPageLoad();
  }, []);
  // useEffect(() => {
  //   props.onPageUpdate();
  // }, [props.onPageLoad()]);

  const { header, screen } = props.settings;
  const style = props.style || {};
  if (screen.width > process.env.MOBILE_BREAKPOINT) {
    style.height = `calc(100vh - ${header.height + header.marginBottom}px)`;
  }
  return (
    <Layout {...props}>
      <div id="inbox" style={style}>
        <NavigationBar {...props} />
        {/* <div>InboxMain</div> */}
        {/* <div className="chat">

        </div> */}
        {!screen.width <= process.env.MOBILE_BREAKPOINT && <Chat {...props} />}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  inbox: state.inbox,
  topic: 'inbox',
});

export default connect(mapStateToProps)(InboxMain);
