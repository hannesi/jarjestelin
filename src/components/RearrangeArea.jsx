import Paragraph from "./Paragraph"

const RearrangeArea = ({ paragraphs, paragraphFunctions }) => {
    return (
        <div>
            {paragraphs.map((p, i) => <Paragraph text={p} index={i} paragraphFunctions={paragraphFunctions} key={i} />) }
        </div>
    )
}

export default RearrangeArea