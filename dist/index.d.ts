/// <reference types="node" />
import { EventEmitter } from "events";
export interface Interceptor {
    onRequest?: (data: any) => any;
    onResponse?: (res: any, data: any) => any;
}
interface StateProvider {
    accounts: string[] | null;
    isConnected: boolean;
    isUnlocked: boolean;
    initialized: boolean;
    isPermanentlyDisconnected: boolean;
}
interface EIP6963ProviderInfo {
    uuid: string;
    name: string;
    icon: string;
    rdns: string;
}
interface EIP6963ProviderDetail {
    info: EIP6963ProviderInfo;
    provider: EthereumProvider;
}
export declare class EthereumProvider extends EventEmitter {
    chainId: string | null;
    selectedAddress: string | null;
    /**
     * The network ID of the currently connected Ethereum chain.
     * @deprecated
     */
    networkVersion: string | null;
    isRabby?: boolean | undefined;
    isMetaMask: boolean;
    _isRabby: boolean;
    _isReady: boolean;
    _isConnected: boolean;
    _initialized: boolean;
    _isUnlocked: boolean;
    _isEip6963: boolean;
    eip6963ProviderDetails: EIP6963ProviderDetail[];
    currentProvider?: EthereumProvider;
    _cacheRequestsBeforeReady: any[];
    _cacheEventListenersBeforeReady: [string | symbol, () => any][];
    _state: StateProvider;
    _metamask: {
        isUnlocked: () => Promise<unknown>;
    };
    private _pushEventHandlers;
    private _requestPromise;
    private _dedupePromise;
    private _bcm;
    constructor({ maxListeners, isEip6963, isMetamaskMode, }?: {
        maxListeners?: number | undefined;
        isEip6963?: boolean | undefined;
        isMetamaskMode?: boolean | undefined;
    });
    initialize: () => Promise<void>;
    private _requestPromiseCheckVisibility;
    private _handleBackgroundMessage;
    isConnected: () => boolean;
    request: (data: any) => any;
    _request: (data: any) => Promise<unknown>;
    requestInternalMethods: (data: any) => Promise<unknown>;
    sendAsync: (payload: any, callback: any) => Promise<any> | undefined;
    send: (payload: any, callback?: any) => any;
    shimLegacy: () => void;
    on: (event: string | symbol, handler: (...args: any[]) => void) => this;
    _switchCurrentProvider: (current?: EthereumProvider | undefined) => void;
}
declare global {
    interface Window {
        ethereum: EthereumProvider;
        web3: any;
        rabby: EthereumProvider;
        rabbyWalletRouter: {
            rabbyProvider: EthereumProvider;
            lastInjectedProvider?: EthereumProvider;
            currentProvider: EthereumProvider;
            providers: EIP6963ProviderDetail[];
            setDefaultProvider: (rabbyAsDefault: boolean) => void;
            addProvider: (provider: EthereumProvider) => void;
        };
    }
}
export {};
