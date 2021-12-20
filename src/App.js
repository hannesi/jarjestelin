import { useEffect, useState } from 'react'
import RearrangeArea from './components/RearrangeArea';

function App() {
  const [input, setInput] = useState('')
  const [paragraphs, setParagraphs] = useState([])
  const handleSubmit = () => {
    setParagraphs(input.split('\n').map(s => s.trim()))
  }
  const [askingConfirmation, setAskingConfirmation] = useState(false)
  const paragraphFunctions = {
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
    mergeUp: (index) => {
      const newParagraphs = paragraphs.filter((_, i) => i !== index && i !== index - 1)
      setParagraphs([
        ...newParagraphs.slice(0, index - 1),
        paragraphs[index - 1] + ' ' + paragraphs[index],
        ...newParagraphs.slice(index - 1)
      ])
    },
    moveUp: (index) => {
      setParagraphs([
        ...paragraphs.slice(0, index - 1),
        paragraphs[index],
        paragraphs[index-1],
        ...paragraphs.slice(index + 1)
      ])
    },
    moveDown: (index) => {
      index !== paragraphs.length - 1 && setParagraphs([
        ...paragraphs.slice(0, index),
        paragraphs[index+1],
        paragraphs[index],
        ...paragraphs.slice(index + 2)
      ])
    }
  }
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
