import http from 'http'

export interface IModule {
    attachHttp: (server: http.Server) => void;
}