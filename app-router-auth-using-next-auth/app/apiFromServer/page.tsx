import {headers} from 'next/headers'

const ApiFromServerPage = async () => {
	const result = await fetch('http://localhost:3000/api/whoAmI', {
		method: 'GET',
		headers: headers()
	}).then(res => res.json())

	return (
    <div>
      <div>
        API Route From <span className="font-bold underline">Server</span>
      </div>
      <div>Name: {result?.name}</div>
    </div>
  );
};

export default ApiFromServerPage
