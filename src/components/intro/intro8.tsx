import { useState } from 'react'


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function Intro(props) {
    let { loaded } = props

    let [show, setShow] = useState(true);
    let startExp = () => {
        axios.put('./api/action', {
            userTel: window.tel,
            timestamp: Date.now(),
            actionType: 'startExperiment',
            targetIndex: -1,
            currentAttr: -1

        })
        axios.put('./api/info', {
            userTel: window.tel,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio

        })
        setShow(false);
        console.log(show)
    }

    return (
        <Modal show={show}>
            <Modal.Dialog >
                <Modal.Header>
                    <Modal.Title>您好</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>欢迎参加本次实验</p>
                    <p>某公司为提升顾客偏好表达的效率，特开发出一款产品设计工具供消费者使用。</p>
                    <p>通过使用该工具，消费者能直接进行选择，充分节省沟通与比较时间，提升购物效率。</p>
                    <p>最终，消费者设计的产品将由企业进行个性化生产制造，并交付消费者手中。</p>
                    <p>本次实验中，您需要快速高效使用该工具的功能并尽快完成您的作品。</p>
                </Modal.Body>
                <Modal.Footer>
                    {loaded ? <span>资源已加载，点击开始实验-{'>'}</span> : <span>资源加载中，请稍后...</span>}

                    <Button onClick={startExp} disabled={!loaded}>开始设计</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    )


}