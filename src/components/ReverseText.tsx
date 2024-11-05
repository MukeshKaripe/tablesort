import { useEffect, useState } from "react";

const ReverseText = () => {
    const [newData, setNewData] = useState(" ");
    const [newDataRef, setNewDataRef] = useState(" ");
    const [activeIndex, setActiveIndex] = useState(0);
    const reverseText = (newData: string) => {
        let giveText = newData.split(" ").reverse().join(" ");
        // console.log(giveText);
        return setNewDataRef(giveText);
    }
    useEffect(() => {
        reverseText(newData);
        const intervalId = setInterval(() => {
            return setActiveIndex(Math.floor(Math.random() * 60) );

        }, 1000);
        return () => clearInterval(intervalId);
    }, [newData])

    return (
        <>
            <h6>
                Enter Text to Return
            </h6>
            <input type="text" name="dataLoad" value={newData} onChange={(e) => console.log(setNewData(e.target.value))
            } ></input>
            <div>Reveresed Text: {newDataRef}</div>

            <div className="box-grid">
                {[...Array(60)].map((_, index) => (
                    <div key={index} className={`box ${activeIndex === index ? "active" : ""}`} />
                ))}
            </div>
        </>
    )

}
export default ReverseText;