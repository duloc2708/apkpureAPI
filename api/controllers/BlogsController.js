
const { resError, resize, convertSlug, resSuccess, getToken, saveFileImage, saveFileBase64 } = sails.config.custom
var multer = require('multer');
var fs = require("fs")
let mkdirp = require('mkdirp');
let mime = require('mime');
let path = require("path")
const pathUploadImage = 'assets/images/'
var Jimp = require("jimp");
var request = require('request-promise');
let cheerio = require('cheerio');
var progress = require('request-progress');
var rpdetail = require('request-promise');

module.exports = {
    'updateBlogsView': (req, res) => {
        let { obj } = req.body
        try {
            Blogs.update({ id: obj.id }, obj).exec((err, result) => {
                resSuccess(res, '', [])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'getDataBlogsBySearch': (req, res) => {
        let { q } = req.query
        try {
            Blogs.getDatastore().sendNativeQuery(`CALL artcles_getDataBySearch('${q}')`, [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'getImage': (req, res) => {
        let { name, width, height } = req.query
        const widthStr = width
        const heightStr = height
        const format = 'jpeg'
        let widthTemp, heightTemp
        if (widthStr) {
            widthTemp = parseInt(widthStr)
        }
        if (heightStr) {
            heightTemp = parseInt(heightStr)
        }
        let pathImage = pathUploadImage + name
        res.setHeader("Cache-Control", "public, max-age=31536000");
        if (name) {
            if (fs.existsSync(pathImage)) {
                res.type(`image/${format || 'jpeg'}`)
                resize(pathImage, format, widthTemp, heightTemp).pipe(res)
            } else {
                res.type(`image/${format || 'jpeg'}`)
                resize(pathUploadImage + 'image-not-found.jpg', format, widthTemp, heightTemp).pipe(res)
            }
        } else {
            res.type(`image/${format || 'jpeg'}`)
            resize(pathUploadImage + 'image-not-found.jpg', format, widthTemp, heightTemp).pipe(res)
        }
    },
    'getDataBLogsUser': (req, res) => {
        try {
            Blogs.getDatastore().sendNativeQuery('CALL blogs_getDataBLogsUser', [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'getDataBlogs': (req, res) => {
        try {
            Blogs.getDatastore().sendNativeQuery('CALL blogs_getAllData', [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'getBlogsDetail': (req, res) => {
        let { title_slug } = req.query
        try {
            Blogs.getDatastore().sendNativeQuery(`CALL blogs_getBlogDetail('${title_slug}')`, [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'getListGameRecent': (req, res) => {
        let { gameother } = req.body
        let data = gameother.split(',')

        try {
            Articles.find({ title: data }).exec((err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data)
            })
        } catch (err) {
            resError(res, err.toString())
        }
    },
    
    'addBlogs': (req, res) => {
        try {
            let { title, list_image, title_slug, id, tags } = req.body
            //========TRƯỜNG HỢP THÊM MỚI
            if (!id) {
                Blogs.find({ title: title }).exec((err, usr) => {
                    if (err) return resError(res, err)
                    if (usr.length > 0) return resError(res, 'TITLE_EXISTS')
                    Blogs.create(req.body).exec((errInsert, result) => {
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
                Blogs.update({ id: id }, req.body).exec((err, result) => {
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

    'updateBlogs': (req, res) => {
        res.ok({});
    },
    'deleteBlogs': (req, res) => {
        try {
            Blogs.destroy({
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

