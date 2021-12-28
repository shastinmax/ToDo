import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputProps = {
    title: string
    addtask: (NewTitle: string) => void
    setTitle: (title: string) => void
}

export const Input = ({title, addtask, setTitle}: InputProps) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addtask(title);
            setTitle('');
        }
    }

    return (
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} type={"title"}/>
        </div>
    );
};

export default Input;