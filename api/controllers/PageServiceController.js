const { resError, resSuccess, getToken } = sails.config.custom

module.exports = {
    'getSearchDetail': (req, res) => {
        let { routes } = req.query
        try {
            Articles.getDatastore().sendNativeQuery(`CALL pageservice_getServiceDetail('${routes}')`, [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'getDataPageService': (req, res) => {
        PageService.getDatastore().sendNativeQuery('CALL pageservice_getAllData', [], (err, data) => {
            if (err) return resError(res, err)
            resSuccess(res, '', data.rows[0])
        });
    },
    'addPageService': (req, res) => {
        PageService.create(req.body).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },
    'updatePageService': (req, res) => {
        let data = req.body
        PageService.update({ id: data.id }, data).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },
    'deletePageService': (req, res) => {
        let { id } = req.query
        PageService.destroy({
            id: { in: [id] }
        }).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },
};

