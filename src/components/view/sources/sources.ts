import './sources.css';
import { Source } from '../../types/models';

class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            const sourceName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;

            sourceName.textContent = item.name;
            const sourceItem = sourceClone.querySelector('.source__item') as HTMLDivElement;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        const sources = document.querySelector('.sources') as HTMLDivElement;

        sources.append(fragment);
    }
}

export default Sources;
