import React, {ChangeEvent, KeyboardEvent} from 'react';
import {Button} from "./button";

type FullInputType = {
    setTitle: (title: string) => void
    addtask: (NewTitle: string)=>void
    title:string
}

export const FullInput = ({setTitle,addtask,title}:FullInputType) => {
    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(event.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         addtask(title);
    //         setTitle('');
    //     }
    // }
    const onClickHandler = () => {
        addtask(title);
        setTitle('');
    }

    return (
        <div>

            {/*<input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>*/}
            <Button name={'+'} callback={onClickHandler}/>
        </div>
    );
};

