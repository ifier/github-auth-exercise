import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles
} from '@material-ui/core';

import { SearchHeader } from '../../containers/SearchHeader';
import { CardsList } from '../../components/CardsList';

import { SearchActions } from '../../store/search/actions';
import { ISearchRequestPayload } from '../../store/search/types';
import { IRootState } from '../../store/types/state';
import { SearchSelectors } from '../../store/search/selectors';
import { styles } from './styles';

interface IProps {
  classes?: any;
  repositories: any;
  fetchSearchRequest: (payload: ISearchRequestPayload) => void;
}

class Home extends React.PureComponent<IProps> {
  render() {
    const { classes, repositories } = this.props;

    return (
      <>
        <AppBar color="transparent">
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.companyTitle}
            >
              Search through repositories
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
              <SearchHeader />
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="lg">
            <CardsList
              items={repositories.items}
              paramsRequiredText="Name of repository is required"
              noResultsText="No Results"
              fetchNext={() => null}
            />
          </Container>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  const repositories = SearchSelectors.makeGetRepositories(state);

  return {
    repositories
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSearchRequest: (payload: ISearchRequestPayload) =>
    dispatch(SearchActions.fetchRequest(payload))
});

export default React.memo(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Home)
  )
);
