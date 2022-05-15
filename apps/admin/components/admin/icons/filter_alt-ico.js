import React from "react"
import moment from "moment";
import {
  InputDatePicker
} from '@abule-common/components';

const FilterDate = ({ setFilter, onSaveDate, onResetDate }) => {

  const getDateString = (date) => {
    if (date) return `${date.year}-${date.month < 10 ? `0${date.month}` : `${date.month}`}-${date.day < 10 ? `0${date.day}` : `${date.day}`}`
  }

  const pickDates = (dates) => {
    console.log(dates)
    let from = getDateString(dates[0])
    if (moment().isBefore(from)) {
      setFilter(filter => {
        return {
          ...filter,
          from: '',
          to: ''
        }
      })
      return
    }
    if (dates.length === 1) {
      setFilter(filter => {
        return {
          ...filter,
          from,
          to: from
        }
      })
    } else {
      let to = getDateString(dates[1])
      if (moment().isBefore(to)) {
        setFilter(filter => {
          return {
            ...filter,
            from,
            to: moment().format('YYYY-MM-DD')
          }
        })
      } else {
        setFilter(filter => {
          return {
            ...filter,
            from,
            to
          }
        })
      }
    }
  }

  return (
    <InputDatePicker
      onReset={onResetDate}
      onSave={onSaveDate}
      onChange={(dates) => pickDates(dates)}
      pickRange={true}
      controller={() => <span style={{ fontSize: '24px', cursor: 'pointer' }} className="icon-calendar-1"></span>}
    />
  )
}

export default FilterDate