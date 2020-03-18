import "./styles.editor.scss";
import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText, getColorClassName } from "@wordpress/editor";
import Edit from "./edit";
import classnames from "classnames";
// import { omit } from "lodash";
//import { PanelBody } from "@wordpress/components";
import VggGutenConst from "../../constants";


const attributes = {
    content: {
        type: "string",
        source: "html",
        selector: "h4"
    },
    alignment: {
        type: "string"
    },
    textAlignment: {
        type: "string"
    },
    textColor: {
        type: "string"
    },
    backgroundColor: {
        type: "string"
    },
    customBackgroundColor: {
        type: "string"
    },
    customTextColor: {
        type: "string"
    },
    shadow: {
        type: "boolean",
        default: false
    },
    shadowOpactiy: {
        type: "number",
        default: 0.3
    }
};


/*
  <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
*/

registerBlockType(VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_SECOND, {
    title: __("Second Block", VggGutenConst.NAMESPACE),
    description: __("Our second block", VggGutenConst.NAMESPACE),
    category: VggGutenConst.SLUG_THEME_CATEGORY,
    icon: (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="24" 
            width="24"
            viewBox="0 0 64 64" 
        >
            <g id="Reward">
                <path d="m21.471 42.162c-1.4-.814-1.666-3.113-2.661-4.437l-10.602 18.263 8.706-2.307 2.05 7.725 10.273-17.738a6.906 6.906 0 0 0 -2.183-1.324c-1.708-.461-4.089.687-5.583-.182z" 
                    fill="#006df0"/>
                <path d="m27.054 42.344c-1.708-.461-4.089.687-5.583-.182-1.4-.814-1.666-3.113-2.661-4.437l-1.1 1.9.1.1c1 1.324 1.264 3.623 2.661 4.437 1.494.869 3.875-.279 5.583.182a6.493 6.493 0 0 1 2.074 1.24l1.109-1.916a6.906 6.906 0 0 0 -2.183-1.324z" 
                    fill="#0062d8"/>
                <path d="m42.476 42.216c-1.5.862-3.873-.3-5.583.154a6.889 6.889 0 0 0 -2.19 1.312l10.181 17.792 2.09-7.715 8.694 2.353-10.507-18.318c-1.002 1.318-1.283 3.616-2.685 4.422z" 
                    fill="#006df0"/>
                <path d="m45.161 37.794c-1 1.318-1.283 3.616-2.685 4.422-1.5.862-3.873-.3-5.583.154a6.889 6.889 0 0 0 -2.19 1.312l1.1 1.924a6.511 6.511 0 0 1 2.089-1.236c1.71-.452 4.085.708 5.583-.154 1.4-.806 1.683-3.1 2.685-4.422l.083-.113z" 
                    fill="#0062d8"/>
                <path d="m50.18 34.55c-.88 1.52-3.52 1.69-4.76 2.92-.09.1-.17.21-.26.32-1 1.32-1.28 3.62-2.68 4.43-1.5.86-3.88-.3-5.59.15a7.031 7.031 0 0 0 -2.19 1.31 4.85 4.85 0 0 1 -2.73 1.32 4.837 4.837 0 0 1 -2.73-1.33 7 7 0 0 0 -2.19-1.33c-1.7-.46-4.08.69-5.58-.18-1.4-.81-1.66-3.11-2.66-4.43a2.1 2.1 0 0 0 -.26-.33c-1.23-1.23-3.87-1.43-4.75-2.95-.86-1.49.3-3.87-.15-5.58-.44-1.65-2.63-3.13-2.63-4.92s2.21-3.27 2.66-4.92c.46-1.71-.69-4.09.18-5.58.88-1.52 3.53-1.69 4.76-2.92s1.43-3.87 2.95-4.75c1.49-.86 3.87.3 5.58-.15 1.65-.44 3.14-2.63 4.93-2.63s3.26 2.21 4.91 2.66c1.71.46 4.09-.69 5.58.18 1.52.88 1.69 3.53 2.92 4.76s3.87 1.43 4.75 2.95c.86 1.49-.3 3.87.15 5.58.44 1.65 2.64 3.13 2.63 4.92s-2.21 3.27-2.65 4.92c-.47 1.71.68 4.09-.19 5.58z" 
                    fill="#ffcd00"/>
                <circle cx="32" cy="24" fill="#d80027" r="12"/>
                <path d="m32 12c-.338 0-.669.023-1 .05a11.991 11.991 0 0 1 0 23.9c.331.027.662.05 1 .05a12 12 0 0 0 0-24z" 
                    fill="#c20023"/>
                <path d="m55.873 12.492.127.508.127-.508a6 6 0 0 1 4.365-4.365l.508-.127-.508-.127a6 6 0 0 1 -4.365-4.366l-.127-.507-.127.507a6 6 0 0 1 -4.365 4.366l-.508.127.508.127a6 6 0 0 1 4.365 4.365z" 
                    fill="#ff9811"/>
                <path d="m7.873 12.492.127.508.127-.508a6 6 0 0 1 4.365-4.365l.508-.127-.508-.127a6 6 0 0 1 -4.365-4.366l-.127-.507-.127.507a6 6 0 0 1 -4.365 4.366l-.508.127.508.127a6 6 0 0 1 4.365 4.365z" 
                    fill="#ff9811"/>
                <path d="m56.127 34.507-.127-.507-.127.507a6 6 0 0 1 -4.365 4.366l-.508.127.508.127a6 6 0 0 1 4.365 4.365l.127.508.127-.508a6 6 0 0 1 4.365-4.365l.508-.127-.508-.127a6 6 0 0 1 -4.365-4.366z" 
                    fill="#ff5023"/>
                <path d="m3 39 .508.127a6 6 0 0 1 4.365 4.365l.127.508.127-.508a6 6 0 0 1 4.365-4.365l.508-.127-.508-.127a6 6 0 0 1 -4.365-4.366l-.127-.507-.127.507a6 6 0 0 1 -4.365 4.366z" 
                    fill="#ff5023"/>
                <path d="m32 21c1.221 0 2 .592 2 1a1 1 0 0 0 2 0c0-1.421-1.259-2.571-3-2.9v-1.1a1 1 0 0 0 -2 0v1.1c-1.741.327-3 1.477-3 2.9 0 1.682 1.757 3 4 3 1.221 0 2 .592 2 1s-.779 1-2 1-2-.592-2-1a1 1 0 0 0 -2 0c0 1.421 1.259 2.571 3 2.9v1.1a1 1 0 0 0 2 0v-1.1c1.741-.327 3-1.477 3-2.9 0-1.682-1.757-3-4-3-1.221 0-2-.592-2-1s.779-1 2-1z" fill="#f1f2f2"/>
                <g fill="#ff6243">
                    <path d="m58 21h2v2h-2z"/>
                    <path d="m60 23h2v2h-2z"/>
                    <path d="m56 23h2v2h-2z"/>
                    <path d="m58 25h2v2h-2z"/>
                    <path d="m4 21h2v2h-2z"/>
                    <path d="m2 23h2v2h-2z"/>
                    <path d="m6 23h2v2h-2z"/>
                    <path d="m4 25h2v2h-2z"/>
                </g>
            </g>
        </svg>
    ),
    keywords: [__("photo", VggGutenConst.NAMESPACE), __("image", VggGutenConst.NAMESPACE)],

    styles: [
        {
            name: "rounded",
            label: __("Rounded", VggGutenConst.NAMESPACE),
            usDefault: true
        },
        {
            name: "outline",
            label: __("Outline", VggGutenConst.NAMESPACE)
        },
        {
            name: "squared",
            label: __("Squared", VggGutenConst.NAMESPACE)
        }
    ],

    attributes,
    
    transforms: {
        from: [
            {
                type: "block",
                blocks: ["core/paragraph"],
                transform: ({ content, align }) => {
                    return createBlock(VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_SECOND , {
                        content: content,
                        textAlignment: align
                    });
                }
            },
            {
                type: "prefix",
                prefix: "#",
                transform: () => {
                    return createBlock(VggGutenConst.NAMESPACE + VggGutenConst.BLK_NAME_SECOND);
                }
            }
        ],
        to: [
            {
                type: "block",
                blocks: ["core/paragraph"],
                isMatch: ({ content }) => {
                    if (content) return true;
                    return false;
                },
                transform: ({ content, textAlignment }) => {
                    return createBlock("core/paragraph", {
                        content: content,
                        align: textAlignment
                    });
                }
            }
        ]
    },
    edit: Edit,
    save: ({ attributes }) => {
        const {
            content,
            textAlignment,
            backgroundColor,
            textColor,
            customBackgroundColor,
            customTextColor,
            shadow,
            shadowOpacity
        } = attributes;

        const backgroundClass = getColorClassName(
            "background-color",
            backgroundColor
        );
        const textClass = getColorClassName("color", textColor);

        const classes = classnames({
            [backgroundClass]: backgroundClass,
            [textClass]: textClass,
            "has-shadow": shadow,
            [`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity
        });

        return (
            <RichText.Content
                tagName="h4"
                className={classes}
                value={content}
                style={{
                    textAlign: textAlignment,
                    backgroundColor: backgroundClass
                        ? undefined
                        : customBackgroundColor,
                    color: textClass ? undefined : customTextColor
                }}
            />
        );
    }
});
