import { registerStore, dispatch } from "@wordpress/data";

const DEFAULT_STATE = [];

const actions = {
    populateTodos(todos) {
        return {
            type: "POPULATE_TODOS",
            todos
        };
    },
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
        case "POPULATE_TODOS":
            return [...action.todos];
        default:
            return state;
    }
};

const selectors = {
    getTodos(state) {
        return state;
    }
};

// https://developer.wordpress.org/block-editor/packages/packages-data/
// resolvers #resolvers
// A resolver is a side-effect for a selector.
// If your selector result may need to be fulfilled from an external source,
// you can define a resolver such that the first time the selector is called,
// the fulfillment behavior is effected.

// The resolvers option should be passed as an object
// where each key is the name of the selector to act upon,
// the value a function which receives the same arguments passed to the selector,
// excluding the state argument.
// It can then dispatch as necessary to fulfill the requirements of the selector,
//  taking advantage of the fact that most data consumers will subscribe
//  to subsequent state changes (by subscribe or withSelect).

registerStore("mytheme-blocks/todo", {
    reducer,
    selectors,
    actions,
    resolvers: {
        getTodos() {
            fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
                .then(response => response.json())
                .then(response => {
                    dispatch("mytheme-blocks/todo").populateTodos(response);
                });
        }
    }
});
