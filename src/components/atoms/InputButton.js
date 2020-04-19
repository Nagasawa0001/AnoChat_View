import React from 'react';
import TextField from '@material-ui/core/TextField';

const renderTextField = (props) => {
    const { input, variant, name, label, type, id, autoComplete, required, fullWidth } = props;
    return (
        <TextField
        {...input} 
        variant={variant}
        name={name}
        label={label}
        type={type}
        id={id}
        autoComplete={autoComplete}
        required={required}
        fullWidth={fullWidth}
        />
    );
}

export default renderTextField;