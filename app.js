// API문서 링크 https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md
const ajax = new XMLHttpRequest()

const content = document.createElement('div')
const root = document.getElementById('root')
const ul = document.createElement('ul')

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

ajax.open('GET', NEWS_URL, false)
ajax.send()

const newsFeed = JSON.parse(ajax.response)
// console.log(newsFeed)

window.addEventListener('hashchange', function () {
  const id = location.hash.slice(1)

  ajax.open('GET', CONTENT_URL.replace('@id', id), false) // !! replace 활용능력
  ajax.send()

  const newsContent = JSON.parse(ajax.response)
  // console.log(newsContent)
  const title = document.createElement('h1')
  title.innerText = newsContent.title
  content.appendChild(title)
})

for (let i = 0; i < newsFeed.length; i++) {
  const li = document.createElement('li')
  const a = document.createElement('a')

  a.href = `#${newsFeed[i].id}`
  a.innerText = `${newsFeed[i].title} (${newsFeed[i].comments_count})`

  li.appendChild(a)
  ul.appendChild(li)
}

root.appendChild(ul)
root.appendChild(content)
