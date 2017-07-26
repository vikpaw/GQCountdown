Com.Frog.Utils.require(
/*
    '//package/widgets/change these/assets/styles/main.css',
    '//package/widgets/C848667B2001BF33E64B6FDFE3F104058CE7821C1FB7393C/assets/views/main.ejs',
    '//package/widgets/C848667B2001BF33E64B6FDFE3F104058CE7821C1FB7393C/widget.ejs'
	Use the ones created by the wizard
	*/
).then(function() {
    Com.Frog.Controllers.Widget.extend('Widget.DateCountdown', {
    }, {
        prefs: {
            'title':{
                type:"text",
                defaultValue:"",
                label:"Event name"
            },
            'date':{
                type:"date",
                defaultValue:"",
                label:"Date of Event"
            },
            'colour':{
                type:"colourpicker",
                defaultValue:"#cb60b3",
                label:"Colour"
            },
            'style':{
                type:"text",
                defaultValue:"",
                label:"Widget Stylesheet"
            },
            'clss':{
                type:"text",
                defaultValue:"",
                label:"Widget CSS Class"
            }
        },

        packageID: 'C848667B2001BF33E64B6FDFE3F104058CE7821C1FB7393C',
        /**
         * Constructor. Runs when the widget is first loaded.
         *
         * @method init
         */
        init: function() {
            this.element.closest('.sites_core').on('app.close', function() {
                window.clearInterval(this.timedInterval);
                this.timedInterval=null;
            }.bind(this));
        },

        /**
         * Event fired by the Site Controller.
         *
         * @event 'widget.live'
         */

        
        'widget.live': function(el, ev, data) {
            var $clock,
                eventTime = moment(this.prefs.date.value, 'DD/MM/YYYY').unix(),
                currentTime = moment().unix(),
                diffTime = eventTime - currentTime,
                duration = moment.duration(diffTime * 1000, 'milliseconds'),
                interval = 1000;
            this.element.html(
                this.view('main.ejs')
            );
            $clock = this.element.find('.countdown');
                // if time to countdown
                if(diffTime > 0) {

                    this.timedInterval = setInterval(function(){

                        duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
                        var d = moment.duration(duration).days(),
                            h = moment.duration(duration).hours(),
                            m = moment.duration(duration).minutes(),
                            s = moment.duration(duration).seconds();

                        d = $.trim(d).length === 1 ? '0' + d : d;
                        h = $.trim(h).length === 1 ? '0' + h : h;
                        m = $.trim(m).length === 1 ? '0' + m : m;
                        s = $.trim(s).length === 1 ? '0' + s : s;

                        this.element.find('.days').text(d);
                        this.element.find('.hours').text(h);
                        this.element.find('.minutes').text(m);
                        this.element.find('.seconds').text(s);

                        }.bind(this), interval);
                    
                    } 
        },

        /**
         * Event fired by the Site Controller. Tells the widget that the site is in Edit Mode.
         *
         * @event 'widget.edit'
         */
        'widget.edit': function(el, ev, data) {
            window.clearInterval(this.timedInterval);
            //console.log(this.prefs.colour.value);
            this.timedInterval=null;
			this.renderInEdit();
        },
        'widget.save': function(el, ev, data) {      
            this.renderInEdit();
        },
        renderInEdit : function() {
            this.element.html(
                this.view('./widget.ejs')
            );
			this.element.find('.timeBlock').css("background",this.prefs.colour.value);            
        }
    });
});