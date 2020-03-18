import { Component } from "@wordpress/element";
import {
    RichText,
    withColors
   
} from "@wordpress/editor";
// import VggGutenConst from "../../constants";

class Edit extends Component {
    onChangeContent = content => {
        this.props.setAttributes({ content });
    };    

    render() {
        //console.log(this.props);
        const {
            attributes
        } = this.props;
        const { content } = attributes;

        return (
            <>
               
                <RichText
                    tagName="p"
                    value={content}
                    onChange={this.onChangeContent}

                />
            </>
        );
    }
}

export default withColors("backgroundColor", { textColor: "color" })(Edit);
