async function onGetVideos() {
    document.getElementById('link_download').innerHTML = "<p>Processing....</p>"
    try {
        const url = document.getElementById("urlVideos").value;
        const html = (await (await fetch(url, { mode: 'no-cors' })).text());

        const splitHTML = html.split('background-image:url(');
        splitHTML.shift();
        const hasil = splitHTML.map((e) => {
            `<iframe width="300" height="300" src="${e.split('/L')[0]}"></iframe>`
        }).join(' ')
        document.getElementById('link_download').innerHTML = hasil
    } catch (error) {
        document.getElementById('link_download').innerHTML = `<p>Error : ${error.message}</p>`;
    }
}
