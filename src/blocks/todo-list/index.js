import edit from "./edit";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import "./ToDoInfo";
import VggGutenConst from "../../constants";

registerBlockType("mytheme-blocks/todo-list", {
    title: __(" Redux Todo List ", VggGutenConst.NAMESPACE),
    description: __("A todo list.", VggGutenConst.NAMESPACE),
    icon: "editor-ul",
    category: VggGutenConst.SLUG_THEME_CATEGORY,
    edit,
    save() {
        return null;
    }
});
