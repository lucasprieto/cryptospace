import { withAuthenticationRequired } from '@auth0/auth0-react'

function ExchangesView() {
    return (
        <div>
            <h3>Exchanges</h3>
        </div>
    )
}

export default withAuthenticationRequired(ExchangesView)
