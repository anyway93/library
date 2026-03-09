'use client'
import { useRef, useState } from "react";

export default function Example2() {
    const [inputValue, setInputValue] = useState<number>(0); // изначально 0, потому что NaN неудобен
    const [intervalActive, setIntervalActive] = useState(false);
    const [timer, setTimer] = useState<number | null>(null);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const valueTempRef = useRef<number>(0);

    // Обработка ввода — только числа
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setInputValue(isNaN(val) ? 0 : val);
        setTimer(isNaN(val) ? null : val);
        valueTempRef.current = isNaN(val) ? 0 : val;
    };

    // Начать/продолжить таймер
    const handleStart = () => {
        if (intervalActive) {
            alert("Таймер уже запущен");
            return;
        }
        if (timer === null || timer <= 0) {
            alert("Введите положительное время");
            return;
        }

        setIntervalActive(true);

        intervalRef.current = setInterval(() => {
            if (valueTempRef.current <= 1) {
                // Таймер дошёл до конца — остановить интервал и сбросить состояние
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
                setIntervalActive(false);
                setTimer(0);
                valueTempRef.current = 0;
            } else {
                valueTempRef.current -= 1;
                setTimer(valueTempRef.current);
            }
        }, 1000);
    };

    // Пауза таймера
    const handlePause = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIntervalActive(false);
        }
    };

    // Сброс таймера
    const handleReset = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimer(inputValue > 0 ? inputValue : null);
        valueTempRef.current = inputValue > 0 ? inputValue : 0;
        setIntervalActive(false);
    };

    return (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.12)]">
            <span className="text-yellow-500 font-semibold uppercase tracking-wide">example-2</span>
            <input
                type="number"
                min={0}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                placeholder="Введите количество секунд"
                value={inputValue}
                onChange={handleInputChange}
            />
            <div className="flex gap-2">
                <button
                    className={`bg-green-700 w-full text-white py-2 rounded-md font-semibold hover:bg-green-800 active:bg-green-800 transition ${intervalActive ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={intervalActive}
                    onClick={handleStart}
                >
                    Старт
                </button>
                <button
                    className={`bg-gray-500 w-full text-white py-2 rounded-md font-semibold hover:bg-gray-600 active:bg-gray-600 transition ${!intervalActive ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={!intervalActive}
                    onClick={handlePause}
                >
                    Пауза
                </button>
                <button
                    className="bg-red-700 w-full text-white py-2 rounded-md font-semibold hover:bg-red-800 active:bg-red-800 transition"
                    onClick={handleReset}
                >
                    Сброс
                </button>
            </div>
            <div className="text-gray-700 font-medium text-center text-2xl select-none">
                {timer !== null ? timer : "-"}
            </div>
        </div>
    );
}