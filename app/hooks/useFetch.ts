import { useEffect, useState } from "react";

export default function useFetch<T>(url: string) {

    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        fetch(url).then(res => {
            if (!res.ok) throw new Error('Ошибка HTTP :' + res.status)


            return res.json()
        }).then(data => {
            setData(data);
            setLoading(false)
        }).catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, [url])


    return { data, error, loading }

}