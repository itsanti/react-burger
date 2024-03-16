import React, { useState } from 'react';

type InputValues<T = { [key: string]: string }> = T;

export function useForm<T>(inputValues: InputValues<T>) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
