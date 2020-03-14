import "./style.editor.scss";
import "./parent";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit";
import { RichText } from "@wordpress/editor";
import VggGutenConst from "../../constants";


const attributes = {
    title: {
        type: "string",
        source: "html",
        selector: "h4"
    },
    info: {
        type: "string",
        source: "html",
        selector: "p"
    }
};

registerBlockType(VggGutenConst.NAMESPACE + "/team-member", {
    title: __("Team Member", "mytheme-blocks"),

    description: __(" Block showing a Team Member. ", VggGutenConst.NAMESPACE),

    icon: "admin-users",

    parent: [VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_TEAM_MEMBERS],

    category: VggGutenConst.SLUG_THEME_CATEGORY,

    keywords: [
        __("team", VggGutenConst.NAMESPACE),
        __("member", VggGutenConst.NAMESPACE),
        __("person", VggGutenConst.NAMESPACE)
    ],

    attributes,

    save: ({ attributes }) => {
        const { title, info } = attributes;
        return (
            <div>
                {title && (
                    <RichText.Content
                        className={"wp-block-mytheme-blocks-team-member__title"}
                        tagName="h4"
                        value={title}
                    />
                )}
                {info && (
                    <RichText.Content
                        className={"wp-block-mytheme-blocks-team-member__info"}
                        tagName="p"
                        value={info}
                    />
                )}
            </div>
        );
    },

    edit
});
