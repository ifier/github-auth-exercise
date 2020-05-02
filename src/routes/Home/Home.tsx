import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container, withStyles, LinearProgress } from '@material-ui/core';

import { Header } from '../../containers/Header';
import { SearchHeader } from '../../containers/SearchHeader';
import { CardsList } from '../../components/CardsList';

import { SearchActions } from '../../store/search/actions';
import {
  ISearchRequestPayload,
  ISearchState,
  ISearchNextPageRequestPayload
} from '../../store/search/types';
import { IRootState } from '../../store/types/state';
import { SearchSelectors } from '../../store/search/selectors';
import { styles } from './styles';

interface IProps extends ISearchState {
  classes?: any;
  fetchSearchRequest: (payload: ISearchRequestPayload) => void;
  fetchSearchNextPageRequest: (payload: ISearchNextPageRequestPayload) => void;
}

class Home extends React.PureComponent<IProps> {
  render() {
    const {
      classes,
      params,
      repositories,
      isFetching,
      isFetchingNext,
      fetchSearchNextPageRequest
    } = this.props;

    return (
      <>
        <Header />
        <main>
          <div className={classes.hero}>
            <Container maxWidth={false}>
              <SearchHeader {...this.props} />
            </Container>
          </div>
          <div className={classes.main}>
            {isFetching && (
              <LinearProgress className={classes.linearProgress} />
            )}
            <Container className={classes.cardGrid} maxWidth={false}>
              <CardsList
                list={repositories}
                params={params}
                paramsRequiredText="Name of repository field is required"
                noResultsText="No Results"
                fetchNextPage={fetchSearchNextPageRequest}
                isFetchingNext={isFetchingNext}
                onClick={() => {}}
              />
            </Container>
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  const searchState = SearchSelectors.makeGetState(state);

  return {
    ...searchState
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSearchRequest: (payload: ISearchRequestPayload) =>
    dispatch(SearchActions.fetchRequest(payload)),
  fetchSearchNextPageRequest: (payload: ISearchNextPageRequestPayload) =>
    dispatch(SearchActions.fetchNextPageRequest(payload))
});

export default React.memo(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Home)
  )
);
