/*--- Ugevælger lavet fra bunden... ---*/
$(document).ready(function() {
    
    
    function WeekChooser (element) {
        this.element = element;
        this.year = element.find(".en-weekchooser-year");
        this.week = element.find(".en-weekchooser-week");
        this.next = element.find(".en-weekchooser-next");
        this.current = element.find(".en-weekchooser-current");
        this.previous = element.find(".en-weekchooser-previous");
        
        var now = new Date();
        
        this.initEvents();
        this.populateYear(now.getFullYear());
        this.populateWeek(now.getFullYear());
        
        this.year.val(now.getFullYear() + "");
        this.week.val(getWeek(now) + "");
    };
    
    WeekChooser.prototype.initEvents = function () {
        var self = this;
        this.next.on('click', function(e){
            e.stopPropagation();
            self.nextWeek(e);
        });
        this.previous.on('click', function (e) {
            e.stopPropagation();
            self.previousWeek(e);
        }); 
        this.current.on('click', function (e) {
            e.stopPropagation();
            self.currentWeek(e);
        });       
        this.year.on('change', function (e) {
            e.stopPropagation();
            self.changeYear(e);
        }); 
        this.week.on('change', function (e) {
            e.stopPropagation();
            self.changeWeek(e);
       }); 
    };
    
    WeekChooser.prototype.nextWeek = function (e) {
        var self = this;
        var week = parseInt(self.week.val());
        week = (week + 1) + "";
        if(self.week.children('option[value="' + week + '"]').length) {
            self.week.val(week);    
        } else {
            year = parseInt(self.year.val());
            year = (year + 1) + "";
            if(self.year.children('option[value="' + year + '"]').length) {
                self.year.val(year);
                self.populateWeek(parseInt(year));
                self.week.val(self.week.children('option:first').val());
            }
        }
        self.element.trigger("change");
    };
    
    WeekChooser.prototype.previousWeek = function (e) {
        var self = this;
        var week = parseInt(self.week.val());
        week = (week - 1) + "";
        if(self.week.children('option[value="' + week + '"]').length) {
            self.week.val(week);    
        } else {
            year = parseInt(self.year.val());
            year = (year - 1) + "";
            if(self.year.children('option[value="' + year + '"]').length) {
                self.year.val(year);
                self.populateWeek(parseInt(year));
                self.week.val(self.week.children('option:last').val());
            }
        }
        self.element.trigger("change");
    };
    
    WeekChooser.prototype.currentWeek = function (e) {
        var self = this;
        var today = new Date();
        var thursday = getNearestThursdayForDate(today);
        var year = thursday.getFullYear();
        if (self.year.val() != year) {
            self.year.val(year);
            self.populateWeek(parseInt(year));
        };
        var week = getWeek(today);
            
        self.week.val(week);    
        self.element.trigger("change");
    };
    
    WeekChooser.prototype.changeYear = function (e) {
        var self = this;
        self.populateWeek(parseInt($(e.currentTarget).val()));
        self.element.trigger("change");
    };
    
    WeekChooser.prototype.changeWeek = function (e) {
        var self = this;
        self.element.trigger("change");
    };
    
    WeekChooser.prototype.getThursdayForSelectedWeek = function() {
        return addDays(getFirstThursday(parseInt(this.year.val())), 7 * (parseInt(this.week.val()) - 1));
    }
    
    WeekChooser.prototype.getSelectedYear = function() {
       return this.getThursdayForSelectedWeek().getFullYear();
    }
    
    WeekChooser.prototype.getSelectedWeek = function() {
        return getWeek(this.getThursdayForSelectedWeek());
    }
    
    WeekChooser.prototype.populateYear = function(firstYear) {
        var self = this;
        self.year.empty();
        for (var i = 0; i < 10; i++) {
            self.year.append($('<option value="' + (firstYear + i) + '">'  + (firstYear + i) +  '</option>'));
        }
    }
    
    WeekChooser.prototype.populateWeek = function(year) {
        var self = this;
        var firstWeek = getFirstThursday(year);
        var firstDayInNextYear = new Date(year + 1, 0, 1);
        
        self.week.empty();
        var week = firstWeek;
        var weekNumber = 1;
        while(week < firstDayInNextYear) {
            self.week.append($('<option value="' + weekNumber + '">Uge ' + weekNumber + ' (' + dateToWeekString(week) + ')</option>'));
            week = addDays(week, 7);
            weekNumber++;
        }
    }
    
    var weekChoosers = $('.en-weekchooser');
	
	if( weekChoosers.length > 0 ) {
		weekChoosers.each(function(){
			$(this).data('weekchooser', new WeekChooser($(this)));
		});
	}
    
    
    function addDays(date, days) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
    }
    
    function getNearestThursdayForDate(date) {
        var day = (date.getDay() + 6) % 7;
        return addDays(date, 3 - day);
    }
    
    function dateToWeekString(date) {
        var thursday = getNearestThursdayForDate(date);
        
        var monday = addDays(thursday, -3);
        var sunday = addDays(thursday, 3);
        
        return monday.getDate() + "/" + (monday.getMonth() + 1) + " - " + sunday.getDate() + "/" + (sunday.getMonth() + 1);
    }
    
    function getWeek(date) {
        return Math.round((getNearestThursdayForDate(date) - getFirstThursday(date.getFullYear())) / 86400000 / 7) + 1; 
    }
    
    function getFirstThursday(year) {
        return getNearestThursdayForDate(new Date(year, 0, 4));
    }
});