async function onGetVideos() {
    document.getElementById('link_download').innerHTML = "<p>Processing....</p>"
    try {
        const url = "https://api.allorigins.win/raw?url=" + document.getElementById("urlVideos").value;
        const html = (await (await fetch(url)).text());
        const splitHTML = html.split('background-image:url(');
        splitHTML.shift();
        const hasil = splitHTML.map((e) => e = `<video width="320" height="240" controls><source src="${e.split('/L')[0]}" type="video/mp4"></video>`).join(' ').trim();
        document.getElementById('link_download').innerHTML = hasil || '<p>Invalid Link!</>';
    } catch (error) {
        document.getElementById('link_download').innerHTML = `<p>Error : ${error.message}</p>`;
    }
}
