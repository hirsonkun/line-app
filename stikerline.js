"use strict";
const link = [
  "http://dl.stickershop.line.naver.jp/products/0/0/1/ID/XX/stickersXXX.zip",
  "http://dl.stickershop.line.naver.jp/products/0/0/1/ID/XX/stickerpackXXX.zip",
  "http://dl.shop.line.naver.jp/themeshop/v1/products/ad/63/e5/ID/1/ANDROID/theme.zip",
];
/**
 * Ambil id stiker/tema dari URL yang diinputkan client
 * @param {String} url - URL stiker/tema
 * @returns {String} Mengembalikan nilai berupa ID stiker/tema
 */
function getIDStiker(url = "") {
  if (/:\/\//.test(url)) {
    url = url.split("://")[1];
  }
  if (url.indexOf("sticker") !== -1) {
    return url.replace(/[^0-9]/g, "");
  }
  return url.split("/").filter((search) => search.indexOf("-") !== -1);
}
/**
 * Mengatasi tidak dapat download file menggunakan href.
 * Dan ubah file untuk mencegah penamaan file yang sama
 * @param {String} url - URL Stiker/Tema
 * @param {String} filename - Nama file
 * @returns {Promise<String>} Mengembalikan nilai berupa raw html
 */
async function getFile(url = "", filename = "") {
  try {
    const baseURL = "https://apiorigins.herokuapp.com/file?url=" + encodeURIComponent(url);
    const resp = await fetch(baseURL);
    const blob = await resp.arrayBuffer();
    const data = URL.createObjectURL(new Blob([blob], { type: resp.headers.get("Content-Type") }));
    let downloadFilename = filename + "-" + Math.floor(Date.now() / 1000);
    return `<a href="${data}" download="${downloadFilename}">Download ${filename}</a>`;
  } catch (error) {
    return "<p>" + error.message + "</p>";
  }
}
async function download() {
  let url = document.getElementById("link_stiker").value,
    pil = document.getElementsByName("pil");
  url = getIDStiker(url);
  for (let i = 0, len = pil.length; i < len; i++) {
    if (pil[i].checked) {
      pil = pil[i].value;
      break;
    }
  }
  if (url) {
    let str = "Stiker";
    const regex = /XXX|ID|XX/g;
    switch (pil) {
      case "1": {
        url = link[0].replace(regex, function (s) {
          return s == "XX" ? "android" : s == "ID" ? url : "";
        });
        break;
      }
      case "2": {
        url = link[0].replace(regex, function (s) {
          return s == "XX" ? "iphone" : s == "ID" ? url : "@2x";
        });
        break;
      }
      case "3": {
        url = link[1].replace(regex, function (s) {
          return s == "XX" ? "android" : s == "ID" ? url : "";
        });
        break;
      }
      case "4": {
        url = link[1].replace(regex, function (s) {
          return s == "XX" ? "iphone" : s == "ID" ? url : "@2x";
        });
        break;
      }
      case "5": {
        url = link[2].replace(/ID/, url);
        str = "Tema";
        break;
      }
      default: {
        if (/-/.test(url)) {
          url = link[2].replace(/ID/, url);
          str = "Tema";
        } else {
          url = link[0].replace(regex, function (s) {
            return s == "XX" ? "android" : s == "ID" ? url : "";
          });
        }
        break;
      }
    }
    document.getElementById("link_download").innerHTML = await getFile(url, str);
  } else document.getElementById("link_download").innerHTML = "<p>Invalid Link</p>";
}
