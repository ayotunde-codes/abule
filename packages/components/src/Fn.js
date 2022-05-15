/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-inner-declarations */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import $ from 'jquery';
import moment from 'moment';
import { Days, Messages } from './assets';

const Swal = withReactContent(swal);

export const usdToCredit = (amount) => amount / 5;
export const creditToUsd = (credit) => credit * 5;

/// /////////////////////////////////////////////////////////////////////////////////////////////

function getCaretCharacterOfsetWithin(element) {
  let caretOffset = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  const sel = win.getSelection();
  if (typeof win.getSelection !== 'undefined') {
    console.log({ sel });
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      console.log({ preCaretRange });
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      console.log({ preCaretRange });
      caretOffset = preCaretRange.toString().length;
      console.log(`seen content is :{${preCaretRange.toString()}}`);
    }
  } else if (sel == doc.selection && sel.type != 'Control') {
    const textRange = sel.createRange();
    const preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint('EndToEnd', textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}

export const padString = (
  str,
  padding,
  totalLength,
  paddingPosition = 'left',
) => {
  if (`${str}`.length < totalLength) {
    let paddingStr = '';
    while (true) {
      if (paddingStr.length < totalLength - `${str}`.length) {
        paddingStr += `${padding}`;
      } else {
        break;
      }
    }

    if (paddingPosition === 'right') {
      return `${str}${paddingStr}`;
    }
    return `${paddingStr}${str}`;
  }
  return str;
};
// export const $ = (q) => (isElement(q) ? [q] : document.querySelectorAll(q));
export const isEmpty = (str) => (str ? !`${str}`.trim() : true);

export const isElement = (o) => (typeof HTMLElement === 'object'
  ? o instanceof HTMLElement
  : o
  && typeof o === 'object'
  && o !== null
  && o.nodeType === 1
  && typeof o.nodeName === 'string');

export const isDate = (date) => {
  if (date && date.getTime && date.getTime()) return true;

  const _date = new Date(date);
  // console.log('_date test :', { _date, date });
  return !!_date.getTime();
};

export const formatDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

export const isEmail = (str) => !(
  /[a-z0-9-.]+@+[a-z0-9-.]+\.+[a-z]{2,}/i.test(str) === false
  || /[^a-z0-9._@-]/i.test(str) === true
);
export const isJSON = (variable) => variable && typeof variable === 'object' && variable.constructor === Object;
// export const isEmail = (str) => (!((/[a-z0-9-.]+@+[a-z0-9-.]+\.+[a-z]{2,}/i.test(str) === false || /[^a-z0-9._@-]/i.test(str) === true)));
export const isZipCode = (str) => (!isNaN(str) && str.length === 5);
export const isPhoneNumber = (str) => !(str.length < 8 || str.length > 13);
// export const isJSON = (variable) => (variable && typeof variable === 'object' && variable.constructor === Object);

export const isDescendant = (e, query) => {
  const matches = typeof query === 'string' ? document.querySelectorAll(query) : query;
  let el = isElement(e) ? e : document.querySelector(e);
  let matchesLen = 0;
  if (isElement(matches)) {
    if (query.contains(el)) return query;
  } else if (matches) {
    matchesLen = matches.length;
    while (el && !(el.tagName === 'HTML')) {
      for (let i = 0; i < matchesLen; i += 1) {
        if (el === matches[i]) return el;
      }

      el = el.parentElement;
    }
  }
  return false;
};

// export const isDescendant = (child, parent) => {
//   return parent.contains(child);
// };

export const isUpperCase = (v) => !!(v.toUpperCase() !== v.toLowerCase() && v === v.toUpperCase());

export const isLowerCase = (v) => !!(v.toUpperCase() !== v.toLowerCase() && v === v.toLowerCase());
export const ucFirst = (value) => {
  if (isNaN(value)) {
    let newValue = '';
    for (let i = 0; i < value.length; i += 1) {
      if (i === 0) {
        newValue = value[0].toUpperCase();
      } else {
        newValue += value[i];
      }
    }
    return newValue;
  }
  return value;
};
export const lcFirst = (value) => {
  if (isNaN(value)) {
    let newValue = '';
    for (let i = 0; i < value.length; i += 1) {
      if (i === 0) {
        newValue = value[0].toLowerCase();
      } else {
        newValue += value[i];
      }
    }
    return newValue;
  }
  return value;
};
export const capitalize = (word, transformAll = true) => {
  if (isNaN(word) && !isEmpty(word)) {
    const wordArr = word.split(' ');
    const newWord = wordArr.map((value) => {
      if (transformAll) {
        value = value.toLowerCase();
      }
      const chars = value.split('');
      if (chars[0]) chars[0] = chars[0].toUpperCase();
      return chars.join('');
    });
    return newWord.join(' ');
  }
  return word;
};

export const deleteIndex = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};

export const useWindowSize = () => {
  const [size, setSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export const popMessage = (m, classList = 'message', timeout = 4500) => {
  const animationTime = 300; // <== value must be the same here and in general.less
  const showMsg = (msg) => {
    setTimeout(() => {
      msg.classList.add('show');
    }, 100);
  };
  let popMsg = document.querySelector('#popMessage');
  const msg = document.createElement('DIV');
  msg.classList = classList;
  msg.innerHTML = m;

  if (!popMsg) {
    // alert('popMsg not created yet');
    popMsg = document.createElement('DIV');
    popMsg.id = 'popMessage';
    popMsg.appendChild(msg);
    document.querySelector('#root').appendChild(popMsg);
    showMsg(msg);
  } else {
    popMsg.appendChild(msg);
    showMsg(msg);
  }

  setTimeout(() => {
    msg.classList.remove('show');
    setTimeout(() => {
      popMsg.removeChild(msg);
      if (!popMsg.children[0]) {
        document.querySelector('#root').removeChild(popMsg);
      }
    }, animationTime);
  }, timeout);
};

export const parseRelativeDays = (days = []) => {
  const daysString = days.join(' , ');
  const DaysString = Days.map((Day) => Day.name.toLowerCase()).join(' , ');
  const getAlias = (day) => {
    for (const Day of Days) {
      if (Day.name === day) {
        return Day.alias;
      }
    }
  };

  if (days.length > 1 && DaysString.includes(daysString)) {
    return `${getAlias(days[0])} - ${getAlias(days[days.length - 1])}`;
  }

  return days.map((day) => getAlias(day)).join(' , ');
};

export const popAlert = (
  props = {
    title,
    description,
    error,
    confirmButton: {
      label: '',
      show: false,
      onClick: (closer) => { },
    },
    cancelButton: {
      label: '',
      show: false,
      onClick: (closer) => { },
    },
    onClose: () => { },
  },
) => {
  //
  const { title, description, error } = props;
  let confirmButton = {
    label: 'YES',
    show: false,
    onClick: (closer) => {
      closer();
    },
  };
  confirmButton = props.confirmButton
    ? { ...confirmButton, ...props.confirmButton }
    : confirmButton;
  if (!props.Message) props.Message = () => { };
  let cancelButton = {
    label: 'NO',
    show: false,
    onClick: (closer) => {
      closer();
    },
  };
  cancelButton = props.cancelButton
    ? { ...cancelButton, ...props.cancelButton }
    : cancelButton;
  console.log({ props });
  let confirmClicked = false;
  let cancelClicked = false;
  //
  Swal.fire({
    title: (
      <>
        <span
          className="hmv-alert-closer icon-cross"
          onClick={() => {
            Swal.close();
          }}
        />
        {title && (
          <span className={`hmv-alert-title-label${error ? ' error' : ''}`}>
            {title}
          </span>
        )}
      </>
    ),
    html: (
      <>
        {description}
        <div className="hmv-alert-actions">
          <button
            type="button"
            className="btn btn-1 hmv-alert-action"
            style={{ display: confirmButton.show ? null : 'none' }}
            onClick={(e) => {
              if (!confirmClicked) {
                const loader = e.target.querySelector(
                  '.hmv-alert-action-loader',
                );
                loader.style.display = 'block';
                confirmClicked = true;
                confirmButton.onClick(() => {
                  Swal.close();
                });
              }
            }}
          >
            {' '}
            {confirmButton.label}{' '}
            <span className="hmv-alert-action-loader icon-refresh spinner" />
          </button>

          <button
            type="button"
            style={{ display: cancelButton.show ? null : 'none' }}
            className="btn btn-glass bordered hmv-alert-action"
            onClick={(e) => {
              if (!cancelClicked) {
                const loader = e.target.querySelector(
                  '.hmv-alert-action-loader',
                );
                loader.style.display = 'block';
                cancelClicked = true;
                cancelButton.onClick(() => {
                  Swal.close();
                });
              }
            }}
          >
            {' '}
            {cancelButton.label}{' '}
            <span className="hmv-alert-action-loader icon-refresh spinner" />
          </button>
        </div>
      </>
    ),
    showCancelButton: false,
    showConfirmButton: false,
    customClass: {
      container: 'hmv-alert',
      popup: 'hmv-alert-pop-up',
      title: `hmv-alert-title${!description ? ' last-child' : ''}`,
      content: 'hmv-alert-content',
    },
    didClose: () => {
      if (props.onClose) {
        props.onClose();
      }
    },
    showClass: {
      popup: '',
      icon: '',
    },
    hideClass: {
      popup: '',
    },
  });
};
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const popPrompt = (props = {
  title: '',
  message: '',
  Message: false,
  warning: false,
  isError: false,
  showClass: {},
  hideClass: {},
  confirmButton: {
    label: '',
    show: true,
    onClick: (closer) => { },
    className: '',
  },
  cancelButton: {
    label: '',
    show: true,
    onClick: (closer) => { },
    className: '',
  },
}) => {
  let confirmButton = {
    label: 'FINISH',
    show: true,
    onClick: (closer) => { closer(); },
    className: '',
  };
  confirmButton = props.confirmButton
    ? { ...confirmButton, ...props.confirmButton }
    : confirmButton;
  if (!props.Message) props.Message = () => { };
  let cancelButton = {
    label: 'CANCEL',
    show: true,
    onClick: (closer) => { closer(); },
    className: '',
  };
  cancelButton = props.cancelButton
    ? { ...cancelButton, ...props.cancelButton }
    : cancelButton;
  console.log({ props });
  let confirmClicked = false;
  let cancelClicked = false;
  Swal.fire({
    title: props.title,
    didClose: () => {
      if (props.onClose) {
        props.onClose();
      }
    },
    html: (
      <>
        {props.warning && (
          <>
            <p className="hmv-prompt-warning-label">WARNING</p>
            <p className="hmv-prompt-warning-icon icon icon-warning-2" />
          </>
        )}
        {props.message}
        {props.Message(() => {
          Swal.close();
        })}
        <div className="hmv-prompt-actions">
          <button
            type="button"
            className={`btn btn-1 hmv-prompt-action ${confirmButton.className}`}
            style={{ display: confirmButton.show ? null : 'none' }}
            onClick={(e) => {
              if (!confirmClicked) {
                const loader = e.target.querySelector(
                  '.hmv-prompt-action-loader',
                );
                loader.style.display = 'block';
                confirmClicked = true;
                confirmButton.onClick(() => {
                  Swal.close();
                });
              }
            }}
          >
            {' '}
            {confirmButton.label}{' '}
            <span className="hmv-prompt-action-loader icon-refresh spinner" />
          </button>

          <button
            type="button"
            style={{ display: cancelButton.show ? null : 'none' }}
            className={`btn btn-glass bordered hmv-prompt-action ${cancelButton.className}`}
            onClick={(e) => {
              if (!cancelClicked) {
                const loader = e.target.querySelector(
                  '.hmv-prompt-action-loader',
                );
                loader.style.display = 'block';
                cancelClicked = true;
                cancelButton.onClick(() => {
                  Swal.close();
                });
              }
            }}
          >
            {' '}
            {cancelButton.label}{' '}
            <span className="hmv-prompt-action-loader icon-refresh spinner" />
          </button>
        </div>
      </>
    ),
    showCancelButton: false,
    showConfirmButton: false,
    showClass: props.showClass,
    hideClass: props.hideClass,
    customClass: {
      container: 'hmv-prompt',
      popup: 'hmv-prompt-pop-up',
      title: 'hmv-prompt-title',
      content: 'hmv-prompt-content',
    },
    showClass: {
      popup: '',
      icon: '',
    },
    hideClass: {
      popup: '',
    },
  });

  return true;
};

export const getGenderIcon = (gender) => {
  switch (gender) {
    case 'male':
      return 'icon-soccer-ball';
    case 'female':
      return 'icon-flower';
    default:
      return 'icon-radio-button';
  }
};

export const JSONtoArray = (json) => isJSON(json) && Object.keys(json).map((key) => json[key]);

export const JSONParse = (str) => {
  try {
    const o = JSON.parse(str);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === 'object') return o;
  } catch (e) {
    // console.log(e);
  }

  return false;
};

export const getAllWeekDays = () => [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
export const getWeekDay = (day) => {
  const weekdays = getAllWeekDays();
  return isNaN(day) ? false : weekdays[day];
};

export const getMonth = (month) => {
  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];
  return isNaN(month) ? false : months[month];
};

export const mobileCheck = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a,
      )
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    ) { check = true; }
  }(navigator.userAgent || navigator.vendor || window.opera));
  // alert(`mobile check is ${check}`);
  return check;
};

export const addDaySuffix = (day) => {
  switch (day) {
    case 1: {
      return '1st';
    }
    case 2: {
      return '2nd';
    }
    case 3: {
      return '3rd';
    }
    default: {
      return `${day}th`;
    }
  }
};
export const stripExcessString = (value, stripWith, stripAll) => {
  let test = true;
  let newValue = '';
  for (let i = 0; i < value.length; i += 1) {
    if (value[i] === stripWith) {
      if (!(stripAll === 'true' || stripAll === true)) {
        if (test) {
          newValue += stripWith;
          test = false;
        } else {
          // alert('this  is 2nd spot occurence of the "stripwith" value');
        }
      }
    } else {
      test = true;
      newValue += value[i];
      // alert(value[i]);
    }
  }

  return newValue;
};

export const milSecToYears = (mil) => {
  const sec = mil / 1000;
  const min = sec / 60;
  const hour = min / 60;
  const days = hour / 24;
  const years = Math.floor(days / 365);
  return years;
};

export const milSecToHours = (mil) => {
  const sec = mil / 1000;
  const min = sec / 60;
  const hour = min / 60;

  return hour;
};
export const milSecToMinutes = (mil) => {
  const sec = mil / 1000;
  const min = sec / 60;

  return min;
};
export const milSecToSeconds = (mil) => {
  const sec = mil / 1000;

  return sec;
};

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const addToTime = (time, milliSeconds) => {
  const mil = Date.parse(time) + milliSeconds;

  return new Date(mil);
};

export const getYearDays = (year) => {
  const isLeapYear = year % 400 === 0;
  return isLeapYear ? 366 : 365;
};

export const trimString = (string, max = 500) => {
  const stringArr = string.split(' ');
  const resultArr = [];
  let totalChar = 0;
  for (const word of stringArr) {
    if (totalChar + word.length < max) {
      resultArr.push(word);
      totalChar += word.length;
    } else {
      if (max - (totalChar + word.length) < max - totalChar) {
        resultArr.push(word);
      }
      break;
    }
  }
  const result = resultArr.join(' ');
  return {
    result,
    remaining: string.length - result.length,
  };
};

export const getDatePositionInMonth = (date, returnJSON = false) => {
  date = new Date(date);

  if (!(date && date.getTime())) return false;
  const dateObject = moment();
  dateObject.set('year', date.getFullYear());
  dateObject.set('month', date.getMonth());
  dateObject.set('date', date.getDate());
  const DaysInMonth = dateObject.daysInMonth();
  const firstDay = moment(dateObject).startOf('month').format('d');

  // create blanks
  const daysInMonth = [];
  const rows = [];
  let cells = [];

  for (let i = 0; i < firstDay; i++) {
    // daysInMonth.push(<td className="calendar-day empty">{""}</td>);
    daysInMonth.push(null);
  }

  for (let d = 1; d <= DaysInMonth; d += 1) {
    daysInMonth.push(d);
  }

  // divide the days into weeks
  daysInMonth.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === daysInMonth.length - 1) {
      rows.push(cells);
    }
  });

  let WeekIndex = 0;
  let DayIndex = 0;
  rows.forEach((week, weekIndex) => {
    for (let dayIndex = 0; dayIndex < week.length; dayIndex += 1) {
      if (week[dayIndex] === date.getDate()) {
        WeekIndex = weekIndex;
        DayIndex = dayIndex;
        break;
      }
    }
  });

  let weekIndex = 0;
  // after getting day index check its position
  for (let i = 1; i <= WeekIndex; i += 1) {
    const week = rows[i];
    // console.log('WEEK IN HERE IS: ', week);
    if (week[DayIndex] !== null) {
      weekIndex++;
    }
  }

  // console.log('INTHE END : ', { WeekIndex, weekIndex, DayIndex });
  const day = getWeekDay(DayIndex);
  // check if first row has the day

  const Week = (i) => {
    if (DaysInMonth - date.getDate() < 7) {
      return 'last';
    }
    switch (i) {
      case 1: {
        return '1st';
      }
      case 2: {
        return '2nd';
      }
      case 3: {
        return '3rd';
      }
      default: {
        return `${i}th`;
      }
    }
  };

  if (returnJSON) {
    return {
      day,
      weekIndex: DaysInMonth - date.getDate() < 7 ? 'last' : weekIndex,
    };
  }
  return `${Week(weekIndex)} ${capitalize(day)}`;
};

export const getMentions = (str) => {
  // const str = '@jpotts18 what is up man? Are you hanging out with @kyle_clegg';
  const pattern = /\B@[a-z0-9_-]+/gi;
  str.match(pattern);
};

export const parseTimeToGMT = (time = new Date()) => {
  if (!time || !time.getTime) {
    time = new Date(time);
  }

  // if (!time || !time.getTime()) return time.toUTCString();
  if (!time || !time.getTime()) { return time.toLocaleString('en-UK', { timeZone: 'Europe/London' }); }

  return time;
};
// console.log({ mine: parseTimeToGMT(new Date()), them: new Date(new Date().toUTCString()).toISOString() });
export const parseDateToDateObj = (date) => {
  const dateObj = new Date(date);
  const value = {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
    index: dateObj.getDate(),
    day: dateObj.getDate(),
    weekDay: dateObj.getDay(),
    time: {
      hour: dateObj.getHours() < 1 ? 12 : dateObj.getHours(),
      minute: padString(dateObj.getMinutes(), '0', 2),
      period: 'AM',
    },
  };

  if (value.time.hour > 12) {
    value.time.hour -= 12;
    value.time.period = 'PM';
  }

  value.time.hour = padString(value.time.hour, '0', 2);
  return value;
};

export const getIDSFromList = (listObject = []) => {
  const tempList = [];
  listObject.forEach((row) => tempList.push(row.id));
  return tempList;
};

export const convertObjectToCSV = (list = []) => {
  const headers = [
    'First name',
    'Last Name',
    'Email',
    'City',
    'State',
    'Phone number',
    'zip Code',
  ];
  const data = list.map((person) => {
    const {
      firstName,
      lastName,
      email,
      city,
      state,
      phoneNumber,
      zipCode,
    } = person;

    return [firstName, lastName, email, city, state, phoneNumber, zipCode];
  });
  let csv = `${headers.join(',')}\n`;
  data.forEach((row) => {
    csv += row.join(',');
    csv += '\n';
  });
  return csv;
};

export const getRelativeTime = (timestamp, relative = true, format = 'fullText') => {
  // converts time to client's timezone
  const d1 = new Date();
  const d2 = new Date(timestamp);
  let relativeTime = '';

  const Year = d2.getFullYear();
  const year = d1.getFullYear() === Year ? '' : `${Year}`;
  const month = getMonth(d2.getMonth());
  let hour = d2.getHours();
  const hourPref = hour >= 12 ? 'PM' : 'AM';
  if (hour === 0) {
    hour = 12;
  } else {
    hour = hour > 12 ? hour - 12 : hour;
  }
  const date = d2.getDate();
  const minutes = d2.getMinutes();
  let minutesDbl = `${minutes}`;
  minutesDbl = minutesDbl.length === 1 ? `0${minutesDbl}` : minutesDbl;
  const day = getWeekDay(d2.getDay());

  if (format === 'text-without-time') {
    return `${day}, ${month} ${date} ${year}`;
  }
  if (format === 'date-only') {
    return `${month} ${date} ${year}`;
  }
  if (format === 'number-with-time') {
    return `${d2.getMonth() + 1
      }/${date}/${Year} at ${hour}:${minutesDbl}${hourPref}`;
  }
  if (relative) {
    const diffInMilliseconds = d1 - d2;
    const diffInSec = Math.floor(diffInMilliseconds / 1000);
    if (diffInSec >= 60) {
      // 60 seconds make a minute
      const diffInMinutes = Math.floor(diffInSec / 60);
      if (diffInMinutes >= 60) {
        // 60 minutes make in an hour
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours >= 24) {
          // 24 hours make in a day
          const diffInDays = diffInHours / 24;
          if (diffInDays >= 7) {
            // 7 day make in a week
            if (format === 'fullText') {
              relativeTime = `${day}, ${month} ${date} ${year} at ${hour}:${minutesDbl} ${hourPref}`;
            } else if (format === 'text') {
              relativeTime = `${month} ${date} ${year} at ${hour}:${minutesDbl} ${hourPref}`;
            } else if (format === 'number-without-time') {
              relativeTime = `${d2.getMonth()}/${date}/${year}`;
            } else {
              // its number
              relativeTime = `${d2.getMonth()}/${date}/${year} at ${hour}:${minutesDbl} ${hourPref}`;
            }
          } else if (diffInDays <= 1 || diffInHours < 46) {
            console.log({ timestamp, diffInDays });
            if (['number-without-time', 'date-text'].includes(format)) {
              relativeTime = 'yesterday';
            } else {
              relativeTime = `yesterday at ${hour}:${minutesDbl} ${hourPref}`;
            }
          } else if (['number-without-time', 'date-text'].includes(format)) {
            console.log({ diffInDays });
            relativeTime = `${day}`;
          } else {
            relativeTime = `${day} at ${hour}:${minutesDbl} ${hourPref}`;
          }
        } else if (['date-text'].includes(format)) {
          relativeTime = 'today';
        } else {
          relativeTime = `${diffInHours}hr${diffInHours > 1 ? 's' : ''} ago`;
        }
      } else if (['date-text'].includes(format)) {
        relativeTime = 'today';
      } else {
        relativeTime = `${diffInMinutes}min${diffInMinutes > 1 ? 's' : ''} ago`;
      }
    } else if (['date-text'].includes(format)) {
      relativeTime = 'today';
    } else {
      relativeTime = 'just now';
    }
  } else if (format === 'fullText') {
    relativeTime = `${day}, ${month} ${date} ${year} at ${hour}:${minutesDbl} ${hourPref}`;
  } else if (format === 'fullText-without-time') {
    relativeTime = `${day}, ${month} ${date} ${Year}`;
  } else if (format === 'text') {
    relativeTime = `${month} ${date} ${year} at ${hour}:${minutesDbl} ${hourPref}`;
  } else if (['number-without-time', 'date-text'].includes(format)) {
    relativeTime = `${d2.getMonth()}/${date}/${Year}`;
  } else if (['number-without-time', 'date-text'].includes(format)) {
    relativeTime = `${d2.getMonth()}/${date}/${Year}`;
  } else if (format === 'time') {
    relativeTime = `${hour}:${minutesDbl} ${hourPref}`;
  } else {
    // its number
    relativeTime = `${d2.getMonth()}/${date}/${Year} at ${hour}:${minutesDbl} ${hourPref}`;
  }

  return relativeTime;
};

export const formatCalendarDates = (dates, options = { day: false }) => {
  const [startDate, endDate] = dates;
  let start = null;
  if (isDate(startDate)) {
    start = {
      year: startDate.getFullYear(),
      month: startDate.getMonth() + 1,
      day: startDate.getDate(),
    };
  } else {
    start = {
      ...startDate,
    };
  }

  let end = null;
  if (endDate) {
    if (isDate(endDate)) {
      end = {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      };
    } else {
      end = {
        ...endDate,
      };
    }
  }

  if (!startDate) return '';

  const parseMonth = (month) => {
    if (!month) return '';
    let Month = getMonth(month - 1);
    Month = capitalize(`${Month[0]}${Month[1]}${Month[2]}`);
    return Month;
  };

  const currentYear = new Date().getFullYear();
  if (start && end) {
    if (currentYear === start.year && start.year === end.year) {
      start.year = '';
      end.year = '';

      if (start.month === end.month) {
        end.month = '';

        if (start.day === end.day) {
          end = false;
        }
      }
    } else {
      start.year = ` ${start.year}`;
      end.year = ` ${end.year}`;
    }
  } else if (start) {
    if (currentYear === start.year) {
      start.year = '';
    } else {
      start.year = ` ${start.year}`;
    }
  }
  // ${date.day}, ${date.year}`;
  /* (dates) => (dates.map((date) => (
    date ? this.formatRelativeDate(date) : ''
  ))).join(' - ') */
  if (options.day) {
    return {
      day: 'Monday',
      date: (
        <>{`${parseMonth(start.month)} ${start.day}${start.year}${end ? ` - ${parseMonth(end.month)} ${end.day}${end.year}` : ''
          }`}
        </>
      ),
    };
  }
  return (
    <>{`${parseMonth(start.month)} ${start.day}${start.year}${end ? ` - ${parseMonth(end.month)} ${end.day}${end.year}` : ''
      }`}
    </>
  );
};

export const download = (filename, text, mime = 'text/plain') => {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:${mime};charset=utf-8,${encodeURIComponent(text)}`,
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const onDOMChange = (
  config = {
    attributes: false,
    attributeOldValue: false,
    childList: false,
    characterData: false,
    characterDataOldValue: false,
    subtree: false,
    targetNode: window.document, // <== Select the node that will be observed for mutations
  },
  callback = (mutationsList, observe) => { },
) => {
  // Options for the observer (which mutations to observe)
  const Config = {
    ...{
      attributes: false,
      attributeOldValue: false,
      childList: false,
      characterData: false,
      characterDataOldValue: false,
      subtree: false,
      targetNode: window.document, // <== Select the node that will be observed for mutations
    },
    ...config,
  };

  // Create an observer instance linked to the callback function
  const { MutationObserver } = window;
  const observer = new MutationObserver(callback); // <== Callback function to execute when mutations are observed

  // Start observing the target node for configured mutations
  observer.observe(Config.targetNode, Config);
  // Later, you can stop observing
  // observer.disconnect();
  return observer;
};
export const getUniqueValues = (array) => {
  const uniqueArray = [];

  // Loop through array values
  for (let i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
};
/**
      In other for the elmenet to the placed exactly where you want it to be in relaive to the flow of the page
      "getRelativePosition" takes the position of the element in the page flow(getPosition()) and returns the relative position of the element to the nearest non-static('absolute', 'relative' or 'fixed') parent
  */
export const getRelativePosition = (el, xPos, yPos) => {
  let relativeX;
  let relativeY;
  // alert("we are about to call getRelativeParent in getRelativePosition")
  const elRelativeParent = getRelativeParent(el);
  /* alert("we've called getRelativeParent in getRelativePosition\n"
  +"and elRelativeParent id is : " + elRelativeParent.id
  ); */

  if (elRelativeParent.tagName === 'BODY') {
    relativeX = xPos;
    relativeY = yPos;
  } else {
    // Number(back.style.transform.split("deg")[0].split("(")[1]);
    const elRelativeParentStyle = window.getComputedStyle(
      elRelativeParent,
      null,
    );
    const elRelativeParentBorderLeft = Number(
      elRelativeParentStyle.getPropertyValue('border-left-width').split('px')[0],
    );
    const elRelativeParentBorderTop = Number(
      elRelativeParentStyle.getPropertyValue('border-top-width').split('px')[0],
    );
    // alert("elRelativeParentBorderLeft is : " + elRelativeParentBorderLeft);

    const elRelativeParentPosition = getPosition(elRelativeParent);
    const elRelativeParentLeft = elRelativeParentPosition.left;
    const elRelativeParentTop = elRelativeParentPosition.top;
    /*  console.log({
      elRelativeParentPosition,
      elRelativeParentLeft,
      elRelativeParentTop,
    }); */
    // alert("the element that this position relate to have the id : " + elRelativeParent.id+ "its left is : " + elParentLeft)

    relativeX = xPos - (elRelativeParentLeft + elRelativeParentBorderLeft);
    relativeY = yPos - (elRelativeParentTop + elRelativeParentBorderTop);
  }
  return {
    left: relativeX,
    top: relativeY,
  };
};

/**
 * It converts duration in minutes to understandable english
 * @function parseDuration
 */
export const parseDuration = (duration, english = false) => {
  let hourTag = 'hr';
  let minuteTag = 'min';
  if (english) {
    hourTag = ' hour';
    minuteTag = ' minute';
  }
  const hour = Math.floor(duration / 60);
  const mins = duration % 60;
  return `${hour > 0 ? `${hour}${hourTag}${hour > 1 ? 's' : ''}` : ''}${mins > 0 ? ` ${mins}${minuteTag}${mins > 1 ? 's' : ''}` : ''
    }`;
};

export const getRelativeParent = (el) => {
  /* /
      returns the element(ancestor) which the element(el) will be positioned in relative to in the page flow
  */

  let returnVar;
  let elParent;
  let elParentStyle;
  let elParentStylePosition;
  while (el) {
    if (el.tagName === 'BODY') {
      return null;
    }

    elParent = el.parentElement;
    // console.log({ el, elParent });
    elParentStyle = window.getComputedStyle(elParent, null);
    elParentStylePosition = elParentStyle.getPropertyValue('position');
    if (el.tagName === 'BODY') {
      returnVar = el;
      break;
    } else if (
      !(elParentStylePosition === 'static')
      || elParent.tagName === 'BODY'
    ) {
      returnVar = elParent;
      break;
    } else {
      el = elParent;
    }
  }
  return returnVar;
};

export const getPosition = (el) => {
  [el] = $(el);
  // to get the location of an element in page in relative to the nearest parent that shares the same position with it
  let xPos = 0;
  let yPos = 0;
  while (el) {
    // for all other non-BODY elements
    xPos += el.offsetLeft;
    yPos += el.offsetTop;
    el = el.offsetParent;
  }
  // alert(xPos +"\n"+ yPos);
  return {
    left: xPos,
    top: yPos,
  };
};

export const getCordinates = (el, scrollContainer = $('html')[0]) => {
  const elem = isElement(el) ? el : $(el);
  const xPos = elem.offsetLeft - scrollContainer.scrollLeft;
  const yPos = elem.offsetTop - scrollContainer.scrollTop;
  // console.log('in the gu: ', {elem, scrollContainer,xPos, yPos});

  return {
    left: xPos,
    top: yPos,
  };
};

export const getCordinates_ = (el) => {
  // to get the co-ordinates of an element relative to screen in a page
  const offset = $(el).offset();
  let xPos = offset.left;
  let yPos = offset.top;
  const ofFixed = false;

  // for page's sroll
  // popAlert("document scroll =>> left : " + $(document).scrollLeft() + " top : " + $(document).scrollTop())
  if (ofFixed === false) {
    xPos -= $(document).scrollLeft();
    yPos -= $(document).scrollTop();
  } else {
    xPos += $(document).scrollLeft();
    yPos += $(document).scrollTop();
  }

  return {
    left: xPos,
    top: yPos,
  };
};

export const getCordinates__ = (el) => {
  // to get the co-ordinates of an element relative to screen in a page
  let xPos = 0;
  let yPos = 0;
  let ofFixed = false;

  while (el && el.tagName !== 'HTML') {
    if ($(el).css('position') === 'fixed') {
      ofFixed = true;
    }

    const elOffSet = $(el).position();

    const elBorderTop = parseInt(
      ($(el).css('border-top-width') || '0px').split('px')[0],
      10,
    );
    const elBorderLeft = parseInt(
      ($(el).css('border-left-width') || '0px').split('px')[0],
      10,
    );

    xPos += elOffSet.left - $(el).scrollLeft() + elBorderLeft;
    yPos += elOffSet.top - $(el).scrollTop() + elBorderTop;
    el.style.border = 'Solid 10px red';
    console.log('REDDDDDDDDDDDDDDDDDDDDDDD', {
      el,
      left: elOffSet.left - $(el).scrollLeft() + elBorderLeft,
      top: elOffSet.top - $(el).scrollTop() + elBorderTop,
    });

    el = getRelativeParent(el);
  }

  // for page's sroll
  // popAlert("document scroll =>> left : " + $(document).scrollLeft() + " top : " + $(document).scrollTop())
  if (ofFixed === false) {
    xPos -= $(document).scrollLeft();
    yPos -= $(document).scrollTop();
  } else {
    xPos += $(document).scrollLeft();
    yPos += $(document).scrollTop();
  }

  return {
    left: xPos,
    top: yPos,
  };
};

export const parallaxBk = {
  container: null,
  stop: () => {
    window.removeEventListener('scroll', parallaxBk.onScroll);
  },
  init: (container = window) => {
    parallaxBk.container = container;
    container.addEventListener('scroll', parallaxBk.onScroll);
  },
  scroll: (parallaxBk) => {
    const container = parallaxBk.parentElement;
    const containerHeight = container.offsetHeight;
    const containerTop = getCordinates(container).top;
    let containerPtop = container.offsetTop;
    const containerBottom = containerTop + containerHeight;
    // console.log({
    //   containerTop,
    //   libParallaxBkContainerInnerHeight:  parallaxBk.container.innerHeight,
    //   containerBottom,
    // });
    if (
      containerTop <= parallaxBk.container.innerHeight
      && containerBottom >= 0
    ) {
      containerPtop = containerPtop > window.innerHeight ? window.innerHeight : containerPtop;
      // v the amount of distance the parallax bk have moved (in percentage)
      // eslint-disable-next-line max-len
      const displacement = ((containerTop - containerPtop) / (containerPtop + containerHeight))
        * 100;
      const relativeDisplacement = (displacement / 100) * (parallaxBk.offsetHeight - containerHeight);
      parallaxBk.style.transform = `translate3d(0px, ${relativeDisplacement}px, 0px)`;
    }
  },
  onScroll: () => {
    $('.parallax-bk').forEach((parallaxBk) => {
      parallaxBk.scroll(parallaxBk);
    });
  },
};

/**
 *  formats number to USA domestic phone number
 */
export const formatPhoneNo = (numb) => {
  if (numb && !isNaN(numb)) {
    if (`${numb}`.length > 3) {
      const arr = `${numb}`.split('');
      const [c, o, d, ...rest] = arr;
      const code = `(${c}${o}${d})`;
      if (rest.length > 3) {
        const [p, a, t, ...rest2] = rest;
        const part1 = `${p}${a}${t}`;
        return `${code} ${part1}-${rest2.join('')}`;
      }
      return `${code} ${rest.join('')}`;
    }
    return numb;
  }
  return '';
};
// console.log('TESTING', formatPhoneNo(1234567));

export const heroCheckBox = {
  onClick: (parent) => {
    const checkBox = parent.querySelector('.hero-check-box-field');
    if (checkBox.classList.contains('checked')) {
      checkBox.classList.remove('checked');
    } else checkBox.classList.add('checked');
  },
  stop: () => { },
  init: (
    params = {
      onClick: (heroCheckBox) => { },
    },
  ) => {
    const init = () => {
      const checkBoxes = document.querySelectorAll('.hero-check-box');
      for (let i = 0; i < checkBoxes.length; i += 1) {
        if (checkBoxes[i].init_check_box !== true) {
          checkBoxes[i].init_check_box = true;
          checkBoxes[i].addEventListener('click', (event) => {
            heroCheckBox.onClick(checkBoxes[i]);
            if (params.onClick) params.onClick(event);
          });
        }
      }
    };

    init();

    const observer = onDOMChange(
      { childList: true, subtree: true },
      (mutationsList) => {
        for (const mutation of mutationsList) {
          // console.log('mutation for checkbox is = > ', mutation, 'asnd observer is => ', observer);
          if (mutation.type === 'childList') {
            const addedChildren = mutation.addedNodes;
            // console.log("childList attributeName is = > ", mutation.attributeName ,", mutation \n=> ", mutation)
            if (addedChildren.length > 0) {
              init();
            }
          }
        }
      },
    );

    heroCheckBox.stop = () => {
      observer.disconnect();
    };
  },
};

export const countries = [
  'afghanistan',
  'albania',
  'algeria',
  'andorra',
  'angola',
  'antigua and barbuda',
  'argentina',
  'armenia',
  'australia',
  'austria',
  'azerbaijan',
  'bahamas',
  'bahrain',
  'bangladesh',
  'barbados',
  'belarus',
  'belgium',
  'belize',
  'benin',
  'bhutan',
  'bolivia',
  'bosnia and herzegovina',
  'botswana',
  'brazil',
  'brunei',
  'bulgaria',
  'burkina faso',
  'burundi',
  'cote d ivoire',
  'cabo verde',
  'cambodia',
  'cameroon',
  'canada',
  'central african republic',
  'chad',
  'chile',
  'china',
  'colombia',
  'comoros',
  'congo',
  'costa rica',
  'croatia',
  'cuba',
  'cyprus',
  'czech republic',
  'democratic republic of the congo',
  'denmark',
  'djibouti',
  'dominica',
  'dominican republic',
  'ecuador',
  'egypt',
  'el salvador',
  'equatorial guinea',
  'eritrea',
  'estonia',
  'ethiopia',
  'fiji',
  'finland',
  'france',
  'gabon',
  'gambia',
  'georgia',
  'germany',
  'ghana',
  'greece',
  'grenada',
  'guatemala',
  'guinea',
  'guineabissau',
  'guyana',
  'haiti',
  'holy see',
  'honduras',
  'hungary',
  'iceland',
  'india',
  'indonesia',
  'iran',
  'iraq',
  'ireland',
  'israel',
  'italy',
  'jamaica',
  'japan',
  'jordan',
  'kazakhstan',
  'kenya',
  'kiribati',
  'kuwait',
  'kyrgyzstan',
  'laos',
  'latvia',
  'lebanon',
  'lesotho',
  'liberia',
  'libya',
  'liechtenstein',
  'lithuania',
  'luxembourg',
  'macedonia',
  'madagascar',
  'malawi',
  'malaysia',
  'maldives',
  'mali',
  'malta',
  'marshall islands',
  'mauritania',
  'mauritius',
  'mexico',
  'micronesia',
  'moldova',
  'monaco',
  'mongolia',
  'montenegro',
  'morocco',
  'mozambique',
  'myanmar',
  'namibia',
  'nauru',
  'nepal',
  'netherlands',
  'new zealand',
  'nicaragua',
  'niger',
  'nigeria',
  'north korea',
  'norway',
  'oman',
  'pakistan',
  'palau',
  'palestine state',
  'panama',
  'papua new guinea',
  'paraguay',
  'peru',
  'philippines',
  'poland',
  'portugal',
  'qatar',
  'romania',
  'russia',
  'rwanda',
  'saint kitts and nevis',
  'saint lucia',
  'saint vincent and the grenadines',
  'samoa',
  'san marino',
  'sao tome and principe',
  'saudi arabia',
  'senegal',
  'serbia',
  'seychelles',
  'sierra leone',
  'singapore',
  'slovakia',
  'slovenia',
  'solomon islands',
  'somalia',
  'south africa',
  'south korea',
  'south sudan',
  'spain',
  'sri lanka',
  'sudan',
  'suriname',
  'swaziland',
  'sweden',
  'switzerland',
  'syria',
  'tajikistan',
  'tanzania',
  'thailand',
  'timorleste',
  'togo',
  'tonga',
  'trinidad and tobago',
  'tunisia',
  'turkey',
  'turkmenistan',
  'tuvalu',
  'uganda',
  'ukraine',
  'united arab emirates',
  'united kingdom',
  'united states of america',
  'uruguay',
  'uzbekistan',
  'vanuatu',
  'venezuela',
  'viet nam',
  'yemen',
  'zambia',
  'zimbabwe',
];

export const isCountry = (country) => countries.indexOf(country) !== -1;

export const arrNormalize = (arr) => {
  const newArr = [];
  for (const value of arr) { if (newArr.indexOf(value) === -1) newArr.push(value.trimLeft()); }
  return newArr;
};

export const devalueString = (string) => {
  let returnee = '';
  for (let i = 0; i < string.length; i += 1) {
    if (isUpperCase(string[i])) {
      // popMessage(string[i] + " is isUpperCase")
      returnee += ` ${string[i].toLowerCase()}`;
    } else if (string[i] === '_' || string[i] === '-') {
      returnee += ' ';
    } else {
      returnee += string[i];
    }
  }

  return returnee;
};

export const strToArr = (string) => {
  const arr = [];
  for (let i = 0; i < string.length; i += 1) {
    arr.push(string[i]);
  }

  return arr;
};

export const strReverse = (string) => {
  const arr = strToArr(`${string}`);
  return arr.reverse().join('');
};

export const parseDob = (value) => {
  if (isDate(value)) {
    const date = new Date(value);
    return {
      month: date.getMonth() + 1,
      day: date.getDate(),
      year: date.getFullYear(),
    };
  }

  return value;
};

export function lightenDarkenColor(col, amt) {
  let usePound = false;
  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export const parsePhoneNo = (value) => (value.match(/[0-9]/gi) || []).slice(0, 10).join('');

export const FetchRequest = (
  params = {
    url: '',
    method: 'GET',
    body: {},
    params: {},
    headers: {},
    checkUser: false,
  },
) => new Promise((resolve, reject) => {
  const sessionUserToken = localStorage.getItem('sessionUserToken');
  const retry = (error) => {
    console.log('retrying to connect to server', error);
    FetchRequest(params).then(resolve).catch(reject);
  };
  const errorHandler = (error) => {
    console.log('error full keys : ', Object.keys(error));
    if (error.response) {
      console.log('error response : ', error.response);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status } = error.response;
      if (status === 500) {
        console.log('oops! there was a server error here');
        // alert('server error');
        popAlert({
          title: Messages.requests.serverError.title,
          description: Messages.requests.serverError.message,
          error: true,
        });
      }
      reject(error);
    } else if (error.request) {
      console.log('error request : ', error.request);
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      if (error.request.status === 0 && error.request.readyState === 4) {
        // Also caused by no internet
        console.log('oops! there was a server error');
        setTimeout(() => {
          console.log('retrying to connect to server');
          retry();
        }, 3000);
      }
    } else {
      console.log('last illegal error ', error);
      // Something happened in setting up the request that triggered an Error
      if (!navigator.onLine) {
        console.log(
          "can't connect to serve because you are offline, will retry in 5 seconds",
        );
        setTimeout(() => {
          console.log('retrying to connect to server');
          retry();
        }, 3000);
      }
      reject(error);
    }
  };

  if (!params.checkUser || !isEmpty(sessionUserToken)) {
    if (!navigator.onLine && false) {
    } else {
      const method = !params.method || isEmpty(params.method)
        ? 'GET'
        : params.method.toUpperCase();
      console.log('SENDINg a fetxh request', { params });
      const headers = {
        ...params.headers,
      };

      if (params.checkUser) {
        console.log(
          'okay we are allowed to use sessionUsertoken : ',
          sessionUserToken,
        );
        headers.Authorization = `Bearer ${sessionUserToken}`;
      }
      const d = new Date(); /* toISOString */
      const offset = d.getTimezoneOffset() * 60 * 1000;
      axios({
        url: params.url,
        method,
        data: params.body || new FormData(),
        params: params.params,
        timeout: 0,
        headers: {
          // x_time_offset: offset * -1, // <== in milliseconds
          ...headers,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log('CONSOLE INNER ERROR', { ...error });
          errorHandler(error);
        });
    }
  } else {
    console.log('made artificial error');
    const error = {
      response: {
        data: {
          status: 'error',
          error: 'Unauthorized',
        },
        status: 401,
        statusText: 'Unauthorized',
      },
    };
    errorHandler(error);
  }
});

/* export const getUniqueValues = (array) => {
  const uniqueArray = [];

  // Loop through array values
  for (let i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}; */
