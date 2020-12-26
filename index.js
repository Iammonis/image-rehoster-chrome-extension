// converts image url to base 64
const toBase64 = url => {
	let img = url.split(',')
	img = img[1]
	uploadImage(img)
}

// Opens the imgur link in a new tab where the uploaded image exists 
const openPostLink = id => {
	let url = `https://imgur.com/${id}`
	let win = window.open(url, '_blank');
	win.focus();
}

// uploads the image to imgur with the help of its API 
const uploadImage = img => {
	let requestOptions = {
		method: 'POST',
        headers: {
			"Authorization": "Client-ID 82da851353ccc79"
		},
        body: img
	};
	
	fetch("https://api.imgur.com/3/image", requestOptions)
	.then(res => res.json())
	.then(result => openPostLink(result.data.id))
	.catch(error => console.log('error', error));
}

// Creates a contextMenu only for images
chrome.contextMenus.create(
	{
		title: "Rehost image", 
		contexts:["image"],
        onclick: function(info) {
			if( !info.srcUrl.includes('.webp') ){
				// check if its a data URL if it is then we dont have to convert to base64
				if( info.srcUrl.includes('data:') ) toBase64( info.srcUrl )
				else uploadImage( info.srcUrl )
			}
		}, 
	}
);