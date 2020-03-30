import "./style.editor.scss";
import "./parent";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit";
import { RichText } from "@wordpress/block-editor";
import { Dashicon } from "@wordpress/components";
import VggGutenConst from "../../constants";

function wp_selector_name(end_txt) {
    return "wp-block-" + VggGutenConst.NAMESPACE + "-" + VggGutenConst.BLK_NAME_TEAM_MEMBER.slice(1) + end_txt;
}

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
    },
    id: {
        type: "number"
    },
    alt: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "alt",
        default: ""
    },
    url: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "src"
    },
    social: {
        type: "array",
        default: [],
        source: "query",
        selector: "." + wp_selector_name( "__social  ul li"),
        query: {
            icon: {
                source: "attribute",
                attribute: "data-icon"
            },
            link: {
                source: "attribute",
                selector: "a",
                attribute: "href"
            }
        }
    }
};

registerBlockType( VggGutenConst.NAMESPACE +  VggGutenConst.BLK_NAME_TEAM_MEMBER , {
    title: __("Team Member", VggGutenConst.NAMESPACE),

    description: __(" Block showing a Team Member. ", VggGutenConst.NAMESPACE),

    icon: "admin-users",

    parent: [VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_TEAM_MEMBERS ],

    supports: {
        reusable: false,
        html: false
    },

    category: VggGutenConst.SLUG_THEME_CATEGORY,

    keywords: [
        __("team", VggGutenConst.NAMESPACE),
        __("member", VggGutenConst.NAMESPACE),
        __("person", VggGutenConst.NAMESPACE)
    ],

    attributes,

    save: ({ attributes }) => {
        const { title, info, url, alt, id, social } = attributes;
        return (
            <div>
                {url && (
                    <img
                        src={url}
                        alt={alt}
                        className={id ? `wp-image-${id}` : null}
                    />
                )}
                {title && (
                    <RichText.Content
                        className={ wp_selector_name( "__title") }
                        tagName="h4"
                        value={title}
                    />
                )}
                {info && (
                    <RichText.Content
                        className={ wp_selector_name( "__info")}
                        tagName="p"
                        value={info}
                    />
                )}

                {social.length > 0 && (
                    <div
                        className={
                            wp_selector_name( "__social")
                        }
                    >
                        <ul>
                            {social.map((item, index) => {
                                return (
                                    <li key={index} data-icon={item.icon}>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Dashicon
                                                icon={item.icon}
                                                size={16}
                                            />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        );
    },

    edit
});
