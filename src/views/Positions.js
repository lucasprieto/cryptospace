import { withAuthenticationRequired } from '@auth0/auth0-react'

import PositionCard from "../components/Positions/PositionCard"

function PositionsView() {
    return (
        <div>
            <h3>Positions</h3>
            <PositionCard ticker="bitcoin" />
            <PositionCard ticker="bitcoin" />
        </div>
    )
}

export default withAuthenticationRequired(PositionsView)