import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hook/useMainContract";
import { useTonConnect } from "./hook/useTonConnect";
import { fromNano } from "@ton/ton";

function App() {
    const {
        contract_address,
        contract_balance,
        counter_value,
        owner_address,
        recent_sender,
        sendIncrement,
        sendDeposit,
        sendWithdrawalRequest,
    } = useMainContract();
    const { connected } = useTonConnect();
    return (
        <>
            <div className="container">
                <div>
                    <TonConnectButton />
                </div>
                <div>
                    <div className="card">
                        <b>Our contract Address</b>
                        <div className="hint">
                            {contract_address?.slice(0, 30) + "..."}
                        </div>
                        <b>Contract Owner Address</b>
                        <div className="hint">
                            {owner_address
                                ?.toString({
                                    bounceable: false,
                                    testOnly: true,
                                })
                                ?.slice(0, 30) ?? "Loading" + "..."}
                        </div>
                        <b>Contract Recent Sender Address</b>
                        <div className="hint">
                            {recent_sender
                                ?.toString({
                                    bounceable: false,
                                    testOnly: true,
                                })
                                ?.slice(0, 30) ?? "Loading" + "..."}
                        </div>
                        <b>Our contract Balance</b>
                        <div className="hint">{fromNano(contract_balance)}</div>
                    </div>
                    <div className="card">
                        <b>Counter value</b>
                        <div>{counter_value ?? "Loading ..."}</div>
                    </div>
                    <div className="controllers">
                        {connected && (
                            <button onClick={() => sendIncrement()}>
                                Increment by 5
                            </button>
                        )}
                        <br />
                        {connected && (
                            <button onClick={() => sendDeposit()}>
                                Deposit 1 TON
                            </button>
                        )}
                        {connected && (
                            <button onClick={() => sendWithdrawalRequest()}>
                                Send Withdrawal 0.7 TON
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
