import { useState } from "react";

function QuantityUpdater() {
    const [cnt, setCnt] = useState(0)
    return (
        <div className="quant-updater">
            <button>+</button>
            <span>{cnt}</span>
            <button>-</button>
        </div>
    );
}

export default QuantityUpdater;