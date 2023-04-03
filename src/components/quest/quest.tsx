import {Button} from 'react-bootstrap';

import {useState} from 'react';
import axios from 'axios';

import {Confirm} from './confirm';
import {QuestList} from './questList'

export function Quest(){
    let [confirm,setConfirm]=useState(false);
    let [quest,setQuest]=useState(false);

    let checkConfirm=()=>{
        setConfirm(true)
    }

    let confirmed=()=>{
        axios.put('./api/action',{
            userTel:window.tel,
            timestamp:Date.now(),
            actionType:'stopExperiment',
            targetIndex:-1,
            currentAttr:-1

        })
        setConfirm(false);
        setQuest(true);
    }
    let cancelled=()=>{
        setConfirm(false);
    }

    return <>
        <Button onClick={checkConfirm}>完成实验</Button>
        <Confirm show={confirm} confirmed={confirmed} cancelled={cancelled}></Confirm>
        <QuestList show={quest} ></QuestList>
    </>
}