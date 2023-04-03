import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { useAppSelector } from '../store/hooks';

import { Intro } from '../components/intro/intro';
import { OptionMenu } from '../components/menu/optionMenu9';
import { Configure } from '../components/configuratorView/configurator'

// import { Menu } from './components/menu/menu';
import { AttrList } from '../components/menu/attrList';
import { Quest } from '../components/quest/quest'
import { OptionList } from '../components/menu/optionList';

import { BootstrapTest } from '../components/bootstrapTest/bootstrapTest';

function App() {
  let [loaded, setLoaded] = useState(false);
  window.onload = () => {
    console.log('loaded');
    setLoaded(true)
  }
  let currentAttr = useAppSelector(state => state.selectedAttr)

  let result = window.matchMedia("(orientation:landscape)");
  let [isLandscape, setOrientation] = useState(result.matches)

  result.addEventListener("change", (e) => {
    setOrientation(e.matches)
  });

  if (loaded) {
    return (<>
      <Intro loaded={loaded}></Intro>
      {isLandscape ?
        (
          <Container fluid>
            <Row className='align-items-center justify-content-center'>
              <Col className={'d-flex justify-content-center col-6'}>
                <Configure loaded={loaded}/>
              </Col>
              <Col className='menuContainer'>
                <h5>选择要修改的部件：</h5>
                <AttrList vertical={isLandscape} />
              </Col>
              {currentAttr !== null ?
                (<Col className={'optionContainer'} >
                  <h5>为选中的部件选择颜色：</h5>
                  <OptionList attrIndex={currentAttr} vertical={isLandscape}></OptionList>
                </Col>) :
                null}
            </Row>
            <Row>
              <Quest></Quest>
            </Row>
          </Container >
        ) :
        null
      }
      {isLandscape ?
        null :
        (
          <Container >
            <Row>
              <Configure loaded={loaded}/>
            </Row>
            <Row>
              <h5>选择要修改的部件：</h5>

              <AttrList vertical={isLandscape} />
            </Row>
            {currentAttr !== null ?
              (<Row>
                <h5>为选中的部件选择颜色：</h5>
                <OptionList attrIndex={currentAttr} vertical={isLandscape}></OptionList>
              </Row>) :
              null}
            <Row>
              <Quest></Quest>
            </Row>
          </Container >
        )
      }
    </>
    )
  }
  else
    return (
      <>
        <Intro loaded={loaded}></Intro>
      </>)
}
export default App;
