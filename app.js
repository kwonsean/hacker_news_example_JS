// API문서 링크 https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md
const ajax = new XMLHttpRequest()

const content = document.createElement('div')
const root = document.getElementById('root')

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

const store = {
  currentPage: 1,
}

// ajax 호출을 함수로 묶어 중복 제거
function getData(url) {
  ajax.open('GET', url, false)
  ajax.send()

  return JSON.parse(ajax.response)
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL)
  // console.log(newsFeed)

  // DOM API없이 배열로 ul요소까지 구현하기
  const newsList = []

  newsList.push('<ul>')

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
  <li>
    <a href="#/show/${newsFeed[i].id}">
      ${newsFeed[i].title} (${newsFeed[i].comments_count})
    </a>
  </li>
  `)
  }

  newsList.push('</ul>')
  newsList.push(`
    <div>
      <a href='#/page/${
        store.currentPage > 1 ? store.currentPage - 1 : 1
      }'>이전 페이지</a>
      <a href='#/page/${
        store.currentPage < 3 ? store.currentPage + 1 : 3
      }'>다음 페이지</a>
    </div>
  `)
  root.innerHTML = newsList.join('')
}

function newsDetail() {
  const id = location.hash.slice(7)
  const newsContent = getData(CONTENT_URL.replace('@id', id)) // !! replace 활용능력
  // console.log('newsContent!', newsContent)

  const title = document.createElement('h1')
  root.innerHTML = `
  <h1>${newsContent.title}</h1>
  <div>
    <a href='#/page/${store.currentPage}'>목록으로</a>
  </div>
  `
}

function router() {
  const routePath = location.hash // !! location.hash에 #만 들어 있는 경우에는 빈값이 반환된다.
  if (routePath === '') {
    newsFeed()
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substring(7))
    newsFeed()
  } else {
    newsDetail()
  }
}

window.addEventListener('hashchange', router)
router()
