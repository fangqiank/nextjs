export const getWikiResults = async (term: string) => {
	const searchParams = new URLSearchParams({
		action: 'query',
        generator: 'search',
        gsrsearch: term,
        gsrlimit: '20',
        prop: 'pageimages|extracts',
        exchars: '100',
        exintro: 'true',
        explaintext: 'true',
        exlimit: 'max',
        format: 'json',
        origin: '*',
	})

	const res = await fetch(`https://en.wikipedia.org/w/api.php?${searchParams}`)

	return res.json()
};
