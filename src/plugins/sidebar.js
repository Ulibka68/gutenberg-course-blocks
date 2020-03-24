import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl } from "@wordpress/components";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import VggGutenConst from "../../constants";

let PluginMetaFields = props => {
    return (
        <>
            <PanelBody
                title={__("Meta Fields Panel", VggGutenConst.NAMESPACE)}
                icon="admin-post"
                intialOpen={true}
            >
                <TextControl
                    value={props.subtitle}
                    label={__("Post Subtitle", VggGutenConst.NAMESPACE)}
                    onChange={value => props.onSubtitleChange(value)}
                />
            </PanelBody>
        </>
    );
};

PluginMetaFields = compose([
    withSelect(select => {
        return {
            subtitle: select("core/editor").getEditedPostAttribute("meta")[
                "_mytheme_blocks_post_subtitle"
            ]
        };
    }),
    withDispatch(dispatch => {
        return {
            onSubtitleChange: subtitle => {
                dispatch("core/editor").editPost({
                    meta: { _mytheme_blocks_post_subtitle: subtitle }
                });
            }
        };
    })
])(PluginMetaFields);

registerPlugin(VggGutenConst.NAMESPACE+"-sidebar", {
    icon: "smiley",
    render: () => {
        return (
            <>
                <PluginSidebarMoreMenuItem target={VggGutenConst.NAMESPACE+"-sidebar"}>
                    {__("Meta Options", VggGutenConst.NAMESPACE)}
                </PluginSidebarMoreMenuItem>

                <PluginSidebar
                    name={VggGutenConst.NAMESPACE+"-sidebar"}
                    icon="admin-post"
                    title={__("Meta Options", VggGutenConst.NAMESPACE)}
                >
                    <PluginMetaFields />
                </PluginSidebar>
            </>
        );
    }
});
