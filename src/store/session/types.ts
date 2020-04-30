export interface ISessionFetchTokenRequestPayload {
  code: string;
  state?: string;
  rslCallback?: string;
}

export interface ISessionFetchTokenResponsePayload {
  token: string;
  tokenType: string;
}

export interface ISessionState {
  error: boolean;
  token: string;
  tokenType: string;
}
