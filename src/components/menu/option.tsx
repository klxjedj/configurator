import {useAppDispatch } from '../../store/hooks';
import { attrSelected } from '../../store/slices/attrSlice';
import {optionSelected} from '../../store/slices/optionSlice';
import "./option.css";

interface OptionProp {
    optionColorCode: string;
    optionColorName: string;
    src: string | null
    optionIndex: number
    attrIndex:number
}

export function Option(prop: OptionProp) {
    let { optionIndex, optionColorName, optionColorCode, src:imgSrc,attrIndex} = prop;
    let dispatch=useAppDispatch()
    let selectOption=(e)=>{
        console.log("option: attrIndex:",attrIndex)
        console.log("option:optionIndex:",optionIndex)
        dispatch(attrSelected(attrIndex))
        dispatch(optionSelected(optionIndex))
        
    }

    return (
        <div className="option">
            <div className='optionClassName'>{optionColorName}</div>
            <div onClick={selectOption}>
                {imgSrc !==undefined
                    ? (<div><img src={`nikeid/${imgSrc}`}></img></div>)
                    : (<div className='optionIcon' style={{ backgroundColor: `#${optionColorCode}` }}></div>)}
            </div>

        </div>)


}