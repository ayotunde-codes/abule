import React from 'react';
import { capitalize } from './Fn';
import InputPicker from './InputPicker';
import SearchBar from './SearchBar';

class InputSelectUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    const { state, props } = this;
    const { title, users } = props;
    if (users) {
      return (
        <div className={`users-input-picker${state.show ? ' close' : ''}`}>
          <button
            type="button"
            className={`users-input-picker-header${props.allowHide ? ' space-out' : ''}`}
            onClick={() => {
              if (props.allowHide) {
                this.setState({
                  show: !state.show,
                });
              }
            }}
          >
            {title}
            {props.allowHide && <span className="icon icon-chevron-down" />}
          </button>

          {props.allowSearch && (
            <SearchBar
              value={state.searchQuery}
              className="search-bar"
              onChange={(value) => {
                this.setState({
                  searchQuery: value,
                });
                if (props.onSearchInput) {
                  props.onSearchInput(value);
                }
              }}
              onBlur={() => {
                // this.makeSearch();
              }}
              onEnter={() => {
                // this.makeSearch();
              }}
            />
          )}
          {state.show && (
            <>
              <InputPicker
                multichoice
                maxSelection={props.maxSelection}
                values={props.values}
                className="users-input-picker-list"
                options={users.map((user, index) => (
                  {
                    label: (
                      <>
                        <div className="avi">
                          <img src={user.imageUrl} alt="" />
                        </div>
                        <span>{capitalize(`${user.firstName} ${user.lastName}`)}</span>
                      </>
                    ),
                    value: user,
                    className: 'users-input-picker-item',
                    disallow: props.rejectUsers.includes(user.userId),
                  }
                ))}
                onChange={(values) => {
                  props.onChange(values);
                }}
              />
            </>
          )}
        </div>
      );
    }
    return '';
  }
}

InputSelectUser.defaultProps = {
  onChange: () => { },
  title: '',
  users: [],
  rejectUsers: [],
  maxSelection: null,
};
export default InputSelectUser;
