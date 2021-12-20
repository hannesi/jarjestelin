import { useState } from "react"

const Paragraph = ({ text, index, paragraphFunctions }) => {
    const [editing, setEditing] = useState(false)
    const editLocalText = (newText) => {
        paragraphFunctions.edit(index, newText)
        setEditing(false)
    }
    return (
        <div>
            { index }:
            { editing && 
            <ParagraphTextEditor text={text} onSubmit={editLocalText} />
            ||
                <p onClick={() => setEditing(true)}>{text}</p>
            }
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