import { ContextABI } from "../Contract/Context";
import { envdev } from "./environments";
import { getAccount, getContract } from "./web3";

export const ContextContract =async()=> {
    const Context = await getContract(ContextABI, envdev.REACT_APP_CONTEXT);
    return Context;
}

export const Pauseplatform = async()=>{
    const context = await ContextContract()
    const pause = await context.methods.pausePlatform(true).send({from: await getAccount()})
    return pause;
}