import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles, CircularProgress, Backdrop } from '@material-ui/core';

import { SplashSelectors } from '../../store/splash/selectors';
import { IRootState } from '../../store/types/state';

const useStyles = makeStyles(theme => ({
  page: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

const usePrevious = (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current || 0;
};

const SplashScreen = (props: any) => {
  const { counter, isFetching } = props;
  const [showLoader, setShowLoader] = useState(false);
  const prevCounter = usePrevious(counter);
  const classes = useStyles();

  useEffect(() => {
    if (isFetching) setShowLoader(isFetching);
  }, [isFetching]);

  useEffect(() => {
    if (prevCounter > 0 && counter === 0) {
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  }, [counter, prevCounter]);

  return (
    <Backdrop
      open={showLoader}
      transitionDuration={{ exit: 1000 }}
      className={classes.page}
    >
      <CircularProgress
        size={120}
        thickness={0.7}
        color="secondary"
        className={classes.progress}
      />
    </Backdrop>
  );
};

const mapStateToProps = (state: IRootState) => {
  const { counter, isFetching } = SplashSelectors.makeGetState(state);

  return {
    counter,
    isFetching
  };
};

export default connect(mapStateToProps)(SplashScreen);
