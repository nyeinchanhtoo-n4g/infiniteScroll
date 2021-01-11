let postContainerEL = document.getElementById('post-container');
let postLoaderEL = document.querySelector('.loader');
let searchEL = document.getElementById('searchIn');

searchEL.value = '';

let postCount = 5;
let pageCount = 1;
async function getPost() {
    let data = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${postCount}&_page=${pageCount}`);
    return data.json();
}

async function showPost() {
    let posts = await getPost();
    posts.forEach(post => {
        let domElement = document.createElement('div');
        domElement.classList.add('post');
        domElement.innerHTML = `
            <div class="post-number">${post.id}</div>
            <div class="post-info">
                <div class="post-title">${post.title}</div>
                <div class="post-body">${post.body}</div>
            </div>
        `;
        postContainerEL.appendChild(domElement);
    });
}

showPost();

window.addEventListener('scroll', (v) => {
    let {
        scrollTop,
        clientHeight,
        scrollHeight
    } = document.documentElement;
    let scrollTotal = scrollTop + clientHeight;

    if (scrollTotal >= scrollHeight) {
        showLoading();
    }
});

function showLoading() {
    postLoaderEL.classList.add('show');
    setTimeout(() => {
        postLoaderEL.classList.remove('show');
        setTimeout(() => {
            pageCount++;
            showPost();
        }, 300);
    }, 1000)
}

searchEL.addEventListener('input', (e) => {
    let search = e.target.value.toLowerCase();
    let posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        let title = post.querySelector('.post-title').innerText.toLowerCase();
        let body = post.querySelector('.post-body').innerText.toLowerCase();

        if (title.indexOf(search) > -1 || body.indexOf(search) > -1) {
            post.style.display = 'flex'
        } else {
            post.style.display = 'none'
        }
    })
})