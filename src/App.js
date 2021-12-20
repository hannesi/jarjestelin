import { useEffect, useState } from 'react'
import RearrangeArea from './components/RearrangeArea';

function App() {
  const [input, setInput] = useState('')
  const [paragraphs, setParagraphs] = useState([])
  const handleSubmit = () => {
    setParagraphs(input.split('\n'))
  }
  const [askingConfirmation, setAskingConfirmation] = useState(false)
  const resetParagraphs = () => {
    setParagraphs([])
    setAskingConfirmation(false)
  }
  useEffect(() => console.log(paragraphs), [paragraphs.length])
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
      <RearrangeArea paragraphs={paragraphs} />
    </div>
  );
}

export default App;
