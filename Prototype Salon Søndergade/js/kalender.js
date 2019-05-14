$(document).ready(function() {
    
    var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
	var transitionsSupported = ( $('.csstransitions').length > 0 );
	//if browser does not support transitions - use a different event to trigger them
	if( !transitionsSupported ) transitionEnd = 'noTransition';

    function BookingKalender( element ) {
       	this.element = element;
		this.timeline = this.element.find('.timeline');
		this.timelineItems = this.timeline.find('li');
		this.timelineItemsNumber = this.timelineItems.length;
		this.timelineStart = getScheduleTimestamp(this.timelineItems.eq(0).text());
		//need to store delta (in our case half hour) timestamp
		this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems.eq(1).text()) - getScheduleTimestamp(this.timelineItems.eq(0).text());

		this.eventsWrapper = this.element.find('.events');
		this.eventsGroup = this.eventsWrapper.find('.events-group');
		this.singleEvents = this.eventsGroup.find('.single-event');
		this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();

		this.modal = this.element.find('.event-modal');
		this.modalHeader = this.modal.find('.header');
		this.modalHeaderBg = this.modal.find('.header-bg');
		this.modalBody = this.modal.find('.body'); 
		this.modalBodyBg = this.modal.find('.body-bg'); 
		this.modalMaxWidth = 800;
		this.modalMaxHeight = 480;

		this.animating = false;
        this.database = new Database();
        
        var wc = $('.en-weekchooser');
        var self = this;
        wc.on('change', function() {
            self.loadEvents();
            self.scheduleReset();
            self.placeEvents();
        });
        
        this.weekchooser = wc.data('weekchooser');
		this.initSchedule();
    };

    BookingKalender.prototype.initSchedule = function() {
        this.loadEvents();
        this.scheduleReset();
        this.initEvents();
    };

    BookingKalender.prototype.loadEvents = function() {
        var self = this;
        self.eventsGroup.find('ul').empty();
        
        var year = this.weekchooser.getSelectedYear();
        var week = this.weekchooser.getSelectedWeek();
        $.each(this.database.load(), function(){
            if(this.year == year && this.week == week) {
                var event = $('<li class="single-event"><a href="#0"><span class="event-date">'+this.start+' - '+this.end+'</span><em class="event-name">Booking</em></a></li>');
                event.on('click', 'a', function(event){
                    event.preventDefault();
                    event.stopPropagation();
                    if( !self.animating ) self.openModal($(this));
                });
                event.data('aftale', this);
                self.eventsGroup.eq(this.day).find('ul').append(event);
            }
        });
        self.singleEvents = self.eventsGroup.find('.single-event');
    };
    
    BookingKalender.prototype.scheduleReset = function() {
		var mq = this.mq();
		if( mq == 'desktop' && !this.element.hasClass('js-full') ) {
			//in this case you are on a desktop version (first load or resize from mobile)
			this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
			this.element.addClass('js-full');
			this.placeEvents();
			this.element.hasClass('modal-is-open') && this.checkEventModal();
		} else if(  mq == 'mobile' && this.element.hasClass('js-full') ) {
			//in this case you are on a mobile version (first load or resize from desktop)
			this.element.removeClass('js-full loading');
			this.eventsGroup.children('ul').add(this.singleEvents).removeAttr('style');
			this.eventsWrapper.children('.grid-line').remove();
			this.element.hasClass('modal-is-open') && this.checkEventModal();
		} else if( mq == 'desktop' && this.element.hasClass('modal-is-open')){
			//on a mobile version with modal open - need to resize/move modal window
			this.checkEventModal('desktop');
			this.element.removeClass('loading');
		} else {
			this.element.removeClass('loading');
		}
	};
    
    BookingKalender.prototype.initEvents = function() {
        var self = this;

        //close modal window
        this.modal.on('click', '.close, #formular input[name=anuller]', function(event){
			event.preventDefault();
			if( !self.animating ) self.closeModal(self.eventsGroup.find('.selected-event'));
        });
        
        this.modal.on('click', '#formular input[name=bekræft]', function(event){        
            self.gemBooking(event);
        });
        
        this.element.on('click', '.cover-layer', function(event){
			if( !self.animating && self.element.hasClass('modal-is-open') ) self.closeModal(self.eventsGroup.find('.selected-event'));
        });
    
        this.element.on('click', '.events-group', function(event) {
            self.opretBooking(event, $(this)); 
        });
        
        this.modal.on('click', '#formular input[name=tid]', function() {
          var tid = self.modal.find('input[name=tid]:checked').val();
          var start = self.selectedEvent.data('aftale').start;
          var timestamp = getScheduleTimestamp(start) + 60;
          if(tid == "30min") {
            timestamp -= 30;
          }
          if(tid == "90min") {
            timestamp += 30;
          }
          var minutes = (timestamp % 60) + "";
          minutes = minutes.length < 2 ? "0" + minutes : minutes;
          var end = Math.floor(timestamp / 60) + ":" + minutes;
          self.modalHeader.find('.event-date').text(start + ' - ' + end);     
        });
    };
    
    BookingKalender.prototype.placeEvents = function() {
		var self = this;
		this.singleEvents.each(function(){
			//place each event in the grid -> need to set top position and height
			var aftale = $(this).data('aftale'),
                start = getScheduleTimestamp(aftale.start),
				duration = getScheduleTimestamp(aftale.end) - start;

			var eventTop = self.eventSlotHeight*(start - self.timelineStart)/self.timelineUnitDuration,
				eventHeight = self.eventSlotHeight*duration/self.timelineUnitDuration;
			
			$(this).css({
				top: (eventTop -1) +'px',
				height: (eventHeight+1)+'px'
			});
		});

		this.element.removeClass('loading');
	};
    
    BookingKalender.prototype.openModal = function(event) {
		var self = this;
		var mq = self.mq();
		this.animating = true;

		//update event name and time
		this.modalHeader.find('.event-name').text(event.find('.event-name').text());
		this.modalHeader.find('.event-date').text(event.find('.event-date').text());

        this.selectedEvent = event.parent();
        
        self.element.addClass('content-loaded');
        var form = $('#formular');
        var evt = event.parent();
       
        var aftale = evt.data('aftale');
        
        var date = addDays(getFirstThursday(aftale.year), (aftale.week-1) * 7 + aftale.day - 3);
        
        var dateString = date.getDate() + "/" + (date.getMonth() + 1) + "-" + date.getFullYear();
        
        this.modal.find('.dato').text(dateString);
        
        var duration = getScheduleTimestamp(aftale.end) - getScheduleTimestamp(aftale.start);
        var tid = "60min";
        if(duration == 30) {
            tid = "30min";
        }
        if(duration == 90) {
            tid = "90min";
        }
        
        this.modal.find('.klokken').text(aftale.start);
        if(aftale.day == 0) {
            this.modal.find('.ugedag').text('Mandag')
        }
        if(aftale.day == 1) {
            this.modal.find('.ugedag').text('Tirsdag')
        }
        if(aftale.day == 2) {
            this.modal.find('.ugedag').text('Onsdag')
        }
        if(aftale.day == 3) {
            this.modal.find('.ugedag').text('Torsdag')
        }
        if(aftale.day == 4) {
            this.modal.find('.ugedag').text('Fredag')
        }
        if(aftale.day == 5) {
            this.modal.find('.ugedag').text('Lørdag')
        }
        if(aftale.day == 6) {
            this.modal.find('.ugedag').text('Søndag')
        }
        
        form.find('input[name=tid]').each(function() {
           $(this).attr('checked', $(this).val() == tid); 
        });
        form.find('input[name=fornavn]').val(aftale.fornavn);
        form.find('input[name=efternavn]').val(aftale.efternavn);
        form.find('input[name=tlfnr]').val(aftale.tlfnr);
        form.find('input[name=email]').val(aftale.email);
        form.find('textarea[name=komment]').val(aftale.komment);
        
        var isNew = evt.is('.new-event');
        form.find('input[name=fornavn],input[name=efternavn],input[name=tlfnr],input[name=email],textarea[name=komment]').attr('readonly', !isNew);
        
        form.find('input[name=tid],input[name=reset],input[name=bekræft]').attr('disabled', !isNew);
        
		this.element.addClass('modal-is-open');

		setTimeout(function(){
			//fixes a flash when an event is selected - desktop version only
			event.parent('li').addClass('selected-event');
		}, 10);

		if( mq == 'mobile' ) {
			self.modal.one(transitionEnd, function(){
				self.modal.off(transitionEnd);
				self.animating = false;
			});
		} else {
			var eventTop = event.offset().top - $(window).scrollTop(),
				eventLeft = event.offset().left,
				eventHeight = event.innerHeight(),
				eventWidth = event.innerWidth();

			var windowWidth = $(window).width(),
				windowHeight = $(window).height();

			var modalWidth = ( windowWidth*.8 > self.modalMaxWidth ) ? self.modalMaxWidth : windowWidth*.8,
				modalHeight = ( windowHeight*.8 > self.modalMaxHeight ) ? self.modalMaxHeight : windowHeight*.8;

			var modalTranslateX = parseInt((windowWidth - modalWidth)/2 - eventLeft),
				modalTranslateY = parseInt((windowHeight - modalHeight)/2 - eventTop);
			
			var HeaderBgScaleY = modalHeight/eventHeight,
				BodyBgScaleX = (modalWidth - eventWidth);

			//change modal height/width and translate it
			self.modal.css({
				top: eventTop+'px',
				left: eventLeft+'px',
				height: modalHeight+'px',
				width: modalWidth+'px',
			});
			transformElement(self.modal, 'translateY('+modalTranslateY+'px) translateX('+modalTranslateX+'px)');

			//set modalHeader width
			self.modalHeader.css({
				width: eventWidth+'px',
			});
			//set modalBody left margin
			self.modalBody.css({
				marginLeft: eventWidth+'px',
			});

			//change modalBodyBg height/width ans scale it
			self.modalBodyBg.css({
				height: eventHeight+'px',
				width: '1px',
			});
			transformElement(self.modalBodyBg, 'scaleY('+HeaderBgScaleY+') scaleX('+BodyBgScaleX+')');

			//change modal modalHeaderBg height/width and scale it
			self.modalHeaderBg.css({
				height: eventHeight+'px',
				width: eventWidth+'px',
			});
			transformElement(self.modalHeaderBg, 'scaleY('+HeaderBgScaleY+')');
			
			self.modalHeaderBg.one(transitionEnd, function(){
				//wait for the  end of the modalHeaderBg transformation and show the modal content
				self.modalHeaderBg.off(transitionEnd);
				self.animating = false;
				self.element.addClass('animation-completed');
			});
		}

		//if browser do not support transitions -> no need to wait for the end of it
		if( !transitionsSupported ) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
	};

    BookingKalender.prototype.opretBooking = function(e, group) {
        var self = this;

        var time = Math.floor(e.offsetY / self.eventSlotHeight) * self.timelineUnitDuration + self.timelineStart;
        var minutes = (time % 60) + "";
        minutes = minutes.length < 2 ? "0" + minutes : minutes;
        
        var start = Math.floor(time / 60) + ":" + minutes;
        
        time += 30;
        minutes = (time % 60) + "";
        minutes = minutes.length < 2 ? "0" + minutes : minutes;
        var end = Math.floor(time / 60) + ":" + minutes;
        
        var day = group.index();
        
        var listItem = $('<li class="single-event"><a href="#0"><em class="event-name">Book en tid</em></a></li>');
 
        group.find('ul').append(listItem);
        var year = this.weekchooser.getSelectedYear();
        var week = this.weekchooser.getSelectedWeek();
        listItem.data('aftale', new Aftale(year, week, day, start, end));
        var durationLabel = '<span class="event-date">'+start+' - '+end+'</span>';
        listItem.children('a').prepend($(durationLabel));

        //detect click on the event and open the modal
        listItem.on('click', 'a', function(event){
            event.preventDefault();
            event.stopPropagation();
            if( !self.animating ) self.openModal($(this));
        });
        
        self.singleEvents = self.eventsGroup.find('.single-event');
        self.placeEvents();
        var event = listItem.find('a');
        listItem.addClass("new-event");
        self.openModal(event);
    };

    BookingKalender.prototype.gemBooking = function(event) {
        event.preventDefault();
        var self = this;
        var isValid = true;
        if(this.selectedEvent.is('.new-event')) {
            var form = $('#formular');
            var tid = form.find('input[name=tid]:checked').val();
            var fornavn = form.find('input[name=fornavn]').val();
            var efternavn = form.find('input[name=efternavn]').val();
            var tlfnr = form.find('input[name=tlfnr]').val();
            var email = form.find('input[name=email]').val();
            var komment = form.find('textarea[name=komment]').val();
        
            if (!fornavn || !efternavn || !tlfnr || !email) {
                isValid = false;
            }
            
            var aftale = this.selectedEvent.data('aftale');

            var timestamp = getScheduleTimestamp(aftale.start) + 60;
            if(tid == "30min") {
                timestamp -= 30;
            }
            if(tid == "90min") {
                timestamp += 30;
            }
            var minutes = (timestamp % 60) + "";
            minutes = minutes.length < 2 ? "0" + minutes : minutes;
            var end = Math.floor(timestamp / 60) + ":" + minutes;
                
            var aftale = new Aftale(
                aftale.year, aftale.week, aftale.day, aftale.start, end, fornavn, efternavn, tlfnr, email, komment
            );
        
            if(isValid){
                this.database.create(aftale);
                form.find('input').removeClass('error');
                this.selectedEvent.data('aftale', aftale);
                this.selectedEvent.find('.event-date').text(aftale.start+' - '+aftale.end);
                this.selectedEvent.find('.event-name').text('Booking');
                alert('Aftalen er nu bekræftet');
            }
            else{
                //Indsæt stjerne og rødt felt
                if(!fornavn) {
                    form.find('input[name=fornavn]').addClass('error');
                }
                if(!efternavn) {
                    form.find('input[name=efternavn]').addClass('error');
                }
                if(!tlfnr) {
                    form.find('input[name=tlfnr]').addClass('error');
                }
                if(!email) {
                    form.find('input[name=email]').addClass('error');
                }
            }
        }
        if(isValid){
            this.selectedEvent.removeClass('new-event');
            this.placeEvents();
            if( !self.animating ) self.closeModal(self.eventsGroup.find('.selected-event')); 
        }
    };

    BookingKalender.prototype.closeModal = function(event) {
		var self = this;
		var mq = self.mq();

		this.animating = true;

		if( mq == 'mobile' ) {
			this.element.removeClass('modal-is-open');
			this.modal.one(transitionEnd, function(){
				self.modal.off(transitionEnd);
				self.animating = false;
				self.element.removeClass('content-loaded');
				event.removeClass('selected-event');
			});
		} else {
			var eventTop = event.offset().top - $(window).scrollTop(),
				eventLeft = event.offset().left,
				eventHeight = event.innerHeight(),
				eventWidth = event.innerWidth();

			var modalTop = Number(self.modal.css('top').replace('px', '')),
				modalLeft = Number(self.modal.css('left').replace('px', ''));

			var modalTranslateX = eventLeft - modalLeft,
				modalTranslateY = eventTop - modalTop;

			self.element.removeClass('animation-completed modal-is-open');

			//change modal width/height and translate it
			this.modal.css({
				width: eventWidth+'px',
				height: eventHeight+'px'
			});
			transformElement(self.modal, 'translateX('+modalTranslateX+'px) translateY('+modalTranslateY+'px)');
			
			//scale down modalBodyBg element
			transformElement(self.modalBodyBg, 'scaleX(0) scaleY(1)');
			//scale down modalHeaderBg element
			transformElement(self.modalHeaderBg, 'scaleY(1)');

			this.modalHeaderBg.one(transitionEnd, function(){
				//wait for the  end of the modalHeaderBg transformation and reset modal style
				self.modalHeaderBg.off(transitionEnd);
				self.modal.addClass('no-transition');
				setTimeout(function(){
					self.modal.add(self.modalHeader).add(self.modalBody).add(self.modalHeaderBg).add(self.modalBodyBg).attr('style', '');
				}, 10);
				setTimeout(function(){
					self.modal.removeClass('no-transition');
				}, 20);

				self.animating = false;
				self.element.removeClass('content-loaded');
				event.removeClass('selected-event');
			});
		}

		//browser do not support transitions -> no need to wait for the end of it
		if( !transitionsSupported ) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
        
        if (event.is(".new-event")) {
            event.closest("li").remove();
        }
	};
    
    BookingKalender.prototype.mq = function(){
		//get MQ value ('desktop' or 'mobile') 
		var self = this;
		return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
	};

	BookingKalender.prototype.checkEventModal = function(device) {
		this.animating = true;
		var self = this;
		var mq = this.mq();

		if( mq == 'mobile' ) {
			//reset modal style on mobile
			self.modal.add(self.modalHeader).add(self.modalHeaderBg).add(self.modalBody).add(self.modalBodyBg).attr('style', '');
			self.modal.removeClass('no-transition');	
			self.animating = false;	
		} else if( mq == 'desktop' && self.element.hasClass('modal-is-open') ) {
			self.modal.addClass('no-transition');
			self.element.addClass('animation-completed');
			var event = self.eventsGroup.find('.selected-event');

			var eventTop = event.offset().top - $(window).scrollTop(),
				eventLeft = event.offset().left,
				eventHeight = event.innerHeight(),
				eventWidth = event.innerWidth();

			var windowWidth = $(window).width(),
				windowHeight = $(window).height();

			var modalWidth = ( windowWidth*.8 > self.modalMaxWidth ) ? self.modalMaxWidth : windowWidth*.8,
				modalHeight = ( windowHeight*.8 > self.modalMaxHeight ) ? self.modalMaxHeight : windowHeight*.8;

			var HeaderBgScaleY = modalHeight/eventHeight,
				BodyBgScaleX = (modalWidth - eventWidth);

			setTimeout(function(){
				self.modal.css({
					width: modalWidth+'px',
					height: modalHeight+'px',
					top: (windowHeight/2 - modalHeight/2)+'px',
					left: (windowWidth/2 - modalWidth/2)+'px',
				});
				transformElement(self.modal, 'translateY(0) translateX(0)');
				//change modal modalBodyBg height/width
				self.modalBodyBg.css({
					height: modalHeight+'px',
					width: '1px',
				});
				transformElement(self.modalBodyBg, 'scaleX('+BodyBgScaleX+')');
				//set modalHeader width
				self.modalHeader.css({
					width: eventWidth+'px',
				});
				//set modalBody left margin
				self.modalBody.css({
					marginLeft: eventWidth+'px',
				});
				//change modal modalHeaderBg height/width and scale it
				self.modalHeaderBg.css({
					height: eventHeight+'px',
					width: eventWidth+'px',
				});
				transformElement(self.modalHeaderBg, 'scaleY('+HeaderBgScaleY+')');
			}, 10);

			setTimeout(function(){
				self.modal.removeClass('no-transition');
				self.animating = false;	
			}, 20);
		}
	};   
    
	var schedules = $('.cd-schedule');
	var objSchedulesPlan = [],
		windowResize = false;
	
	if( schedules.length > 0 ) {
		schedules.each(function(){
			//create SchedulePlan objects
			objSchedulesPlan.push(new BookingKalender($(this)));
		});
	}

	$(window).on('resize', function(){
		if( !windowResize ) {
			windowResize = true;
			(!window.requestAnimationFrame) ? setTimeout(checkResize) : window.requestAnimationFrame(checkResize);
		}
	});

	$(window).keyup(function(event) {
		if (event.keyCode == 27) {
			objSchedulesPlan.forEach(function(element){
				element.closeModal(element.eventsGroup.find('.selected-event'));
			});
		}
	});

	function checkResize(){
		objSchedulesPlan.forEach(function(element){
			element.scheduleReset();
		});
		windowResize = false;
	}

	function getScheduleTimestamp(time) {
		//accepts hh:mm format - convert hh:mm to timestamp
		time = time.replace(/ /g,'');
		var timeArray = time.split(':');
		var timeStamp = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
		return timeStamp;
	}
    
    function transformElement(element, value) {
		element.css({
		    '-moz-transform': value,
		    '-webkit-transform': value,
			'-ms-transform': value,
			'-o-transform': value,
			'transform': value
        });
    }
     function addDays(date, days) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
    }
    
    function getNearestThursdayForDate(date) {
        var day = (date.getDay() + 6) % 7;
        return addDays(date, 3 - day);
    }
    
    function getFirstThursday(year) {
        return getNearestThursdayForDate(new Date(year, 0, 4));
    }
});