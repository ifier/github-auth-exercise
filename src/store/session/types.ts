export interface ISessionFetchTokenRequestPayload {
  code: string;
  state?: string;
  rslCallback?: string;
}

export interface ISessionFetchTokenResponsePayload {
  access_token: string;
  scope?: string;
  token_type: string;
}

export interface ISessionState {
  error: boolean;
  access_token: string;
  token_type: string;
}
