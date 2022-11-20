import { InjectedConnector } from '@web3-react/injected-connector'
const injected = new InjectedConnector({
    supportedChainIds: [1001, 8217]
})
const connectors = {
    injected: injected
}
export default connectors