import React, {
  useState, useRef, useEffect,
} from 'react';
import axios from 'axios';
import { Fn } from '@abule-common/components';
import CloseIcon from './close-ico';

const {
  isEmpty,
} = Fn;
const FilterPage = ({
  isOpen,
  setIsOpen,
  setFilter,
  filter,
  onResetLocation,
  onSaveLocation,
}) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [text, setText] = useState('');
  const [sliderState, setSliderState] = useState({ left: '', dragging: false });
  const slider = useRef(null);
  const sliderContainer = useRef(null);
  const [searchSugesstions, setSearchSuggestions] = useState([]);
  const [token, setToken] = useState('');
  const [miles, setMiles] = useState(0);

  useEffect(() => {
    const getLocationToken = async () => {
      const config = {
        headers: {
          'api-token': '8z3rwpYljLA0B5ykxOKz3v5Li9usIuNVnGIdn-yamuLwmRj-XerDLSNulfCWLVLYmFs',
          'user-email': 'aniediabasi@grais.design',
        },
      };

      const { data, status } = await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', config);

      if (status === 200) {
        if (data.auth_token) setToken(data.auth_token);
      }
    };
    getLocationToken();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data, status } = await axios.get('https://www.universal-tutorial.com/api/states/United States', config);
        if (status === 200) {
          setStates(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchStates();
  }, [token]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (!isEmpty(filter.state)) {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const { data, status } = await axios.get(`https://www.universal-tutorial.com/api/cities/${filter.state}`, config);
          if (status === 200) {
            setCities(data);
          }
        } else {
          onResetLocation();
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCities();
  }, [filter.state]);

  const handleChange = (e) => {
    setText(e.target.value);
    setSearchSuggestions(states.filter((state) => state.state_name.toLowerCase().includes(text.toLowerCase())));
  };

  const pickState = (state) => {
    setFilter({
      ...filter,
      state,
    });
    setText('');
  };

  const pickCity = (city) => {
    setFilter({
      ...filter,
      city,
    });
  };

  const clearLocationFilters = () => {
    setFilter({
      ...filter,
      state: '',
      city: '',
    });
  };

  const clearCityFilter = () => {
    setFilter({
      ...filter,
      city: '',
    });
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    document.onmouseup = closeDrag;
    document.onmousemove = onMouseMove;
  };

  const getSliderPosition = (e) => {
    let left;
    let x;
    if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
      const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
      const touch = evt.touches[0] || evt.changedTouches[0];
      x = touch.pageX;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
      x = e.clientX;
    }
    const { offsetWidth, offsetLeft } = sliderContainer.current;
    const offSetRight = offsetLeft + offsetWidth;
    if (x < offsetLeft) {
      left = 0;
    } else if (x > offsetLeft && x < offSetRight) {
      left = x - offsetLeft;
    } else {
      left = offsetWidth - 20;
    }
    return { left, offsetWidth: offsetWidth - 20 };
  };

  const getMiles = (left, offsetWidth) => {
    if (left >= offsetWidth) {
      setMiles(100);
    } else {
      const distance = Math.round(left / offsetWidth * 100);
      setMiles(distance);
    }
  };

  const closeDrag = (e) => {
    document.onmouseup = null;
    document.onmousemove = null;
    const { left } = getSliderPosition(e);
    setSliderState({
      left,
      dragging: false,
    });
  };

  const onMouseMove = (e) => {
    e.preventDefault();
    const { left, offsetWidth } = getSliderPosition(e);
    setSliderState({
      left,
      dragging: true,
    });
    getMiles(left, offsetWidth);
  };

  const saveLocation = () => {
    if (!isEmpty(filter.state) && !isEmpty(filter.city)) {
      setIsOpen(false);
      onSaveLocation();
    } else {
      console.log('niodnsicishnisnui');
    }
  };

  return (
    <>
      {
        isOpen
        && (
          <div id="root" onClick={() => setIsOpen(false)} className="adminApp_filterPageContainer">
            <div onClick={(e) => { e.stopPropagation(); }} className="adminApp_filterPage">
              <div>
                <div onClick={() => setIsOpen(false)} className="closeContainer">
                  <CloseIcon />
                </div>
                <span className="header">Filter</span>
                <div className="adminApp_formContainer adminApp_filterform">
                  {
                    filter.state === '' && (
                      <div className="adminApp_dropdownContainer">
                        <span className="adminApp_label">
                          State
                        </span>
                        <input
                          id="state"
                          name="state"
                          type="text"
                          onChange={handleChange}
                          value={text}
                          placeholder="Search State"
                          autoComplete="off"
                        />

                        {
                          text.length > 2 && searchSugesstions.length > 0 && (
                            <div
                              className="adminApp_dropDown"
                            >
                              {
                                searchSugesstions.map((data, index) => (
                                  <div key={index} onClick={() => pickState(data.state_name)} className="adminApp_dropDownItem">
                                    {data.state_name}
                                  </div>
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                  {
                    !isEmpty(filter.state) && (
                      <div>
                        <span className="adminApp_label_selected">
                          State
                        </span>
                        <div className="adminApp_pill_selected">
                          <span>{filter.state}</span>
                          <span onClick={clearLocationFilters} className="adminApp_cancelButton">X</span>
                        </div>
                      </div>
                    )
                  }
                  {
                    !isEmpty(filter.state) && (
                      <div>
                        <span className="adminApp_label_selected">
                          Cities
                        </span>
                        {
                          cities.length > 0 && isEmpty(filter.city) && cities.map((data, index) => (
                            <div onClick={() => pickCity(data.city_name)} key={index} className="adminApp_pill">
                              <span>{data.city_name}</span>
                            </div>
                          ))
                        }
                        {
                          !isEmpty(filter.city) && (
                            <div className="adminApp_pill_selected">
                              <span>{filter.city}</span>
                              <span onClick={clearCityFilter} className="adminApp_cancelButton">X</span>
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                  {
                    <div>
                      <span className="adminApp_label_selected">
                        Distance
                      </span>
                      <div ref={sliderContainer} className="adminApp_inputRangeContainer">
                        <div
                          onMouseDown={onMouseDown}
                          onTouchMove={onMouseMove}
                          onTouchEnd={closeDrag}
                          ref={slider}
                          className="adminApp_slideContainer"
                          style={{ left: sliderState.left !== '' ? sliderState.left : undefined }}
                        >
                          <div className="adminApp_slider" />
                          <div className="adminApp_slideLabel">{`${miles}mi`}</div>
                        </div>
                        <div className="adminApp_labels" />
                      </div>
                      <div className="admin_inputRangeLabels">
                        <span>0mi</span>
                        <span>100mi</span>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <button style={{ background: isEmpty(filter.city) ? 'gray' : undefined }} onClick={saveLocation} className="adminApp_applyFilter">
                APPLY FILTERS
              </button>
            </div>

          </div>
        )
      }
    </>
  );
};

const FilterIcon = ({
  className, filter, setFilter, onSaveLocation, onResetLocation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <svg
        width={19}
        height={22}
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: 'pointer' }}
        fill="none"
        className={className}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <path
          d="M4 21v-7M4 4V1M15 21v-3M15 8V1M7 6v6c0 1.1-.5 2-2 2H3c-1.5 0-2-.9-2-2V6c0-1.1.5-2 2-2h2c1.5 0 2 .9 2 2ZM18 10v6c0 1.1-.5 2-2 2h-2c-1.5 0-2-.9-2-2v-6c0-1.1.5-2 2-2h2c1.5 0 2 .9 2 2Z"
          stroke="#292D32"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <FilterPage
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        filter={filter}
        setFilter={setFilter}
        onSaveLocation={onSaveLocation}
        onResetLocation={onResetLocation}
      />
    </>
  );
};

export default FilterIcon;
