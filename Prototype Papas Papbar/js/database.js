function Database() {
    
};

Database.prototype.create = function(aftale) {
    var aftaler = this.load();
    aftaler[aftale.id()] = aftale;
    this.store(aftaler);
};

Database.prototype.list = function(fromDate, toDate) {
    
};

Database.prototype.delete = function() {
    
};

Database.prototype.update = function() {
    
};

Database.prototype.load = function() {
    var aftaler = localStorage.getItem('aftaler');
    if(aftaler) {
        return JSON.parse(aftaler);
    } else {
        return {};
    }
}

Database.prototype.store = function(aftaler) {
    localStorage.setItem('aftaler', JSON.stringify(aftaler));
}

function Aftale (year, week, day, start, end, fornavn, efternavn, tlfnr, email, komment) {
    this.year = year;
    this.week = week;
    this.day = day;
    this.start = start;
    this.end = end;
    this.fornavn = fornavn;
    this.efternavn = efternavn;
    this.tlfnr = tlfnr;
    this.email = email;
    this.komment = komment;
};

Aftale.prototype.id = function() {
    return this.year + "_" + this.week + "_" + this.day + "_" + this.ankomst;
} 

Aftale.prototype.toString = function() {
    return "tid:" + this.tid + ", fornavn:" + this.fornavn + ", efternavn:" + this.efternavn + ", tlfnr:" + this.tlfnr + ", email:" + this.email + ", komment:" + this.komment;
};