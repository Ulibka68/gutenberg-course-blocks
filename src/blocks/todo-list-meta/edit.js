import { Component } from "@wordpress/element";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import { v4 as uuidv4 } from 'uuid';
import VggGutenConst from "../../constants";


class MetaTodoEdit extends Component {
    state = {
        new_todo: ""
    };
    render() {
        const { todos=[], addToDo, toggleToDo } = this.props;
        // console.log("MetaTodoEdit -> render -> todos", todos);
        
        return (
            <div>
                {todos.map((todo, index) => {
                    return (
                        <div
                            key={index}
                            style={
                                todo.completed
                                    ? {
                                          textDecoration: "line-through",
                                          opacity: 0.5
                                      }
                                    : undefined
                            }
                        >
                            <input
                                disabled={todo.loading}
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleToDo(todo)}
                            />
                            {todo.title}
                        </div>
                    );
                })}
                <input
                    type="text"
                    value={this.state.new_todo}
                    onChange={e => this.setState({ new_todo: e.target.value })}
                />
                <button
                    onClick={() =>
                        {
                            addToDo({
                                title: this.state.new_todo,
                                completed: false,
                                id : uuidv4()
                            });
                            this.setState({ new_todo: ''});
                        }
                    }
                >
                    Add
                </button>
            </div>
        );
    }
}

export default compose([
    withSelect(select => {
        let metaVal = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
        metaVal = metaVal ? JSON.parse( metaVal[VggGutenConst.META_TODO_FLD1])  : [];

        return {
            // todos: select( VggGutenConst.NAMESPACE+ "/todo").getTodos()

            todos: metaVal
        };
    }),
    withDispatch(  (dispatch, props) => {
        return {
            addToDo: item => {
                // console.log("item", item);
              
                let metaValue = JSON.stringify( [...props.todos,item]);
				dispatch( 'core/editor' ).editPost(
                    { 
                        meta: { [VggGutenConst.META_TODO_FLD1] : metaValue } 
                    }
				);
            },
            toggleToDo: (todo) => {
                
                let metaValue = [...props.todos];
                
                let ind = metaValue.findIndex( (element) => {
                    return element.id === todo.id;
                });

                if (ind > -1) {
                    metaValue[ind].completed = !todo.completed;
                };

                metaValue = JSON.stringify( metaValue);
				dispatch( 'core/editor' ).editPost(
                    { 
                        meta: { [VggGutenConst.META_TODO_FLD1] : metaValue } 
                    }
				);
            }
        };
    })
])(MetaTodoEdit);

// select("core/editor").getEditedPostAttribute("title")
// dispatch("core/editor").editPost({ title });
