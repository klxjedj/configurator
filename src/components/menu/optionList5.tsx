import Stack from 'react-bootstrap/Stack'
import { Option } from "./option5"
export function OptionList({ attrIndex, vertical }) {
    return (
        <Stack direction={vertical ? 'vertical' : 'horizontal'} gap={1}>
            {
                window.initState['attrData'][attrIndex]['options'].map((option) => (
                    <Option {...{ ...option, attrIndex,vertical }} key={option.optionIndex}></Option>
                ))
            }
        </Stack>
    )

}