import React from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles
} from '@material-ui/core';

import { SearchInput } from '../../containers/SearchInput';
import { CardsList } from '../../components/CardsList';

import { styles } from './styles';

interface IProps {
  classes?: any;
}

class HomePage extends React.PureComponent<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.companyTitle}
            >
              Company name
            </Typography>
            <Button color="primary" variant="outlined" className={classes.link}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <main>
          <div className={classes.hero}>
            <Container maxWidth="lg">
              <SearchInput />
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="lg">
            <CardsList />
          </Container>
        </main>
      </>
    );
  }
}

const Home = withStyles(styles)(HomePage);

export { Home };
