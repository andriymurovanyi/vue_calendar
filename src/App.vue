<template>
  <div id="app">
    <app-header />
    <div class="container pt-3">
      <div class="settings">
        <div class="settings__locale">
          <label for="select_lang">{{ $t('selects.chooseLocale') }}</label>
          <select
            id="select_lang"
            v-model="currentLocale"
          >
            <option
              v-for="(language, index) in locales"
              :value="language"
              :key="index"
            >
              {{ $t(`locales.${language}`) }}
            </option>
          </select>
        </div>
        <div class="settings__year">
          <label for="select_year">{{ $t('selects.chooseYear') }}</label>
          <input
            id="select_year"
            type="number"
            v-model="currentYear"
            @input="calendarRender"
            @keydown.delete.prevent
            :min="minYear"
            :max="maxYear"
          >
        </div>
        <div class="settings__month">
          <label for="select_month"> {{ $t('selects.chooseMonth') }} </label>
          <select
            v-model="currentMonth"
            @change="calendarRender"
            id="select_month"
          >
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="month.value"
            >{{ month.text }}
            </option>
          </select>
        </div>
      </div>
      <table class="table table-bordered table-striped" id="main_table">
        <thead class="thead-light table__head">
        <tr class="justify-content-center">
          <th colspan="7">
            <button
              class="btn btn-outline-success"
              @click="decreaseMonth"
            > << </button>
            <a class="btn btn-outline-success disabled container__info">
              {{ currentDisplayDate }}
            </a>
            <button
              class="btn btn-outline-success"
              @click="increaseMonth"
            > >> </button>
          </th>
        </tr>
        <tr>
          <th v-for="day in DAYS_COUNT" :key="day">
            {{  $t(`days.${day === 7 ? 0 : day}`) }}
          </th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, rowIndex) in calendar" :key="rowIndex">
            <td
              v-for="(day, cellIndex) in item"
              :key="`day_${cellIndex}`"
              :class="{ active: day == currentDate.getDate() }"
            >
              {{ day }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <v-alert v-if="!isValidYear" message="Year not in range" />
  </div>
</template>

<script>
import Header from '@/components/header'
import Alert from '@/components/alert'

export default {
  components: {
    appHeader: Header,
    'v-alert': Alert
  },
  data: () => ({
    DAYS_COUNT: 7,
    MONTHS_COUNT: 12,
    minYear: 1970,
    maxYear: 2040,

    locales: [],
    currentDate: new Date(),
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(), // Default year
    calendar: new Object({}),

    leftStop: false,
    rightStop: false,
    locale: null,
    outOfRange: false,

    isValidYear: true,
    isValidMonth: true
  }),
  computed:{
    currentDisplayDate() {
      return `${this.$t(`months.${this.currentMonth}`)}, ${this.currentYear}`
    },
    months() {
      return Array.from({
        length: this.MONTHS_COUNT
      }, (it, index) => ({
        text: this.$t(`months.${index}`),
        value: index
      }));
    },
    currentLocale: {
      get() {
        return this.$i18n.locale;
      },
      set(value) {
        this.$i18n.locale = value;
        localStorage.setItem('locale', value);
      }
    }
  },
  watch: {
    currentYear(val) {
      this.isValidYear = !!(
        val > this.minYear &&
        val < this.maxYear
      );
    }
  },
  created() {
    this.locales = [...this.$i18n.availableLocales];
    this.calendarRender();
  },
  methods: {
    increaseMonth() {
      this.currentMonth++;
      this.clear();

      this.calendarRender();
    },

    decreaseMonth() {
      this.currentMonth--;
      this.clear();

      this.calendarRender();
    },

    calendarRender() {
      this.rightStop = this.currentMonth > 11;
      this.leftStop = this.currentMonth < 0;

      if (this.rightStop) {
        this.currentYear++;
        this.currentMonth = 0;
      }

      if (this.leftStop) {
        this.currentYear--;
        this.currentMonth = 11;
      }

      const normalizedMonth = this.currentMonth % 12;
      const chosenDate = new Date(this.currentYear, normalizedMonth); // First month day as Date
      const monthStartWeekday = this.getDay(chosenDate); // First month day as Number
      // Spaces for the first row
      // from Monday to the first day of the month
      // * * * 1 2 3 4
      const calendarData = new Array(
        monthStartWeekday
      ).fill(null, 0, monthStartWeekday);

      while (chosenDate.getMonth() === normalizedMonth) {
        calendarData.push(chosenDate.getDate());

        // It's Sunday, so need to add break line
        if (this.getDay(chosenDate) % 7 === 6) {
          this.outOfRange = true;
          calendarData.push('line-break');
        }

        chosenDate.setDate(chosenDate.getDate() + 1);
      }

      // Finish the table with empty cells, if necessary
      // 29 30 31 * * * *
      if (this.getDay(chosenDate) !== 0) {
        const maxWeekDays = 7;
        const emptyBoxesCount = maxWeekDays - this.getDay(chosenDate);

        const emptyBoxes = Array.from({
          length: emptyBoxesCount
        }, () => null)

        calendarData.push(...emptyBoxes);
      }

      calendarData.push('line-break');

      let rowData = [];
      let rowIndex = 0;

      calendarData.forEach(item => {
        if (item !== 'line-break') {
          rowData.push(item);
        } else {
          this.calendar[rowIndex] = rowData;
          rowData = [];
          rowIndex++;
        }
      });
    },

    getDay(date) {
      // Week day number
      let day = date.getDay();

      if (day === 0) {
        day = 7;
      }

      return day - 1;
    },

    clear() {
      Object.getOwnPropertyNames(this.calendar).forEach(prop => {
        delete this.calendar[prop];
      });
    }
  }
}
</script>

<style>
.container__info {
  width: 200px;
}

th, td {
  text-align: center;
}

td.active {
  background: lightskyblue;
}

label {
  display: inline;
}

.settings {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px grey solid;
  padding: 15px;
  width: 100%;
}
</style>
