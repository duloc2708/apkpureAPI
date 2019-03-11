
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
    // 'testData': (req, res) => {
    //     try {
    //         console.log('testData>>>>>>>>>>>>');
    //         let cheerio = require('cheerio');
    //         Articles.find({ where: { atr: '' } }, (err, data) => {
    //             console.log('err>>>>>>>>>>>>', err);

    //             // console.log('data>>>>>>>>>>>>', data);

    //             data.map((item) => {
    //                 let itemTemp = item
    //                 let content = '<div id="main">' + itemTemp.content_long + '</div>';
    //                 let $ = cheerio.load(content);
    //                 var listimg = '';
    //                 $("#main").find('.mpopup img').map(function () {
    //                     let imgItem = $(this).attr('src');
    //                     listimg = listimg + imgItem + ','
    //                 })
    //                 if (listimg) {
    //                     listimg = listimg.substr(0, listimg.length - 1)
    //                 }
    //                 // console.log('listimg>>>>>>',listimg);
    //                 let des = $("#main").find('#describe').html()
    //                 itemTemp.content_long = des
    //                 itemTemp.atr7 = listimg
    //                 var string = JSON.stringify(itemTemp);
    //                 var json = JSON.parse(string);
    //                 console.log('json>>>>>>', json);

    //                 Articles.update({ id: json.id }, json).exec((err, result) => {
    //                     console.log('err', err);
    //                     console.log('thành công', itemTemp.id);

    //                 });
    //             });
    //         })
    //         resSuccess(res, '', [])
    //     } catch (err) {
    //         resError(res, err.toString())
    //     }
    // },
    'testData': (req, res) => {
        try {
            console.log('testData>>>>>>>>>>>>');
            let cheerio = require('cheerio');
            Articles.find({ where: { atr8: '' } }, (err, data) => {
                console.log('err>>>>>>>>>>>>', err);

                // console.log('data>>>>>>>>>>>>', data);

                data.map((item) => {
                    let itemTemp = item
                    // let content = '<div id="main">' + itemTemp.content_long + '</div>';
                    // let $ = cheerio.load(content);
                    // var listimg = '';
                    // $("#main").find('.mpopup img').map(function () {
                    //     let imgItem = $(this).attr('src');
                    //     listimg = listimg + imgItem + ','
                    // })
                    // if (listimg) {
                    //     listimg = listimg.substr(0, listimg.length - 1)
                    // }
                    // // console.log('listimg>>>>>>',listimg);
                    // let des = $("#main").find('#describe').html()
                    // itemTemp.content_long = des
                    // itemTemp.atr7 = listimg
                    var string = JSON.stringify(itemTemp);
                    var json = JSON.parse(string);
                    let arrData = itemTemp.atr7.split(',')
                    let listSlide = []
                    var listimg = '';
                    var imgFirts = '';
                    if (arrData.length > 0) {
                        arrData.map((itemImg, i) => {
                            var str = itemImg
                            var dotIndex = str.lastIndexOf('.');
                            var ext = str.substring(dotIndex);

                            let filenameData = (itemTemp.title_slug) + '-screen-' + i + ext

                            listimg = listimg + filenameData + ','
                            listSlide.push({
                                url: str,
                                filename: filenameData
                            })
                            if (i == 0) {
                                imgFirts = filenameData
                            }
                        })
                    }
                    if (listimg) {
                        listimg = listimg.substr(0, listimg.length - 1)
                    }
                    console.log('listimg', listimg);

                    // if (listSlide.length > 0) {
                    //     listSlide.map(item => {
                    //         saveFileImage(item.url, item.filename, pathUploadImage)
                    //         console.log('listSlide thành công>>>>>>', item.url);

                    //     })
                    // }
                    json.atr4 = imgFirts
                    json.atr7 = listimg

                    Articles.update({ id: json.id }, json).exec((err, result) => {
                        console.log('thành công', json.id, json.atr4);
                    });

                });
            })
            resSuccess(res, '', [])
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'dataSiteMapPost': (req, res) => {
        try {
            Articles.getDatastore().sendNativeQuery('CALL articles_getAllSiteMap', [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'dataSiteMapListType': (req, res) => {
        try {
            Articles.getDatastore().sendNativeQuery('CALL listtype_getAllData', [], (err, data) => {
                if (err) return resError(res, err)
                resSuccess(res, '', data.rows[0])
            });
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
        let { title, list_image, title_slug, id, tags, atr4, thumbnail, listSlide } = req.body

        Articles.find({ title: title }).exec((err, usr) => {
            if (err) return resError(res, err)
            if (usr.length > 0) return resError(res, 'TITLE_EXISTS')

            let data = req.body
            let type = thumbnail.split('.').pop();
            let imageName = 'thumbnail_' + title_slug + '.' + type;

            let typeSlide = atr4.split('.').pop();
            let imageSlide = 'imageSlide_' + title_slug + '.' + typeSlide;

            data.thumbnail = imageName
            data.atr4 = imageSlide

            Articles.create(data).exec((errInsert, result) => {
                if (errInsert) {
                    resError(res, errInsert)
                }
                else {
                    //===========UPLOAD THUMBNAIL
                    if (thumbnail) {
                        saveFileImage(thumbnail, imageName, pathUploadImage)
                    }
                    if (atr4) {
                        saveFileImage(atr4, imageSlide, pathUploadImage)
                    }
                    if (listSlide.length > 0) {
                        listSlide.map(item => {
                            saveFileImage(item.url, item.filename, pathUploadImage)
                        })
                    }
                    resSuccess(res, '', [])
                }
            });
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

