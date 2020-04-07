<?php

class VggGutenConst
{
    // файл для трансляции
    
    
    const SLUG_THEME_CATEGORY = 'mytheme-category';
    const NAMESPACE = 'mytheme-blocks';
    // const SLUG_THEME_CATEGORY = 'vgg-theme-category';
    // const NAMESPACE = 'vgg-lrn-blocks';

    // ********* Категории ************
    // Название категории блоков в реадкторе
    const CATEGORY_BLK_NAME = 'Блоки Гайрат';
    const CATEGORY_BLK_NAME_ICON = 'palmtree';

    // ******** название блоков **************
    const BLK_NAME_SECOND = "/secondblock";
    const BLK_NAME_RENDERBLK = "/renderblock";
    const BLK_NAME_TEAM_MEMBER = "/team-member";
    const BLK_NAME_TEAM_MEMBERS = "/team-members";
    const BLK_NAME_LATEST_POSTS = "/latest-posts";
    const BLK_NAME_TODO_LIST = "/todo-list";
    const BLK_NAME_TODO_LIST_META = "/todo-list-meta";
    const BLK_NAME_REDUX = "/redux";
    const BLK_NAME_TODO_LIST_COUNT = "/todo-list-count";
    const BLK_NAME_META = "/meta";

    // ******** метаполя ********
    // для типа todo :
    const  META_TODO_FLD1 = '_' . self::NAMESPACE . '_todo_list';
    // для post
    const META_POST_FLD1 = "_mytheme_blocks_post_subtitle";

    // ******** STORE ********
    const STORE_TODO_BASE = self::NAMESPACE . "/todobase";
}