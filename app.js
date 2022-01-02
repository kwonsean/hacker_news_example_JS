// API문서 링크 https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md
const ajax = new XMLHttpRequest()

const content = document.createElement('div')
const root = document.getElementById('root')
const ul = document.createElement('ul')

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

// ajax 호출을 함수로 묶어 중복 제거
function getData(url) {
  ajax.open('GET', url, false)
  ajax.send()

  return JSON.parse(ajax.response)
}

const newsFeed = getData(NEWS_URL)
// console.log(newsFeed)

window.addEventListener('hashchange', function () {
  const id = location.hash.slice(1)
  const newsContent = getData(CONTENT_URL.replace('@id', id)) // !! replace 활용능력
  // console.log(newsContent)

  const title = document.createElement('h1')
  title.innerText = newsContent.title
  content.appendChild(title)
})

for (let i = 0; i < newsFeed.length; i++) {
  const div = document.createElement('div')
  div.innerHTML = `
  <li>
    <a href="#${newsFeed[i].id}">
      ${newsFeed[i].title} (${newsFeed[i].comments_count})
    </a>
  </li>
  `

  ul.appendChild(div.firstElementChild)
}

root.appendChild(ul)
root.appendChild(content)
