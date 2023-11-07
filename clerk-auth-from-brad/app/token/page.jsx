import { Token } from "@/components/Token";

const TokenPage = () => {
  return (
    <>
      <h1 className='text-2xl font-bold mb-5'>Token</h1>
      <p className='mb-5 text-sm'>
        <Token />
      </p>
    </>
  );
};

export default TokenPage