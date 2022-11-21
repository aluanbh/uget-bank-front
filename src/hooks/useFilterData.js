import React from 'react';

const useFilterData = (rows, search) => {
	
  const dataFilter = React.useMemo(() => {
    if(search.length < 3) return rows;

    const searchLowerCase = search.toLowerCase();
    return rows.filter((row) => 
      Object.keys(row).find((key) => typeof row[key] === 'string' && row[key].toLowerCase().includes(searchLowerCase))
    )
  }, [rows, search])

  return dataFilter;
}

export default useFilterData;