module.exports.policies = {
  '*': ['isAuthorized'],
  'UsersController': {
    'register': true, // We dont need authorization here, allowing public access
    'login': true,
    'autoAddArticles': true
  },
  'ArticlesController': {
    'autoAddArticles': true
  }
};
