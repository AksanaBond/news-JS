import './sources.css';
import { Article } from '../../types/models';

class Sources {
    draw(data: Article[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            const sourceName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;

            sourceName.textContent = item.source.name;
            const sourceItem = sourceClone.querySelector('.source__item') as HTMLDivElement;
            sourceItem.setAttribute('data-source-id', item.source.id);

            fragment.append(sourceClone);
        });
        const sources = document.querySelector('.sources') as HTMLDivElement;

        sources.append(fragment);
    }
}

export default Sources;
