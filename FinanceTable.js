/**
 * FinAssembler - home finance accounting for IT guys
 *
 * FinanceTable - main data storage of finance data
 *
 * Rows - days, or monthes, or years
 * Columns - categories of expences or categories of payments
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
        { field: 'ent', title: 'Rozv', cmd: '?'},
        { field: 'educ', title: 'Educ', cmd: 'e'},
        { field: 'car', title: 'Car', cmd: 'e'},
        { field: 'trans', title: 'Trnsp', cmd: 'e'},
        { field: 'health', title: 'Health', cmd: 'e'},
        { field: 'komun', title: 'Komun', cmd: 'e'},
        { field: 'biggy', title: 'Doroge', cmd: 'e'},
        { field: 'mama1', title: 'Mama1', cmd: 'e'},
        { field: 'mama2', title: 'Mama2', cmd: 'e'}
    ];

    /*
    { date:'Date', div:'Divers', food:'Food', havk:'Havka', ent:'Rozv', edu: "Obraz", car: 'Car', trans: "Trnsp",
      health: "Health", komun: "Komun", biggy: "Doroge", mama1:'Mama1', mama2:'Mama2',
          home:'Home', 
      mine:'Mine', wife:'Wife', visa:'Visa', usd:'USD', eur: 'EUR', gbp: 'GBP', debt: 'Debt', total: '0', zp: 'Zarplata',
      xusd: 'xUSD', xeur: 'xEUR', xgbp: 'xGBP', usdTotal: '=USD' },
      */
    
    this.configPay = [
        { field: 'mine', title: "Mine", cmd: "1"},
        { field: 'wife', title: "Wife", cmd: "2"},
        { field: 'visa', title: "Visa", cmd: "v"}
    ];

    this.createRow = function(ssssss) {
        var row = { sdate: ssssss};
        for(var i = 0; i < this.configExp.length; i++) {
            row[this.configExp[i].title] = 0;
        }
        for(var i = 0; i < this.configPay.length; i++) {
            row[this.configPay[i].title] = 0;
        }
        row.Home = 0;
        row.Balance = 0;
        row.USD = 0;
        row.EUR = 0;
        row.GBP = 0;
        row.Debt = 0;
        row.Zarplata = 0;
        row.xUSD = 0;
        row.xEUR = 0;
        row.xGBP = 0;
        row['=USD'] = 0;
        return row;
    }

    this.createTitleRow = function() {
        var row = { sdate: '000000'};
        for(var i = 0; i < this.configExp.length; i++) {
            row[this.configExp[i].title] = this.configExp[i].title;
        }
        for(var i = 0; i < this.configPay.length; i++) {
            row[this.configPay[i].title] = this.configPay[i].title;
        }
        row.Home = 0;
        row.Balance = 0;
        row.USD = 0;
        row.EUR = 0;
        row.GBP = 0;
        row.Debt = 0;
        row.Zarplata = 0;
        row.xUSD = 0;
        row.xEUR = 0;
        row.xGBP = 0;
        row['=USD'] = 0;
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