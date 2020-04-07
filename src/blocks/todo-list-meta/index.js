import edit from "./edit";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import VggGutenConst from "../../constants";

registerBlockType(VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_TODO_LIST_META , {
    title: __("Meta todo list ", VggGutenConst.NAMESPACE),
    description: __("Meta todo list.", VggGutenConst.NAMESPACE),
    icon: "editor-unlink",
    category: VggGutenConst.SLUG_THEME_CATEGORY,
    edit,
    save() {
        return null;
    }
});
