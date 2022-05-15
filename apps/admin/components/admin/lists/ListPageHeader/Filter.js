import React, { useState } from 'react';
import axios from 'axios';
import { Fn } from '@abule-common/components';
import FilterIcon from '../../icons/filter-ico';
import FilterDate from '../../icons/filter_alt-ico';
import SearchIcon from '../../icons/search-ico';

const {
  isEmpty, popMessage,
} = Fn;
const Filters = ({
  setFilter,
  filter,
  onResetFilter,
  onSaveFilter,
  setList,
  title,
  token,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('This is the search text--------', searchText);
    const type = {
      'List of Users': 'user',
      Ambassadors: 'ambassador',
      Waitlist: 'waitlist',
    };
    if (!isEmpty(searchText)) {
      try {
        const category = type[title];
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            category,
            word: searchText,
          },
        };

        const res = await axios.get(
          `${process.env.REACT_APP_API}/admin/search`, config,
        );

        if (res.status === 200) {
          const { results } = res.data.data;
          if (results.length === 0) {
            popMessage(
              `<div>
                                <span>Sorry</span>
                                <div>No results for Search</div> 
                            </div>`,
              'adminApp_message',
            );
            return;
          }
          setList(results);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div id="root" className="adminApp_listPage_filter">
      <div className="adminApp_filter">
        <FilterIcon
          setFilter={setFilter}
          filter={filter}
          onSaveLocation={onSaveFilter}
          onResetLocation={onResetFilter}
        />
      </div>
      <div className="adminApp_filter">
        <FilterDate onSaveDate={onSaveFilter} setFilter={setFilter} onResetDate={onResetFilter} />
      </div>
      <form onSubmit={handleSubmit} className="adminApp_listPage_searchContainer">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
        />
        <SearchIcon className="adminApp_searchIcon" />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default Filters;
