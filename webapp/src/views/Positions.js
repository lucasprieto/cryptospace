import { Grid,  } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PositionCard from "../components/PositionCard"


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}))

function PositionsView() {
    const styles = useStyles()
    const positions = [
        { ticker: 'BTC-PERP', usd: 200, value: 0.005 },
        { ticker: 'ETH-PERP', usd: 200, value: 0.005 },
        { ticker: 'ICP-PERP', usd: 200, value: 0.005 },
        { ticker: 'ICP1-PERP', usd: 200, value: 0.005 },
        { ticker: 'ICP2-PERP', usd: 200, value: 0.005 },
    ]

    return (
        <div className={styles.root}>
            <Grid container spacing={3}>
                {positions.map(p => (
                    <Grid item xs={12} sm={4} md={3} key={p.ticker}>
                        <PositionCard
                            ticker={p.ticker}
                            usd={p.usd}
                            value={p.value}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default PositionsView