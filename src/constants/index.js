class VggGutenConst {
    
    
    static NAMESPACE = 'mytheme-blocks';
    static SLUG_THEME_CATEGORY = 'mytheme-category';
    
    // static NAMESPACE = 'vgg-lrn-blocks';
    // static SLUG_THEME_CATEGORY = 'vgg-theme-category';

    
    static BLK_NAME_SECOND = "/secondblock";
    static BLK_NAME_RENDERBLK = "/renderblock";
    static BLK_NAME_TEAM_MEMBER = "/team-member";
    static BLK_NAME_TEAM_MEMBERS = "/team-members";
    static BLK_NAME_LATEST_POSTS = "/latest-posts";
    static BLK_NAME_TODO_LIST = "/todo-list";
    static BLK_NAME_TODO_LIST_META = "/todo-list-meta";
    static BLK_NAME_REDUX = "/redux";
    static BLK_NAME_TODO_LIST_COUNT = "/todo-list-count";
    static BLK_NAME_META = "/meta";


    // ******** метаполя ********
    // для типа todo :
    static META_TODO_FLD1 = '_' + VggGutenConst.NAMESPACE + '_todo_list';
    // для post
    static META_POST_FLD1 = "_mytheme_blocks_post_subtitle";

    // ******** STORE ********
    static STORE_TODO_BASE = VggGutenConst.NAMESPACE + "/todobase";

}

export default VggGutenConst;