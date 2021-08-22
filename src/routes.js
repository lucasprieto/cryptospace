import * as Icons from '@material-ui/icons'

import * as Views from './views'

const routes =  [
    {
        name: 'Home',
        icon: Icons.Home,
        route: '/',
        view: Views.HomeView,
        exact: true,
    },
    {
        name: 'Positions',
        icon: Icons.TrendingUp,
        route: '/positions',
        view: Views.PositionsView,
        exact: false,
    },
    {
        name: 'Wallets',
        icon: Icons.TrendingUp,
        route: '/wallets',
        view: Views.WalletsView,
        exact: false,
    },
]

export default routes
