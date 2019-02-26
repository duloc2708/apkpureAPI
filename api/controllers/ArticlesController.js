
const { resError, resSuccess, getToken, saveFileImage, saveFileBase64 } = sails.config.custom
var multer = require('multer');
var fs = require("fs")
let mkdirp = require('mkdirp');
let mime = require('mime');
let path = require("path")
const pathUploadImage = 'assets/images/'
module.exports = {
    'getFileAPK': (req, res) => {
        let { namefile, mineType } = req.query
        try {
            var file = 'game_down/' + `${namefile}${mineType}`;
            // res.setHeader('Content-disposition', 'attachment; filename=' + namefile);
            // res.setHeader('Content-type', 'application/vnd.android.package-archive');
            // var filestream = fs.createReadStream(file);
            // filestream.pipe(res);
            // filestream.on('end',function(){
            //     res.end()
            // })
            res.download(file);
            // var file = 'game_down/' + `${namefile}.apk`;
            // res.setHeader('Content-disposition', 'attachment; filename=' + namefile);
            // res.setHeader('Content-type', 'apk');
            // var filestream = fs.createReadStream(file);
            // filestream.pipe(res);
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'getDataArticles': (req, res) => {
        try {
            Articles.getDatastore().sendNativeQuery('CALL articles_getAllData', [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'getBlogDetail': (req, res) => {
        let { title_slug } = req.query
        try {
            Articles.getDatastore().sendNativeQuery(`CALL artcles_getBlogDetail('${title_slug}')`, [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'getBlogBySection': (req, res) => {
        let { type } = req.query
        try {
            Articles.getDatastore().sendNativeQuery(`CALL artcles_getBlogBySection('${type}')`, [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'autoAddArticles': (req, res) => {
        let { title, list_image, title_slug, id, tags, atr4, thumbnail } = req.body
        Articles.find({ title: title }).exec((err, usr) => {

            if (err) return resError(res, err)

            if (usr.length > 0) return resError(res, 'TITLE_EXISTS')

            let data = req.body
            let type = thumbnail.split('.').pop();
            let imageName = 'thumbnail_' + title_slug + '.' + type;
            data.thumbnail = imageName

            Articles.create(req.body).exec((errInsert, result) => {
                if (errInsert) {
                    resError(res, errInsert)
                }
                else {
                    resSuccess(res, '', [])
                }
            });
            //===========UPLOAD THUMBNAIL
            if (thumbnail) {
                console.log('autoAddArticles>>>>>>>',thumbnail);
                saveFileImage(thumbnail, imageName, pathUploadImage)
            }
        });
    },
    'addArticles': (req, res) => {
        try {
            let { title, list_image, title_slug, id, tags } = req.body
            //========TRƯỜNG HỢP THÊM MỚI
            if (!id) {
                Articles.find({ title: title }).exec((err, usr) => {
                    if (err) return resError(res, err)
                    if (usr.length > 0) return resError(res, 'TITLE_EXISTS')
                    Articles.create(req.body).exec((errInsert, result) => {
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
                Articles.update({ id: id }, req.body).exec((err, result) => {
                    if (err) return resError(res, errInsert)
                    resSuccess(res, '', [])
                });
            }

            //==============UPLOADS LIST IMAGE
            if (list_image.length > 0) {
                // Chuyen chuoi image thanh mang image va luu
                const converListImage = list_image
                const nameFile = title_slug
                converListImage.map((item, i) => {
                    let img = item;
                    if (img.includes('http')) {
                        let type = img.split('.').pop();
                        let imageName = nameFile + i + '.' + type;
                        saveFileImage(img, imageName, pathUploadImage)
                    }
                    else {
                        saveFileBase64(img, nameFile + i, pathUploadImage)
                    }
                })
            }
            //==============UPLOADS LIST IMAGE
        } catch (err) {
            resError(res, err.toString())
        }

    },
    'uploadAvatar': (req, res) => {
        try {
            const { image, filename } = req.body
            saveFileBase64(image, filename, pathUploadImage).then(response => {
                resSuccess(res, '', response)
            })
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'updateArticles': (req, res) => {
        res.ok({});
    },
    'deleteArticles': (req, res) => {
        try {
            Articles.destroy({
                id: { in: [req.query.id] }
            }).exec((err, result) => {
                if (err) return resError(res, err)
                resSuccess(res, '')
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },

};

