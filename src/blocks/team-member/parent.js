import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { panelBody, RangeControl } from "@wordpress/components";
import VggGutenConst from "../../constants";

const attributes = {
    columns: {
        type: "number",
        default: 2
    }
};

registerBlockType(VggGutenConst.NAMESPACE +  VggGutenConst.BLK_NAME_TEAM_MEMBERS, {
    title: __("Team Members", VggGutenConst.NAMESPACE),

    description: __("Block showing a Team Members.", VggGutenConst.NAMESPACE),

    icon: "grid-view",

    category: VggGutenConst.SLUG_THEME_CATEGORY,

    supports: {
        html: false,
        align: ["wide", "full"]
    },

    transforms: {
        from: [
            {
                type: "block",
                blocks: ["core/gallery"],
                transform: ({ columns, images }) => {
                    let inner = images.map(({ alt, id, url }) =>
                        createBlock(VggGutenConst.NAMESPACE +  VggGutenConst.BLK_NAME_TEAM_MEMBER, {
                            alt,
                            id,
                            url
                        })
                    );
                    return createBlock(
                        VggGutenConst.NAMESPACE +  VggGutenConst.BLK_NAME_TEAM_MEMBERS,
                        {
                            columns: columns
                        },
                        inner
                    );
                }
            },
            {
                type: "block",
                blocks: ["core/image"],
                isMultiBlock: true,
                transform: attributes => {
                    let inner = attributes.map(({ alt, id, url }) =>
                        createBlock(VggGutenConst.NAMESPACE +  VggGutenConst.BLK_NAME_TEAM_MEMBER, {
                            alt,
                            id,
                            url
                        })
                    );
                    return createBlock(
                        VggGutenConst.NAMESPACE +  VggGutenConst.BLK_NAME_TEAM_MEMBERS,
                        {
                            columns: 3
                        },
                        inner
                    );
                }
            }
        ]
    },

    keywords: [
        __("team", VggGutenConst.NAMESPACE),
        __("member", VggGutenConst.NAMESPACE),
        __("person", VggGutenConst.NAMESPACE)
    ],

    attributes,

    edit({ className, attributes, setAttributes }) {
        const { columns } = attributes;
        return (
            <div className={`${className} has-${columns}-columns`}>
                <InspectorControls>
                    <panelBody>
                        <RangeControl
                            label={__("column", VggGutenConst.NAMESPACE)}
                            value={columns}
                            onChange={columns => setAttributes({ columns })}
                            min={1}
                            max={6}
                        />
                    </panelBody>
                </InspectorControls>
                <InnerBlocks
                    allowedBlocks={[VggGutenConst.NAMESPACE +  VggGutenConst.BLK_NAME_TEAM_MEMBER]}
                    template={[
                        [VggGutenConst.NAMESPACE +  VggGutenConst.BLK_NAME_TEAM_MEMBER],
                        [VggGutenConst.NAMESPACE +  VggGutenConst.BLK_NAME_TEAM_MEMBER]
                    ]}
                />
            </div>
        );
    },

    save({ attributes }) {
        const { columns } = attributes;
        return (
            <div className={`has-${columns}-columns`}>
                <InnerBlocks.Content />
            </div>
        );
    }
});
