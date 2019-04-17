// var NAMES_OF_PETS_SQL = `
// SELECT pet.name
// FROM pet
// WHERE pet.species_label = $1 OR pet.species_label = $2`;

// // Send it to the database.
// var rawResult = await sails.sendNativeQuery(NAMES_OF_PETS_SQL, [ 'dog', 'cat' ]);

const { logErr } = sails.config.custom
const { resError, resSuccess, getToken } = sails.config.custom
module.exports = {
    'getDataVideo': (req, res) => {
        Video.getDatastore().sendNativeQuery('CALL video_getAllData', [], (err, data) => {
            if (err) return resError(res, err)
            resSuccess(res, '', data.rows[0])
        });
    },
    'addVideo': (req, res) => {
        // Video.create(req.body).exec((err, result) => {
        //     if (err) return resError(res, err)
        //     resSuccess(res)
        // });
        let { title, id } = req.body
        //========TRƯỜNG HỢP THÊM MỚI
        if (!id) {
            Video.find({ title: title }).exec((err, usr) => {
                if (err) return resError(res, err)
                if (usr.length > 0) return resError(res, 'TITLE_EXISTS')
                Video.create(req.body).exec((errInsert, result) => {
                    if (errInsert) {
                        resError(res, errInsert)
                    }
                    else {
                        resSuccess(res, '', [])
                    }
                });
            });
            //======== TRƯỜNG HỢP CẬP NHẬT
        } else {
            Video.update({ id: id }, req.body).exec((err, result) => {
                if (err) return resError(res, err)
                resSuccess(res, '', [])
            });
        }
    },
    'updateVideo': (req, res) => {
        Video.update({ id: req.body.id }, req.body).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },
    'deleteVideo': (req, res) => {
        let { id } = req.query
        Video.destroy({
            id: { in: [id] }
        }).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },
    'getVideoBySection': (req, res) => {
        let { type } = req.query
        try {
            Video.getDatastore().sendNativeQuery(`CALL video_getVideoBySection('${type}')`, [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },

};

