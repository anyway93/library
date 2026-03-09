'use client'

import { useState } from "react";

export default function Home() {

  const [value, setValue] = useState('')

  const [infoText, setInfoText] = useState('')


  const winValue = 31;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    // console.log(value);
  }

  const handleSubmit = () => {
    const numberValue = parseInt(value)

    if (winValue === numberValue) {
      setInfoText('Поздравляем! Вы угадали.')
    } else if (winValue > numberValue) {
      setInfoText('Число должно быть больше.')
    } else if (winValue < numberValue) {
      setInfoText('Число должно быть меньше.')
    }




    console.log(typeof numberValue, numberValue);

  }


  return (
    <div className="p-20 m-5 border flex flex-col gap-2" >
      <input type="text" className="bg-amber-300" onChange={handleInputChange} />
      <button className="bg-blue-900 text-white p-2" onClick={handleSubmit}>Проверить</button>
      <div className="bg-amber-200 h-8">
        {infoText}
      </div>
    </div>
  );
}