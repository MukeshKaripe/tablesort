import { useEffect, useState } from "react";
import { deleteData, getData } from "../Api/Api";
interface key {
    body: String,
    id: Number,
    title: String,
    userId: Number
}
const CurdOperations = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const res = await getData();
            console.log(res.data);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async (id:Number) => {
    try {
     const res = await deleteData(id);
     if(res.status === 200) {
        const newValue = data.filter((curid:key) => {
            return curid.id != id;
        })
     setData(newValue)
     }

    } catch (error) {
        console.log(error);
        
    }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {data.map((val: key , index) => {
                return (
                    <>
                        <ul>

                            <li key={index}>
                            {index + 1}    {val.title}
                         <strong>       {val.body}</strong>
                            </li>
                        </ul>
<button>Edit</button>
<button onClick={() => handleDelete(val.id)} >Delete</button>

                    </>
                );
            })}
            <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim itaque facere molestiae voluptatibus, ex debitis? Nobis quas exercitationem veritatis, ab doloremque architecto ratione animi ipsum repudiandae suscipit reiciendis voluptates pariatur?</p>

        </>
    );

}
export default CurdOperations;