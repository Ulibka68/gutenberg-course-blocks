import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import VggGutenConst from "../../constants";

let TodoCount = props => {
    return (
        <div>
            <p>Total: {props.total}</p>
            <p>To Do: {props.todo}</p>
            <p>Done: {props.done}</p>
        </div>
    );
};

TodoCount = withSelect(select => {
    return {
        total: select(VggGutenConst.NAMESPACE+"/todo").getToDosNumber(),
        todo: select(VggGutenConst.NAMESPACE+"/todo").getUnDoneToDosNumber(),
        done: select(VggGutenConst.NAMESPACE+"/todo").getDoneToDosNumber()
    };
})(TodoCount);

registerBlockType(VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_TODO_LIST_COUNT, {
    title: __("Redux Todo Count", VggGutenConst.NAMESPACE),

    description: __("Redux Todo Count", VggGutenConst.NAMESPACE),

    icon: "editor-ul",

    category: VggGutenConst.SLUG_THEME_CATEGORY,

    edit() {
        return <TodoCount />;
    },

    save() {}
});
