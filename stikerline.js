const link = ['http://dl.stickershop.line.naver.jp/products/0/0/1/ID/XX/stickersXXX.zip',
    'http://dl.stickershop.line.naver.jp/products/0/0/1/ID/XX/stickerpackXXX.zip',
    'http://dl.shop.line.naver.jp/themeshop/v1/products/ad/63/e5/ID/1/ANDROID/theme.zip']
function download() {
    "use strict"
    let url = document.getElementById("link_stiker").value, pil = document.getElementsByName('pil')
    url = /-/.test(url) ? url : parseInt(url?.replace(/\D/g, ''))
    for (let i = 0, len = pil.length; i < len; i++) {
        if (pil[i].checked) {
            pil = pil[i].value
            break;
        }
    }
    if (url) {
        let str = "Stiker"
        switch (pil) {
            case '1': {
                url = link[0].replace(/XXX|ID|XX/g, function (s) {
                    return s == "XX" ? "android" : s == "ID" ? url : ""
                })
                break;
            }
            case '2': {
                url = link[0].replace(/XXX|ID|XX/g, function (s) {
                    return s == "XX" ? "iphone" : s == "ID" ? url : "@2x"
                })
                break;
            }
            case '3': {
                url = link[1].replace(/XXX|ID|XX/g, function (s) {
                    return s == "XX" ? "android" : s == "ID" ? url : ""
                })
                break;
            }
            case '4': {
                url = link[1].replace(/XXX|ID|XX/g, function (s) {
                    return s == "XX" ? "iphone" : s == "ID" ? url : "@2x"
                })
                break;
            }
            case '5': {
                url = document.getElementById("link_stiker").value
                url = url.split('product/')[1]
                url = url?.split('/')[0]
                if (url) url = link[2].replace(/ID/, url)
                str = "Tema"
                break;
            }
            default: {
                url = document.getElementById("link_stiker").value
                url = url.split('product/')
                url = url[1] ? url[1].split('/')[0] : url[0]
                if (/-/.test(url)) {
                    url = link[2].replace(/ID/, url)
                    str = "Tema"
                } else url = link[0].replace(/XXX|ID|XX/g, function (s) {
                    return s == "XX" ? "android" : s == "ID" ? url : ""
                })
                break;
            }
        }
        document.getElementById('link_download').innerHTML = `<a href="${url}" target="_blank">Download ${str}</a>`
    } else document.getElementById('link_download').innerHTML = "<p>Invalid Link</p>"
}
