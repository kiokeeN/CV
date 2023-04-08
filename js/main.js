;(function () {
  const burgerItem = document.querySelector('.burger')
  const menu = document.querySelector('.header__nav')
  const menuCloseItem = document.querySelector('.header__nav-close')
  const menuLinks = document.querySelectorAll('.header__link')
  burgerItem.addEventListener('click', () => {
    menu.classList.add('header__nav_active')
  })
  menuCloseItem.addEventListener('click', () => {
    menu.classList.remove('header__nav_active')
  })

  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', () => {
      menu.classList.remove('header__nav_active')
    })
  }
})()
;(function () {
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector('.header__block').clientHeight
    let target = document.querySelector(targetEl)
    let targetPosition = target.getBoundingClientRect().top - headerElHeight
    let startPosition = window.pageYOffset
    let startTime = null

    const ease = function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = ease(timeElapsed, startPosition, targetPosition, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }
    requestAnimationFrame(animation)
  }

  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll')
    links.forEach(each => {
      each.addEventListener('click', function () {
        const currentTarget = this.getAttribute('href')
        smoothScroll(currentTarget, 1000)
      })
    })
  }
  scrollTo()
})()

window.addEventListener('scroll', () => {
  let scrollDistance = window.scrollY
  document.querySelectorAll('.section').forEach((el, i) => {
    if (
      el.offsetTop - document.querySelector('.header__block').clientHeight - 5 <=
      scrollDistance
    ) {
      document.querySelectorAll('.header__block a').forEach(el => {
        if (el.classList.contains('active')) {
          el.classList.remove('active')
        }
      })

      document
        .querySelectorAll('.header__block li')
        [i].querySelector('a')
        .classList.add('active')
    }
  })
})

const select = document.querySelector('select')
const allLang = ['en', 'ru']

select.addEventListener('change', changeURLLanguage)

// перенаправить на url с указанием языка
function changeURLLanguage() {
  let lang = select.value
  location.href = window.location.pathname + '#' + lang
  location.reload()
}

function changeLanguage() {
  let hash = window.location.hash
  hash = hash.slice(1)
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#en'
    location.reload()
  }
  select.value = hash
  for (let key in langArr) {
    let elem = document.querySelector('.lng-' + key)
    if (elem) {
      elem.innerHTML = langArr[key][hash]
    }
  }
}

changeLanguage()
