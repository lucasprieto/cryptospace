import { 
    Card,
    CardHeader,
    CardContent,
    Avatar,
    IconButton,

    makeStyles
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
    },
  }))

function PositionCard({ ticker, usd, value }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                
                    <Avatar
                        alt={`${ticker} Logo`}
                        src={`/crypto-assets/${ticker}.png`}
                        className={classes.avatar}
                        variant="rounded">
                            <Skeleton animation="wave" variant="rect">
                                <Avatar />
                            </Skeleton>
                    </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <span>USD: {usd}</span>
            <span>Size: {value}</span>
        </Card>
    )
}

export default PositionCard