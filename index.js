
/* 
    bitch !! why use mine , when you can get of your own
    on https://api.unsplash.com
*/

client_id = "U063i1T9Cs3c3lb5bajS3nLKYM-eMiM6J-8bzkYmvg4"

window.onload = () => {

    console.log("this is working too")

    // now the fetch thingy

    display("orange")

    document.getElementById('search_button').onclick = () => {
        display(document.getElementById('search').value)
    }

   
}

function display(query) {
    fetch("https://api.unsplash.com/search/photos?query=" + query + "&count=20&client_id=" + client_id)
        .then(data => data.json())
        .then(data => {
            console.log(data)

            let parent = document.getElementById('photos')
            remove_childs(parent)

            for (let i = 0; i < data.results.length; i++) {
                let div = document.createElement('div')
                let photo = new Image()
                photo.onload = () => {
                    // photo.style.display = "block"

                    photo.animate([
                        {opacity: '0'},
                        {opacity: '1'}
                    ], {
                        duration: 2000,
                        iterations: 1,
                    })
                    photo.style.opacity  = '1'
                }
                photo.style.opacity = '0'
                console.log(data.results[i].height)

                // giving the outer div the height that is required

                div.style.height = (data.results[i].height / (data.results[i].width/document.body.clientWidth)).toString() + "px"
                div.style.maxWidth = document.body.clientWidth
                div.style.background = data.results[i].color
                console.log( div.style.color)

                photo.style.height = '100%'
                photo.style.width = '100%'



                photo.src = data.results[i].urls.regular

                div.appendChild(photo)
                parent.appendChild(div) 
            }
        })

        //catching the error and displaying #IMPORTANT for phony browsers
        .catch(err => {
            document.getElementById('error').innerHTML = "oops an error occured namely :" + err
            console.log(err)
        })
}


function remove_childs(node) {
    let last_child = node.lastChild
    while (last_child != null) {
        node.removeChild(last_child)
        last_child = node.lastChild
    }
}