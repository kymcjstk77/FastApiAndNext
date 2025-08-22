import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

export default function Index() {
  const { replace } = useRouter();
 useLayoutEffect(() => {
    replace('/kr');
  }, []);
  return <></>;
}
