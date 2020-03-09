import { registerStore } from "@wordpress/data";
import { useImperativeHandle } from "react";

// набор объектов:
// {userId, id, title, completed}
const DEFAULT_STATE = [];

//  action just a plain object
const actions = {
    addToDo(item) {
        return {
            type: "ADD_TODO",
            item: item
        };
    }
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, action.item];
        default:
            return state;
    }
};

const selectors = {
    getTodos(state) {
        return state;
    }
};

// Урок 104 gjxtve стоит пробел не ясно
registerStore('mytheme-blocks/todo', {
// registerStore(" ", {
    reducer,
    selectors,
    actions
});
