module.exports = {
    LIST_API_LISTTYPE: [
        { api: 'get /api/listtype', action: 'getDataListType' },
        { api: 'post /api/listtype/add', action: 'addListType' },
        { api: 'post /api/listtype/update', action: 'updateListType' },
        { api: '/api/listtype/delete', action: 'deleteListType' }
    ],
    LIST_API_ARTICLES: [
        { api: 'get /api/post/get_data_by_search', action: 'getDataPostBySearch' },
        { api: 'get /api/post/get_post_detail', action: 'getPostDetail' },
        { api: 'get /api/post/getfileapk', action: 'getFileAPK' },
        { api: 'get /api/post/get_post_by_section', action: 'getPostBySection' },
        { api: 'get /api/post', action: 'getDataArticles' },
        { api: 'post /api/articles/auto', action: 'autoAddArticles' },
        { api: 'post /api/post/add', action: 'addArticles' },
        { api: 'post /api/post/update', action: 'updateArticles' },
        { api: '/api/post/delete', action: 'deleteArticles' },
        { api: 'post /api/post/upload_avatar', action: 'uploadAvatar' },
        { api: 'post /api/post/upload_slide', action: 'uploadSlide' },
        { api: '/api/post/sitemapListType', action: 'dataSiteMapListType' },
        { api: '/api/post/sitemapPost', action: 'dataSiteMapPost' },
        { api: '/api/post/testData', action: 'testData' },
        { api: '/api/image', action: 'getImage' },
        { api: '/api/getLink', action: 'getLink' },
        { api: 'post /api/post/update_view', action: 'updateView' },
        { api: 'get /api/post/get_link_apk', action: 'getLinkAPKManual' },
        { api: 'post /api/post/upload_list_slide', action: 'uploadListSlide' },
        { api: 'post /api/post/insert_data', action: 'insertData' },
        { api: 'post /api/post/update_slide', action: 'updateCheckSlide' }
    ],
    LIST_API_BLOGS: [
        { api: 'get /api/blogs/get_data_user', action: 'getDataBLogsUser' },
        { api: 'get /api/blogs/get_data_by_search', action: 'getDataBLogsBySearch' },
        { api: 'get /api/blogs/get_blog_detail', action: 'getBlogsDetail' },
        { api: 'get /api/blogs', action: 'getDataBlogs' },
        { api: 'post /api/blogs/add', action: 'addBlogs' },
        { api: 'post /api/blogs/update', action: 'updateBlogs' },
        { api: '/api/blogs/delete', action: 'deleteBlogs' },
        { api: '/api/blogs/image', action: 'getBlogsImage' },
        { api: 'post /api/blogs/update_view', action: 'updateBlogsView' },
        { api: 'post /api/blogs/get_list_game_recent', action: 'getListGameRecent' },
    ],
    LIST_API_USER: [
        { api: 'post /api/users/login', action: 'login' },
        { api: 'post /api/users/register', action: 'register' },
        { api: '/api/users/check', action: 'check' },
        { api: '/api/users', action: 'listUsers' },
        { api: 'post /api/users/add', action: 'addUsers' },
        { api: 'post /api/users/update', action: 'updateUsers' },
        { api: '/api/users/delete', action: 'deleteUsers' }
    ],
    LIST_API_VIDEO: [
        { api: 'get /api/video', action: 'getDataVideo' },
        { api: 'get /api/video/video_by_section', action: 'getVideoBySection' },
        { api: 'post /api/video/add', action: 'addVideo' },
        { api: 'post /api/video/update', action: 'updateVideo' },
        { api: '/api/video/delete', action: 'deleteVideo' },
        { api: 'get /api/video/get_video_detail', action: 'getVideoDetail' },

    ],
    LIST_API_PAGE_SERVICE: [
        { api: 'get /api/pageservice/get_service_detail', action: 'getSearchDetail' },
        { api: '/api/pageservice', action: 'getDataPageService' },
        { api: 'post /api/pageservice/add', action: 'addPageService' },
        { api: 'post /api/pageservice/update', action: 'updatePageService' },
        { api: '/api/pageservice/delete', action: 'deletePageService' }
    ],
}