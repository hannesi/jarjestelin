import { useState } from "react"

const Paragraph = ({ text, index, paragraphFunctions }) => {
    // whether edit mode is active or not
    const [editModeActive, setEditModeActive] = useState(false)
    // to be called when editing is submitted
    const editLocalText = (newText) => {
        paragraphFunctions.edit(index, newText)
        setEditModeActive(false)
    }
    return (
        <div className='paragraph-box'>
            <div className='pb-side'>
                { index }
                <div className='pb-side-buttons'>
                    <button onClick={() => setEditModeActive(true)}>Muokkaa</button>
                    { index !== 0 && <button onClick={() => paragraphFunctions.moveUp(index)}>Siirrä ylöspäin</button> }
                    { index !== 0 && <button onClick={() => paragraphFunctions.mergeUp(index)}>Liitä ylläolevaan</button> }
                    <button onClick={() => paragraphFunctions.moveDown(index)}>Siirrä alaspäin</button>
                </div>
            </div>
            <div className='pb-text'>
                { editModeActive && 
                    <ParagraphTextEditor text={text} onSubmit={editLocalText} onCancel={() => setEditModeActive(false)} />
                || <p>{text}</p>
                }
            </div>
        </div>
    )
}

const ParagraphTextEditor = ({ text, onSubmit, onCancel }) => {
    const [textAreaText, setTextAreaText] = useState(text)
    const submitChanges = () => onSubmit(textAreaText)
    return (
        <div>
            <div>
                <textarea 
                    value={textAreaText}
                    onChange={ev => setTextAreaText(ev.target.value)}
                />
            </div>
            <button onClick={onCancel}>Peruuta</button>
            <button onClick={submitChanges}>Tallenna muutokset</button>
        </div>
    )
}

export default Paragraph