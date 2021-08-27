async function onGetTimeline() {
    "use strict";
    document.getElementById('link_download').innerHTML = "<p>Processing....</p>";
    try {
        //const url = "https://api.allorigins.win/raw?url=" + encodeURIComponent(document.getElementById("urlTimeline").value);
        const enableCors = {
			mode: "cors",
			referrerPolicy: 'no-referrer',
			headers: {
				'Content-Type': 'text/html',
				'Access-Control-Allow-Origin': "*",
				'Access-Control-Allow-Methods': 'GET',
				'Access-Control-Allow-Headers': "*",
				'Access-Control-Allow-Credentials': true
			}
		}
        const htmlString = (await (await fetch(document.getElementById("urlTimeline").value, enableCors)).text());
        const html = new DOMParser().parseFromString(htmlString, "text/html");
        const json = JSON.parse(html.getElementById("__NEXT_DATA__").textContent);
        const feeds = Object.values(json.props?.pageProps?.initialState?.api?.feeds || {});
        const hasil = [];
        feeds.forEach(({ post }) => {
            let media = post?.contents?.media;
            Array.isArray(media) && media.forEach(({ type, resourceId }) => {
                type == "VIDEO" ?
                    hasil.push(`<video width="320" height="240" controls><source src="https://obs.line-scdn.net/${resourceId}" type="video/mp4"></video>`) :
                    hasil.push(`<img src="https://obs.line-scdn.net/${resourceId}" width="320" height="240">`);
            });
        });
        document.getElementById('link_download').innerHTML = hasil.join("").trim() || '<p>Invalid Link!</p>';
    } catch (error) {
        document.getElementById('link_download').innerHTML = `<p>Error : ${error.message}</p>`;
    }
}
