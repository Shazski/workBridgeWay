import { useEffect, useState } from "react"

function useDebounce(value: any, d: number) {
  const [debounce, setDebounce] = useState<any>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, d);

    return () => {
      clearTimeout(handler)
    };
  }, [value, d])

  return debounce
}

export default useDebounce;