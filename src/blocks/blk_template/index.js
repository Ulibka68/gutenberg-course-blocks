import "./styles.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./edit";
import VggGutenConst from "../../constants";
import { RichText } from "@wordpress/editor";


const attributes = {
    content: {
        type: "string",
        source: "html",
        selector: "p"
    }
    
};


registerBlockType(VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_RENDERBLK, {
    title: __("Render Block", VggGutenConst.NAMESPACE),
    description: __("Our second block", VggGutenConst.NAMESPACE),
    category: VggGutenConst.SLUG_THEME_CATEGORY,
    icon: 'format-audio',
    
    keywords: [__("render", VggGutenConst.NAMESPACE)],

    attributes,
    

    edit: Edit,
    
    save: ({ attributes }) => {
        const {
            content
        } = attributes;

        console.log(content);
        
        return (
            <RichText.Content
                tagName="p"
                value={content}
            />
        );
    }
});
