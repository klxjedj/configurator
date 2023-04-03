import {useState} from 'react'


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function Intro(props){
    let {loaded}=props
    let [show,setShow]=useState(true);
    let startExp=()=>{
        axios.put('./api/action',{
            userTel:window.tel,
            timestamp:Date.now(),
            actionType:'startExperiment',
            targetIndex:-1,
            currentAttr:-1

        })
        axios.put('./api/info',{
            userTel:window.tel,
            screenWidth:window.innerWidth,
            screenHeight:window.innerHeight,
            pixelRatio:window.devicePixelRatio

        })
        setShow(false);
        console.log(show)
    }

    return(
        <Modal show={show}>
        <Modal.Dialog >
            <Modal.Header>
            <Modal.Title>您好</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>欢迎参加本次实验</p>
                <p>夏天将至，您打算购买一双休闲运动鞋。在经过一番挑选之后，某品牌一种型号的运动鞋吸引了您。</p>
                <p>然而不幸的是，该型号目前销售的所有颜色都不能令您满意。</p>
                <p>最后，该品牌商家向您提供了专用的在线设计工具，让您可以根据自己的偏好设计该运动鞋的配色方案，定制一双您专属的运动鞋。</p>
            </Modal.Body>
            <Modal.Footer>
                {loaded?<span>资源已加载，点击开始实验-{'>'}</span>:<span>资源加载中，请稍后...</span>}
                <Button onClick={startExp}
                 disabled={!loaded}
                 >开始设计</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </Modal>
    )

    
}