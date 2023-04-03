import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack'

import { Attr } from "./attr";

export function AttrList({ vertical }) {
    return (
        <>
            {vertical ?
                (
                    <Stack className='menu d-flex flex-shrink-0 row-cols-1 g-1' gap={1}>
                        {window.initState['attrData'].map(
                            (attr) => (
                                <Attr {...attr} key={attr.attrIndex} vertical={vertical}/>
                            )
                        )}
                    </Stack>
                ) :
                null
            }
            {vertical ?
                null :
                (
                    <Stack className='menu d-flex flex-shrink-0' direction={'horizontal'}>
                        {window.initState['attrData'].map(
                            (attr) => (
                                <Attr {...attr} key={attr.attrIndex} vertical ={vertical}/>
                            )
                        )}
                    </Stack>
                )
            }
        </>
    )
}