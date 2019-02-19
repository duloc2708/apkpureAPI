module.exports = {
    LIST_API_LISTTYPE: [
        { api: 'get /api/listtype', action: 'getDataListType' },
        { api: 'post /api/listtype/add', action: 'addListType' },
        { api: 'post /api/listtype/update', action: 'updateListType' },
        { api: '/api/listtype/delete', action: 'deleteListType' }
    ],
    LIST_API_ARTICLES: [
        { api: 'get /api/articles/getfileapk', action: 'getFileAPK' },
        { api: 'get /api/articles', action: 'getDataArticles' },
        { api: 'post /api/articles/auto', action: 'autoAddArticles' },
        { api: 'post /api/articles/add', action: 'addArticles' },
        { api: 'post /api/articles/update', action: 'updateArticles' },
        { api: '/api/articles/delete', action: 'deleteArticles' },
        { api: 'post /api/articles/upload_avatar', action: 'uploadAvatar' }
    ],
    LIST_API_USER: [
        { api: 'post /api/users/login', action: 'login' },
        { api: 'post /api/users/register', action: 'register' },
        { api: '/api/users/check', action: 'check' }
    ],
    LIST_API_VIDEO: [
        { api: 'get /api/video', action: 'getDataVideo' },
        { api: 'post /api/video/add', action: 'addVideo' },
        { api: 'post /api/video/update', action: 'updateVideo' },
        { api: '/api/video/delete', action: 'deleteVideo' }
    ],
}