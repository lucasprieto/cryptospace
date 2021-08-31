import { withAuthenticationRequired } from '@auth0/auth0-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Grow,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useState } from 'react';
import NewWalletForm from '../components/Wallets/NewWalletForm';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function WalletsView() {
  const classes = useStyles();
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4" component="h4" gutterBottom>
                Wallets
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                Import and manage you wallets.
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" color="secondary" onClick={() => setCreateOpen(true)}>
                New Wallet
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grow in={createOpen}>
        <Grid item xs={12}>
          <Container>
            <Card>
              <CardHeader
                title="Import a new Wallet"
                titleTypographyProps={{
                  variant: 'subtitle1',
                  component: 'span',
                }}
                action={
                  <IconButton onClick={() => setCreateOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <NewWalletForm />
              </CardContent>
            </Card>
          </Container>
        </Grid>
      </Grow>
    </Grid>
  );
}

export default withAuthenticationRequired(WalletsView);
