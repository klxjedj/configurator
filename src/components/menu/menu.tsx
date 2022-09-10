import { Attr } from "./attr";

export function Menu() {

    return (<div>
        {window.initState['attrData'].map((attr) => (
            <Attr {...attr} key={attr.attrIndex}/>
        )

        )}
    </div>)
}