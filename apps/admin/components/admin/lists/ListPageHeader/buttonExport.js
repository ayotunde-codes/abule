import React from "react"
import { useEffect, useState } from 'react'
import PlusIcon from '../../icons/plus-ico'
import Link from 'next/link'
import axios from 'axios'


export const AddAdmin = () => {
    return (
        <>
            <Link href={`/admin/manage/add`}>
                <a className={`adminApp_buttonExport`}>
                    <PlusIcon className="plus_icon" />
                    ADD
                </a>
            </Link>
        </>
    )
}

export const ExportCSV = ({ list, listType, token }) => {
    let [ids, setIDs] = useState('')

    useEffect(() => {
        console.log('listloger', list)
        setIDs(list.join())
    }, [list])

    const type = {
        'List of Users': 'users',
        'Ambassadors': 'ambassadors',
        'Waitlist': 'waitlists'
    }

    const downloadCSV = async () => {
        try {
            if (token) {
                const res = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API}/admin/${type[listType]}`,
                    responseType: 'blob',
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: {
                        ids,
                        isDownloadable: true
                    }
                })
                const url = URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.id = 'exportCSV'
                link.setAttribute('download', 'download.csv');
                document.body.appendChild(link);
                link.click();
                const elem = document.getElementById('exportCSV')
                elem.parentNode.removeChild(elem)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <a
            onClick={downloadCSV}
            className={`adminApp_buttonExport`}
            target="_self"
            rel="noopener"
        >
            EXPORT TO CSV
        </a>
    )
}