import config from '~/config';
import Home from '~/pages/Home';
import Products from '~/pages/Products';
import BestSeller from '~/pages/BestSeller';
import Brand from '~/pages/Brand';
const publicRoute = [
    { path: config.routes.home, component: Home },
    { path: config.routes.products, component: Products },
    { path: config.routes.bestSeller, component: BestSeller },
    { path: config.routes.brand, component: Brand, layout: null },
];

export { publicRoute }