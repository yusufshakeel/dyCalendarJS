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
     dayformat: "full",
     monthformat: "full"
});

//day calendar
dycalendar.draw({
     target: '#dycalendar-day',
     type: 'day',
     dayformat: "full",
     monthformat: "full",
     date : 21,
     month : 9,
     year : 1990
});

//month calendar
dycalendar.draw({
     target: '#dycalendar-month',
     type: 'month',
     date : 21,
     month : 9,
     year : 2016,
     highlighttoday: true,
     highlighttargetdate: true,
     monthformat: "full"
});
