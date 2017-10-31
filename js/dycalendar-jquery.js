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
/*! dyCalendarJS | (c) 2016 Yusuf Shakeel | https://github.com/yusufshakeel/dyCalendarJS */
(function(global, $) {

    "use strict";

    var
    //this will be used by the user.
        dycalendar = {},

        //window document
        document = global.document,

        //starting year
        START_YEAR = 1900,

        //end year
        END_YEAR = 9999,

        //name of the months
        monthName = {
            full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            mmm: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        //name of the days
        dayName = {
            full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            d: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            dd: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        };

    /**
     * this function will create month table.
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function createMonthTable(data, option) {

        var
            table, tr, td,
            r, c, count;

        table = $("<table>");
        tr = $("<tr>");

        //create 1st row for the day letters
        for (c = 0; c <= 6; c = c + 1) {
            td = $("<td>");
            td.html("SMTWTFS"[c]);
            tr.append(td);
        }
        table.append(tr);

        //create 2nd row for dates
        tr = $("<tr>");

        //blank td
        for (c = 0; c <= 6; c = c + 1) {
            if (c === data.firstDayIndex) {
                break;
            }
            td = $("<td>");
            tr.append(td);
        }

        //remaing td of dates for the 2nd row
        count = 1;
        while (c <= 6) {
            td = $("<td>");
            td.html(count);
            if (data.today.date === count && data.today.monthIndex === data.monthIndex && option.highlighttoday === true) {
                td.addClass("dycalendar-today-date");
            }
            if (option.date === count && option.month === data.monthIndex && option.highlighttargetdate === true) {
                td.addClass("dycalendar-target-date");
            }
            tr.append(td);
            count = count + 1;
            c = c + 1;
        }
        table.append(tr);

        //create remaining rows
        for (r = 3; r <= 7; r = r + 1) {
            tr = $("<tr>");
            for(c = 0; c <= 6; c = c + 1) {
                if (count > data.totaldays) {
                    table.append(tr);
                    return table;
                }
                td = $("<td>");
                td.html(count);
                if (data.today.date === count && data.today.monthIndex === data.monthIndex && option.highlighttoday === true) {
                    td.addClass("dycalendar-today-date");
                }
                if (option.date === count && option.month === data.monthIndex && option.highlighttargetdate === true) {
                    td.addClass("dycalendar-target-date");
                }
                count = count + 1;
                tr.append(td);
            }
            table.append(tr);
        }

        return table;
    }

    /**
     * this function will draw Calendar Month Table
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function drawCalendarMonthTable(data, option) {

        var
            table,
            div, container, elem;

        //get table
        table = createMonthTable(data, option);

        //calendar container
        container = $("<div>");
        container.addClass("dycalendar-month-container");

        //-------------------------- Header ------------------

        //header div
        div = $("<div>");
        div.addClass("dycalendar-header");
        div.attr("data-option", JSON.stringify(option));

        //prev button
        if (option.prevnextbutton === "show") {
            elem = $("<span>");
            elem.addClass("dycalendar-prev-next-btn prev-btn");
            elem.attr("data-date", option.date);
            elem.attr("data-month", option.month);
            elem.attr("data-year", option.year);
            elem.attr("data-btn", "prev");
            elem.html("&lt;");
            //add prev button span to header div
            div.append(elem);
        }

        //month span
        elem = $("<span>");
        elem.addClass("dycalendar-span-month-year");
        if (option.monthformat === "mmm") {
            elem.html(data.monthName + " " + data.year);
        } else if (option.monthformat === "full") {
            elem.html(data.monthNameFull + " " + data.year);
        }

        //add month span to header div
        div.append(elem);

        //next button
        if (option.prevnextbutton === "show") {
            elem = $("<span>");
            elem.addClass("dycalendar-prev-next-btn next-btn");
            elem.attr("data-date", option.date);
            elem.attr("data-month", option.month);
            elem.attr("data-year", option.year);
            elem.attr("data-btn", "next");
            elem.html("&gt;");
            //add next button span to header div
            div.append(elem);
        }

        //add header div to container
        container.append(div);

        //-------------------------- Body ------------------

        //body div
        div = $("<div>");
        div.addClass("dycalendar-body");
        div.append(table);

        //add body div to container div
        container.append(div);

        //return container
        return container;
    }

    /**
     * this function will draw Calendar Day
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function drawCalendarDay(data, option) {

        var
            div, container, elem;

        //calendar container
        container = $("<div>");
        container.addClass("dycalendar-day-container");

        //-------------------------- Header ------------------

        //header div
        div = $("<div>");
        div.addClass("dycalendar-header");

        //day span
        elem = $("<span>");
        elem.addClass("dycalendar-span-day");
        if (option.dayformat === "ddd") {
            elem.html(dayName.ddd[data.targetedDayIndex]);
        } else if (option.dayformat === "full") {
            elem.html(dayName.full[data.targetedDayIndex]);
        }

        //add day span to footer div
        div.append(elem);

        //add header div to container
        container.append(div);

        //-------------------------- Body ------------------

        //body div
        div = $("<div>");
        div.addClass("dycalendar-body");

        //date span
        elem = $("<span>");
        elem.addClass("dycalendar-span-date");
        elem.html(data.date);

        //add date span to body div
        div.append(elem);

        //add body div to container
        container.append(div);

        //-------------------------- Footer ------------------

        //footer div
        div = $("<div>");
        div.addClass("dycalendar-footer");

        //month span
        elem = $("<span>");
        elem.addClass("dycalendar-span-month-year");
        if (option.monthformat === "mmm") {
            elem.html(data.monthName + " " + data.year);
        } else if (option.monthformat === "full") {
            elem.html(data.monthNameFull + " " + data.year);
        }

        //add month span to footer div
        div.append(elem);

        //add footer div to container
        container.append(div);

        //return container
        return container;
    }

    /**
     * this function will extend source object with defaults object.
     *
     * @param object source     this is the source object
     * @param object defaults   this is the default object
     * @return object
     */
    function extendSource(source, defaults) {
        var property;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    }

    /**
     * This function will return calendar detail.
     *
     * @param integer year		1900-9999 (optional) if not set will consider
     *                          the current year.
     * @param integer month		0-11 (optional) 0 = Jan, 1 = Feb, ... 11 = Dec,
     *                          if not set will consider the current month.
     * @param integer date      1-31 (optional)
     * @return boolean|object	if error return false, else calendar detail
     */
    function getCalendar(year, month, date) {

        var
            dateObj = new Date(),
            dateString,
            result = {},
            idx;

        if (year < START_YEAR || year > END_YEAR) {
            global.console.error("Invalid Year");
            return false;
        }
        if (month > 11 || month < 0) {
            global.console.error("Invalid Month");
            return false;
        }
        if (date > 31 || date < 1) {
            global.console.error("Invalid Date");
            return false;
        }

        result.year = year;
        result.month = month;
        result.date = date;

        //today
        result.today = {};
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.today.dayIndex = idx;
        result.today.dayName = dateString[0];
        result.today.dayFullName = dayName.full[idx];

        idx = monthName.mmm.indexOf(dateString[1]);
        result.today.monthIndex = idx;
        result.today.monthName = dateString[1];
        result.today.monthNameFull = monthName.full[idx];

        result.today.date = dateObj.getDate();

        result.today.year = dateString[3];

        //get month-year first day
        dateObj.setDate(1);
        dateObj.setMonth(month);
        dateObj.setFullYear(year);
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.firstDayIndex = idx;
        result.firstDayName = dateString[0];
        result.firstDayFullName = dayName.full[idx];

        idx = monthName.mmm.indexOf(dateString[1]);
        result.monthIndex = idx;
        result.monthName = dateString[1];
        result.monthNameFull = monthName.full[idx];

        //get total days for the month-year
        dateObj.setFullYear(year);
        dateObj.setMonth(month + 1);
        dateObj.setDate(0);
        result.totaldays = dateObj.getDate();

        //get month-year targeted date
        dateObj.setFullYear(year);
        dateObj.setMonth(month);
        dateObj.setDate(date);
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.targetedDayIndex = idx;
        result.targetedDayName = dateString[0];
        result.targetedDayFullName = dayName.full[idx];

        return result;

    }

    /**
     * this function will handle the on click event.
     */
    function onClick () {

        $("body").on("click", ".dycalendar-prev-next-btn", function (e) {

            e.preventDefault();

            var
                date = $(this).data("date"),
                month = $(this).data("month"),
                year = $(this).data("year"),
                btn = $(this).data("btn"),
                option = $(this).parent().data("option");

            if (btn === "prev") {
                month = month - 1;
                if (month < 0) {
                    year = year - 1;
                    month = 11;
                }
            }
            else if (btn === "next") {
                month = month + 1;
                if (month > 11) {
                    year = year + 1;
                    month = 0;
                }
            }

            option.date = date;
            option.month = month;
            option.year = year;

            drawCalendar(option);

        });

        $("body").on("click", ".dycalendar-span-month-year", function (e) {

            e.preventDefault();

            var
                option = $(this).parent().data("option"),
                dateObj = new Date();

            option.date = dateObj.getDate();
            option.month = dateObj.getMonth();
            option.year = dateObj.getFullYear();

            drawCalendar(option);

        });
    }

    //------------------------------ dycalendar.draw() ----------------------

    /**
     * this function will draw the calendar based on user preferences.
     *
     * option = {
     *  target : "#id|.class"   //(mandatory) for id use #id | for class use .class
     *  type : "calendar-type"  //(optional) values: "day|month" (default "day")
     *  month : "integer"       //(optional) value 0-11, where 0 = January, ... 11 = December (default current month)
     *  year : "integer"        //(optional) example 1990. (default current year)
     *  date : "integer"        //(optional) example 1-31. (default current date)
     *  monthformat : "full"    //(optional) values: "mmm|full" (default "full")
     *  dayformat : "full"      //(optional) values: "ddd|full" (default "full")
     *  highlighttoday : boolean    //(optional) (default false) if true will highlight today's date
     *  highlighttargetdate : boolean   //(optional) (default false) if true will highlight targeted date of the month year
     *  prevnextbutton : "hide"         //(optional) (default "hide") (values: "show|hide") if set to "show" it will show the nav button (prev|next)
     * }
     *
     * @param object option     user preferences
     * @return boolean          true if success, false otherwise
     */
    dycalendar.draw = function (option) {

        //check if option is passed or not
        if(typeof option === "undefined") {
            global.console.error("Option missing");
            return false;
        }

        var
            self = this,    //pointing at dycalendar object

            dateObj = new Date(),

            //default settings
            defaults = {
                type : "day",
                month : dateObj.getMonth(),
                year : dateObj.getFullYear(),
                date : dateObj.getDate(),
                monthformat : "full",
                dayformat : "full",
                highlighttoday : false,
                highlighttargetdate : false,
                prevnextbutton : "hide"
            };

        //extend user options with predefined options
        option = extendSource(option, defaults);

        drawCalendar(option);
    };

    //------------------------------ dycalendar.draw() ends here ------------

    /**
     * this function will draw the calendar inside the target container.
     */
    function drawCalendar (option) {

        var
            //variables for creating calendar
            calendar,
            calendarHTML;

        //get calendar HTML
        switch (option.type) {
        case "day":
            //get calendar detail
            calendar = getCalendar(option.year, option.month, option.date);
            //get calendar html
            calendarHTML = drawCalendarDay(calendar, option);
            break;

        case "month":
            //get calendar detail
            calendar = getCalendar(option.year, option.month, option.date);
            //get calendar html
            calendarHTML = drawCalendarMonthTable(calendar, option);
            break;

        default:
            global.console.error("Invalid type");
            return false;
        }

        //draw calendar
        $(option.target).html(calendarHTML);
    }

    //events
    onClick();

    //attach to global window object
    global.dycalendar = dycalendar;

}(typeof window !== "undefined" ? window : this,
typeof jQuery !== "undefined" ? jQuery : undefined));
