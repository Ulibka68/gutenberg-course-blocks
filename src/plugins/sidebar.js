import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl } from "@wordpress/components";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import VggGutenConst from "../constants";

let PluginMetaFields = props => {
    return (
        <>
            <PanelBody
                title={__("Meta Fields Panel", VggGutenConst.NAMESPACE)}
                icon="editor-removeformatting"
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

// wp.data.dispatch('core/editor').editPost({meta: {_mytheme_blocks_post_subtitle : "sub4"}})
// wp.data.dispatch('core/editor').editPost({meta: {_mytheme_blocks_post_subtitle : ["sub5",'sub4']}})
// wp.data.select('core/editor').getEditedPostAttribute('meta')


registerPlugin(VggGutenConst.NAMESPACE+"-sidebar", {
    icon: "smiley",
    render: () => {
        return (
            <>
                {/* Добавить пункт в меню
                target сслыается на name */}
                <PluginSidebarMoreMenuItem target={VggGutenConst.NAMESPACE+"-sidebar"}>
                    Изменение метаполя
                </PluginSidebarMoreMenuItem>

                {/* Здесь пишется name */}
                <PluginSidebar
                    name={VggGutenConst.NAMESPACE+"-sidebar"}
                    icon="buddicons-groups"
                    title={__("Meta Options title", VggGutenConst.NAMESPACE)}
                >
                    <PluginMetaFields />
                </PluginSidebar>
            </>
        );
    }
});
