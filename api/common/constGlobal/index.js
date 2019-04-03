module.exports = {
    LIST_API_LISTTYPE: [
        { api: 'get /api/listtype', action: 'getDataListType' },
        { api: 'post /api/listtype/add', action: 'addListType' },
        { api: 'post /api/listtype/update', action: 'updateListType' },
        { api: '/api/listtype/delete', action: 'deleteListType' }
    ],
    LIST_API_ARTICLES: [
        { api: 'get /api/articles/get_data_by_search', action: 'getDataBySearch' },
        { api: 'get /api/articles/get_blog_detail', action: 'getBlogDetail' },
        { api: 'get /api/articles/getfileapk', action: 'getFileAPK' },
        { api: 'get /api/articles/get_blog_by_section', action: 'getBlogBySection' },
        { api: 'get /api/articles', action: 'getDataArticles' },
        { api: 'post /api/articles/auto', action: 'autoAddArticles' },
        { api: 'post /api/articles/add', action: 'addArticles' },
        { api: 'post /api/articles/update', action: 'updateArticles' },
        { api: '/api/articles/delete', action: 'deleteArticles' },
        { api: 'post /api/articles/upload_avatar', action: 'uploadAvatar' },
        { api: '/api/articles/sitemapListType', action: 'dataSiteMapListType' },
        { api: '/api/articles/sitemapPost', action: 'dataSiteMapPost' },
        { api: '/api/articles/testData', action: 'testData' },
        { api: '/api/image', action: 'getImage' },
        { api: '/api/getLink', action: 'getLink' },
        { api: 'post /api/articles/update_view', action: 'updateView' },
        { api: 'get /api/articles/get_link_apk', action: 'getLinkAPKManual' },
        { api: 'post /api/articles/upload_list_slide', action: 'uploadListSlide' }

        
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
        { api: 'post /api/video/add', action: 'addVideo' },
        { api: 'post /api/video/update', action: 'updateVideo' },
        { api: '/api/video/delete', action: 'deleteVideo' }
    ],
    LIST_API_PAGE_SERVICE: [
        { api: 'get /api/pageservice/get_service_detail', action: 'getSearchDetail' },
        { api: '/api/pageservice', action: 'getDataPageService' },
        { api: 'post /api/pageservice/add', action: 'addPageService' },
        { api: 'post /api/pageservice/update', action: 'updatePageService' },
        { api: '/api/pageservice/delete', action: 'deletePageService' }
    ],
}