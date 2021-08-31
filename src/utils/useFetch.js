import useSWR from 'swr'

async function fetcher(url) {
    const res = await fetch(url)

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        // Adjunta información extra al objeto de error.
        error.info = await res.json()
        error.status = res.status
        throw error
    }

    return res.json()
}

function useFetch(url, query, options = { dedupingInterval: 1000, errorRetryInterval: 1000 } ) {
    let q = ""
    if (query) {
        const params = new URLSearchParams(query).toString()
        q = `?${params}`
    }

    const { error, data, isValidating, mutate } = useSWR(url && `/api/${url}${q}`, fetcher, options)

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
        isValidating
    }
}

export const useEthereumAddressBalance = address => {
    const shouldFetch = address && typeof address === "string" && address.length === 42
    return useFetch(shouldFetch && 'eth/balance', { address }, { shouldRetryOnError: false })
}

export default useFetch