import { CallbackFn, HttpMethod } from '../types/models';

type Options = Record<string, string>;

interface GetRespFirstArg {
    endpoint: string;
    options?: Options;
}
class Loader {
    private baseLink: string;
    private options: Options;

    constructor(baseLink: string, options: Options = {}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<TData>(
        { endpoint, options = {} }: GetRespFirstArg,
        callback: CallbackFn<TData> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<TData>(method: HttpMethod, endpoint: string, callback: CallbackFn<TData>, options: Options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
