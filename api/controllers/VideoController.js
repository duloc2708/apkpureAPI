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
        Video.create(req.body).exec((err, result) => {
            if (err) return resError(res, err)
            resSuccess(res)
        });
    },
    'updateVideo': (req, res) => {
        Video.update({ id: 1 }, req.body).exec((err, result) => {
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

};

