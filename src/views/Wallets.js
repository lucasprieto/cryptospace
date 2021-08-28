import { withAuthenticationRequired } from '@auth0/auth0-react'

function WalletsView() {
    return (
        <h3>WalletsView</h3>
    )
}

export default withAuthenticationRequired(WalletsView)
