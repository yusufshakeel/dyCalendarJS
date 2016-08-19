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
     dayformat: "full"
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
