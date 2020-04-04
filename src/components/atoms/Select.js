import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';


const renderSelect = (props) => {
    console.log(props);
    const { name, id, input } = props;
    return (
        <NativeSelect
          {...input}
          id={id}
          name={name}
        >
          <option value="Parent">Parent</option>
          <option value="Child">Child</option>
        </NativeSelect>
    );
}

export default renderSelect;