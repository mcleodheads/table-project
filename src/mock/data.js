import uuid from 'react-uuid'

export const config = {
    tableHeaders: [
        {
            key: 'name',
            text: 'имя',
            value: 'имя',
        },
        {
            key: 'date',
            text: 'дата',
            value: 'дата',
        },
        {
            key: 'surname',
            text: 'фамилия',
            value: 'фамилия',
        },
        {
            key: 'patronymic',
            text: 'отчество',
            value: 'отчество',
        },
    ],
    tableData: [
        {
            id: `${uuid()}`,
            name: 'Ivan',
            date: `${new Date()}`,
            surname: 'Ivanov',
            patronymic: 'Ivanovich',
        },
        {
            id: `${uuid()}`,
            name: 'Petr',
            date: `Mon Oct 22 2021 01:56:27 GMT+0300 (Москва, стандартное время)`,
            surname: 'Petrov',
            patronymic: 'Petrovich',
        },
        {
            id: `${uuid()}`,
            name: 'Sidor',
            date: `Tue Oct 26 2021 11:56:27 GMT+0300 (Москва, стандартное время)`,
            surname: 'Sidorov',
            patronymic: 'Sidorovich',
        },
    ]
}