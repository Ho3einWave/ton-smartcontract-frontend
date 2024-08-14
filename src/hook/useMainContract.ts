import { useEffect, useState } from "react";
import { Main } from "../contracts/Main";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/ton";
import { toNano } from "@ton/ton";
import { useTonConnect } from "./useTonConnect";


export const useMainContract = () => {
    const client = useTonClient();
    const { sender } = useTonConnect();

    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))


    const [contractData, setContractData] = useState<null | {
        counter_value: number,
        recent_sender: Address,
        owner_address: Address
    }>()
    const [balance, setBalance] = useState(0)
    const mainContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = Main.createFromAddress(Address.parse("EQB7KlO-ywZ9m5r7XB3rfxfSZVqkK6g_AkOY2BaB8wn4LvRd"))
        return client.open(contract) as OpenedContract<Main>
    }, [client])
    useEffect(() => {
        async function getValue() {
            if (!mainContract) return
            setContractData(null);
            const val = await mainContract.getData()
            const { balance } = await mainContract.getBalance()
            setContractData({
                counter_value: val.number,
                recent_sender: val.recent_address,
                owner_address: val.owner_address
            })
            setBalance(balance)

            await sleep(5000)
            getValue()
        }

        getValue()
    }, [mainContract])

    return {
        contract_address: mainContract?.address.toString({ testOnly: true, bounceable: false }),
        contract_balance: balance,
        ...contractData,
        sendIncrement: async () => {
            return mainContract?.sendIncrement(sender, toNano("0.05"), 5)
        },
        sendDeposit: async () => {
            return mainContract?.sendDeposit(sender, toNano("1"))
        },
        sendWithdrawalRequest: async () => {
            return mainContract?.sendWithdrawalRequest(sender, toNano("0.05"), toNano("2"))
        }
    }

}