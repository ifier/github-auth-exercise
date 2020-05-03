import axios from 'axios';

import { SessionService } from '../../services/session';
import { config, getHeaders } from '../../config';
import { ISearchRequestPayload } from './types';

const PER_PAGE = 15;
const END_POINTS = {
  getRepositories: '/search/repositories'
};

export const getRepositories = (params: ISearchRequestPayload) => {
  const headers = getHeaders(SessionService.getAccessToken());
  // console.log(params);

  return axios.get(
    `${config.githubApi}${END_POINTS.getRepositories}`,
    {
      ...headers,
      params: {
        ...params,
        per_page: PER_PAGE
      }
    }
  );
};

export const getPage = (url: string) => {
  return axios.get(`${config.oauthTokenUrl}repository/${url}`);
};
