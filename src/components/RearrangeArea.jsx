import Paragraph from "./Paragraph"

const RearrangeArea = ({ paragraphs, paragraphFunctions }) => {
    return (
        <div>
            { paragraphs.length !== 0 && <h3>Huom! Kappaleen voi jakaa osiin lisäämällä rivinvaihtoja muokkaustilassa. Näin voit esimerkiksi hahmotella kappaleen lauseiden järjestystä.</h3> }
            {paragraphs.map((p, i) => <Paragraph text={p} index={i} paragraphFunctions={paragraphFunctions} key={i} />) }
        </div>
    )
}

export default RearrangeArea