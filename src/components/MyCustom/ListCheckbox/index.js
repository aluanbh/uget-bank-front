import React, { memo, useState } from "react";
import Checks from "../../bootstrap/forms/Checks";

const ListCheckbox = ({ id, options, selecteds, onChange }) => {

  return (
    <div 
      style={{ maxHeight: 300 }}
      className="overflow-auto"
    >
      {options.map((item, index) => {
        return(
          <Checks
            key={'LCK'+id+index.toString()}
            id={'Chec'+id+index.toString()}
            name={'Chec'+id+index.toString()}
            type='switch'
            label={item.label}
            value={item.value}
            checked={selecteds.includes(item.value)}
            onChange={e => {
              const findIndex = selecteds.findIndex(data => data === item.value)
              if(findIndex === -1) {
                selecteds.push(item.value)
              } else {
                selecteds.splice(findIndex, 1)
              }
              onChange(selecteds.slice());
            }}
          />
        )
      })}
    </div>
  );
}

export default memo(ListCheckbox);