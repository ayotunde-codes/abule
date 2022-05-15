import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Layout from '../../../components/general/Layout';
import PageLoader from '../../../components/general/PageLoader';
import ActivityFilter from '../../../components/ActivityFilter';
import ActivityPreview from '../../../components/ActivityPreview';

class ViewActivity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      value: '',
      loading: true,
    };

    this.banner = null;
    this._isMounted = false;
    // this.register = this.register.bind(this);
    // this.getUserKidById = this.getUserKidById.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { type } = Router.query;
    props.onPageLoad();
    console.log({ ...Router });
    // alert('component mounted');
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { props, state } = this;
    const { settings: { sessionUser }, search } = props;
    const { result, loading } = search;
    const { title } = Router.query;

    return (
      <Layout {...props}>
        <div className="activities-category">
          <ActivityFilter {...props} />

          {loading
            ? (
              <PageLoader
                inline
              />
            )
            : (
              <>
                <div className="result-heading">
                  <div className="result-category">
                    {title ? title.toUpperCase() : 'SEARCH RESULT'}
                  </div>
                  <div>{result.length} results based on your filters</div>
                </div>
                <div className="result-list-holder">
                  <div className="result-list">
                    {result.map((activity) => {
                      console.log('gfd');
                      return (
                        <ActivityPreview
                          {...props}
                          activity={activity}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({ search: state.search });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewActivity);
