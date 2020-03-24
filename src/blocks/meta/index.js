import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { TextControl } from "@wordpress/components";
import VggGutenConst from "../../constants";

registerBlockType( VggGutenConst.NAMESPACE+VggGutenConst.BLK_NAME_META, {
    title: __(" Meta Block ", VggGutenConst.NAMESPACE),

    description: __("Block for editing meta field", VggGutenConst.NAMESPACE),

    icon: "admin-tools",

    category: VggGutenConst.SLUG_THEME_CATEGORY,

    attributes: {
        post_subtitle: {
            type: "string",
            source: "meta",
            meta: "_mytheme_blocks_post_subtitle"
        }
    },

    edit({ attributes, setAttributes }) {
        function onChange(value) {
            setAttributes({ post_subtitle: value });
        }
        return (
            <div>
                <TextControl
                    label={__("Post Subtitle", VggGutenConst.NAMESPACE)}
                    value={attributes.post_subtitle}
                    onChange={onChange}
                />
            </div>
        );
    },

    save() {
        return null;
    }
});
