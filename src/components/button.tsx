import React from 'react';

export type ButtonType = {
    name: string
    callback: () => void
}


export const Button = ({name, callback}: ButtonType) => {

    const onClickHandler = () => {
        callback()
    }

    return (

        <button onClick={onClickHandler}>{name}</button>

    );
};

