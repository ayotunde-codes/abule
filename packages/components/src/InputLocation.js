import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {
  isEmail, devalueString, isEmpty, isDescendant, FetchRequest, capitalize,
} from './Fn';
import InputField from './InputField';
import PageLoader from './PageLoader';

const stripMark = (str) => str.replace(/<mark>/g, '').replace(/<\/mark>/g, '');

class InputLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      suggestions: [],
      loadingSuggestions: false,
    };

    this._isMounted = false;
    this.inputTime = null;
    this.selectAddress = this.selectAddress.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('resize', this.onResize, false);
    this.onResize();
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.onResize, false);
  }

  onResize() {
    if (this.inputTime) {
      const inputTimeWidth = $(this.inputTime).outerWidth();
      const tooltipWidth = $(this.inputTimeToolTip).outerWidth();
      const gap = (inputTimeWidth - tooltipWidth) / 2;

      if (gap !== this.state.inputTimeToolTipGap) {
        this.setState({
          inputTimeToolTipGap: gap,
        });
      }
    }
  }

  setSuggestions(signature, suggestions) {
    console.log('setting suggestions ', {
      locationRequestSignature: this.locationRequestSignature,
      signature,
    });
    if (this.locationRequestSignature === signature) {
      this.setState({
        suggestions,
        loadingSuggestions: false,
      });
    }
  }

  async updateSuggestions() {
    const { state, props } = this;
    const { query } = state;
    if (query && query.length > 0) {
      const signature = Date.now();
      this.setState({ loadingSuggestions: true });
      // const params = `query=${encodeURIComponent(query)}&beginHighlight=${encodeURIComponent('<mark>')}&endHighlight=${encodeURIComponent('</mark>')}&maxresults=8&country=USA&apikey=${process.env.HERE_API_KEY}`;

      try {
        this.locationRequestSignature = signature;
        const addBy = props.type === 'zipCode';
        const response = await FetchRequest({
          url: `${process.env.REACT_APP_API}/utils/get-location?input=${encodeURIComponent(query)}&type=${encodeURIComponent(props.locationType)}${addBy ? `&by=${props.type}` : ''}`,
        });

        console.log('LOCATION SUGGGESTIONS', { response });
        this.setSuggestions(signature, response.data.data);
      } catch (error) {
        this.setSuggestions(signature, []);
        console.log('ERROR LOCATION SUGGGESTIONS', { error });
      }
    } else {
      this.setState({
        suggestions: [],
      });
    }
  }

  selectAddress(suggestion) {
    this.setState({ suggestions: [], loadingSuggestions: false });
    // parse address_component
    // const addressComponents = {};
    console.log('location seleceted', suggestion);
    this.props.onSelect({
      id: suggestion.place_id,
      ...suggestion,
      // address_components: addressComponents,
    });
  }

  render() {
    const { props } = this;
    const { state } = this;

    let dropdown = null;
    if (state.loadingSuggestions) {
      dropdown = (
        <div className="dropdown-options loading">
          <PageLoader />
        </div>
      );
    } else if (state.suggestions && state.suggestions.length > 0) {
      dropdown = (
        <>
          <div className="dropdown-options">
            {
              state.suggestions.map((suggestion) => (
                <div
                  className="dropdown-option"
                  onClick={() => {
                    this.selectAddress(suggestion);
                  }}
                >
                  {/* <div className="smaller text-right">100001</div> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: (() => {
                        switch (props.locationType) {
                          case ('school'): return `${capitalize(suggestion.name)}`;
                          default: return `${suggestion.formatted_address}`;
                        }
                      })(),
                    }}
                  />
                  {/* <div className="smaller hide">_</div> */}
                </div>
              ))
            }
          </div>
        </>
      );
    }
    console.log('DROPDOWN IS : ', dropdown);

    return (
      <InputField
        {...props}
        value={props.value || state.query}
        onChange={(value) => {
          this.setState({
            query: value,
            queryError: !isEmpty(value) ? false : state.queryError,
          }, this.updateSuggestions);
          props.onChange(value);
        }}
        onLoad={(e) => {
          props.onLoad(e);
        }}
        dropdown={dropdown}
      />
    );
  }
}

InputLocation.defaultProps = {
  className: '',
  globalClassName: '',
  locationType: 'all',
  value: undefined,
  options: [],
  mandatory: false,
  disabled: false,
  readOnly: false,
  style: {},
  onLoad: () => { },
  onFocus: () => { },
  onBlur: () => { },
  onChange: () => { },
  onKeyDown: () => { },
  onSelect: () => { },
};

export default InputLocation;
