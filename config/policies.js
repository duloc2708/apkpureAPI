module.exports.policies = {
  '*': ['isAuthorized'],
  'UsersController': {
    'register': true, // We dont need authorization here, allowing public access
    'login': true
  },
  'ArticlesController': {
    'autoAddArticles': true,
    'getPostBySection': true,
    'getPostDetail': true,
    'getFileAPK': true,
    'dataSiteMapListType': true,
    'dataSiteMapPost': true,
    'testData': true,
    'getImage': true,
    'getLink': true,
    'getDataPostBySearch': true,
    'updateView': true,
    'getDataPageService': true,
    'getLinkAPKManual': true,
    'insertData':true
  },
  'PageServiceController': {
    'getDataPageService': true,
    'getSearchDetail': true
  },
  'BlogsController': {
    'getDataBLogsUser': true
  },
  'VideoController': {
    'getVideoBySection': true
  }
  
};
