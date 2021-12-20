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
        <div>
            { index }:
            { editModeActive && 
            <ParagraphTextEditor text={text} onSubmit={editLocalText} />
            ||
                <p>{text}</p>
            }
            <button onClick={() => setEditModeActive(true)}>Muokkaa</button>
            { index !== 0 && <button onClick={() => paragraphFunctions.mergeUp(index)}>Liitä ylläolevaan</button> }
            { index !== 0 && <button onClick={() => paragraphFunctions.moveUp(index)}>Siirrä ylöspäin</button> }
            <button onClick={() => paragraphFunctions.moveDown(index)}>Siirrä alaspäin</button>
        </div>
    )
}

const ParagraphTextEditor = ({ text, onSubmit }) => {
    const [textAreaText, setTextAreaText] = useState(text)
    const submitChanges = () => onSubmit(textAreaText)
    return (
        <div>
            <textarea 
                value={textAreaText}
                onChange={ev => setTextAreaText(ev.target.value)}
            />
            <button onClick={submitChanges}>Tallenna muutokset</button>
        </div>
    )
}

export default Paragraph