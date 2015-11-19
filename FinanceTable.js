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