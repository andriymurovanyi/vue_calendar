<template>
  <div class="div">
    <app-header ></app-header>
    <div class="container pt-5">
      <div class="row">
        <div class="container__locale">
          <div class="container__settings">
            <label for="select_lang">{{ choose }}</label>
            <select @change="changeLocale" id="select_lang">
              <option v-for="language in languages">{{ language }}</option>
            </select>
          </div>
          <label>
            {{ yearText }}
            <input type="number"
                   min="1970"
                   max="2040"
                   :value="currentYear"
                   @change="changeYear"
                   @keypress.enter="changeYear"
            >
          </label>
          <label for="select_month"> {{ monthText }} </label>
          <select @change="changeMonth" id="select_month">
            <option v-for="month in monthNames">{{ month }}</option>
          </select>
          <p v-if="!isValidYear"
             class="alert alert-danger">
            Year not in range</p>
        </div>
        <table class="table table-bordered table-striped" id="main_table">
          <thead class="thead-light table__head">
          <tr class="justify-content-center">
            <th colspan="7">
              <button class="btn btn-outline-success"
                      @click="currentMonth = currentMonth - 1, clear()"
              > << </button>
              <a class="btn btn-outline-success disabled container__info">
                {{ getMonthName(currentMonth) }}, {{ currentYear }}
              </a>
              <button class="btn btn-outline-success"
                      @click="currentMonth = currentMonth + 1, clear()"
              > >> </button>
            </th>
          </tr>
          <tr>
            <th v-for="day in days">{{ day }}</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in createCalendar(currentYear, currentMonth % 12 + 1)">
              <td v-for="day in item"> {{ day }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "./components/header"
  import locales from './locales/locales'

  const LOCALES = locales.locales;

  export default {
    data() {
      return {
        choose: LOCALES.ukr.choose,
        days: LOCALES.ukr.days,
        monthNames: LOCALES.ukr.months,
        yearText: LOCALES.ukr.year,
        monthText: LOCALES.ukr.month,

        currentDate: new Date(),
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(), // Default year
        currentDay: null,
        calendar: new Object({}),

        languages: [LOCALES.names.ukr, LOCALES.names.rus, LOCALES.names.eng],

        leftStop: false,
        rightStop: false,
        locale: null,
        outOfRange: false,

        isValidYear: true,
        isValidMonth: true
      }
    },

    methods: {
      getMonthName(monthNumber) {
        return this.monthNames[monthNumber]
      },

      createCalendar(year, month) {
        let close = false;
        this.rightStop = this.currentMonth > 11;
        this.leftStop = this.currentMonth < 0;

        if (this.rightStop) {
          this.currentYear++;
          this.currentMonth = 0;
        }

        if (this.leftStop) {
          this.currentYear--;
          this.currentMonth = 11;
          // console.log(this.currentYear);
        }

        let mon = month - 1; // Months starts from 0
        let firstMonthDay = new Date(year, mon);
        //
        let calendarData = [];
        for (let i = 0; i < this.getDay(firstMonthDay); i++) {
          calendarData.push(null);
        }


        while (firstMonthDay.getMonth() === mon) {
          calendarData.push(firstMonthDay.getDate());

          if (this.getDay(firstMonthDay) % 7 === 6) {
            this.outOfRange = true;
            calendarData.push(this.outOfRange)
          }

          firstMonthDay.setDate(firstMonthDay.getDate() + 1);
        }

        if (this.getDay(firstMonthDay) !== 0) {
          for (let i = this.getDay(firstMonthDay); i < 7; i++) {
            calendarData.push(null);
          }
        }

        close = true;
        calendarData.push(close);

        calendarData.push(close);

        let tmp = [];
        let j = 0;
        for (let i = 0; i < calendarData.length; i++){
          if (calendarData[i] !== true){
            tmp.push(calendarData[i]);
          } else {
            this.calendar[j] = tmp;
            tmp = [];
            j++;
          }
        }
        return this.calendar;
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
        this.yearText = LOCALES[this.getKeyByValue(LOCALES.names, event.target.value)].year;
        this.monthText = LOCALES[this.getKeyByValue(LOCALES.names, event.target.value)].month;
      },

      getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      },

      clear(){
        for (let key in this.calendar){
          delete this.calendar[key];
        }
      },

      changeYear(event) {
        let maxYear = event.target.max;
        let minYear = event.target.min;
        if (event.target.value && event.target.value >= minYear && event.target.value <= maxYear){
          this.currentYear = event.target.value;
          console.log(event.keyCode);
          this.isValidYear = true;
        }
        else{
          this.isValidYear = false;
          event.target.value = this.currentYear;
        }
      },

      changeMonth(event) {
        let selectedMonth = event.target.value;
        selectedMonth = this.monthNames[event.target.value];
        console.log(selectedMonth);

        // console.log(event.keyCode);
        // this.isValidMonth = true;
        this.currentMonth = this.monthNames.indexOf(event.target.value);
        console.log(this.currentMonth);
        }

    },

    computed:{
      incMonth(){
        this.month++;

      },

      decMonth(){
        this.month--;
      }

    },
    components:{
      appHeader: Header
    },

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
