
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "route": "/create-items-view"
  },
  {
    "renderMode": 1,
    "route": "/create-items-view/*"
  },
  {
    "renderMode": 1,
    "route": "/items-list-view"
  },
  {
    "renderMode": 1,
    "route": "/negotiation-chat-view/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5368, hash: '42c496638fb14dac2b2dbf88a34be15a59395e4c6ed6aece8ed8e903c34944e0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '295656f8ba6a776e62898f5f5a3e534981b0b2ae7fdebe88590bd5dd4e78cb10', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-DCVWWT6N.css': {size: 72670, hash: 'iuj+eV1bfWc', text: () => import('./assets-chunks/styles-DCVWWT6N_css.mjs').then(m => m.default)}
  },
};
