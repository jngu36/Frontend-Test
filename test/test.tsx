'use client'

import React from 'react';
import { useState } from 'react';
import styles from './test.module.css';

export default function test(): JSX.Element {

    // Your Test Starts Here
    const [err_show, setError] = useState(false);               //Error display flag
    const [input_value, setInputValue] = useState("");          //Keeping track of the user input
    const [todo_list, setTodoList] = useState<string[]>([]);    //The to-do list as a array

    //Variables for editing the list
    const [edit_value, setEditValue] = useState("")     // The value to change the item list
    const [edit_index, setEditIndex] = useState(0)      // The index location in the array
    const [edit_show, setShowEdit] = useState(false)    // Edit bar display flag



    // The function after clickking "Add"
    // Checks the user's input. if its blank, flip the error flag to display. Otherwise, add it to the todo list array
    function addToList() {
        input_value.trim(); // Remove leading & trailing white space

        if (input_value === "") { 
            setError(true);
        } else {
            setError(false);
            setInputValue("");
            setTodoList(old => [...old, input_value]);
        }
    }

    //This is to enable the edit function and keeping track of which item is being edited.
    function editListItem(index: number) {
        setShowEdit(true);
        setEditIndex(index)
    }

    //This function is when you hit "finish" after editing an item.
    //If the edit input bar is blank, we just revert back to normal
    //If the user did change the item, we just copy an array, replace the effected item and replace the current array with the new one
    //There is probably a cleaner way to do this :c
    function editFinalize() {
        if (edit_value !== "") {
            let arr = todo_list
            arr[edit_index] = edit_value
            setTodoList(arr)
        }

        setShowEdit(false)
        setEditIndex(0)
        setEditValue("")
    }

    return (
        <div className={styles.container}>
            <h1>To-do List</h1>

            {err_show && <div><p className={styles.error}>Input empty!</p></div>}                   {/*  The error is hidden until the err_show flag is flipped true */}


            {/*  The user text input form with a button */}
            <div id={styles.search_form}>
                <input type="text" placeholder='Type here to add!' value={input_value} onChange={e => { setInputValue(e.currentTarget.value); }} />
                <button onClick={addToList}>Add</button>
            </div>

            {/*  tbh theres a lot going on here */}
            <div id={styles.list_block}>
                <dl id='todo_list'>
                    {   //iterate through each item in the todo_list array
                        todo_list.map((item, index) => (
                            <dt className={styles.row_item}>
                                <p className={styles.item_box}>{item}</p>
                                {!edit_show && (
                                     
                                    <span>
                                        {/* This is our edit and delete button. The edit points to one of the edit functions above and the delete button fires a simple function that filters out the array and set the array state. */}
                                        {/* These buttons are also encased in the edit_show flag so that when we edit an item, we can't accidentally mess with other items */}
                                        <button className={styles.modify_button} onClick={() => editListItem(index)}>Edit</button>
                                        <button className={styles.modify_button} onClick={() => { setTodoList(thelist => thelist.filter(item => item !== todo_list[index])) }}>X</button>
                                    </span>
                                )}
                                {edit_show && edit_index === index && (
                                    <span>
                                        {/*  This is the user edit item text input and button. It is hidden by default until the user clicks on edit on the appropriate item. */}
                                        {/*  Only 1 edit bar should be shown and we're keeping trackof it */}
                                        <input type="text" placeholder='Edit value' value={edit_value} onChange={e => { setEditValue(e.currentTarget.value); }} />
                                        <button onClick={() => editFinalize()}>Finish</button>
                                    </span>
                                )}
                            </dt>
                        ))
                    }
                </dl>
            </div>
        </div>
    );
};