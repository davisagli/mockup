define(["jquery","mockup-patterns-base"],function(a,b){"use strict";var c=b.extend({name:"backdrop",defaults:{zIndex:"1000",opacity:"0.8",className:"backdrop",classActiveName:"backdrop-active",closeOnEsc:!0,closeOnClick:!0},init:function(){var b=this;b.$backdrop=a("> ."+b.options.className,b.$el),0===b.$backdrop.size()&&(b.$backdrop=a("<div/>").hide().appendTo(b.$el).addClass(b.options.className)),b.options.closeOnEsc===!0&&a(document).on("keydown",function(a){b.$el.is("."+b.options.classActiveName)&&27===a.keyCode&&b.hide()}),b.options.closeOnClick===!0&&b.$backdrop.on("click",function(){b.$el.is("."+b.options.classActiveName)&&b.hide()})},show:function(){var a=this;a.$el.hasClass(a.options.classActiveName)||(a.trigger("show"),a.$backdrop.css("opacity","0").show(),a.$el.addClass(a.options.classActiveName),a.$backdrop.animate({opacity:a.options.opacity},500),a.trigger("shown"))},hide:function(){var a=this;a.$el.hasClass(a.options.classActiveName)&&(a.trigger("hide"),a.$backdrop.animate({opacity:"0"},500).hide(),a.$el.removeClass(a.options.classActiveName),a.trigger("hidden"))}});return c});