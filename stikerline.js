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
  if (url.indexOf("theme") !== -1) {
    return url.split("/").filter((search) => search.indexOf("-") !== -1);
  }
  return url.replace(/[^0-9]/g, "");
}
/**
 * Mengatasi tidak dapat download file menggunakan href.
 * Dan ubah file untuk mencegah penamaan file yang sama
 * @param {String} url - URL Stiker/Tema
 * @param {String} filename - Nama file
 * @returns {Promise<String>} Mengembalikan nilai berupa raw html
 */
async function getFile() {
  document.getElementById("response").innerHTML = "<p>Processing...!</p>";
  try {
    const atr = document.getElementById("downloadFile");
    const baseURL = "https://apiorigins.herokuapp.com/file?url=" + encodeURIComponent(atr.getAttribute("data-src"));
    const resp = await fetch(baseURL);
    const errMsg = resp.headers.get("X-Custom-Response");
    if (resp.ok && !errMsg) {
      const createZip = "data:application/zip;base64," + (await resp.text());
      const createBuffer = await (await fetch(createZip)).arrayBuffer();
      const data = URL.createObjectURL(new Blob([createBuffer], { type: "application/zip" }));
      let downloadFilename = atr.getAttribute("data-filename") + "-" + Math.floor(Date.now() / 1000);
      const el = document.createElement("a");
      el.style.cssText = "display: none;";
      el.href = data;
      el.download = downloadFilename;
      document.body.appendChild(el);
      el.click();
      window.URL.revokeObjectURL(data);
      document.body.removeChild(el);
      el.remove();
      document.getElementById("response").innerHTML = "";
    } else {
      document.getElementById("response").innerHTML = errMsg || "<p>Tidak dapat menemukan id stiker/tema.</p>";
    }
  } catch {
    document.getElementById("response").innerHTML = "<p>Tidak dapat menemukan id stiker/tema.</p>";
  }
}
function download() {
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
    const createEl = `<a onclick="getFile()" data-src="${url}" data-filename="${str}" id="downloadFile" href="javascript:;">Download ${str}</a>`;
    document.getElementById("link_download").innerHTML = createEl;
  } else document.getElementById("response").innerHTML = "<p>Invalid Link</p>";
}
