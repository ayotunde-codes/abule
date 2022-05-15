import React from 'react';
import Router from 'next/router';
import { Fn } from '@abule-common/components';
import HostActivity from '../host-activity';
import Layout from '../../components/general/Layout';
import PageLoader from '../../components/general/PageLoader';

const {
  popAlert,
} = Fn;

class EditActivity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: {},
      loading: true,
    };

    this.banner = null;
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { id } = Router.query;
    console.log({ ...Router });
    props.onPageLoad();
    const { sessionUser } = props.settings;
    try {
      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/activities/${id}`,
        method: 'GET',
      });
      console.log('loading activity : ', data.days);

      if (!['rejected', 'approved', 'draft'].includes(data.status)) {
        popAlert({
          title: "Can't edit this activity",
          description: "you can't edit a pending activity",
          error: true,
        });
        Router.push(`${props.AppUrl}/`);
      } else if (this._isMounted) {
        this.setState({
          loading: false,
          activity: data,
        });
      }
    } catch (erroRes) {
      console.log('the ress', erroRes);
      // alert('we error');
      // Router.push('/');
    }
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.timerHandler);
  }

  render() {
    const { props, state } = this;

    // console.log('page oaded', props);
    if (state.loading) {
      return (
        <Layout
          {...props}
          header={{
            backButton: {
              show: true,
            },
          }}
        >
          <PageLoader />
        </Layout>
      );
    }

    return (
      <HostActivity
        {...props}
        Activity={state.activity}
        isEditActivity
      />
    );
  }
}

export default (EditActivity);
