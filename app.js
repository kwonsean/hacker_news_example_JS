const ajax = new XMLHttpRequest()
const HN_URL = 'https://api.hnpwa.com/v0/news/1.json'

ajax.open('GET', HN_URL, false)
ajax.send()

const newsFeed = JSON.parse(ajax.response)
// console.log(newsFeed)

const root = document.getElementById('root')
const ul = document.createElement('ul')

for (let i = 0; i < newsFeed.length; i++) {
  const li = document.createElement('li')
  li.innerText = newsFeed[i].title
  ul.appendChild(li)
}

root.appendChild(ul)
