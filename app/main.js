//https://date.nager.at/api/v3/PublicHolidays/2022/ua
const DOM_ELEMENTS = {
    country : document.querySelector('.inp-country'),
    year : document.querySelector('.inp-year'),
    table : document.querySelector('.table-body')
}

const getMonth = (date) => {
    const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    return months[date.split('-')[1] - 1];
}

//query to server
const model = (country, year) => {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${ year }/${ country }`;
    fetch(url)
        .then(r => r.json())
        .then(view);
}

//render info
const view = (data) => {
    console.log('in view', data)
    const str = data.map(({date, localName, name}) => {
        return `
            <tr>
                <td>${ getMonth(date) }</td>
                <td>${ date }</td>
                <td>${ localName }</td>
                <td>${ name }</td>
            </tr>
        `
    }).join('');

    DOM_ELEMENTS.table.innerHTML = str;

}

//controllers
const controller = () => {
    model(DOM_ELEMENTS.country.value, DOM_ELEMENTS.year.value);
}

document.querySelector('.btn-show').addEventListener('click', controller);
