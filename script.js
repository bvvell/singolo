// portfolio filter
let filterButtons = document.querySelectorAll('.portfolio__filter__button');
let portfolioDiv = document.querySelector('.portfolio__list');

let selectCategory = function() {
    if (!this.classList.contains('active')) {
        let listItems = Array.from(document.querySelectorAll('.portfolio__list__item'));
        let currentCategory = this.dataset.category;
        let list = [];
        for (let a = 0; a <= listItems.length - 1; a++) {
            if (listItems[a].dataset.category === currentCategory.replace('cat-', '')) {
                list.unshift(listItems[a]);
            } else {
                list.push(listItems[a]);
            }
        }

        list.forEach(pic => portfolioDiv.append(pic));

        filterButtons.forEach(el => {
            el.classList.remove('active');
        })
        this.classList.add('active');
    }
}

filterButtons.forEach(el => {
    el.addEventListener('click', selectCategory, false)
})

//portfolio images
let removeActiveProject = () => {
    let items = Array.from(document.querySelectorAll('.portfolio__list__item'));
    items.forEach(el => el.classList.remove('active__project'))
}
let setActiveProject = (e) => {
    e.preventDefault();
    if (!e.target.parentNode.classList.contains('active__project') && e.target.parentNode.classList.contains('portfolio__list__item')) {
        removeActiveProject()
        e.target.parentNode.classList.add('active__project')
    }
}
document.querySelector('.portfolio__list').addEventListener('click', setActiveProject)


//form
let form = document.querySelector('#quoteForm');
let formControls = document.querySelectorAll('.form__controller');
let generateMessage = (data) => {
    let messageWrapper = document.createElement("div");
    messageWrapper.className = "message__wrapper";
    let message = document.createElement("div");
    message.className = "message";
    data.forEach(item => {
        if (item.attr === 'subject') {
            if (item.value !== '') {
                message.insertAdjacentHTML('beforeend', '<div class="message__row"><div class="label">' + item.attr + ':</div><div class="value">' + item.value + '</div></div>')
            } else {
                message.insertAdjacentHTML('beforeend', '<div class="message__row"><div class="value">Без темы</div></div>')
            }
        }
        if (item.attr === 'description') {
            if (item.value !== '') {
                message.insertAdjacentHTML('beforeend', '<div class="message__row"><div class="label">' + item.attr + ':</div><div class="value">' + item.value + '</div></div>')
            } else {
                message.insertAdjacentHTML('beforeend', '<div class="message__row"><div class="value">Без описания</div></div>')
            }
        }
    })
    message.insertAdjacentHTML('afterbegin', '<div class="message__row">The letter was sent</div>');
    message.insertAdjacentHTML('beforeend', '<div class="message__row"><button class="message__action">OK</button></div>');
    messageWrapper.appendChild(message);
    return messageWrapper;
}
let closeModal = (e) => {
    if (e.target.classList.contains('message__action')) {
        form.reset();
        let messageElement = document.querySelector('.message__wrapper');
        messageElement.classList.remove('visible');
        setTimeout(() => {
            messageElement.remove()
        }, 1000);
    }
}
form.onsubmit = (e) => {
    let formData = [];
    e.preventDefault();
    Array.from(formControls).forEach(item => {
        formData.push({ attr: item.getAttribute('name'), value: item.value })
    });
    document.querySelector('.contacts').insertBefore(generateMessage(formData), document.querySelector('.contacts__wrapper'));
    setTimeout(() => {
        document.querySelector('.message__wrapper').classList.add('visible');
    }, 100)
}
document.querySelector('.contacts').addEventListener('click', closeModal);


//header
let navItems = Array.from(document.querySelectorAll('.header__wrapper__nav__link'));
let anchors = Array.from(document.querySelectorAll('.scrloll__anchor'));
let removeActiveLink = () => {
    navItems.forEach(el => el.classList.remove('active'))
}
let scrollTo = (id) => {
    anchors.filter(item => item.getAttribute('name') === id)[0].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
let setActiveNav = (e) => {
    if (!e.target.classList.contains('actiive') && e.target.classList.contains('header__wrapper__nav__link')) {
        removeActiveLink();
        e.target.classList.add('active')
        let itemId = e.target.getAttribute('href').substr(1)
        scrollTo(itemId);
    }
    e.preventDefault();
}
document.querySelector('.header__wrapper__nav').addEventListener('click', setActiveNav)


//slider
let slides = Array.from(document.querySelectorAll('.slide'));
let slideToRight = () => {
    slides.forEach(item => {
        if (item.classList.contains('active')) {
            item.classList.remove('active', 'slideLeft', 'slideRight')
        } else {
            item.classList.add('slideRight', );
            setTimeout(() => item.classList.add('active'), 100)
        }
    })
}
let slideLeft = (e) => {
    slides.forEach(item => {
        if (item.classList.contains('active')) {
            item.classList.remove('active', 'slideRight', 'slideLeft')
        } else {
            item.classList.add('slideLeft');
            setTimeout(() => item.classList.add('active'), 100)
        }
    })
}
document.querySelector('.slider__arrows__item-left').addEventListener('click', slideLeft);
document.querySelector('.slider__arrows__item-right').addEventListener('click', slideToRight);


let images = [...document.querySelectorAll('.image-wrap')];
images.forEach(item => {
    item.addEventListener('click', (e) => {
        e.target.parentNode.classList.toggle('off');
    })
})