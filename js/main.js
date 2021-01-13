let postSectionEl = document.getElementById(`post-block`);
let loadingSectionEL = document.querySelector(`.loadingSection`);
let searchInEl = document.getElementById(`searchIn`);

let postCount = 5;
let pageCount = 1;
searchInEl.value=``;

async function getPostsData() {
    let postsData = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${postCount}&_page=${pageCount}`);
    return postsData.json();
}

async function showPostData() {
    let posts = await getPostsData();
    posts.forEach((post) => {
        let postElupdate = document.createElement(`div`);
        postElupdate.classList.add(`postSection`);
        postElupdate.innerHTML = `
                <div class="postNumber">${post.id}</div>
                <div class="postInfo">
                    <div class="postTitle">${post.title}</div>
                    <div class="postBody">${post.body}</div>
                </div>
        `;
        postSectionEl.appendChild(postElupdate);
    });
}

showPostData();

window.addEventListener(`scroll`, (element)=>{
    let {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    let scorllSum = scrollTop + clientHeight;
    if (scorllSum >= scrollHeight) {
        showLoading();
    }
})

function showLoading(){
    loadingSectionEL.classList.add(`load`);
    setTimeout(()=>{
        loadingSectionEL.classList.remove(`load`);

        setTimeout(()=>{
            pageCount++;
            showPostData();
        },300)
    },1000);
};

searchInEl.addEventListener(`input`, (rsp) => {
    let search = rsp.target.value.toLowerCase();
    let posts = document.querySelectorAll(`.postSection`);
    posts.forEach(post => {
        let title = post.querySelector(`.postTitle`).innerHTML.toLowerCase();
        let body = post.querySelector(`.postBody`).innerHTML.toLowerCase();
    
        if (title.indexOf(search) > -1 || body.indexOf(search) > -1) {
            post.style.display = `flex`
        }else {
            post.style.display = `none`
        }
    });
});