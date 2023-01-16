import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export function SinglePizza() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState({});

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

  return (
    <>
      <img src={data.imageUrl} alt={data.title} />
      <h1>{data.title}</h1>
    </>
  );
}
