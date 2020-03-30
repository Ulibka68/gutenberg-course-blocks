import { Component } from "@wordpress/element";
import {
    RichText,
    MediaPlaceholder,
    BlockControls,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
    URLInput
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import {
    Spinner,
    withNotices,
    Toolbar,
    IconButton,
    PanelBody,
    TextareaControl,
    SelectControl,
    Dashicon,
    Tooltip,
    TextControl
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";
import {
    SortableContainer,
    SortableElement
} from "react-sortable-hoc";

import arrayMove from 'array-move';
import VggGutenConst from "../../constants";

function wp_selector_name(end_txt) {
    return "wp-block-" + VggGutenConst.NAMESPACE + "-" +VggGutenConst.BLK_NAME_TEAM_MEMBER.slice(1) + end_txt;
}


class TeamMemberEdit extends Component {
    state = {
        selectedLink: null
    };

    componentDidMount() {
        const { attributes, setAttributes } = this.props;
        const { url, id } = attributes;
        if (url && isBlobURL(url) && !id) {
            setAttributes({
                url: "",
                alt: ""
            });
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isSelected && !this.props.isSelected) {
            this.setState({
                selectedLink: null
            });
        }
    }
    onChangeTitle = title => {
        this.props.setAttributes({ title });
    };
    onChangeInfo = info => {
        this.props.setAttributes({ info });
    };
    onSelectImage = ({ id, url, alt }) => {
        this.props.setAttributes({
            id,
            url,
            alt
        });
    };
    onSelectURL = url => {
        this.props.setAttributes({
            url,
            id: null,
            alt: ""
        });
    };
    onUploadError = message => {
        const { noticeOperations } = this.props;
        noticeOperations.createErrorNotice(message);
    };
    removeImage = () => {
        this.props.setAttributes({
            id: null,
            url: "",
            alt: ""
        });
    };
    updateAlt = alt => {
        this.props.setAttributes({
            alt
        });
    };
    onImageSizeChange = url => {
        this.props.setAttributes({
            url
        });
    };
    getImageSizes() {
        const { image, imageSizes } = this.props;
        if (!image) return [];
        let options = [];
        const sizes = image.media_details.sizes;
        for (const key in sizes) {
            const size = sizes[key];
            const imageSize = imageSizes.find(size => size.slug === key);
            if (imageSize) {
                options.push({
                    label: imageSize.name,
                    value: size.source_url
                });
            }
        }
        return options;
    }
    addNewLink = () => {
        const { setAttributes, attributes } = this.props;
        const { social } = attributes;
        setAttributes({
            social: [...social, { icon: "wordpress", link: "" }]
        });
        this.setState({
            selectedLink: social.length
        });
    };
    updateSocialItem = (type, value) => {
        const { setAttributes, attributes } = this.props;
        const { social } = attributes;
        const { selectedLink } = this.state;
        let new_social = [...social];
        new_social[selectedLink][type] = value;
        setAttributes({ social: new_social });
    };
    removeLink = e => {
        e.preventDefault();
        const { setAttributes, attributes } = this.props;
        const { social } = attributes;
        const { selectedLink } = this.state;
        setAttributes({
            social: [
                ...social.slice(0, selectedLink),
                ...social.slice(selectedLink + 1)
            ]
        });
        this.setState({
            selectedLink: null
        });
    };
    onSortEnd = (oldIndex, newIndex) => {
        const { setAttributes, attributes } = this.props;
        const { social } = attributes;
        let new_social = arrayMove(social, oldIndex, newIndex);
        setAttributes({ social: new_social });
        this.setState({ selectedLink: null });
    };
    render() {
        //console.log(this.props);
        const { className, attributes, noticeUI, isSelected } = this.props;
        const { title, info, url, alt, id, social } = attributes;

        const SortableList = SortableContainer(() => {
            return (
                <ul>
                    {social.map((item, index) => {
                        let SortableItem = SortableElement(() => {
                            return (
                                <li
                                    key={index}
                                    onClick={() =>
                                        this.setState({
                                            selectedLink: index
                                        })
                                    }
                                    className={
                                        this.state.selectedLink === index
                                            ? "is-selected"
                                            : null
                                    }
                                >
                                    <Dashicon icon={item.icon} size={16} />
                                </li>
                            );
                        });
                        return <SortableItem key={index} index={index} />;
                    })}
                    {isSelected && (
                        <li
                            className={
                                wp_selector_name("__addIconLI")
                            }
                        >
                            <Tooltip text={__("Add Item", VggGutenConst.NAMESPACE)}>
                                <button
                                    className={
                                        wp_selector_name("__addIcon")
                                    }
                                    onClick={this.addNewLink}
                                >
                                    <Dashicon icon={"plus"} size={14} />
                                </button>
                            </Tooltip>
                        </li>
                    )}
                </ul>
            );
        });
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("Image Settings", VggGutenConst.NAMESPACE)}>
                        {url && !isBlobURL(url) && (
                            <TextareaControl
                                label={__(
                                    "Alt Text (Alternative Text)",
                                    VggGutenConst.NAMESPACE
                                )}
                                value={alt}
                                onChange={this.updateAlt}
                                help={__(
                                    "Alternative text describes your image to people can't see it. Add a short description with its key details."
                                )}
                            />
                        )}
                        {id && (
                            <SelectControl
                                label={__("Image Size", VggGutenConst.NAMESPACE)}
                                options={this.getImageSizes()}
                                onChange={this.onImageSizeChange}
                                value={url}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>
                <BlockControls>
                    {url && (
                        <Toolbar>
                            {id && (
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={this.onSelectImage}
                                        allowedTypes={["image"]}
                                        value={id}
                                        render={({ open }) => {
                                            return (
                                                <IconButton
                                                    className="components-icon-button components-toolbar__control"
                                                    label={__(
                                                        "Edit Image",
                                                        VggGutenConst.NAMESPACE
                                                    )}
                                                    onClick={open}
                                                    icon="edit"
                                                />
                                            );
                                        }}
                                    />
                                </MediaUploadCheck>
                            )}
                            <IconButton
                                className="components-icon-button components-toolbar__control"
                                label={__("Remove Image", VggGutenConst.NAMESPACE)}
                                onClick={this.removeImage}
                                icon="trash"
                            />
                        </Toolbar>
                    )}
                </BlockControls>
                <div className={className}>
                    {url ? (
                        <>
                            <img src={url} alt={alt} />
                            {isBlobURL(url) && <Spinner />}
                        </>
                    ) : (
                        <MediaPlaceholder
                            icon="format-image"
                            onSelect={this.onSelectImage}
                            onSelectURL={this.onSelectURL}
                            onError={this.onUploadError}
                            //accept="image/*"
                            allowedTypes={["image"]}
                            notices={noticeUI}
                        />
                    )}
                    <RichText
                        className={wp_selector_name("__title")}
                        tagName="h4"
                        onChange={this.onChangeTitle}
                        value={title}
                        placeholder={__("Member Name", VggGutenConst.NAMESPACE)}
                        formatingControls={[]}
                    />
                    <RichText
                        className={wp_selector_name("__info")}
                        tagName="p"
                        onChange={this.onChangeInfo}
                        value={info}
                        placeholder={__("Member Info", VggGutenConst.NAMESPACE)}
                        formatingControls={[]}
                    />
                    <div
                        className={
                            wp_selector_name("__social")
                        }
                    >
                        <SortableList
                            axis="x"
                            helperClass={"social_dragging"}
                            distance={10}
                            onSortEnd={({ oldIndex, newIndex }) =>
                                this.onSortEnd(oldIndex, newIndex)
                            }
                        />
                       
                    </div>
                    {this.state.selectedLink !== null && (
                        <div
                            className={
                                wp_selector_name("__linkForm")
                            }
                        >
                            <TextControl
                                label={__("Icon", VggGutenConst.NAMESPACE)}
                                value={social[this.state.selectedLink].icon}
                                onChange={icon =>
                                    this.updateSocialItem("icon", icon)
                                }
                            />
                            <URLInput
                                label={__("URL", VggGutenConst.NAMESPACE)}
                                value={social[this.state.selectedLink].link}
                                onChange={url =>
                                    this.updateSocialItem("link", url)
                                }
                            />
                            <a
                                className={wp_selector_name("__removeLink")}
                                onClick={this.removeLink}
                            >
                                {__("Remove Link", VggGutenConst.NAMESPACE)}
                            </a>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default withSelect((select, props) => {
    const id = props.attributes.id;
    return {
        image: id ? select("core").getMedia(id) : null,
        imageSizes: select("core/editor").getEditorSettings().imageSizes
    };
})(withNotices(TeamMemberEdit));
