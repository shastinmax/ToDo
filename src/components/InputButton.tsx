import React, {ChangeEvent, KeyboardEvent} from 'react';
type TypeProps={
    title:string
    onChangeHandler:(e: ChangeEvent<HTMLInputElement>)=>void
    onKeyPressHandler:(e: KeyboardEvent<HTMLInputElement>)=>void
    error:string | null
    addTask:()=>void
}

export const InputButton = (props:TypeProps) => {
    return (
        <div>
            <input value={props.title}
                   onChange={props.onChangeHandler}
                   onKeyPress={props.onKeyPressHandler}
                   className={props.error ? "error" : ""}
            />
            <button onClick={props.addTask}>+</button>
            {props.error && <div className="error-message">{props.error}</div>}
        </div>
    );
};

