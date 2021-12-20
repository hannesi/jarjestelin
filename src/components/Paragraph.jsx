import { useState } from "react"

const Paragraph = ({ text, index }) => {
    const [editing, setEditing] = useState(false)
    const [localText, setLocalText] = useState(text)
    const editLocalText = (newText) => {
        setLocalText(newText)
        setEditing(false)
    }
    return (
        <div>
            { index }:
            { editing && 
            <ParagraphTextEditor text={localText} onSubmit={editLocalText} />
            ||
                <p onClick={() => setEditing(true)}>{localText}</p>
            }
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