'use client'

import { useState } from "react";

export default function Example1() {

    const [value, setValue] = useState('')

    const [infoText, setInfoText] = useState('')


    const winValue = 31;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = () => {
        const numberValue = parseInt(value)


        if (isNaN(numberValue)) {
            setInfoText('Введите число.')
        } else
            if (winValue === numberValue) {
                setInfoText('Поздравляем! Вы угадали.')
            } else if (winValue > numberValue) {
                setInfoText('Число должно быть больше.')
            } else if (winValue < numberValue) {
                setInfoText('Число должно быть меньше.')
            }
    }


    return (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.12)]">
            <span className="text-yellow-500 font-semibold uppercase tracking-wide">example-1</span>
            <h2 className="text-gray-800 text-xl font-medium mb-2">Угадайте число от 1 до 100</h2>
            <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                onChange={handleInputChange}
                placeholder="Введите число"
            />
            <button
                className="bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 active:bg-yellow-700 transition"
                onClick={handleSubmit}
            >
                Проверить
            </button>
            <div className="text-gray-700 font-medium">
                {infoText}
            </div>
        </div>
    );
}