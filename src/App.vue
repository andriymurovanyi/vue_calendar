<template>
  <div class="div">
    <app-header ></app-header>
    <div class="container pt-5">
      <div class="row ">
        <div class="container__locale">
          <label for="select">{{ choose }}</label>
          <select @change="changeLocale" id="select">
            <option v-for="language in languages">{{ language }}</option>
          </select>
        </div>
        <table class="table table-bordered table-striped" id="main_table">
          <thead class="thead-light table__head">
          <tr class="justify-content-center">
            <th colspan="7">
              <button class="btn btn-outline-success"
                      @click="currentMonth = currentMonth - 1"
              > << </button>
              <a class="btn btn-outline-success disabled container__info">
                {{ getMonthName(currentMonth) }}, {{ currentYear }}
              </a>
              <button class="btn btn-outline-success"
                      @click="currentMonth = currentMonth + 1"
              > >> </button>
            </th>
          </tr>
          <tr>
            <th v-for="day in days">{{ day }}</th>
          </tr>
          </thead>
          <tbody v-html="createCalendar(currentYear, currentMonth % 12 + 1)"></tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "./components/header"

  const LOCALES = {
    names: {
      rus: "Русский",
      ukr: "Українська",
      eng: "English"
    },

    rus: {
      choose: "Выберите язык",
      days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      months: ["Январь", "Февраль", "Март", "Апрель", "Май",
        "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    },

    eng: {
      choose: "Choose language",
      days: ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"] ,
      months: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
    },

    ukr: {
      choose: "Оберіть мову",
      days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
      months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
              "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"]
    }
  };

  export default {
    data() {
      return {
        choose: LOCALES.ukr.choose,
        days: LOCALES.ukr.days,
        monthNames: LOCALES.ukr.months,

        currentDate: new Date(),
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(), // Default year
        currentDay: null,

        languages: [LOCALES.names.ukr, LOCALES.names.rus, LOCALES.names.eng],

        leftStop: false,
        rightStop: false,
        locale: null,
      }
    },

    methods: {
      getMonthName(monthNumber) {
        return this.monthNames[monthNumber]
      },

      createCalendar(year, month) {
        this.rightStop = this.currentMonth > 11;
        this.leftStop = this.currentMonth < 0;

        if (this.rightStop) {
          this.currentYear++;
          this.currentMonth = 0;
          console.log(this.currentYear);
        }

        if (this.leftStop) {
          this.currentYear--;
          this.currentMonth = 11;
          // console.log(this.currentYear);
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

      changeLocale(event) {
        this.days = LOCALES[this.getKeyByValue(LOCALES.names, event.target.value)].days;
        this.monthNames = LOCALES[this.getKeyByValue(LOCALES.names, event.target.value)].months;
        this.choose = LOCALES[this.getKeyByValue(LOCALES.names, event.target.value)].choose;
      },

      changeYear(event) {
        this.currentYear = event.target.value;
      },

      getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }
    },
    computed:{
      incMonth(){
        this.month++;

      },

      decMonth(){
        this.month--;
      },
    },
    components:{
      appHeader: Header
    }
  }
</script>

<style>
  .container__info{
    width: 200px;
  }

  th{
    text-align: center;
  }

  td:hover{
    background: lightskyblue;
  }

</style>
