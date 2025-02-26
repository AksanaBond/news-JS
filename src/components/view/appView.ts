import News from './news/news';
import Sources from './sources/sources';
import { EverythingResponse, SourcesResponse } from '../types/models';

export class AppView {
    public news: News;

    public sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: EverythingResponse) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: SourcesResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
