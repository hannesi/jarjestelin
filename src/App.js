import { useState } from 'react'
import RearrangeArea from './components/RearrangeArea';

function App() {
  // value of the textarea used for initial input
  const [input, setInput] = useState('')
  // paragraphs that are formed when initial input is submitted
  const [paragraphs, setParagraphs] = useState([])
  // submit function for initial input 
  const handleSubmit = () => {
    setParagraphs(input.split('\n').map(s => s.trim()))
  }
  // for checking whether the user really wants to reset paragraphs
  const [askingConfirmation, setAskingConfirmation] = useState(false)
  // a collection of functions to be passed as a prop for paragraph components
  const paragraphFunctions = {
    /** a function used for editing and splitting paragraphs
     * 
     * @param {number} index: index of the edited paragraph
     * @param {string} newParagraphs: a string containing the edited paragraph(s)
     */
    edit: (index, newParagraphs) => {
      setParagraphs([
        ...paragraphs.slice(0, index),
        ...newParagraphs
            .split('\n')
            .map(s => s.trim())
            .filter(s => s.length !== 0),
        ...paragraphs.slice(index + 1)
      ])
    },
    /** merges a paragraph to the one before it
     * 
     * @param {number} index: index of the paragraph to be merged to the one before it
     */
    mergeUp: (index) => {
      const newParagraphs = paragraphs.filter((_, i) => i !== index && i !== index - 1)
      setParagraphs([
        ...newParagraphs.slice(0, index - 1),
        paragraphs[index - 1] + ' ' + paragraphs[index],
        ...newParagraphs.slice(index - 1)
      ])
    },
    /** switches a paragraph's position with the one before it
     * 
     * @param {number} index 
     */
    moveUp: (index) => {
      index !== 0 && setParagraphs([
        ...paragraphs.slice(0, index - 1),
        paragraphs[index],
        paragraphs[index-1],
        ...paragraphs.slice(index + 1)
      ])
    },
    /** switches a paragraph's position with the one after it
     * 
     * @param {number} index 
     */
    moveDown: (index) => {
      index !== paragraphs.length - 1 && setParagraphs([
        ...paragraphs.slice(0, index),
        paragraphs[index+1],
        paragraphs[index],
        ...paragraphs.slice(index + 2)
      ])
    }
  }
  // resets paragraphs, called when returning to initial input mode
  const resetParagraphs = () => {
    setParagraphs([])
    setAskingConfirmation(false)
  }
  return (
    <div>
      { paragraphs.length === 0 &&
        <div>
          <div>
            <textarea 
            value={input} 
            onChange={ev => setInput(ev.target.value)}
            cols={60}
            rows={16}
            />
          </div>
        <button onClick={() => setInput('')}>Tyhjennä</button>
        <button onClick={handleSubmit}>Pilko kappaleiksi</button>
        </div>
      || !askingConfirmation && 
        <button onClick={() => setAskingConfirmation(true)}>Palaa alkuun</button> 
      || 
        <button onClick={resetParagraphs}>Olen varma</button>}
      <RearrangeArea paragraphs={paragraphs} paragraphFunctions={paragraphFunctions} />
    </div>
  );
}

export default App;
