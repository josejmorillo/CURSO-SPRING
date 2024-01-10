export default function CounterReset({resetMethod}) {

    return (
        <div className="CounterReset">
            <div>
                <button className="resetButton"
                    onClick={() => resetMethod()}
                >
                    Reset
                </button>

            </div>
        </div>
    );
}