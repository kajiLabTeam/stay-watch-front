const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

const Test = () => {
  // const { data, error } = useSWR(
  //   [
  //     `${baseURL}/user/v1/check`,
  //     useUser()
  //       ?.getIdToken()
  //       .then((token) => {
  //
  //         return token;
  //       }),
  //   ],
  //   fetcher
  // );

  //

  return <div />;
};

export default Test;
