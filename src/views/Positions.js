import { withAuthenticationRequired } from '@auth0/auth0-react'

import PositionCard from "../components/Positions/PositionCard"

function PositionsView() {
    return (
        <div>
            <h3>Positions</h3>
            <PositionCard ticker="BTC" usd={45000} value={45000} />
        </div>
    )
}

export default withAuthenticationRequired(PositionsView)