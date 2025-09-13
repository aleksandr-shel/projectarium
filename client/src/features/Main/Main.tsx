import * as React from 'react';
import styled from 'styled-components';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import UserInput from '../UserInput/UserInput';
import MessageComponent from '../Messages/MessageComponent';

const MainDivMessages = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const MessagesDiv = styled.div`
    height: auto;
    min-height: 90vh;
    min-width: 400px;
    width: 90vw;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin-bottom: 90px;
`

export default observer(function Main() {
    const {analyzerStore: {messages}} = useStore()
    React.useEffect(()=>{
        if ("scrollRestoration" in window.history){
            window.history.scrollRestoration = 'manual'
        }
        window.scrollTo(0, document.body.scrollHeight)
    },[messages.length])
    
    return ( 
        <>
            {
                messages.length > 0 ?
                <MainDivMessages>
                    <MessagesDiv>
                        {messages?.map((mes)=>(
                            <React.Fragment key={mes.id}>
                                <MessageComponent message={mes}/>
                            </React.Fragment>
                        ))}
                    </MessagesDiv>
                    <UserInput bottom='20px'/>
                </MainDivMessages>
                :
                <>
                    <UserInput bottom='50%'/>
                </>
            }
        </>
     );
})
