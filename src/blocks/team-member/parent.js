import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/editor";
import VggGutenConst from "../../constants";

registerBlockType(VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_TEAM_MEMBERS, {
    title: __("Team Members", VggGutenConst.NAMESPACE),

    description: __("Block showing a Team Members.", VggGutenConst.NAMESPACE),

    icon: "grid-view",

    category: VggGutenConst.SLUG_THEME_CATEGORY,

    keywords: [
        __("team", VggGutenConst.NAMESPACE),
        __("person", VggGutenConst.NAMESPACE)
    ],

    edit({ className }) {
        return (
            <div className={className}>
                <InnerBlocks
                    allowedBlocks={["mytheme-blocks/team-member"]}
                    template={[
                        [VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_TEAM_MEMBER,{title : 'Member1',info : 'CEO info'}],
                        [VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_TEAM_MEMBER,{title : 'Member2',info : 'assistant'}]
                    ]}
                />
            </div>
        );
    },

    save() {
        return (
            <div>
                <InnerBlocks.Content />
            </div>
        );
    }
});
