const monthString = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сетнября",
    "Октября",
    "Ноября",
    "Декабря"
];

export function dateStamp(date) {
    const ms = new Date() - date;
    if (ms <= 60000) return "1 минуту назад";
    if (ms <= 60000 * 5) return "5 минуту назад";
    if (ms <= 60000 * 10) return "10 минуту назад";
    if (ms <= 60000 * 30) return "30 минуту назад";
    if (ms <= 60000 * 60 * 24) {
        return `${date.getHours()}:${date.getMinutes()}`;
    }
    if (ms <= 60000 * 60 * 24 * 365) {
        return `${date.getDay()} ${monthString[date.getMonth()]}`;
    }
    if (ms > 60000 * 60 * 24 * 365) {
        return `${date.getDay()} ${
            monthString[date.getMonth()]
        } ${date.getFullYear()}`;
    }
}
