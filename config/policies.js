module.exports.policies = {
  '*': ['isAuthorized'],
  'UsersController': {
    'register': true, // We dont need authorization here, allowing public access
    'login': true
  },
  'ArticlesController': {
    'autoAddArticles': true,
    'getBlogBySection': true,
    'getBlogDetail': true,
    'getFileAPK': true,
    'testData': true
  }
};
