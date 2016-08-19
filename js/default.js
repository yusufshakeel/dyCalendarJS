/*!
 * dyCalendar is a JavaScript library for creating Calendar.
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyCalendarJS
 *
 * MIT license
 * Copyright (c) 2016 Yusuf Shakeel
 *
 * Date: 2014-08-17 sunday
 */

//today calendar
dycalendar.draw({
     target: '#dycalendar-today',
     type: 'today',
     dayformat: "full",
     monthformat: "full"
});

//month calendar
dycalendar.draw({
     target: '#dycalendar-month',
     type: 'month',
     month: 7,
     year: 2016,
     highlighttoday: true,
     monthformat: "full"
});

//today calendar - with skin
dycalendar.draw({
     target: '#dycalendar-today-with-skin',
     type: 'today',
     dayformat: "ddd",
     monthformat: "mmm"
});

//today calendar - with skin and shadow
dycalendar.draw({
     target: '#dycalendar-today-with-skin-shadow',
     type: 'today',
     dayformat: "full",
     monthformat: "full"
});

//month calendar - default current month - with skin
dycalendar.draw({
     target: '#dycalendar-month-with-skin',
     type: 'month',
     highlighttoday: true,
     monthformat: "mmm"
});

//month calendar - with skin and shadow
dycalendar.draw({
     target: '#dycalendar-month-with-skin-shadow',
     type: 'month',
     month: 9,
     year: 1990,
     date: 21,
     monthformat: "full",
     highlighttargetdate : true
});
