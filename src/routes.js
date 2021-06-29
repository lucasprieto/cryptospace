import * as Icons from '@material-ui/icons'

import * as Views from './views'

const routes =  [
    {
        name: 'Home',
        icon: Icons.Home,
        route: '/',
        view: Views.HomeView,
    },
    {
        name: 'Positions',
        icon: Icons.TrendingUp,
        route: '/positions',
        view: Views.PositionsView
    },
]

export default routes