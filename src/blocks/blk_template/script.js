import "./style.scss";
import $ from "jquery";
// const $ = jQuery;

// script.js загружается на клиентской части . В нашем случае грузятся только стили

$(document).on("click", ".wp-block-vgg-lrn-blocks-renderblock", () => {
    alert("renderblock");
});
