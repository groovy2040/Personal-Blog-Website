let h1 = document.querySelector('main .author')

fetch('https://randomuser.me/api/')
.then(respond=> respond.json())
.then(result => {
    let user = result.results[0]
    let {title,first,last} = user.name
    let url  = user.picture.medium
    let fullname = `${title}, ${first} ${last}`
    h1.innerHTML = `<h1>${fullname}</h1>`

    let image = new Image()
    image.src = url;
    h1.insertAdjacentElement('beforebegin',image)
})