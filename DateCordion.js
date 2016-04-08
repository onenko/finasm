/**
 * First column - 6 number string - identifies type of column and/or day or month or year
 *  'TTTTTT' - first column - is title of table columns
 *  'XXXXXX' - last column - is totals per all table
 *  'yyXXXX' - row with data for the whole year 20yy, yy from 01 to 99
 *  'yymmXX' - row with data for the whole month mm of 20yy year, mm is 01 to 12
 *  'yymmdd' - row with data for a day dd of month mm of 20yy year, dd is 01 to 31
 */
/*
function row(date, data) {
	if(date instanceof String && date.length == 6) {
		this.d6 = date; 
	} else if(date instanceof Date) {
		this.d6 = date2S6(date); 
	} else {
		alert("wrong argument " + date);
	}
	this.data = data;
}*/

var date2S6 = function(d) {
    if(d instanceof Date) {
        var str = String(d.getFullYear() * 10000 + (d.getMonth()+1) * 100 + d.getDate());
        return str.substr(str.length - 6);
    } else {
	    return 'NODATE';
	}
}

var DateCordion = new function(title, rowCreate, rowAggregate) {
	this.rowCreate = rowCreate;
	this.rowAggregate = rowAggregate;
	this.rows = {'TTTTTT' : title }

	this.getRowData = function(date) {
		var rowData = this.rows[date];
		if( rowData === undefined) {
			rows.add(date, rowData = this.rowCreate());
		}
		return rowData;
	}

	this.delGroupRows = function() {
		delete rows['XXXXXX'];
		var keys = rows.keys();
		for(var i = 0; i < keys.length; i++) {
			if(keys[i].indexOf('XX') > -1) {	// group row (monthly or yearly)
				delete rows[keys[i]];
			}
		}
	}

	this.populateGroupRows = function() {
		delGroupRows();
		// browse daily rows and populate monthly
		var keys = rows.keys();
		for(var i = 0; i < keys.length; i++) {
			var s6 = keys[i];
			if( ! isNaN(s6)) {
				var m = getRowData(S6monthOfDay(s6));
				rowAggregate(m, keys[s6]);
			}
		}
		// browse monthly rows and populate yearly
		var monthlyPattern = /\d\d\d\dXX/
		var keys = rows.keys();
		for(var i = 0; i < keys.length; i++) {
			var s6 = keys[i];
			if(monthlyPattern.test(s6)) {
				var y = getRowData(S6yearOfMonth(s6));
				rowAggregate(y, keys[s6]);
			}
		}
		// browse yearly rows and populate total
		var yearlyPattern = /\d\dXXXX/
		var keys = rows.keys();
		for(var i = 0; i < keys.length; i++) {
			var s6 = keys[i];
			if(yearlyPattern.test(s6)) {
				var total = getRowData('TTTTTT');
				rowAggregate(total, keys[s6]);
			}
		}
	}
	

	this.S6monthOfDay = function(S6day) {
		return S6day.substr(0, 4) + 'XX';
	}

	/**
	 * works for input as day or month
	 */
	this.S6yearOfMonth = function(S6month) {
		return S6month.substr(0, 2) + 'XXXX';
	}
	
	
}


