import axios from 'axios';

import { config } from '../../config';
import { ISessionFetchTokenRequestPayload } from './types';

const END_POINTS = {
  getToken: 'authenticate/'
};

export const getToken = ({ code }: ISessionFetchTokenRequestPayload) => {
  return axios.get(`${config.oauthTokenUrl}${END_POINTS.getToken}${code}`);
};
