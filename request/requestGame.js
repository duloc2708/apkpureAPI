let cheerio = require('cheerio');
var rp = require('request-promise');
var rpdetail = require('request-promise');
let lstArticles = [];
var fs = require('fs');
var progress = require('request-progress');
var request = require('request');
const { convertSlug } = require('./func');

var options = {
  uri: 'https://apkpure.com/',
  transform: function (body) {
    // console.log('body', body)
    return cheerio.load(body);
  }
};
exports.Data = function () {
  rp(options)
    .then(function (result) {
      lstArticles = [];
      var $ = result;
      var content_long = "";
      $('.index_banner .bd li').each(function (i, elm) {
        var title = $(elm).find('a').attr('title');
        var img_large = $(elm).find('img').attr('src');
        var href = 'https://apkpure.com' + $(elm).find('a').attr('href');
        var optionsDetail = {
          uri: href,
          transform: function (body) {
            return cheerio.load(body);
          }
        };
        rpdetail(optionsDetail)
          .then(function (resultdt) {
            let $detail = resultdt;
            content_long = $detail('.describe').html();
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

            // lstArticles.push({
            //   list_image: list_arr,
            //   title: title,
            //   image: avatar,
            //   image_large: img_large,
            //   type: category,
            //   type_code: category,
            //   group: 'slide',
            //   app_game: 'game',
            //   content_short: title,
            //   content_long: content_long,
            //   version: version.trim(),
            //   device: 'Android',
            //   average_rating: average_rating,
            //   average_best: average_best,
            //   developer: developer.trim(),
            //   link_down: 'https://apkpure.com' + link_down,
            //   category: category,
            //   category_name: category_name
            // });
            console.log('convertSlug(title)>', convertSlug(title));

            let options2 = {
              url: 'http://localhost:1337/api/articles/auto',
              json: true,
              body: {
                "title": title,
                "title_slug": convertSlug(title),
                "thumbnail": img_large,
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
                "atr2": convertSlug(title)
              },
              resolveWithFullResponse: true,
              gzip: true,
              transform: function (body, response) {
                if (response.headers['content-type'] === 'application/json') {
                  response.body = JSON.parse(body);
                }
                return response;
              }
            }
            rpdetail.post(options2)
              .then(function (rs) {
                console.log('INSERT THÀNH CÔNG', rs.body);
                //---------- TẢI FILE GAME ----------------

                let fileGame = title.replace(/\s/g, "_");
                fileGame = fileGame.trim()
                const pathDown = 'game_down/' + convertSlug(title) + '.apk'
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
                    rpdetail(optionsDown)
                      .then(function (result2) {
                        let $detail2 = result2;
                        let hrefDown = $detail2('#download_link').attr('href');
                        console.log('LINK DOWN', hrefDown)
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
                // //  ----------------------END tải game

              })


          })
          .catch(function (err) {
            console.log('LỖI INSERT DATA ', err.toString());
          });

      });

    })
    .catch(function (err) {
    });
  return lstArticles;
};