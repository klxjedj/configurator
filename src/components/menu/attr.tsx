import { useAppDispatch } from '../../store/hooks';
import { optionSelected } from '../../store/slices/optionSlice';
import { Option } from './option'
import "./attr.css";

interface AttrProp {
    attrName: string;
    src: string | null
    attrIndex: number
}

export function Attr(prop: AttrProp) {
    let { attrIndex, attrName, src:imgSrc } = prop;
    // let dispatch = useAppDispatch()
    // let selectAttr = (e) => {
    //     console.log(attrIndex)
    //     dispatch(optionSelected(attrIndex))

    // }


    return (
        <div >

            <div >
                <div className='attrClassName'>{attrName}</div>
                <div className='attrIcon'><img src={`nikeid/${imgSrc}`} ></img></div>
                <div className='options'>
                {window.initState['attrData'][attrIndex]['options'].map((option) => (
                    <Option {...{...option,attrIndex}} key={option.optionIndex}></Option>
                ))}
            </div>

            </div>

        </div>)


}