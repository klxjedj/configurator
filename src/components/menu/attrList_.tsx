import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';

import axios from 'axios';

import { attrSelected } from '../../store/slices/attrSlice';
import { optionSelected } from '../../store/slices/optionSlice';
import { useAppDispatch } from '../../store/hooks';
import { useAppSelector } from '../../store/hooks';

import { Attr } from "./attr"
import { Option } from './option';

const choiceNum = 4

export function AttrList({ vertical }) {

    let dispatch = useAppDispatch()
    const currentAttr: number | null = useAppSelector((state) => state.selectedAttr);
    const currentOption: number | null = useAppSelector((state) => state.selectedOption)

    let attrIndex = currentAttr == null ? 0 : currentAttr;
    let optionIndex = currentOption == null ? 0 : currentOption

    let attrToDisplay = window.initState['attrData'].length - attrIndex - 1 > choiceNum ? window.initState['attrData'].slice(attrIndex + 1, attrIndex + 1 + choiceNum) : window.initState['attrData'].slice(attrIndex + 1,).concat(window.initState['attrData'].slice(0, choiceNum + attrIndex + 1 - window.initState['attrData'].length));
    let optionToDisplay = window.initState['attrData'][attrIndex]['options'].length - optionIndex - 1 > choiceNum ? window.initState['attrData'][attrIndex]['options'].slice(optionIndex + 1, optionIndex + 1 + choiceNum) : window.initState['attrData'][attrIndex]['options'].slice(optionIndex + 1,).concat(window.initState['attrData'][attrIndex]['options'].slice(0, choiceNum + optionIndex + 1 - window.initState['attrData'][attrIndex]['options'].length));
    console.log(`attrIndex:${attrIndex}`);
    console.log(`optionIndex:${optionIndex}`);
    console.log(optionToDisplay);

    let direction = vertical ? '' : 'flex-column';

    let handleAttrSelect = (selectedIndex, e) => {
        console.log(optionIndex);
        axios.put('./api/action',{
            userTel:window.tel,
            timestamp:Date.now(),
            actionType:'attrSelect',
            targetIndex:selectedIndex,
            currentAttr:currentAttr

        });
        dispatch(optionSelected(null));
        dispatch(attrSelected(selectedIndex));
    }
    let handleOptionSelect = (selectedIndex, e) => {
        axios.put('./api/action',{
            userTel:window.tel,
            timestamp:Date.now(),
            actionType:'optionSelect',
            targetIndex:selectedIndex,
            currentAttr:currentAttr

        });
        dispatch(optionSelected(selectedIndex));
    }

    return (
        <div className={`d-flex ${direction} flex-grow-0 justify-content-center gap-2`}>
            <Stack className={`d-flex align-items-center justify-content-between`} direction={vertical ? 'vertical' : 'horizontal'} >
                <Carousel
                    slide={false}
                    className={'choiceBoard2 d-flex flex-shrink-0'}
                    interval={null}
                    indicators={false}
                    variant={'dark'}
                    onSelect={handleAttrSelect}
                    activeIndex={attrIndex}
                >
                    {window.initState['attrData'].map(
                        (attr) => (
                            <Carousel.Item>
                                <Attr {...attr} key={attr.attrIndex} vertical={vertical} />
                            </Carousel.Item>
                        )
                    )}
                </Carousel>
                {attrToDisplay.map((attr) => (
                    <div className={'d-flex flex-shrink-0'}>
                        <Attr {...attr} key={attr.attrIndex} vertical={vertical} ></Attr>
                    
                    </div>

                ))}
            </Stack>
            <Stack className={'d-flex align-items-center justify-content-between'} direction={vertical ? 'vertical' : 'horizontal'} gap={2}>

                <Carousel
                    slide={false}
                    className={'choiceBoard2'}
                    interval={null}
                    indicators={false}
                    variant={'dark'}
                    onSelect={handleOptionSelect}
                >            {
                        window.initState['attrData'][attrIndex]['options'].map((option) => (
                            <Carousel.Item>
                                <Option {...{ ...option, attrIndex, vertical }} key={option.optionIndex}></Option>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
                {optionToDisplay.map(
                    (option) => (
                        <div className={'d-flex flex-shrink-0'}>
                            <Option {...{ ...option, attrIndex, vertical }} key={option.optionIndex}></Option>
                        </div>
                    ))}
            </Stack>
        </div>
    )
}