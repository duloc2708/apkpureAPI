
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
module.exports = {
    'getLink': (req, res) => {
        let { url } = req.body

        if (url.indexOf('play.google') != -1) {
            var optionsDetail = {
                uri: url,
                transform: function (body) {
                    return cheerio.load(body);
                }
            };
            request(optionsDetail)
                .then(function (resultdt) {
                    let $detail = resultdt;
                    let htmlAll = $detail('.T4LgNb').html();
                    let img_large = $detail('.LXrl4c').find('img:nth-child(1)').attr('src')
                    let thumbnail = img_large
                    let avatar = img_large
                    let title = $detail('.AHFaub').find('span').text()
                    let category = $detail('.i4sPve').find('span:nth-child(2) a').text()
                    let content_long = $detail('.W4P4ne').html();
                    let mineType = '.apk'

                    let testImage = $detail('.LXrl4c').find('img:nth-child(1)').attr('src')
                    console.log('testImage', testImage);
                    // get list slide image 
                    var listimg = '';
                    var listSlide = []
                    let ii = 0
                    $detail(".T4LgNb button").find('img').map(function () {
                        var imgItem = $detail(this).attr('data-src');
                        if (imgItem && imgItem.indexOf('http') != -1) {
                            ii = ii + 1
                            var str = imgItem
                            var dotIndex = str.lastIndexOf('.');
                            var ext = str.substring(dotIndex);
                            let filenameData = convertSlug(title) + '-' + ii + '.jpeg'
                            listSlide.push({
                                url: imgItem,
                                filename: filenameData
                            })

                            listimg = listimg + filenameData + ','
                        }
                    }).get();

                    if (listimg) {
                        listimg = listimg.substr(0, listimg.length - 1)
                    }
                    let code_type = ''
                    $detail('.T4LgNb').find('a[itemprop="genre"]').each(function () {
                        var url = $detail(this).attr('href');
                        code_type = url && (url.split('/').pop()).toLowerCase() || '';
                    });
                    content_long = content_long.replace(/<a [^>]+>[^<]*<\/a>/, '');
                    content_long = content_long.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                    let data = {
                        "title": title,
                        "title_slug": convertSlug(title),
                        "thumbnail": avatar,
                        "type": code_type,
                        "tags": convertSlug(title),
                        "view": "0",
                        "content_short": title,
                        "content_long": content_long,
                        "source": "test",
                        "status": "active",
                        "created_by": "admin",
                        "numWord": "0",
                        "numChar": "0",
                        "levels": "0",
                        "atr1": 'https://apkpure.com' + '',
                        "atr2": convertSlug(title),
                        "atr3": mineType,
                        "atr4": img_large,
                        "atr5": '',
                        "atr6": '',
                        'atr7': listimg,
                        "listSlide": listSlidem,
                        "atr8": title,
                        "atr9": title
                    }
                    let options2 = {
                        // url: ' http://localhost:1337/api/articles/auto',
                        url: 'http://api.apksafety.com/api/articles/auto',
                        json: true,
                        body: data,
                        resolveWithFullResponse: true,
                        gzip: true,
                        transform: function (body, response) {
                            if (response.headers['content-type'] === 'application/json') {
                                response.body = JSON.parse(body);
                            }
                            return response;
                        }
                    }

                    request.post(options2)
                        .then(function (rs) {
                            resSuccess(res, '', [data])
                        })

                })
        }
        if (url.indexOf('apkpure') != -1) {
            var optionsDetail = {
                uri: url,
                transform: function (body) {
                    return cheerio.load(body);
                }
            };
            request(optionsDetail)
                .then(function (resultdt) {
                    let $detail = resultdt;
                    var content_long = $detail('#describe').html();
                    var title = $detail('.title-like').find('h1').text();
                    var img_large = $detail('.icon').find('img').attr('src');;
                    // var content = $detail('.js-content-entity-body p').first().text();
                    var avatar = $detail('.icon').find('img').attr('src');
                    var version = '';
                    var version1 = $detail('.details-sdk').find('span').text();
                    var version2 = $detail('.version-ul').find('li:nth-child(2) p:nth-child(2)').text();
                    if (version1) {
                        version = version1;
                    } else {
                        version = version2;
                    };
                    var average_rating = $detail('.average').text();
                    var average_best = $detail('.best').text();
                    var developer = '';
                    var developer1 = $detail('.details-author').text();
                    var developer2 = $detail('.version-ul').find('li:nth-child(1) p:nth-child(2)').text();
                    if (developer1) {
                        developer = developer1;
                    } else {
                        developer = developer2;
                    };
                    var link_down = $detail('.ny-down').find('a').attr('href');
                    var category = $detail('.additional').find('li:nth-child(1) p:nth-child(2) a').attr('href');
                    var category_name = $detail('.additional').find('li:nth-child(1) p:nth-child(2) a span:nth-child(2)').text();

                    if (category) {
                        category = category.substring(1, category.length)
                    }

                    let list_arr = '';
                    $detail(".describe").find('img').map(function () {
                        let check = $detail(this).attr('src');
                        if (check) {
                            list_arr = list_arr + check + ','
                        }
                    }).get();

                    let mineType = ''
                    if ($detail('.ny-down').text().trim().indexOf('XAPK') != -1) {
                        mineType = '.xapk'
                    } else {
                        mineType = '.apk'
                    }


                    // console.log('testdata', testdata);

                    // get list slide image 
                    var listimg = '';
                    var listSlide = []
                    $detail('.mpopup').each(function () {
                        var imgItem = $detail(this).find('img').attr('src');
                        var str = imgItem
                        var dotIndex = str.lastIndexOf('.');
                        var ext = str.substring(dotIndex);
                        let filenameData = convertSlug(title) + '-' + imgItem.split("/").pop().split(".")[0] + ext
                        listSlide.push({
                            url: imgItem,
                            filename: filenameData
                        })

                        listimg = listimg + filenameData + ','
                    });

                    if (listimg) {
                        listimg = listimg.substr(0, listimg.length - 1)
                    }
                    let fsize = $detail('.fsize').eq(0).text();
                    if (fsize) {
                        fsize = fsize.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');

                    }
                    content_long = content_long.replace(/<a [^>]+>[^<]*<\/a>/, '');
                    content_long = content_long.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                    let data = {
                        "title": title,
                        "title_slug": convertSlug(title),
                        "thumbnail": avatar,
                        "type": category,
                        "tags": category,
                        "view": "0",
                        "content_short": title,
                        "content_long": content_long,
                        "source": "test",
                        "status": "active",
                        "created_by": "admin",
                        "numWord": "0",
                        "numChar": "0",
                        "levels": "0",
                        "atr1": 'https://apkpure.com' + link_down,
                        "atr2": convertSlug(title),
                        "atr3": mineType,
                        "atr4": img_large,
                        "atr5": fsize || '',
                        "atr6": version || '',
                        'atr7': listimg,
                        "listSlide": listSlide,
                        "atr8": title,
                        "atr9": title
                    }

                    let options2 = {
                        // url: 'http://api.apksafety.com/api/articles/auto',
                        url: ' http://localhost:1337/api/articles/auto',
                        json: true,
                        body: data,
                        resolveWithFullResponse: true,
                        gzip: true,
                        transform: function (body, response) {
                            if (response.headers['content-type'] === 'application/json') {
                                response.body = JSON.parse(body);
                            }
                            return response;
                        }
                    }
                    request.post(options2)
                        .then(function (rs) {
                            // console.log('INSERT THÀNH CÔNG', rs.body);
                            //---------- TẢI FILE GAME ----------------

                            let fileGame = title.replace(/\s/g, "_");
                            fileGame = fileGame.trim()
                            const pathDown = 'game_down/' + convertSlug(title) + mineType
                            // kiểm tra tồn tại file
                            fs.access(pathDown, fs.F_OK, (errFile) => {
                                if (errFile) {
                                    let optionsDown = {
                                        uri: 'https://apkpure.com' + link_down,
                                        transform: function (dataLink) {
                                            return cheerio.load(dataLink);
                                        }
                                    };
                                    console.log('BẮT ĐẦU TẢI', pathDown)
                                    request(optionsDown)
                                        .then(function (result2) {
                                            let $detail2 = result2;
                                            let hrefDown = $detail2('#download_link').attr('href');
                                            var pre = '----';
                                            const downloadManager = function (url, filename) {
                                                progress(request(url), {
                                                    throttle: 500
                                                }).on('progress', function (state) {
                                                    process.stdout.write(pre + '' + (Math.round(state.percent * 100)) + "%");
                                                })
                                                    .on('error', function (err) {
                                                        console.log('error :( ' + err);
                                                    })
                                                    .on('end', function () {
                                                        console.log(pre + '100% \n Download Completed');
                                                    })
                                                    .pipe(fs.createWriteStream(filename));
                                            };
                                            downloadManager(hrefDown, pathDown);
                                        })
                                    return
                                }
                                //file exists
                            })
                            resSuccess(res, '', [data])
                        })

                })
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
        res.setHeader("Cache-Control", "public, max-age=31536000, no Etag, no Last-Modified");
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
    'getImageTest': (req, res) => {
        let { name, width, height } = req.query
        let fileExt = `image/png`;
        let w = parseInt(width)
        let h = parseInt(height)
        let pathWidth = width + '-' + height
        let folCreate = ''
        if (pathWidth == '75-50') {
            folCreate = 'thumb_mini'
        }
        if (pathWidth == '255-135') {
            folCreate = 'slide'
        }
        if (pathWidth == '500-300') {
            folCreate = '500-300'
        }
        if (!fs.existsSync(pathUploadImage + folCreate)) {
            fs.mkdirSync(pathUploadImage + folCreate);
        }

        let filename = name.split('\\').pop().split('/').pop();
        filename = filename.substring(0, filename.lastIndexOf('.'));
        try {
            Jimp.read(pathUploadImage + name, function (err, lenna) {
                if (err) {
                    Jimp.read(pathUploadImage + 'image-not-found.jpg', function (err2, lenna2) {
                        lenna2.resize(w, h).quality(100).getBuffer(`image/${'png'}`, function (err3, buffer) {
                            res.set("Content-Type", `image/${'png'}`);
                            res.send(buffer);
                        });
                    })
                } else {
                    if (lenna) {

                        lenna.resize(w, h)
                            .quality(100)
                            .write(pathUploadImage + folCreate + '/' + filename + '.jpeg'); // save

                        lenna.resize(w, h).quality(100).getBuffer(Jimp.MIME_JPEG, function (err, buffer) {
                            res.set("Content-Type", Jimp.MIME_JPEG);
                            res.send(buffer);
                        });
                    } else {
                        Jimp.read(pathUploadImage + 'image-not-found.jpg', function (err2, lenna2) {
                            lenna2.resize(w, h).quality(100).getBuffer(`image/${'png'}`, function (err3, buffer) {
                                res.set("Content-Type", `image/${'png'}`);
                                res.send(buffer);
                            });
                        })
                    }

                }
            });
        } catch (err) {
            resError(res, err.toString())
        }

        // resSuccess(res, '', [])
    },
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
            resSuccess(res, '', [])
        } catch (err) {
            resError(res, err.toString())
        }
    },
    'testData': (req, res) => {
        //try {
        //     let cheerio = require('cheerio');
        //     Articles.find({ where: { atr10: '' } }, (err, data) => {
        //         data.map(item => {
        //             let options2 = {
        //                 url: 'http://api.apksafety.com/api/articles/auto',
        //                 json: true,
        //                 body: item,
        //                 resolveWithFullResponse: true,
        //                 gzip: true,
        //                 transform: function (body, response) {
        //                     if (response.headers['content-type'] === 'application/json') {
        //                         response.body = JSON.parse(body);
        //                     }
        //                     return response;
        //                 }
        //             }
        //             request.post(options2)
        //                 .then(function (rs) {
        //                     console.log('rs>>>>>>>>>>>>', rs.body);

        //                 })
        //         })

        //         // Articles.create(data).exec((errInsert, result) => {
        //         //     console.log('errInsert',errInsert);

        //         // })
        //         // // console.log('data>>>>>>>>>>>>', data);


        //     })
        //     resSuccess(res, '', [])
        // } catch (err) {
        //     resError(res, err.toString())
        // }


        try {
            let cheerio = require('cheerio');
            Articles.find({ where: { atr10: '' } }, (err, data) => {

                data.map((item) => {
                    let itemTemp = item
                    let content = itemTemp.content_long

                    content = content.replace(/<a [^>]+>[^<]*<\/a>/, '');
                    content = content.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                    itemTemp.content_long = content

                    var string = JSON.stringify(itemTemp);
                    var json = JSON.parse(string);
                    Articles.update({ id: json.id }, json).exec((err, result) => {
                        console.log('thành công', json.id);
                    });
                    // let $ = cheerio.load(cntent);
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
                    // var string = JSON.stringify(itemTemp);
                    // var json = JSON.parse(string);
                    // let arrData = itemTemp.atr7.split(',')
                    // let listSlide = []
                    // var listimg = '';
                    // var imgFirts = '';
                    // if (arrData.length > 0) {
                    //     arrData.map((itemImg, i) => {
                    //         var str = itemImg
                    //         var dotIndex = str.lastIndexOf('.');
                    //         var ext = str.substring(dotIndex);

                    //         let filenameData = (itemTemp.title_slug) + '-screen-' + i + ext

                    //         listimg = listimg + filenameData + ','
                    //         listSlide.push({
                    //             url: str,
                    //             filename: filenameData
                    //         })
                    //         if (i == 0) {
                    //             imgFirts = filenameData
                    //         }
                    //     })
                    // }
                    // if (listimg) {
                    //     listimg = listimg.substr(0, listimg.length - 1)
                    // }
                    // console.log('listimg', listimg);

                    // // if (listSlide.length > 0) {
                    // //     listSlide.map(item => {
                    // //         saveFileImage(item.url, item.filename, pathUploadImage)
                    // //         console.log('listSlide thành công>>>>>>', item.url);

                    // //     })
                    // // }
                    // json.atr4 = imgFirts
                    // json.atr7 = listimg

                    // Articles.update({ id: json.id }, json).exec((err, result) => {
                    //     console.log('thành công', json.id, json.atr4);
                    // });

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
        let { title, list_image, title_slug, id, tags, atr4, thumbnail, listSlide, type } = req.body

        Articles.find({ title: title }).exec((err, usr) => {
            if (err) return resError(res, err)
            if (usr.length > 0) return resError(res, 'TITLE_EXISTS')

            let data = req.body
            let typeImg = thumbnail.split('.').pop();
            if (thumbnail.indexOf('lh3.googleusercontent.com') != -1) {
                typeImg = 'jpeg'
            }
            let imageName = 'thumbnail_' + title_slug + '.' + (typeImg || 'jpeg');

            let typeSlide = atr4.split('.').pop();
            if (atr4.indexOf('lh3.googleusercontent.com') != -1) {
                typeSlide = 'jpeg'
            }
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
                        console.log('thumbnail', thumbnail);
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

                    ListType.find({ code: type }).exec((err, usrType) => {
                        if (usrType.length == 0) {
                            let objData = {
                                code: type,
                                name: type,
                                slug: type,
                                numOrder: 0
                            }
                            ListType.create(objData).exec((err, result) => {
                            });
                        }
                    })

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

