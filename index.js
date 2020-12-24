// chrome.runtime.onInstalled.addListener(function() {
	//do something
// });

// converts image url to base 64
const toBase64 = url => {
	let img = window.btoa(url)
	uploadImage(img)
}

// uploads the image to imgur with the help of its API 
const uploadImage = img => {
      let requestOptions = {
        method: 'POST',
        headers: {
			"Authorization": "Client-ID 82da851353ccc79"
		},
        body: img,
        redirect: 'follow'
      };

      fetch("https://api.imgur.com/3/image", requestOptions)
        .then(res => res.json())
        .then(result => console.log(result.data.id))
        .catch(error => console.log('error', error));

}


chrome.contextMenus.create(
	{
		title: "Rehost image", 
		contexts:["image"],
        onclick: function(info) {
			// check if its a data URL if it is then we dont have to convert to base64
			if( info.srcUrl.includes('data:') ) toBase64( info.srcUrl )
			else uploadImage( info.srcUrl )
		}, 
	}
);