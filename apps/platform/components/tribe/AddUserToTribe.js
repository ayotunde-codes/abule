/* eslint-disable react/style-prop-object */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { capitalize } from '@material-ui/core';
import PropTypes from 'prop-types';
import 'react-responsive-modal/styles.css';
import {
  InputPicker, PopMessage,
  Fn,
} from '@abule-common/components';

const {
  popAlert,
} = Fn;

const AddUserToTribe = ({
  modal, setModalState, groups, user, otherProps, uniassgnedTribe, fetchRequest, setSessionUser, settings,
}) => {
  const { firstName, lastName, userId } = user;
  const { sessionUser } = settings;
  const [tribeState, setTribeState] = useState({
    groupId: [uniassgnedTribe],
    userId,
    uniassgnedTribe: '',
  });

  const { groupId } = tribeState;

  // console.log(groupId);
  const addTribe = async () => {
    try {
      const data = await fetchRequest({
        url: `${process.env.REACT_APP_API}/tribe/friends/${userId}`,
        method: 'POST',
        body: JSON.stringify({
          groupId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('user added to poending', data);
      popAlert({
        title: 'Request Sent',
        description: 'You will be notified when your request is accepted',
      });

      setSessionUser({
        ...sessionUser,
        friends: {
          ...sessionUser.friends,
          sentRequests: [
            ...sessionUser.friends.sentRequests,
            data,
          ],
        },
      });
      // setModalState();
      setModalState();
    } catch (erroRes) {
      console.log('the ress', erroRes);
      // if (erroRes.data.status === 400) {
      //   popAlert({
      //     error: erroRes.data.message,
      //   });
      // }
      // alert('we error');
      // Router.push('/');
      setModalState();
    }
    // setLoad(false);
    // setModalState();
  };

  const hanadleState = (value) => {
    let groupIds = value;
    const incomingId = groupIds.length ? groupIds[groupIds.length - 1] : null;
    if (incomingId !== null && incomingId === uniassgnedTribe) groupIds = [uniassgnedTribe];
    else if (groupIds.length > 0) groupIds = groupIds.filter((item) => item !== uniassgnedTribe);
    else if (groupIds.length === 0) groupIds.push(uniassgnedTribe);
    setTribeState({ ...tribeState, groupId: groupIds });
  };

  return (
    <PopMessage
      message={(
        groups && groups.length > 0
          ? (
            <>
              <>
                <h5
                  className="picker_label"
                  style={{ marginTop: 0 }}
                >{`Select Group(s) for ${capitalize(firstName)}`}
                </h5>

                <div className="picker_list">
                  <InputPicker
                    picker
                    values={groupId}
                    className="active"
                    rowCount={10}
                    direction="center"
                    activeType="default"
                    multichoice
                    options={groups.map((group) => ({
                      label: capitalize(group.name),
                      value: group.id,
                      className: 'filter-cntrl',
                    }))}
                    onChange={(value) => {
                      hanadleState(value);
                    }}
                    onSave={() => {
                      console.log(groupId);
                    }}
                  />
                </div>
              </>
            </>
          )
          : (
            <>
              <h5
                className="picker_label"
                style={{ marginTop: 0 }}
              >{`Add ${capitalize(firstName)} to your tribe`}
              </h5>
            </>
          )
      )}
      confirmButton={{
        show: true,
        label: 'ADD',
        onClick: () => addTribe(),
      }}
      onCancel={() => {
        setModalState();
      }}
    />

  );
};

AddUserToTribe.propTypes = {
  modal: PropTypes.bool,
  user: PropTypes.object,
  groups: PropTypes.array,
  setModalState: PropTypes.func,
};

export default AddUserToTribe;
