import './news.css';
import { Article } from '../../types/models';

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const newsItemElement = newsClone.querySelector('.news__item');
            if (newsItemElement) {
                if (idx % 2) {
                    newsItemElement.classList.add('alt');
                }
            }
            const newsPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;

            newsPhoto.style.backgroundImage = `url(${item.urlToImage || '../img/NEWS.jpg'})`;
            const newsAuthor = newsClone.querySelector('.news__meta-author') as HTMLLIElement;
            newsAuthor.textContent = item.author || item.source.name;
            const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLLIElement;
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsTitle = newsClone.querySelector('.news__description-title') as HTMLHeadingElement;
            newsTitle.textContent = item.title;
            const newsDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLHeadingElement;
            newsDescriptionSource.textContent = item.source.name;
            const newsDescriptionContent = newsClone.querySelector(
                '.news__description-content'
            ) as HTMLParagraphElement;
            newsDescriptionContent.textContent = item.description;
            const newsReadmore = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
            newsReadmore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsDisplay = document.querySelector('.news') as HTMLDivElement;
        newsDisplay.innerHTML = '';
        newsDisplay.appendChild(fragment);
    }
}

export default News;
