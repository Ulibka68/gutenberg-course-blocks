import { Component } from "@wordpress/element";
import { withSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { decodeEntities } from "@wordpress/html-entities";
import { RangeControl, PanelBody, SelectControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import VggGutenConst from "../../constants";

class LatestPostsEdit extends Component {
    onChangeNumberOfPosts = numberOfPosts => {
        this.props.setAttributes({ numberOfPosts });
    };
    onChangeCategories = categories => {
        this.props.setAttributes({ postCategories: categories.join(",") });
    };
    render() {
        const { posts, categories, className, attributes } = this.props;
        const { numberOfPosts, postCategories } = attributes;
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("Posts Settings", VggGutenConst.NAMESPACE)}>
                        <SelectControl
                            multiple
                            label={__("categories", VggGutenConst.NAMESPACE)}
                            onChange={this.onChangeCategories}
                            options={
                                categories &&
                                categories.map(category => ({
                                    value: category.id,
                                    label: category.name
                                }))
                            }
                            value={postCategories && postCategories.split(",")}
                        />
                        <RangeControl
                            label={__("Number of Posts", VggGutenConst.NAMESPACE)}
                            value={numberOfPosts}
                            onChange={this.onChangeNumberOfPosts}
                            min={1}
                            max={10}
                        />
                    </PanelBody>
                </InspectorControls>
                {posts && posts.length > 0 ? (
                    <ul className={className}>
                        {posts.map(post => (
                            <li key={post.id}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={post.link}
                                >
                                    {decodeEntities(post.title.rendered)}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        {" "}
                        {posts
                            ? __("No Posts Found", VggGutenConst.NAMESPACE)
                            : __("Loading...", VggGutenConst.NAMESPACE)}{" "}
                    </div>
                )}
            </>
        );
    }
}

export default withSelect((select, props) => {
    const { attributes } = props;
    const { numberOfPosts, postCategories } = attributes;
    let query = { per_page: numberOfPosts };
    if (postCategories) {
        query["categories"] = postCategories;
    }
    return {
        posts: select("core").getEntityRecords("postType", "post", query),
        categories: select("core").getEntityRecords("taxonomy", "category", {
            per_page: -1
        })
    };
})(LatestPostsEdit);
