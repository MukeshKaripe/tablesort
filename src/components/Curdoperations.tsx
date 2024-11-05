import React, { useEffect, useState } from "react";
import { deleteData, getData, postDataApi, updateDataApi } from "../Api/Api";
interface key {
    body: string,
    id: number,
    title: string,
    userId: number
}
interface payloadData {
    title: string,
    body: string,
    id?: number;
}
const CurdOperations = () => {
    const [data, setData] = useState<key[]>([]);
    const [error, setError] = useState('');
    const [postData, setPostData] = useState<payloadData>({
        title: "",
        body: "",
    });
    const fetchData = async () => {
        try {
            const res = await getData();
            console.log(res.data);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async (id: number) => {
        try {
            const res = await deleteData(id);
            if (res.status === 200) {
                const newValue = data.filter((curid: key) => {
                    return curid.id != id;
                })
                setData(newValue)
            }

        } catch (error) {
            console.log(error);

        }
    }
    const handleFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setPostData((prev) => {
            console.log(prev);
            return ({ ...prev, [name]: value })
        });
    }
    const handlePostData = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (postData.id) {
            try {
                const res = await updateDataApi(postData.id, postData);
                if (res.status === 200)
                    setData((curid) => curid.map((item) => (item.id === postData.id) ? res.data : item))
                setPostData({ title: "", body: "" });
            } catch (error) {

            }
        }
        try {
            const res = await postDataApi(postData);
            if (res.status === 201) {
                setData((prevData) => [...prevData, res.data]);
                setPostData({ title: "", body: "" });
            }
        } catch (error) {
        }
    };
    const handleUpdate = (item: key) => {
        setPostData({
            title: item.title,
            body: item.body,
            id: item.id,
        });
    }
    const focusEvent = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'title' && !value) {
            setError('title is required');
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div>
                <form onSubmit={handlePostData} >
                    <input type="text" id="title" name="title" onBlur={focusEvent} placeholder="Title" value={postData.title} onChange={handleFields} />
                    <input type="text" id="body" name="body" placeholder="add text" value={postData.body} onChange={handleFields} />
                    {error && <p>{error}</p>}
                    <button type="submit"> {postData.id ? 'UPDATE' : 'ADD'} </button>
                </form>
            </div>

            <div>
                {data.map((val: key, index) => {
                    const { id, title, body } = val;
                    return (
                        <>
                            <ul>
                                <li key={index}>
                                    {index + 1}    {val.title}
                                    <strong>       {val.body}</strong>
                                </li>
                            </ul>
                            <button onClick={() => handleUpdate(val)}>Edit</button>
                            <button onClick={() => handleDelete(val.id)} >Delete</button>

                        </>
                    );
                })}
            </div>

        </>
    );

}
export default CurdOperations;