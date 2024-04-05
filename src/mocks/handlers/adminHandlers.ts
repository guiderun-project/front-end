import { http, HttpHandler, HttpResponse } from 'msw';

//You can add HTTP handler by msw DOCS
//https://mswjs.io/docs/network-behavior/rest

export const adminHandlers: HttpHandler[] = [
  //   Example code
  http.get('/post', () => {
    return HttpResponse.json();
  }),
];
