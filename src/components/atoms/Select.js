import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';


const renderSelect = (props) => {
    console.log(props);
    const { name, id, input, values } = props;
    return (
        <NativeSelect
          {...input}
          id={id}
          name={name}
        >
          <option value="">-------------</option>
          {
            values.map((parentTask) => 
          <option value={parentTask.id}>{parentTask.title}</option>
            )
          }
        </NativeSelect>
    );
}

export default renderSelect;