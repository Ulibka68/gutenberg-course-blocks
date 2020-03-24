import edit from "./edit";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import VggGutenConst from "../../constants";

registerBlockType(VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_LATEST_POSTS, {
    title: __("Latest Posts", VggGutenConst.NAMESPACE),
    description: __("BLock showing the latest posts.", VggGutenConst.NAMESPACE),
    icon: "admin-post",
    category: VggGutenConst.SLUG_THEME_CATEGORY,
    edit: edit,
    save() {
        return null;
    }
});
