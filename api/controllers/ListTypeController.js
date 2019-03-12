// var NAMES_OF_PETS_SQL = `
// SELECT pet.name
// FROM pet
// WHERE pet.species_label = $1 OR pet.species_label = $2`;

// // Send it to the database.
// var rawResult = await sails.sendNativeQuery(NAMES_OF_PETS_SQL, [ 'dog', 'cat' ]);

const { logErr } = sails.config.custom
const { resError, resSuccess, getToken } = sails.config.custom
module.exports = {
    'getDataListType': (req, res) => {
        ListType.getDatastore().sendNativeQuery('CALL listtype_getAllData', [], (err, data) => {
            if (err) return resError(res, err)
            resSuccess(res, '', data.rows[0])
        });
    },
    'addListType': (req, res) => {
        ListType.create(req.body).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },
    'updateListType': (req, res) => {
        ListType.update({ id: req.body.id }, req.body).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },
    'deleteListType': (req, res) => {
        let { id } = req.query        
        ListType.destroy({
            id: { in: [id] }
        }).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },

};

