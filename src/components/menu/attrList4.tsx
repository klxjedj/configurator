import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';

import axios from 'axios';

import { attrSelected } from '../../store/slices/attrSlice';
import { optionSelected } from '../../store/slices/optionSlice';
import { useAppDispatch } from '../../store/hooks';
import { useAppSelector } from '../../store/hooks';

import { Attr } from "./attr3"
import { Option } from './option3';

const choiceNum = 4

export function AttrList({ vertical }) {

    let dispatch = useAppDispatch()
    const currentAttr: number | null = useAppSelector((state) => state.selectedAttr);
    const currentOption: number | null = useAppSelector((state) => state.selectedOption)

    let attrIndex = currentAttr == null ? 0 : currentAttr;
    let optionIndex = currentOption == null ? 0 : currentOption

    let attrToDisplay = window.initState['attrData'].length - attrIndex - 1 > choiceNum ? window.initState['attrData'].slice(attrIndex + 1, attrIndex + 1 + choiceNum) : window.initState['attrData'].slice(attrIndex + 1,).concat(window.initState['attrData'].slice(0, choiceNum + attrIndex + 1 - window.initState['attrData'].length));
    let optionToDisplay = window.initState['attrData'][attrIndex]['options'].length - optionIndex - 1 > choiceNum ? window.initState['attrData'][attrIndex]['options'].slice(optionIndex + 1, optionIndex + 1 + choiceNum) : window.initState['attrData'][attrIndex]['options'].slice(optionIndex + 1,).concat(window.initState['attrData'][attrIndex]['options'].slice(0, choiceNum + optionIndex + 1 - window.initState['attrData'][attrIndex]['options'].length));

    let direction = vertical ? '' : 'flex-column';

    let handleAttrSelect = (selectedIndex, e) => {
        axios.put('./api/action', {
            userTel: window.tel,
            timestamp: Date.now(),
            actionType: 'attrSelect',
            targetIndex: selectedIndex,
            currentAttr: currentAttr

        });
        dispatch(optionSelected(null));
        dispatch(attrSelected(selectedIndex));
    }
    let handleOptionSelect = (selectedIndex, e) => {
        axios.put('./api/action', {
            userTel: window.tel,
            timestamp: Date.now(),
            actionType: 'optionSelect',
            targetIndex: selectedIndex,
            currentAttr: currentAttr

        });
        dispatch(optionSelected(selectedIndex));
    }

    return (
        <div className={`d-flex ${direction} flex-grow-0 justify-content-center gap-2`}>
            {vertical ? null : '点击左下方图标中的 < 、>选择要修改的部位：'}
            <Stack className={`d-flex align-items-center justify-content-between`} direction={vertical ? 'vertical' : 'horizontal'} key={'attr'}>
                {vertical ? '点击左下方图标中的 < 、>选择要修改的部位：' : null}
                <Carousel
                    slide={false}
                    className={'choiceBoard2 d-flex flex-shrink-0'}
                    interval={null}
                    indicators={false}
                    variant={'dark'}
                    onSelect={handleAttrSelect}
                    activeIndex={attrIndex}
                    key={'attrCarousel'}
                >
                    {window.initState['attrData'].map(
                        (attr) => (
                            <Carousel.Item key={`carouselAttr${attr.attrIndex}`}>
                                <Attr {...attr}  vertical={vertical} />
                            </Carousel.Item>
                        )
                    )}
                </Carousel>
                {/* {attrToDisplay.map((attr) => (
                    <div className={'d-flex flex-shrink-0'} key={`attr${attr.attrIndex}`} >
                        <Attr {...attr} vertical={vertical} ></Attr>

                    </div>

                ))} */}
            </Stack>
            {vertical ? null : '点击左下方图标中的 < 、>为要修改的部位选择颜色：'}
            <Stack className={'d-flex align-items-center justify-content-between'} direction={vertical ? 'vertical' : 'horizontal'} key={'option'} gap={2}>
                {vertical ? '点击左下方图标中的 < 、>为要修改的部位选择颜色：' : null}
                <Carousel
                    slide={false}
                    className={'choiceBoard2'}
                    interval={null}
                    indicators={false}
                    variant={'dark'}
                    onSelect={handleOptionSelect}
                    activeIndex={optionIndex}
                    key={'optionCarousel'}
                >
                    {
                        window.initState['attrData'][attrIndex]['options'].map((option) => (
                            <Carousel.Item key={`carouselOption${option.optionIndex}`}>
                                <Option {...{ ...option, attrIndex, vertical }} ></Option>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
                {/* {optionToDisplay.map(
                    (option) => (
                        <div className={'d-flex flex-shrink-0'} key={`option${option.optionIndex}`}>
                            <Option {...{ ...option, attrIndex, vertical }} ></Option>
                        </div>
                    ))} */}
            </Stack>
        </div>
    )
}