import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles, CircularProgress } from '@material-ui/core';
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
    backgroundColor: 'rgba(0, 0, 0, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    '&.inactive': {
      transition: 'opacity 0.8s',
      opacity: 0
    }
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
  // console.log(isFetching);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderClass, setLoaderClass] = useState('');
  const prevCounter = usePrevious(counter);
  const classes = useStyles();

  useEffect(() => {
    setShowLoader(isFetching);
  }, [isFetching]);

  useEffect(() => {
    if (prevCounter > 0 && counter === 0 && isFetching) {
      setTimeout(() => {
        setLoaderClass('inactive');
      }, 400);
      setTimeout(() => {
        setLoaderClass('');
        setShowLoader(false);
      }, 1000);
    }
  }, [counter, prevCounter, isFetching]);

  if (!showLoader) {
    return null;
  }

  return (
    <div className={`${classes.page} ${loaderClass}`}>
      <CircularProgress
        size={120}
        thickness={0.7}
        color="secondary"
        className={classes.progress}
      />
    </div>
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
