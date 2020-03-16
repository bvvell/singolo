// portfolio filter
let filterButtons = document.querySelectorAll('.portfolio__filter__button');
let portfolioDiv = document.querySelector('.portfolio__list');

let selectCategory = function () {
    if (!this.classList.contains('active')) {
        let listItems = Array.from(document.querySelectorAll('.portfolio__list__item'));
        let currentCategory = this.dataset.category;
        let list = [];
        let arr = [];
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