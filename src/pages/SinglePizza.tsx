import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface ISinglePizza {
  imageUrl: string;
  title: string;
}

export function SinglePizza() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState<ISinglePizza>();

  React.useEffect(() => {
    axios
      .get(`https://63a9b662594f75dc1dbe1f39.mockapi.io/items/${id}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  }, []);

  if (!data) {
    return <> Загрузка ... </>;
  }

  return (
    <>
      <img src={data.imageUrl} alt={data.title} />
      <h1>{data.title}</h1>
    </>
  );
}
