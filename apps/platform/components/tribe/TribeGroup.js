import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import {
  setSearchProps, loadResult, resultLoaded, resetSearchProps,
} from '../../redux/search/action';
import {
  OverflowContent
} from '@abule-common/components';
import UserConnectCard from '../UserConnectCard';

const TribeGroup = ({
  viewType = '',
  group = {
    name: '', members: [], type: 'tribeMember', description: '',
  },
  ...props
}) => {
  const groupType = group.type || 'tribeMember';

  if (!group.name || viewType === 'grid') {
    return (
      <>
        {group.name && (
          <div className="people-header">
            {group.name}
          </div>
        )}

        {group.description && (
          <div className="tribe-description">
            {group.description}
          </div>
        )}
        <div className={`people-container ${viewType || ''}`}>
          {group.members.map((user, index) => (
            <UserConnectCard
              {...props}
              viewType={viewType === 'rows' ? 'flat' : ''}
              type={groupType}
              as={!group.name ? 'unassigned' : ''}
              user={user}
              groupId={group.id || ''}
            />
          ))}
        </div>
      </>
    );
  }

  const groupList = [];
  if (viewType === 'rows') {
    const columns = [[]]; // <== needs first log (enpty array)
    // where max users per column is 4
    const maxUserPerColumn = 4;
    group.members.forEach((user) => {
      const lastIndex = columns.length - 1;
      if (columns[lastIndex].length < maxUserPerColumn - 1) {
        columns[lastIndex].push(user);
      } else {
        columns[lastIndex + 1] = [user];
      }
    });

    columns.forEach((column) => {
      groupList.push(
        <div className="people-group-list">
          {column.map((user) => (
            <UserConnectCard
              {...props}
              viewType="flat"
              type={groupType}
              user={user}
              groupId={group.id || ''}
            // friendshipId={user.friendshipId || null}
            />
          ))}
        </div>,
      );
    });
  } else {
    // viewType === inline-grid
    groupList.push(
      <div className="people-group-list">
        {group.members.map((user) => (
          <UserConnectCard
            {...props}
            type={groupType}
            // friendshipId={user.friendshipId || null}
            user={user}
            groupId={group.id || ''}
          />
        ))}
      </div>,
    );
  }
  return (
    <div>
      <section>
        <OverflowContent
          header={group.name}
          description={props.showDescription ? group.description : null}
          headerSwitchClick={() => {
            Router.push(`${props.AppUrl}/my-hub/tribe/${group.id}?go-back=true`);
          }}
          headerSwitchPage={(
            <div
              className="show-more"
              onClick={() => {
                Router.push(`${props.AppUrl}/my-hub/tribe/${group.id}?go-back=true`);
              }}
            >{`show all (${group.members.length})`}
            </div>
          )}
          className=""
          content={(
            <div className={`people-group ${viewType === 'rows' ? 'flat' : ''}`}>
              <div className="people-group-list-container">
                {groupList}
              </div>
            </div>
          )}
        />
      </section>
    </div>
  );
};

TribeGroup.propTypes = {
  viewType: PropTypes.string,
  fetchResult: PropTypes.func,
  group: PropTypes.object,
};

TribeGroup.defaultProps = {
  viewType: '',
  group: {},
  fetchResult: () => { },
};

const mapStateToProps = (state) => ({
  search: state.search,
});
const mapDispatchToProps = (dispatch) => ({
  loadResult: (props) => dispatch(loadResult(props)),
  resultLoaded: (props) => dispatch(resultLoaded(props)),
  setSearchProps: (props) => dispatch(setSearchProps(props)),
  resetSearchProps: (props) => dispatch(resetSearchProps(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TribeGroup);
