'use client'
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";



export default function Example3() {

    interface ITask {
        id: number
        name: string
        state: 'active' | 'closed'
    }


    const [tasks, setTasks] = useState<ITask[]>([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks')

        const storageTasks = savedTasks ? JSON.parse(savedTasks) : []

        setTasks(storageTasks)
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])


    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleAddTask = () => {

        let taskAdd: ITask

        if (tasks.length) {
            console.log(tasks.length, true)
            const lastTask = tasks[tasks.length - 1]

            taskAdd = {
                id: lastTask.id + 1,
                name: inputValue,
                state: 'active'
            }
        } else {
            console.log(tasks.length, false)
            taskAdd = {
                id: 0,
                name: inputValue,
                state: 'active'
            }
        }

        const newTasks: ITask[] = [
            ...tasks, taskAdd
        ]

        setTasks(newTasks)
    }

    const handleDeleteTask = (id: number) => {

        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
    }

    const handleUpdateTask = (id: number) => {

        const indexTask = tasks.findIndex(task => task.id === id)

        const currentTask = tasks[indexTask]

        const updatedTasks = tasks.map(task => task.id === id ? { ...task, state: task.state === 'active' ? 'closed' : 'active' as 'active' | 'closed' } : task)

        setTasks(updatedTasks)
    }

    return (
        <div className=" p-6 bg-white rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.12)]">

            <span className="block text-2xl font-semibold mb-4">Добавьте задачу</span>

            <div className="flex space-x-2 mb-6">
                <input
                    type="text"
                    placeholder="Введите название"
                    className="grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChangeInput}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={handleAddTask}>
                    Добавить
                </button>
            </div>

            <div>
                {tasks.map(task =>
                    <div className={clsx('flex justify-between items-center  p-3 rounded-md shadow-sm mb-2', task.state === 'active' ? 'bg-gray-100' : 'bg-green-400')} key={task.id}>
                        <span className="text-gray-800">{task.name} | <span className="text-xs">id - {task.id}</span></span>
                        <div className="flex space-x-2">
                            <button className={clsx('text-white px-3 py-1 rounded transition', task.state === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600')} onClick={() => handleUpdateTask(task.id)}>
                                {task.state === 'active' ? 'Выполнено' : 'Возобновить'}
                            </button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" onClick={() => handleDeleteTask(task.id)}>
                                Удалить
                            </button>
                        </div>
                    </div>)}

            </div>
        </div>

    )
}