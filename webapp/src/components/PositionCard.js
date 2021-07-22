import { 
    Card,
    CardHeader,
    CardContent,
    Avatar
    makeStyles
} from '@material-ui/core'
import useImage from 'use-image';
import { useBtcPrice } from '../utils/useExchange'

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
      backgroundColor: red[500],
    },
  }));

function PositionCard({ ticker, usd, value }) {
    const classes = useStyles();
    const [image, imageState] = useImage(`/ticker-images/${ticker}.png`)

    const btc = useBtcPrice()
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    R
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
            <span>USD: {btc}</span>
            <span>Size: {value}</span>
        </Card>
    )
}

export default PositionCard