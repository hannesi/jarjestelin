import Paragraph from "./Paragraph"

const RearrangeArea = ({ paragraphs }) => {
    return (
        <div>
            {paragraphs.map((p, i) => <Paragraph text={p} index={i} key={i} />) }
        </div>
    )
}

export default RearrangeArea