const LOCALES = {
    "ru": {
        "days": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        "months": ["Январь", "Февраль", "Март", "Апрель", "Май",
            "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    },

    "eng": {
        "days": ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"] ,
        "months": ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
    }
};

new Vue({
    el: "#app",

    data: {
        // Default locale
        days: LOCALES.ru.days,
        monthNames: LOCALES.ru.months,


        currentDate: new Date(),
        currentMonth: new Date().getMonth(),
        // currentYear: new Date().getFullYear(),

        currentYear: new Date().getFullYear(), // Default year

        currentDay: null,
        languages: ["ru", "eng"],

        leftStop: false,
        rightStop: false,
        locale: null
    },

    methods: {
        getMonthName(monthNumber){
            return this.monthNames[monthNumber]
        },

        createCalendar(year, month) {
            this.rightStop = this.currentMonth > 11;
            this.leftStop = this.currentMonth < 0;

            if (this.rightStop){
                this.currentYear++;
                this.currentMonth = 0;
                console.log(this.currentYear);
            }


            if (this.leftStop){
                this.currentYear--;
                this.currentMonth = 11;

                console.log(this.currentYear);
            }

            let mon = month - 1; // Months starts from 0
            let firstMonthDay = new Date(year, mon);

            let tbody = '<tbody class="table table-bordered">';

            for (let i = 0; i < this.getDay(firstMonthDay); i++) {
                tbody += '<td></td>';
            }

            while (firstMonthDay.getMonth() === mon) {
                tbody += '<td>' + firstMonthDay.getDate() + '</td>';

                if (this.getDay(firstMonthDay) % 7 === 6) {
                    tbody += '</tr><tr>';
                }

                firstMonthDay.setDate(firstMonthDay.getDate() + 1);
            }

            if (this.getDay(firstMonthDay) !== 0) {
                for (let i = this.getDay(firstMonthDay); i < 7; i++) {
                    tbody += '<td></td>';
                }
            }

            tbody += '</tr></tbody>';

            return tbody;
        },

        getDay(date) { // Week day number
            let day = date.getDay();
            if (day === 0) day = 7;
            return day - 1;
        },

        changeLocale(event){
            this.days = LOCALES[event.target.value].days;
            this.monthNames = LOCALES[event.target.value].months;
        }
    },

    changeYear(event){
        this.currentYear = event.target.value;
    },
    computed: {
        incMonth(){
            this.month++;

        },

        decMonth(){
            this.month--;
        },
    }

});


