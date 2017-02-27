/// <reference types="whatwg-fetch" />

export abstract class AbstractRestClient {
    protected processJson(response: Response) {
        if (!response.ok) throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        return response.json();
    }
}