import {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import { useStore } from '../../app/stores/store';

const StyledForm = styled.form<{$stacked: boolean}>`
    background-color: white;
    border:1px solid lightgray;
    border-radius: 30px;
    padding: 7px;
    min-width: 400px;
    width: 90vw;
    max-width: 800px;
    height: auto;
    max-height: 40vh;
    overflow: hidden;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1100;

    display: grid;
    grid-template-columns: 1fr 50px;
    /* grid-template-columns: 50px 1fr 50px; */
    grid-template-rows: auto;
    grid-template-areas: ${({$stacked})=>(
        $stacked ? 
        `
            "ta ta"
            ". send"
        `
        :
        `
            "ta send"
        `
    )};
    column-gap: 6px;
    align-items: end;
    &:hover{
        cursor: text;
    }
    .ta-wrapper{
        grid-area:ta;
        height: 100%;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .userInput{
        border:0;
        width: 100%;
        font-size: larger;
        margin: 5px 0;
        resize: none;
        max-height: 30vh;
        overflow-y: auto;
        line-height: 20px;
    }
    .userInput:focus{
        outline: none;
    }
    .addFileBtn{
        grid-area: add;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 0;
        background-color: white;
        font-size: xx-large;
    }
    .addFileBtn:hover{
        background-color: #f7f7f7;
    }
    .sendBtn{
        grid-area: send;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid lightgray;
    }
    .sendBtn:hover{
        box-shadow: 0 0 5px lightgrey;
    }
    .sendBtn img{
        width: 20px;
        height: 20px;
    }
`

interface Props{
    bottom?: "20px" | "50%"
}

function UserInput({bottom="50%"}:Props) {
    const [text, setText] = useState<string>('');
    const [stacked, setStacked] = useState<boolean>(false);
    const {analyzerStore:{sendMessage}} = useStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    // cache metrics once
    // vpad - vertical padding
    const metricsRef = useRef<{lineHeight:number, vpad:number}|null>(null);
    // rAF guard, (request animation frame)
    const rafRef = useRef<number | null>(null);
    
    function handleSubmit(){
        if (text){
            sendMessage(text);
            setText('')
        }
    }


    function handleKeyDown(e:React.KeyboardEvent<HTMLFormElement>){
        if (e.key === 'Enter' && e.shiftKey){
            return;
        }
        if (e.key === 'Enter' && !e.shiftKey){
            e.preventDefault()
            handleSubmit()
        }
    }

    useEffect(()=>{
        const textarea = textareaRef.current!;
        const computedStyle = window.getComputedStyle(textarea);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const vpad = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        metricsRef.current = {lineHeight, vpad}
    },[])

    useEffect(()=>{
        const textarea = textareaRef.current;
        if (!textarea || !metricsRef.current) return;

        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        rafRef.current = requestAnimationFrame(()=> {
            // auto resize
            textarea.style.height = "auto";
            const sh = textarea.scrollHeight
            textarea.style.height = `${sh}px`;
            
            const {lineHeight, vpad} = metricsRef.current!;
            const rows = Math.round((sh - vpad)/lineHeight);
            setStacked(rows >= 2);
        })

        return ()=>{
            cancelAnimationFrame(rafRef.current)
        }
    },[text])


    return ( 
        <StyledForm
            $stacked={stacked}
            onClick={(e)=>{
                if (e.target === e.currentTarget){
                    textareaRef.current?.focus()
                }
            }}
            style={{bottom}}
            onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}
            onKeyDown={(e)=>handleKeyDown(e)}
        >
            {/* <button className='addFileBtn'>
                +
            </button> */}
            <div className='ta-wrapper'>
                 <textarea 
                ref={textareaRef}
                value={text} 
                className="userInput"
                placeholder='Write text to analyze'
                rows={1}
                onChange={(e)=>setText(e.target.value)}/>
            </div>
            <button className='sendBtn' type='submit'>
                <img alt="send" src="./arrow-up.png"/>
            </button>
        </StyledForm>
     );
}

export default UserInput;