{/* <section class="blog-post">
            <h2>First Blog Post</h2>
            <p class="meta">Posted on July 19, 2024</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed est sit amet justo volutpat varius. Sed sit amet ultricies justo, eget dictum sapien.</p>
        </section> */}
import { posts } from '../mocks/articles.js'

let currentpage = 0;
let perpage = 4
if (window.innerWidth < 500) {
    perpage = 1
}

let container = document.querySelector("main.container")//how connect html with js
let left = document.querySelector('#left')
let right = document.querySelector('#right')

// let imagesRequest = await fetch(`https://randomuser.me/api/?inc=picture&results=${posts.length}`)
// let images = await imagesRequest.json()

renderPostsRange(currentpage, perpage)

left.onclick = function () {
    currentpage--;
    renderPostsRange(currentpage * perpage, perpage)
}
right.onclick = function () {
    currentpage++;
    renderPostsRange(currentpage * perpage, perpage)
}


function renderPostsRange(from, perpage) {
    let to = from + perpage

    if (from == 0) {
        left.setAttribute('disabled', true)
        right.removeAttribute('disabled')
    } else if (to > posts.length) {
        right.setAttribute('disabled', true)
    } else {
        right.removeAttribute('disabled')
        left.removeAttribute('disabled')

    }

    let previosSections = container.querySelectorAll('section')
    for (let i = 0; i < previosSections.length; i++) {
        previosSections[i].remove()
    }

    for (let i = from; i < to; i++) {
        let post = posts[i];
        if (post) {
            console.log({ post, i })

            container.insertAdjacentHTML('beforeend', `
        <section class="blog-post">
            <div>
                <h2>${post.title}</h2>
                <p class="meta">Posted on ${post.date}</p>
                <p>${post.subTitle}</p>
            </div>
            ${post.imageUrl
                    ? `
            <figure>
                <img alt='article image' src='${post.imageUrl}' />
                <figcaption>${post.title}</figcaption>
            </figure>`
                    :
                    ""
                }
            <a href='/post.html?title=${post.title.replace(' ', '_')}'>Continue reading</a>
        </section>
    `
            )
        }
    }
}