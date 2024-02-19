import React from 'react'
import { useParams } from 'react-router-dom'

export default function SearchPage() {
    const { city } = useParams();
    return (
        <span>User Search for {city}</span>
    )
}
