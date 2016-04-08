/**
 * FinAssembler - home finance accounting for IT guys
 *
 * FinanceTable - main data storage of finance data
 *
 * Rows - days, or monthes, or years
 * Columns - categories of expences or categories of payments
 *
 * Three groups of (configured) columns:
 *  - exp - where the money disappear, for example: food;
 *  - pay - where the money kept, usually payment source, example: visa
 *  - fxc - foreign currencies, the first one is BASE currency
 * Rest columns are hardcoded predefined rows, which are always present.
 *
 * First column - 6 number string - identifies type of column and/or day or month or year
 *  '000000' - first column - is title of table columns
 *  '999999' - last column - is totals per all table
 *  'YY9999' - row with data for the whole year 20YY, YY from 01 to 99
 *  'YYMM99' - row with data for the whole month MM of 20YY year, MM is 01 to 12
 *  'YYMMDD' - row with data for a day DD of month MM of 20YY year, DD is 01 to 31
 *
 * FinanceTable contains data for only periods with financial activity. So if at 27 August 2015 there was
 * no transactions, the row with '150827' does not exist.
 *
 */

function FinanceTable() {
    this.configExp = [
        { field: 'div', title: 'Divers', cmd: 'x'},
        { field: 'food', title: 'Food', cmd: 'p'},
        { field: 'havk', title: 'Havka', cmd: 'e'},
        { field: 'ent', title: 'Rozv', cmd: 'roz'},
        { field: 'educ', title: 'Educ', cmd: 'edu'},
        { field: 'car', title: 'Car', cmd: 'car'},
        { field: 'trans', title: 'Trnsp', cmd: 't'},
        { field: 'health', title: 'Health', cmd: 'health'},
        { field: 'komun', title: 'Komun', cmd: 'k'},
        { field: 'biggy', title: 'Doroge', cmd: 'd'},
        { field: 'mama1', title: 'Mama1', cmd: 'mam1'},
        { field: 'mama2', title: 'Mama2', cmd: 'mam2'}
    ];

    this.configPay = [
        { field: 'mine', title: "Mine", cmd: "1"},
        { field: 'wife', title: "Wife", cmd: "2"},
        { field: 'visa', title: "Visa", cmd: "v"}
    ];

    this.configFxc = [
        { field: 'usd', title: "USD", cmd: "usd"},
        { field: 'eur', title: "EUR", cmd: "eur"},
        { field: 'gbp', title: "GBP", cmd: "gbp"}
    ];

//    this.template = [];
//    this.titile = [];
//    this.aggregate = function() {}

    this.createRow = function(ssssss) {
        var row = { sdate:ssssss, exp:{}, pay:{}, home:0, balance:0, fxc:{}, debt:0, zp:0, xfxc:{}};
        for(var i = 0; i < this.configExp.length; i++) {
            row.exp[this.configExp[i].title] = 0;
        }
        for(var i = 0; i < this.configPay.length; i++) {
            row.pay[this.configPay[i].title] = 0;
        }
        for(var i = 0; i < this.configFxc.length; i++) {
            row.fxc[this.configFxc[i].title] = 0;
        }
        for(var i = 0; i < this.configFxc.length; i++) {
            row.xfxc['x' + this.configFxc[i].title] = 0;
        }
        row['=' + this.configFxc[0].title] = 0; // first currency is predefined
        return row;
    }

    this.createTitleRow = function() {
        var row = { sdate: '000000', exp:{}, pay:{}, home:'Home', balance:'0', fxc:{}, debt:'Debt', zp:'Salary', xfxc:{}};
        for(var i = 0; i < this.configExp.length; i++) {
            row.exp[this.configExp[i].title] = this.configExp[i].title;
        }
        for(var i = 0; i < this.configPay.length; i++) {
            row.pay[this.configPay[i].title] = this.configPay[i].title;
        }
        for(var i = 0; i < this.configFxc.length; i++) {
            row[this.configFxc[i].title] = this.configFxc[i].title;
        }
        for(var i = 0; i < this.configFxc.length; i++) {
            row['x' + this.configFxc[i].title] = 'x' + this.configFxc[i].title;
        }
        row['=' + this.configFxc[0].title] = '==' + this.configFxc[0].title;
        return row;
    }
    
    this.grid = [];    // array of rows
    this.date2S6 = function(d) {
        if(d instanceof Date) {
            var str = String(d.getFullYear() * 10000 + (d.getMonth()+1) * 100 + d.getDate());
            return str.substr(str.length - 6);
      } else {
            return 'NODATE';
      }
    }

    this.getRow = function(d) {
        var ssssss = this.date2S6(d);
        // lets look from the end of grid (should be more optimal)
        for(var irow = this.grid.length - 1; irow >= 0; --irow) {
            var row = this.grid[irow];
            if(row.sdate === ssssss) {
                return row;
            }
            if(row.sdate < ssssss) {
                break;
            }
        }
        // create absent row, add to grid and return it
        row = this.createRow(ssssss);
        this.grid.splice(irow + 1, 0, row);
        return row;
    }


};

























/**
 * not sure I will implement this
 *
 * Imagine, that the table for 5 years contains around 2000 days data, not convenient, and lot of memory.
 * That is why FinanceTable support concept of 2 previledged time object, one is current day, and another
 * is month or year of interest. These are expanded. All other years and monthes are calculated as totals.
 *
 * For example, curYYMMDD = '150822' and xxxYYMM = '140300'
 * It means that current day is 22 of August 2015, and additionally we look at March 2014.
 * So FinanceTable will contain one row for 2013 year, one row for totals 2014, one row per every month of 2014,
 * except of March, and for March 2014 - per day data.
 * For 2015: daily data for August, and monthly data for previous monthes.
 *
 * If xxxYYMM = '140000' - we 'expand' only the year 2014, and do not expand any month of this year.
 */